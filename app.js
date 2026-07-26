const C = window.KOCI_DOM_CONFIG || {};
const configured = C.SUPABASE_URL && !C.SUPABASE_URL.includes("WKLEJ_") && C.SUPABASE_ANON_KEY && !C.SUPABASE_ANON_KEY.includes("WKLEJ_");
const db = configured ? window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY) : null;

const voivodeships = ["dolnośląskie","kujawsko-pomorskie","lubelskie","lubuskie","łódzkie","małopolskie","mazowieckie","opolskie","podkarpackie","podlaskie","pomorskie","śląskie","świętokrzyskie","warmińsko-mazurskie","wielkopolskie","zachodniopomorskie"];
let currentUser = null, isAdmin = false, authMode = "login", publicCats = [], favoriteIds = new Set(), organizations = [], adminFilter = "pending", galleryImages = [], galleryIndex = 0;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = v => String(v ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch]));
const ageLabel = v => ({kociak:"Kociak",mlody:"Młody",dorosly:"Dorosły",senior:"Senior"}[v] || v || "");
const sexLabel = v => ({kotka:"Kotka",kocur:"Kocur",nieznana:"Nieznana"}[v] || v || "");
const statusLabel = v => ({pending:"Oczekuje",approved:"Opublikowane",rejected:"Odrzucone"}[v] || v || "");

function msg(el,text,error=false){el.textContent=text;el.classList.remove("hidden","error");if(error)el.classList.add("error")}
function fillVoivodeships(){const opts='<option value="">Wybierz</option>'+voivodeships.map(v=>`<option value="${v}">${v}</option>`).join("");$("#voivodeshipSelect").innerHTML=opts;$("#voivodeshipFilter").innerHTML='<option value="">Cała Polska</option>'+voivodeships.map(v=>`<option value="${v}">${v}</option>`).join("");const a=$("#adminVoivodeshipSelect");if(a)a.innerHTML=opts;const o=$("#organizationVoivodeshipSelect");if(o)o.innerHTML=opts}
async function initAuth(){if(!configured){updateAuthUI();return}const {data}=await db.auth.getSession();currentUser=data.session?.user||null;await checkAdmin();updateAuthUI();db.auth.onAuthStateChange(async(_e,s)=>{currentUser=s?.user||null;await checkAdmin();await loadFavoriteIds();updateAuthUI();route()})}
async function checkAdmin(){isAdmin=false;if(!currentUser||!configured)return;const {data,error}=await db.rpc("is_admin");if(!error)isAdmin=data===true}
function updateAuthUI(){$("#loginBtn").classList.toggle("hidden",!!currentUser);$("#registerBtn").classList.toggle("hidden",!!currentUser);$("#logoutBtn").classList.toggle("hidden",!currentUser);$("#userEmail").classList.toggle("hidden",!currentUser);$("#userEmail").textContent=currentUser?.email||"";$$("[data-auth-only]").forEach(e=>e.classList.toggle("hidden",!currentUser));$$("[data-admin-only]").forEach(e=>e.classList.toggle("hidden",!isAdmin))}
function openAuth(mode){authMode=mode;$("#authTitle").textContent=mode==="login"?"Logowanie":"Załóż konto";$("#authSubmit").textContent=mode==="login"?"Zaloguj się":"Utwórz konto";$("#authMessage").classList.add("hidden");$("#authModal").classList.remove("hidden")}
async function handleAuth(e){e.preventDefault();const f=new FormData(e.target),email=f.get("email"),password=f.get("password");$("#authSubmit").disabled=true;const r=authMode==="login"?await db.auth.signInWithPassword({email,password}):await db.auth.signUp({email,password});$("#authSubmit").disabled=false;if(r.error)return msg($("#authMessage"),r.error.message,true);if(authMode==="register"&&!r.data.session)msg($("#authMessage"),"Konto utworzone. Potwierdź adres e-mail.");else{$("#authModal").classList.add("hidden");location.hash="#/"}}
function hideViews(){["homeView","submitView","myView","favoritesView","organizationsView","organizationDetailView","matcherView","adminView","detailView","howView"].forEach(id=>$("#"+id).classList.add("hidden"))}
async function route(){const h=location.hash||"#/";hideViews();if(h.startsWith("#/kot/")){$("#detailView").classList.remove("hidden");return loadDetail(h.split("/")[2])}if(h.startsWith("#/organizacja/")){$("#organizationDetailView").classList.remove("hidden");return loadOrganizationDetail(h.split("/")[2])}if(h==="#/organizacje"){$("#organizationsView").classList.remove("hidden");return loadOrganizations()}if(h==="#/dopasuj"){$("#matcherView").classList.remove("hidden");return}if(h==="#/dodaj"){if(!currentUser){openAuth("login");location.hash="#/";return}$("#submitView").classList.remove("hidden");return}if(h==="#/moje"){if(!currentUser){openAuth("login");location.hash="#/";return}$("#myView").classList.remove("hidden");return loadMyCats()}if(h==="#/ulubione"){if(!currentUser){openAuth("login");location.hash="#/";return}$("#favoritesView").classList.remove("hidden");return loadFavoritesView()}if(h==="#/admin"){if(!isAdmin){location.hash="#/";return}$("#adminView").classList.remove("hidden");return loadAdminCats()}if(h==="#/jak-to-dziala"){$("#howView").classList.remove("hidden");return}$("#homeView").classList.remove("hidden");await Promise.all([loadStats(),loadOrganizations(false)]);return loadPublicCats()}
async function loadPublicCats(){if(!configured)return;await loadFavoriteIds();const {data,error}=await db.from("cats").select("*").eq("moderation_status","approved").in("adoption_status",["available","reserved"]).order("created_at",{ascending:false});if(error){$("#listingCount").textContent="Błąd pobierania ogłoszeń.";console.error(error);return}publicCats=data||[];renderPublicCats(publicCats);renderVoivodeshipMap()}
function renderPublicCats(cats){$("#listingCount").textContent=`${cats.length} aktualnych ogłoszeń`;$("#emptyState").classList.toggle("hidden",cats.length>0);$("#catsGrid").innerHTML=cats.map(catCard).join("")}
function fundingBlock(c, compact=false){
  const goal=Number(c.funding_goal||0), raised=Number(c.funding_raised||0);
  if(!c.donation_url && !goal) return "";
  const pct=goal>0?Math.min(100,Math.round((raised/goal)*100)):0;
  const title=esc(c.funding_title||"Pomóż w opiece nad tym kotem");
  const amounts=goal>0?`<div class="funding-numbers"><strong>${raised.toLocaleString("pl-PL")} zł</strong><span>z ${goal.toLocaleString("pl-PL")} zł</span></div><div class="progress" aria-label="Zebrano ${pct}%"><span style="width:${pct}%"></span></div>`:"";
  const button=c.donation_url?`<a class="btn support-btn" href="${esc(c.donation_url)}" target="_blank" rel="noopener noreferrer">❤️ Wesprzyj ${esc(c.name)}</a>`:"";
  return `<div class="funding-box ${compact?"compact":""}"><div class="funding-title"><span>❤️</span><div><small>Pomoc finansowa</small><strong>${title}</strong></div></div>${amounts}${button}</div>`;
}
function favoriteButton(c){
  const active=favoriteIds.has(c.id);
  return `<button class="favorite-btn ${active?"active":""}" type="button" onclick="toggleFavorite('${c.id}',event)" aria-label="${active?"Usuń z ulubionych":"Dodaj do ulubionych"}" title="${active?"Usuń z ulubionych":"Dodaj do ulubionych"}">${active?"♥":"♡"}</button>`;
}
function healthIcons(c){return `<div class="health-icons"><span class="${c.vaccinated?"ok":""}">💉</span><span class="${c.neutered?"ok":""}">✂️</span><span class="${c.chipped?"ok":""}">🔖</span></div>`}
function catCard(c){const img=c.main_image_url?`<img src="${esc(c.main_image_url)}" alt="${esc(c.name)}" loading="lazy">`:`<div class="cat-placeholder">🐈</div>`;const status=({available:"Szuka domu",reserved:"Rezerwacja",adopted:"Adoptowany"}[c.adoption_status]||"Szuka domu");return `<article class="cat-card premium-card"><div class="cat-media">${c.urgent?'<span class="urgent">Pilna adopcja</span>':""}${favoriteButton(c)}${img}<span class="location-pill">📍 ${esc(c.city)}</span></div><div class="cat-body"><div class="cat-top"><h3>${esc(c.name)}</h3><span class="badge">${esc(status)}</span></div>${c.organization_name?`<div class="card-organization">🏠 ${esc(c.organization_name)}</div>`:""}<div class="chips"><span class="chip">${esc(sexLabel(c.sex))}</span><span class="chip">${esc(c.age_description||ageLabel(c.age_group))}</span><span class="chip">${esc(({calm:"Spokojny",medium:"Zrównoważony",active:"Aktywny"}[c.temperament]||"Charakter: brak danych"))}</span></div>${healthIcons(c)}<p>${esc(c.short_description||"")}</p>${fundingBlock(c,true)}<a class="card-link premium-link" href="#/kot/${c.id}">Poznaj ${esc(c.name)} <span>→</span></a></div></article>`}
async function loadFavoriteIds(){
  favoriteIds=new Set();
  if(!currentUser||!configured)return;
  const {data,error}=await db.from("favorites").select("cat_id").eq("user_id",currentUser.id);
  if(!error)(data||[]).forEach(row=>favoriteIds.add(row.cat_id));
}
async function toggleFavorite(catId,event){
  event?.preventDefault();event?.stopPropagation();
  if(!currentUser){openAuth("login");return}
  const active=favoriteIds.has(catId);
  if(active){
    const {error}=await db.from("favorites").delete().eq("user_id",currentUser.id).eq("cat_id",catId);
    if(error)return alert(error.message);
    favoriteIds.delete(catId);
  }else{
    const {error}=await db.from("favorites").insert({user_id:currentUser.id,cat_id:catId});
    if(error)return alert(error.message);
    favoriteIds.add(catId);
  }
  document.querySelectorAll(`.favorite-btn[onclick*="${catId}"]`).forEach(btn=>{
    btn.classList.toggle("active",!active);btn.textContent=!active?"♥":"♡";
    btn.title=!active?"Usuń z ulubionych":"Dodaj do ulubionych";
  });
  if(location.hash==="#/ulubione"&&active)loadFavoritesView();
  loadStats();
}
window.toggleFavorite=toggleFavorite;
async function loadFavoritesView(){
  await loadFavoriteIds();
  if(!favoriteIds.size){
    $("#favoriteCats").innerHTML="";
    $("#favoriteEmpty").classList.remove("hidden");
    return;
  }
  const {data,error}=await db.from("cats").select("*").in("id",[...favoriteIds]).eq("moderation_status","approved").order("created_at",{ascending:false});
  if(error){$("#favoriteCats").innerHTML='<div class="empty">Nie udało się pobrać ulubionych.</div>';return}
  $("#favoriteEmpty").classList.toggle("hidden",(data||[]).length>0);
  $("#favoriteCats").innerHTML=(data||[]).map(catCard).join("");
}
async function loadStats(){
  if(!configured)return;
  const [available,adopted,favorites,raised]=await Promise.all([
    db.from("cats").select("*",{count:"exact",head:true}).eq("moderation_status","approved").eq("adoption_status","available"),
    db.from("cats").select("*",{count:"exact",head:true}).eq("moderation_status","approved").eq("adoption_status","adopted"),
    db.from("favorites").select("*",{count:"exact",head:true}),
    db.from("cats").select("funding_raised").eq("moderation_status","approved")
  ]);
  $("#statAvailable").textContent=(available.count||0).toLocaleString("pl-PL");
  $("#statAdopted").textContent=(adopted.count||0).toLocaleString("pl-PL");
  $("#statFavorites").textContent=(favorites.count||0).toLocaleString("pl-PL");
  const total=(raised.data||[]).reduce((sum,row)=>sum+Number(row.funding_raised||0),0);
  $("#statRaised").textContent=Math.round(total).toLocaleString("pl-PL");
}

function filterCats(){const q=$("#searchInput").value.toLowerCase().trim(),sex=$("#sexFilter").value,age=$("#ageFilter").value,v=$("#voivodeshipFilter").value,adoption=$("#adoptionFilter").value,sort=$("#sortFilter").value;const n=$("#neuteredFilter").checked,va=$("#vaccinatedFilter").checked,ch=$("#chippedFilter").checked,u=$("#urgentFilter").checked,fu=$("#fundingFilter").checked;let out=publicCats.filter(c=>(!q||[c.name,c.city,c.description,c.short_description,c.organization_name].some(x=>(x||"").toLowerCase().includes(q)))&&(!sex||c.sex===sex)&&(!age||c.age_group===age)&&(!v||c.voivodeship===v)&&(!adoption||c.adoption_status===adoption)&&(!n||c.neutered)&&(!va||c.vaccinated)&&(!ch||c.chipped)&&(!u||c.urgent)&&(!fu||Boolean(c.donation_url||Number(c.funding_goal||0)>0)));if(sort==="oldest")out.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at));if(sort==="newest")out.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));if(sort==="name")out.sort((a,b)=>(a.name||"").localeCompare(b.name||"","pl"));renderPublicCats(out)}
function clearFilters(){["searchInput","sexFilter","ageFilter","voivodeshipFilter","adoptionFilter"].forEach(id=>$("#"+id).value="");["neuteredFilter","vaccinatedFilter","chippedFilter","urgentFilter","fundingFilter"].forEach(id=>$("#"+id).checked=false);$("#sortFilter").value="newest";renderPublicCats([...publicCats]);renderVoivodeshipMap()}

function renderVoivodeshipMap(){const b=$("#voivodeshipMap");if(!b)return;const counts={};publicCats.forEach(c=>counts[c.voivodeship]=(counts[c.voivodeship]||0)+1);b.innerHTML=voivodeships.map(v=>`<button class="region-button" onclick="filterByVoivodeship('${v}')"><strong>${esc(v)}</strong><span>${counts[v]||0}</span></button>`).join("")}
function filterByVoivodeship(v){$("#voivodeshipFilter").value=v;filterCats();document.querySelector(".section-head")?.scrollIntoView({behavior:"smooth"})}window.filterByVoivodeship=filterByVoivodeship;
async function loadOrganizations(render=true){const {data,error}=await db.from("organizations").select("*").order("verified",{ascending:false}).order("name");if(error){console.error(error);return}organizations=data||[];const s=$("#adminOrganizationSelect");if(s)s.innerHTML='<option value="">Brak profilu</option>'+organizations.map(o=>`<option value="${o.id}">${esc(o.name)}</option>`).join("");if(!render)return;$("#organizationsEmpty").classList.toggle("hidden",organizations.length>0);$("#organizationsGrid").innerHTML=organizations.map(o=>`<article class="organization-card">${o.logo_url?`<img src="${esc(o.logo_url)}" alt="${esc(o.name)}">`:'<div class="organization-logo">🏠</div>'}<div><div class="organization-title"><h3>${esc(o.name)}</h3>${o.verified?'<span class="verified-badge">✓ Zweryfikowana</span>':""}</div><p>${esc(o.description||"")}</p><div class="organization-meta">📍 ${esc([o.city,o.voivodeship].filter(Boolean).join(", ")||"Polska")}</div><a class="card-link" href="#/organizacja/${o.id}">Zobacz profil <span>→</span></a></div></article>`).join("")}
async function loadOrganizationDetail(id){const [{data:o,error},{data:cats}]=await Promise.all([db.from("organizations").select("*").eq("id",id).single(),db.from("cats").select("*").eq("organization_id",id).eq("moderation_status","approved")]);if(error||!o){$("#organizationDetailView").innerHTML='<div class="empty">Nie znaleziono organizacji.</div>';return}$("#organizationDetailView").innerHTML=`<div class="organization-profile card"><div class="organization-profile-head">${o.logo_url?`<img src="${esc(o.logo_url)}">`:'<div class="organization-profile-logo">🏠</div>'}<div><div class="organization-title"><h2>${esc(o.name)}</h2>${o.verified?'<span class="verified-badge">✓ Zweryfikowana</span>':""}</div><p>${esc(o.description||"")}</p><div class="organization-links">${o.website_url?`<a class="btn secondary" target="_blank" href="${esc(o.website_url)}">WWW</a>`:""}${o.facebook_url?`<a class="btn secondary" target="_blank" href="${esc(o.facebook_url)}">Facebook</a>`:""}${o.email?`<a class="btn primary" href="mailto:${esc(o.email)}">Kontakt</a>`:""}</div></div></div><div class="section-head"><div><h2>Koty organizacji</h2><p>${(cats||[]).length} ogłoszeń</p></div></div><div class="cats-grid">${(cats||[]).map(catCard).join("")}</div></div>`}
function openAdoption(id,name){const f=$("#adoptionForm");f.elements.cat_id.value=id;$("#adoptionTitle").textContent=`Chcę adoptować: ${name}`;if(currentUser?.email)f.elements.email.value=currentUser.email;$("#adoptionMessage").classList.add("hidden");$("#adoptionModal").classList.remove("hidden")}function closeAdoption(){$("#adoptionModal").classList.add("hidden")}window.openAdoption=openAdoption;
async function submitAdoption(e){e.preventDefault();const f=new FormData(e.target),p={cat_id:f.get("cat_id"),user_id:currentUser?.id||null,full_name:f.get("full_name"),email:f.get("email"),phone:f.get("phone"),city:f.get("city"),home_type:f.get("home_type"),other_pets:f.get("other_pets"),children:f.has("children"),secured_windows:f.has("secured_windows"),pre_adoption_visit:f.has("pre_adoption_visit"),message:f.get("message"),status:"new"};const {error}=await db.from("adoption_applications").insert(p);if(error)return msg($("#adoptionMessage"),error.message,true);msg($("#adoptionMessage"),"Zgłoszenie zostało wysłane.");e.target.reset()}
async function loadApplications(){const {data,error}=await db.from("adoption_applications").select("*,cats(name,main_image_url)").order("created_at",{ascending:false});if(error){$("#adminCats").innerHTML='<div class="empty">Błąd pobierania zgłoszeń.</div>';return}$("#adminCats").innerHTML=(data||[]).length?(data||[]).map(a=>`<article class="application-card card">${a.cats?.main_image_url?`<img src="${esc(a.cats.main_image_url)}">`:""}<div><div class="application-head"><h3>${esc(a.full_name)} → ${esc(a.cats?.name||"kot")}</h3><span class="badge">${esc(a.status)}</span></div><div class="dash-meta">${esc(a.email)} • ${esc(a.phone)} • ${esc(a.city)}</div><p>${esc(a.message)}</p></div><div class="dash-actions"><button class="btn secondary" onclick="setApplicationStatus('${a.id}','contacted')">Kontakt</button><button class="btn primary" onclick="setApplicationStatus('${a.id}','accepted')">Akceptuj</button><button class="btn danger" onclick="setApplicationStatus('${a.id}','rejected')">Odrzuć</button></div></article>`).join(""):'<div class="empty">Brak zgłoszeń.</div>'}async function setApplicationStatus(id,status){const {error}=await db.from("adoption_applications").update({status}).eq("id",id);if(error)alert(error.message);else loadApplications()}window.setApplicationStatus=setApplicationStatus;
async function loadAdminOrganizations(){await loadOrganizations(false);$("#adminCats").innerHTML='<div class="admin-toolbar"><button class="btn primary" onclick="openOrganizationAdmin()">+ Dodaj organizację</button></div>'+organizations.map(o=>`<article class="dash-item">${o.logo_url?`<img src="${esc(o.logo_url)}">`:"🏠"}<div><h3>${esc(o.name)} ${o.verified?'<span class="verified-badge">✓ Zweryfikowana</span>':""}</h3></div><div class="dash-actions"><button class="btn secondary" onclick="openOrganizationAdmin('${o.id}')">Edytuj</button></div></article>`).join("")}
async function openOrganizationAdmin(id=null){await loadOrganizations(false);const f=$("#organizationAdminForm");f.reset();f.elements.id.value="";if(id){const o=organizations.find(x=>x.id===id);["id","name","city","voivodeship","email","phone","website_url","facebook_url","logo_url","description"].forEach(n=>setFormValue(f,n,o[n]));setFormValue(f,"verified",o.verified)}$("#organizationAdminModal").classList.remove("hidden")}function closeOrganizationAdmin(){$("#organizationAdminModal").classList.add("hidden")}window.openOrganizationAdmin=openOrganizationAdmin;
async function saveOrganization(e){e.preventDefault();const f=new FormData(e.target),id=f.get("id"),p={name:f.get("name"),city:f.get("city")||null,voivodeship:f.get("voivodeship")||null,email:f.get("email")||null,phone:f.get("phone")||null,website_url:f.get("website_url")||null,facebook_url:f.get("facebook_url")||null,logo_url:f.get("logo_url")||null,description:f.get("description")||null,verified:f.has("verified")};const r=id?await db.from("organizations").update(p).eq("id",id):await db.from("organizations").insert(p);if(r.error)return msg($("#organizationAdminMessage"),r.error.message,true);msg($("#organizationAdminMessage"),"Organizacja zapisana.");await loadAdminOrganizations()}
async function runMatcher(e){e.preventDefault();if(!publicCats.length)await loadPublicCats();const f=new FormData(e.target),age=f.get("age"),children=f.get("children"),pets=f.get("pets"),activity=f.get("activity"),home=f.get("home_type"),experience=f.get("experience"),medical=f.has("medical_ready");const scored=publicCats.map(c=>{let score=50,r=[];if(age&&c.age_group===age){score+=18;r.push("pasujący wiek")}if(children==="yes"){c.good_with_children?(score+=18,r.push("dobry z dziećmi")):score-=12}if((pets==="cat"||pets==="both")&&c.good_with_cats){score+=15;r.push("akceptuje koty")}if((pets==="dog"||pets==="both")&&c.good_with_dogs){score+=15;r.push("akceptuje psy")}if(home==="flat"&&c.flat_suitable){score+=12;r.push("dobry do mieszkania")}if(activity!=="medium"&&c.temperament===activity){score+=15;r.push("pasujący temperament")}if(experience==="none"&&c.experience_required==="none"){score+=10;r.push("dobry na pierwszego kota")}if(!medical&&c.health_description&&c.health_description.length>120)score-=7;return {c,score:Math.max(0,Math.min(100,score)),r}}).sort((a,b)=>b.score-a.score).slice(0,6);$("#matcherResults").innerHTML=`<div class="section-head"><div><h2>Najlepsze dopasowania</h2><p>Wynik jest orientacyjny.</p></div></div><div class="cats-grid">${scored.map(x=>`<div class="match-wrap"><div class="match-score">${x.score}% dopasowania</div>${catCard(x.c)}<div class="match-reasons">${x.r.map(v=>`<span>✓ ${esc(v)}</span>`).join("")}</div></div>`).join("")}</div>`}

function galleryMarkup(c){
  const images=[c.main_image_url,...(Array.isArray(c.additional_image_urls)?c.additional_image_urls:[])].filter(Boolean);
  if(!images.length)return `<div class="detail-placeholder">🐈</div>`;
  const main=`<button class="detail-main-photo" type="button" onclick='openGallery(${JSON.stringify(images)},0)'><img src="${esc(images[0])}" alt="${esc(c.name)}"></button>`;
  const thumbs=images.length>1?`<div class="gallery-thumbs">${images.slice(0,5).map((url,i)=>`<button type="button" onclick='openGallery(${JSON.stringify(images)},${i})'><img src="${esc(url)}" alt="${esc(c.name)} — zdjęcie ${i+1}">${i===4&&images.length>5?`<span>+${images.length-5}</span>`:""}</button>`).join("")}</div>`:"";
  return main+thumbs;
}
function openGallery(images,index=0){galleryImages=images||[];galleryIndex=index;renderGallery();$("#galleryLightbox").classList.remove("hidden")}
function renderGallery(){if(!galleryImages.length)return;$("#galleryLightboxImage").src=galleryImages[galleryIndex];$("#galleryCounter").textContent=`${galleryIndex+1} / ${galleryImages.length}`}
function closeGallery(){$("#galleryLightbox").classList.add("hidden")}
function changeGallery(step){if(!galleryImages.length)return;galleryIndex=(galleryIndex+step+galleryImages.length)%galleryImages.length;renderGallery()}
window.openGallery=openGallery;
async function loadDetail(id){
  await loadFavoriteIds();
  const {data:c,error}=await db.from("cats").select("*").eq("id",id).eq("moderation_status","approved").single();
  if(error||!c){$("#detailView").innerHTML='<div class="empty">Nie znaleziono ogłoszenia.</div>';return}
  document.title=`${c.name} — kot do adopcji | KociDom`;
  const status=({available:"Szuka domu",reserved:"Rezerwacja",adopted:"Adoptowany"}[c.adoption_status]||"Szuka domu");
  $("#detailView").innerHTML=`<div class="detail"><div class="detail-photo">${galleryMarkup(c)}${c.urgent?'<span class="urgent">Pilna adopcja</span>':""}</div><div class="detail-body"><div class="detail-heading-row"><span class="badge">${esc(status)}</span>${favoriteButton(c)}</div><h2>${esc(c.name)}</h2><div class="chips"><span class="chip">${esc(sexLabel(c.sex))}</span><span class="chip">${esc(c.age_description||ageLabel(c.age_group))}</span><span class="chip">📍 ${esc(c.city)}, ${esc(c.voivodeship)}</span></div><p class="lead">${esc(c.short_description||"")}</p>${fundingBlock(c)}<button class="btn primary big adoption-cta" onclick="openAdoption('${c.id}','${esc(c.name)}')">❤️ Chcę adoptować ${esc(c.name)}</button><div class="compatibility-box"><strong>Pasuje do domu:</strong><div class="compatibility-chips">${c.good_with_children?'<span>👶 Dzieci</span>':""}${c.good_with_cats?'<span>🐈 Koty</span>':""}${c.good_with_dogs?'<span>🐕 Psy</span>':""}${c.flat_suitable?'<span>🏢 Mieszkanie</span>':""}</div></div><div class="detail-description">${esc(c.description).replace(/\n/g,"<br>")}</div><h3 class="section-label">Zdrowie i przygotowanie do adopcji</h3><div class="detail-info"><div class="info-box"><strong>${c.vaccinated?"✓":"—"} Szczepienia</strong><br>${c.vaccinated?"Wykonane":"Brak danych"}</div><div class="info-box"><strong>${c.neutered?"✓":"—"} Kastracja</strong><br>${c.neutered?"Wykonana":"Brak danych"}</div><div class="info-box"><strong>${c.chipped?"✓":"—"} Chip</strong><br>${c.chipped?"Zaczipowany":"Brak danych"}</div><div class="info-box"><strong>${c.dewormed?"✓":"—"} Odrobaczenie</strong><br>${c.dewormed?"Wykonane":"Brak danych"}</div></div>${c.health_description?`<div class="health-note"><strong>Dodatkowe informacje zdrowotne</strong><p>${esc(c.health_description)}</p></div>`:""}<div class="contact-box"><small>Kontakt w sprawie adopcji</small><strong>${esc(c.contact_name)}${c.organization_name?` — ${esc(c.organization_name)}`:""}</strong><a href="mailto:${esc(c.contact_email)}">${esc(c.contact_email)}</a>${c.contact_phone?`<a href="tel:${esc(c.contact_phone)}">${esc(c.contact_phone)}</a>`:""}</div></div></div>`;
}
async function submitCat(e){e.preventDefault();const f=new FormData(e.target),image=f.get("image"),button=e.target.querySelector('button[type="submit"]');button.disabled=true;button.textContent="Wysyłanie…";try{if(!image||!image.size)throw new Error("Dodaj zdjęcie kota.");if(image.size>5*1024*1024)throw new Error("Zdjęcie przekracza 5 MB.");const ext=(image.name.split(".").pop()||"jpg").toLowerCase(),path=`${currentUser.id}/${crypto.randomUUID()}.${ext}`;const up=await db.storage.from("cat-images").upload(path,image,{cacheControl:"3600",upsert:false});if(up.error)throw up.error;const url=db.storage.from("cat-images").getPublicUrl(path).data.publicUrl;const payload={user_id:currentUser.id,name:f.get("name"),sex:f.get("sex"),age_group:f.get("age_group"),age_description:f.get("age_description")||null,city:f.get("city"),voivodeship:f.get("voivodeship"),short_description:f.get("short_description"),description:f.get("description"),health_description:f.get("health_description")||null,vaccinated:f.has("vaccinated"),dewormed:f.has("dewormed"),neutered:f.has("neutered"),chipped:f.has("chipped"),urgent:f.has("urgent"),contact_name:f.get("contact_name"),contact_email:f.get("contact_email"),contact_phone:f.get("contact_phone")||null,organization_name:f.get("organization_name")||null,main_image_url:url,moderation_status:"pending",adoption_status:"available"};const ins=await db.from("cats").insert(payload);if(ins.error)throw ins.error;e.target.reset();$("#imagePreview").classList.add("hidden");msg($("#submitMessage"),"Ogłoszenie zostało wysłane do akceptacji.")}catch(err){msg($("#submitMessage"),err.message||"Nie udało się wysłać ogłoszenia.",true)}button.disabled=false;button.textContent="Wyślij do akceptacji"}
async function loadMyCats(){const {data,error}=await db.from("cats").select("*").eq("user_id",currentUser.id).order("created_at",{ascending:false});$("#myCats").innerHTML=error?'<div class="empty">Nie udało się pobrać zgłoszeń.</div>':(data||[]).length?(data||[]).map(c=>dashItem(c,false)).join(""):'<div class="empty">Nie masz jeszcze żadnych zgłoszeń.</div>'}
function dashItem(c,admin){const cls=c.moderation_status==="pending"?"pending":c.moderation_status==="rejected"?"rejected":"";const fundingActive=Boolean(c.donation_url||Number(c.funding_goal||0)>0);const adoptionText=({available:"Szuka domu",reserved:"Rezerwacja",adopted:"Adoptowany"}[c.adoption_status]||c.adoption_status||"");return `<article class="dash-item">${c.main_image_url?`<img src="${esc(c.main_image_url)}" alt="">`:"🐈"}<div><h3>${esc(c.name)} <span class="badge ${cls}">${esc(statusLabel(c.moderation_status))}</span>${fundingActive?'<span class="badge funding-badge">❤️ Pomoc aktywna</span>':""}</h3><div class="dash-meta">${esc(c.city)} • ${esc(c.contact_email)} • ${new Date(c.created_at).toLocaleDateString("pl-PL")} • ${esc(adoptionText)}</div>${c.rejection_reason?`<div class="reason"><strong>Powód odrzucenia:</strong> ${esc(c.rejection_reason)}</div>`:""}</div>${admin?`<div class="dash-actions"><button class="btn secondary" onclick="openAdminEdit('${c.id}')">Edytuj</button>${c.moderation_status!=="approved"?`<button class="btn primary" onclick="moderate('${c.id}','approved')">Akceptuj</button>`:""}${c.moderation_status!=="rejected"?`<button class="btn danger" onclick="moderate('${c.id}','rejected')">Odrzuć</button>`:""}</div>`:""}</article>`}
async function loadAdminCats(){if(adminFilter==="applications")return loadApplications();if(adminFilter==="organizations")return loadAdminOrganizations();const {data,error}=await db.from("cats").select("*").eq("moderation_status",adminFilter).order("created_at",{ascending:false});$("#adminCats").innerHTML=error?'<div class="empty">Nie udało się pobrać zgłoszeń.</div>':(data||[]).length?(data||[]).map(c=>dashItem(c,true)).join(""):'<div class="empty">Brak ogłoszeń w tej kategorii.</div>'}

function setFormValue(form,name,value){const el=form.elements[name];if(!el)return;if(el.type==="checkbox")el.checked=Boolean(value);else el.value=value??""}
function toggleFundingFields(){const enabled=$("#fundingEnabled").checked;$("#fundingFields").classList.toggle("funding-disabled",!enabled);$("#fundingFields").querySelectorAll("input").forEach(i=>i.disabled=!enabled)}
async function openAdminEdit(id){
  if(!isAdmin)return;
  const {data:c,error}=await db.from("cats").select("*").eq("id",id).single();
  if(error||!c){alert(error?.message||"Nie znaleziono kota.");return}
  const form=$("#adminEditForm");
  ["id","name","sex","age_group","age_description","city","voivodeship","short_description","description","health_description","main_image_url","contact_name","contact_email","contact_phone","organization_name","moderation_status","adoption_status","rejection_reason","funding_title","funding_goal","funding_raised","donation_url","organization_id","temperament","experience_required"].forEach(n=>setFormValue(form,n,c[n]));
  ["vaccinated","dewormed","neutered","chipped","urgent","good_with_children","good_with_cats","good_with_dogs","flat_suitable"].forEach(n=>setFormValue(form,n,c[n]));setFormValue(form,"additional_image_urls",(Array.isArray(c.additional_image_urls)?c.additional_image_urls:[]).join("\n"));
  $("#fundingEnabled").checked=Boolean(c.donation_url||c.funding_title||Number(c.funding_goal||0)>0);
  toggleFundingFields();$("#adminEditMessage").classList.add("hidden");$("#adminEditModal").classList.remove("hidden")
}
function closeAdminEdit(){$("#adminEditModal").classList.add("hidden")}
async function saveAdminEdit(e){
  e.preventDefault();if(!isAdmin)return;
  const f=new FormData(e.target),button=$("#saveAdminEdit"),enabled=f.has("funding_enabled");
  const goal=enabled&&f.get("funding_goal")!==""?Number(f.get("funding_goal")):null;
  const raised=enabled&&f.get("funding_raised")!==""?Number(f.get("funding_raised")):0;
  if(goal!==null&&goal<0)return msg($("#adminEditMessage"),"Kwota docelowa nie może być ujemna.",true);
  if(raised<0)return msg($("#adminEditMessage"),"Zebrana kwota nie może być ujemna.",true);
  if(goal!==null&&raised>goal&&!confirm("Zebrana kwota jest wyższa od celu. Zapisać mimo to?"))return;
  button.disabled=true;button.textContent="Zapisywanie…";
  const moderation=f.get("moderation_status");
  const payload={
    name:f.get("name").trim(),sex:f.get("sex"),age_group:f.get("age_group"),
    age_description:f.get("age_description").trim()||null,city:f.get("city").trim(),
    voivodeship:f.get("voivodeship"),short_description:f.get("short_description").trim(),
    description:f.get("description").trim(),health_description:f.get("health_description").trim()||null,
    main_image_url:f.get("main_image_url").trim()||null,additional_image_urls:f.get("additional_image_urls").split("\n").map(v=>v.trim()).filter(Boolean).slice(0,12),vaccinated:f.has("vaccinated"),
    dewormed:f.has("dewormed"),neutered:f.has("neutered"),chipped:f.has("chipped"),urgent:f.has("urgent"),
    contact_name:f.get("contact_name").trim(),contact_email:f.get("contact_email").trim(),
    contact_phone:f.get("contact_phone").trim()||null,organization_name:f.get("organization_name").trim()||null,organization_id:f.get("organization_id")||null,temperament:f.get("temperament")||null,experience_required:f.get("experience_required")||"none",good_with_children:f.has("good_with_children"),good_with_cats:f.has("good_with_cats"),good_with_dogs:f.has("good_with_dogs"),flat_suitable:f.has("flat_suitable"),
    moderation_status:moderation,adoption_status:f.get("adoption_status"),
    rejection_reason:moderation==="rejected"?(f.get("rejection_reason").trim()||"Ogłoszenie odrzucone przez administratora."):null,
    approved_at:moderation==="approved"?new Date().toISOString():null,
    funding_title:enabled?(f.get("funding_title").trim()||"Pomóż w opiece nad tym kotem"):null,
    funding_goal:enabled?goal:null,funding_raised:enabled?raised:0,
    donation_url:enabled?(f.get("donation_url").trim()||null):null
  };
  const {error}=await db.from("cats").update(payload).eq("id",f.get("id"));
  button.disabled=false;button.textContent="Zapisz zmiany";
  if(error)return msg($("#adminEditMessage"),error.message||"Nie udało się zapisać zmian.",true);
  msg($("#adminEditMessage"),"Zmiany zostały zapisane.");await loadAdminCats();setTimeout(closeAdminEdit,650)
}
window.openAdminEdit=openAdminEdit;

async function moderate(id,status){let reason=null;if(status==="rejected"){reason=prompt("Podaj powód odrzucenia:");if(reason===null)return}const {error}=await db.from("cats").update({moderation_status:status,rejection_reason:status==="rejected"?reason:null,approved_at:status==="approved"?new Date().toISOString():null}).eq("id",id);if(error)alert(error.message);else loadAdminCats()}window.moderate=moderate;
$("#closeAdoption").onclick=closeAdoption;$("#adoptionModal").onclick=e=>{if(e.target.id==="adoptionModal")closeAdoption()};$("#adoptionForm").addEventListener("submit",submitAdoption);$("#closeOrganizationAdmin").onclick=closeOrganizationAdmin;$("#organizationAdminModal").onclick=e=>{if(e.target.id==="organizationAdminModal")closeOrganizationAdmin()};$("#organizationAdminForm").addEventListener("submit",saveOrganization);$("#matcherForm").addEventListener("submit",runMatcher);$("#closeGallery").onclick=closeGallery;$("#galleryPrev").onclick=()=>changeGallery(-1);$("#galleryNext").onclick=()=>changeGallery(1);$("#galleryLightbox").onclick=e=>{if(e.target.id==="galleryLightbox")closeGallery()};document.addEventListener("keydown",e=>{if($("#galleryLightbox").classList.contains("hidden"))return;if(e.key==="Escape")closeGallery();if(e.key==="ArrowLeft")changeGallery(-1);if(e.key==="ArrowRight")changeGallery(1)});$("#closeAdminEdit").onclick=closeAdminEdit;$("#cancelAdminEdit").onclick=closeAdminEdit;$("#adminEditModal").onclick=e=>{if(e.target.id==="adminEditModal")closeAdminEdit()};$("#adminEditForm").addEventListener("submit",saveAdminEdit);$("#fundingEnabled").addEventListener("change",toggleFundingFields);$("#loginBtn").onclick=()=>openAuth("login");$("#registerBtn").onclick=()=>openAuth("register");$("#logoutBtn").onclick=async()=>{await db.auth.signOut();location.hash="#/"};$("#closeAuth").onclick=()=>$("#authModal").classList.add("hidden");$("#authModal").onclick=e=>{if(e.target.id==="authModal")$("#authModal").classList.add("hidden")};$("#authForm").addEventListener("submit",handleAuth);$("#catForm").addEventListener("submit",submitCat);$("#filterBtn").onclick=filterCats;$("#clearFilterBtn").onclick=clearFilters;$("#searchInput").addEventListener("input",filterCats);$("#sortFilter").addEventListener("change",filterCats);["sexFilter","ageFilter","voivodeshipFilter","adoptionFilter","neuteredFilter","vaccinatedFilter","chippedFilter","urgentFilter","fundingFilter"].forEach(id=>$("#"+id).addEventListener("change",filterCats));$("#imageInput").addEventListener("change",e=>{const f=e.target.files?.[0];if(!f)return;const url=URL.createObjectURL(f);$("#imagePreview").innerHTML=`<img src="${url}" alt="Podgląd">`;$("#imagePreview").classList.remove("hidden")});$$(".tab").forEach(t=>t.onclick=()=>{$$(".tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");adminFilter=t.dataset.adminFilter;loadAdminCats()});window.addEventListener("hashchange",()=>{document.title="KociDom — koty do adopcji";route()});fillVoivodeships();initAuth().then(route);
