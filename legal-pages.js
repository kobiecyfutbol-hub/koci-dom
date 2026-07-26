(() => {
  "use strict";

  const pages = {
    "o-nas": {
      title: "O nas | KociDom",
      eyebrow: "Poznaj KociDom",
      heading: "Pomagamy kotom znaleźć bezpieczny dom",
      html: `
        <p class="legal-lead"><strong>KociDom.pl</strong> to ogólnopolski, bezpłatny portal adopcyjny łączący osoby szukające kota z osobami, domami tymczasowymi, fundacjami i schroniskami publikującymi ogłoszenia.</p>
        <h2>Nasza misja</h2>
        <p>Chcemy ułatwiać odpowiedzialne adopcje i zwiększać szanse kotów na znalezienie troskliwych opiekunów. Portal powstał z przekonania, że przejrzyste ogłoszenie, dobry kontakt i właściwa weryfikacja mogą realnie pomóc zwierzęciu.</p>
        <div class="legal-feature-grid">
          <article><span>✓</span><h3>Moderowane ogłoszenia</h3><p>Każde ogłoszenie jest sprawdzane przez administratora przed publikacją.</p></article>
          <article><span>♥</span><h3>Odpowiedzialna adopcja</h3><p>Promujemy świadome decyzje i dobro zwierzęcia na każdym etapie adopcji.</p></article>
          <article><span>PL</span><h3>Cała Polska</h3><p>Portal umożliwia wyszukiwanie kotów według lokalizacji i województwa.</p></article>
        </div>
        <h2>Dla kogo jest KociDom?</h2>
        <p>Z portalu mogą korzystać wszyscy zarejestrowani użytkownicy: osoby prywatne, domy tymczasowe, wolontariusze, fundacje oraz schroniska. Dodawanie i przeglądanie ogłoszeń jest bezpłatne.</p>
        <h2>Ważne</h2>
        <p>KociDom nie jest stroną umowy adopcyjnej i nie prowadzi sprzedaży zwierząt. Portal pomaga w prezentacji ogłoszeń i obsłudze zgłoszeń adopcyjnych. Ostateczne warunki adopcji ustala osoba lub organizacja odpowiedzialna za danego kota.</p>
      `
    },
    "kontakt": {
      title: "Kontakt | KociDom",
      eyebrow: "Jesteśmy do dyspozycji",
      heading: "Kontakt z KociDom",
      html: `
        <p class="legal-lead">Masz pytanie, zauważyłeś błąd albo chcesz zgłosić nieprawidłowe ogłoszenie? Napisz do administratora serwisu.</p>
        <div class="contact-box">
          <div>
            <span class="contact-label">Administrator serwisu</span>
            <strong>Mariusz Cichowski</strong>
          </div>
          <div>
            <span class="contact-label">Adres korespondencyjny</span>
            <strong>Cicha 9/5<br>10-281 Olsztyn</strong>
          </div>
          <div>
            <span class="contact-label">E-mail</span>
            <a href="mailto:cichy1904@wp.pl">cichy1904@wp.pl</a>
          </div>
        </div>
        <h2>W jakich sprawach możesz się skontaktować?</h2>
        <ul>
          <li>zgłoszenie błędu technicznego,</li>
          <li>zgłoszenie nieaktualnego lub nieprawidłowego ogłoszenia,</li>
          <li>prośba o usunięcie konta lub danych,</li>
          <li>pytania dotyczące moderacji i działania portalu,</li>
          <li>współpraca z fundacjami, schroniskami i domami tymczasowymi.</li>
        </ul>
      `
    },
    "regulamin": {
      title: "Regulamin | KociDom",
      eyebrow: "Zasady korzystania",
      heading: "Regulamin serwisu KociDom.pl",
      html: `
        <p class="legal-update">Ostatnia aktualizacja: 26 lipca 2026 r.</p>
        <h2>§ 1. Postanowienia ogólne</h2>
        <ol>
          <li>Regulamin określa zasady korzystania z serwisu internetowego KociDom.pl, zwanego dalej „Serwisem”.</li>
          <li>Administratorem Serwisu jest Mariusz Cichowski, adres: Cicha 9/5, 10-281 Olsztyn, e-mail: <a href="mailto:cichy1904@wp.pl">cichy1904@wp.pl</a>, zwany dalej „Administratorem”.</li>
          <li>Serwis jest ogólnopolskim portalem ogłoszeń kotów przeznaczonych do adopcji.</li>
          <li>Korzystanie z Serwisu jest bezpłatne.</li>
          <li>Użytkownik przed rozpoczęciem korzystania z funkcji wymagających rejestracji powinien zapoznać się z Regulaminem.</li>
        </ol>

        <h2>§ 2. Usługi świadczone drogą elektroniczną</h2>
        <ol>
          <li>Serwis umożliwia w szczególności: przeglądanie ogłoszeń, utworzenie konta, dodawanie ogłoszeń, zapisywanie ulubionych ogłoszeń oraz przesyłanie formularzy adopcyjnych.</li>
          <li>Do korzystania z Serwisu potrzebne jest urządzenie z dostępem do Internetu, aktualna przeglądarka internetowa oraz aktywny adres e-mail w przypadku rejestracji.</li>
          <li>Umowa o świadczenie usług drogą elektroniczną zostaje zawarta z chwilą rozpoczęcia korzystania z danej funkcji Serwisu.</li>
          <li>Użytkownik może zakończyć korzystanie z usługi w każdym czasie, w szczególności przez wylogowanie albo złożenie prośby o usunięcie konta.</li>
        </ol>

        <h2>§ 3. Konto użytkownika</h2>
        <ol>
          <li>Konto może utworzyć osoba podająca prawidłowy adres e-mail i hasło.</li>
          <li>Użytkownik odpowiada za bezpieczeństwo swojego hasła i działania wykonane z użyciem jego konta.</li>
          <li>Zabronione jest podszywanie się pod inne osoby lub organizacje oraz podawanie nieprawdziwych danych kontaktowych.</li>
          <li>Administrator może zawiesić albo usunąć konto naruszające Regulamin lub przepisy prawa, po uwzględnieniu charakteru i skali naruszenia.</li>
        </ol>

        <h2>§ 4. Dodawanie i moderacja ogłoszeń</h2>
        <ol>
          <li>Ogłoszenia mogą dodawać wszyscy zalogowani użytkownicy.</li>
          <li>Każde ogłoszenie przed publikacją podlega sprawdzeniu przez Administratora.</li>
          <li>Administrator może zaakceptować, odrzucić, ukryć lub usunąć ogłoszenie, jeżeli jest niekompletne, nieaktualne, narusza Regulamin, prawo, prawa osób trzecich albo dobro zwierzęcia.</li>
          <li>Ogłoszenie powinno zawierać prawdziwe i możliwie aktualne informacje o kocie, jego stanie zdrowia, lokalizacji oraz osobie lub organizacji odpowiedzialnej za adopcję.</li>
          <li>Zabrania się publikowania ofert sprzedaży zwierząt, treści bezprawnych, obraźliwych, dyskryminujących, reklam niezwiązanych z adopcją, danych pozyskanych bez zgody oraz zdjęć naruszających prawa autorskie.</li>
          <li>Dodając zdjęcie lub treść, użytkownik oświadcza, że ma prawo do ich wykorzystania i udziela Administratorowi niewyłącznej, bezpłatnej licencji na ich wyświetlanie w Serwisie w celu publikacji ogłoszenia.</li>
          <li>Użytkownik powinien niezwłocznie zaktualizować lub usunąć ogłoszenie, gdy kot zostanie adoptowany albo ogłoszenie przestanie być aktualne.</li>
        </ol>

        <h2>§ 5. Zgłoszenia adopcyjne</h2>
        <ol>
          <li>Formularz adopcyjny trafia do Administratora KociDom.</li>
          <li>Wysłanie formularza nie gwarantuje adopcji i nie stanowi zawarcia umowy adopcyjnej.</li>
          <li>Administrator może wykorzystać dane z formularza do obsługi zgłoszenia i przekazania go osobie lub organizacji odpowiedzialnej za kota, gdy jest to niezbędne do dalszego procesu adopcji.</li>
          <li>Ostateczną decyzję o adopcji oraz jej warunki podejmuje osoba lub organizacja odpowiedzialna za kota.</li>
        </ol>

        <h2>§ 6. Odpowiedzialność</h2>
        <ol>
          <li>Administrator moderuje ogłoszenia, lecz nie może zagwarantować prawdziwości wszystkich informacji przekazanych przez użytkowników.</li>
          <li>Administrator nie jest stroną umowy adopcyjnej i nie odpowiada za przebieg adopcji, stan zdrowia zwierzęcia ani działania użytkowników poza Serwisem.</li>
          <li>Administrator może czasowo ograniczyć dostęp do Serwisu z przyczyn technicznych, bezpieczeństwa lub prac konserwacyjnych.</li>
          <li>Postanowienia Regulaminu nie wyłączają odpowiedzialności, której nie można wyłączyć na podstawie bezwzględnie obowiązujących przepisów prawa.</li>
        </ol>

        <h2>§ 7. Zgłaszanie naruszeń i reklamacje</h2>
        <ol>
          <li>Naruszenie, nieprawidłowe ogłoszenie lub problem techniczny można zgłosić na adres <a href="mailto:cichy1904@wp.pl">cichy1904@wp.pl</a>.</li>
          <li>Zgłoszenie powinno możliwie dokładnie wskazywać ogłoszenie lub funkcję, której dotyczy, oraz opisywać problem.</li>
          <li>Reklamacje dotyczące działania usług elektronicznych można składać drogą e-mailową. Administrator rozpatruje je bez zbędnej zwłoki, nie później niż w ciągu 14 dni, chyba że konieczne jest uzyskanie dodatkowych informacji.</li>
        </ol>

        <h2>§ 8. Postanowienia końcowe</h2>
        <ol>
          <li>Administrator może zmienić Regulamin z ważnych przyczyn, w szczególności z powodu zmiany prawa, funkcji Serwisu albo zasad bezpieczeństwa.</li>
          <li>O istotnych zmianach zarejestrowani użytkownicy mogą zostać poinformowani w Serwisie lub drogą elektroniczną.</li>
          <li>W sprawach nieuregulowanych stosuje się przepisy prawa polskiego.</li>
        </ol>
      `
    },
    "polityka-prywatnosci": {
      title: "Polityka prywatności | KociDom",
      eyebrow: "Ochrona danych",
      heading: "Polityka prywatności KociDom.pl",
      html: `
        <p class="legal-update">Ostatnia aktualizacja: 26 lipca 2026 r.</p>
        <h2>1. Administrator danych</h2>
        <p>Administratorem danych osobowych jest Mariusz Cichowski, Cicha 9/5, 10-281 Olsztyn, e-mail: <a href="mailto:cichy1904@wp.pl">cichy1904@wp.pl</a>.</p>

        <h2>2. Jakie dane mogą być przetwarzane?</h2>
        <ul>
          <li>adres e-mail i identyfikator konta,</li>
          <li>imię, numer telefonu, miasto oraz inne dane podane w ogłoszeniu lub formularzu adopcyjnym,</li>
          <li>treści, zdjęcia i informacje publikowane w ogłoszeniach,</li>
          <li>dane techniczne, takie jak adres IP, informacje o przeglądarce, logi bezpieczeństwa i dane sesyjne.</li>
        </ul>

        <h2>3. Cele i podstawy przetwarzania</h2>
        <div class="legal-table-wrap">
          <table class="legal-table">
            <thead><tr><th>Cel</th><th>Podstawa</th><th>Okres</th></tr></thead>
            <tbody>
              <tr><td>Rejestracja i obsługa konta</td><td>wykonanie umowy o świadczenie usług</td><td>do usunięcia konta, a następnie przez okres niezbędny do obrony roszczeń</td></tr>
              <tr><td>Publikacja i moderacja ogłoszeń</td><td>wykonanie usługi oraz uzasadniony interes polegający na zapewnieniu bezpieczeństwa</td><td>do usunięcia ogłoszenia, utraty aktualności lub upływu okresu obrony roszczeń</td></tr>
              <tr><td>Obsługa formularza adopcyjnego</td><td>działania na żądanie osoby zgłaszającej oraz uzasadniony interes w obsłudze zgłoszenia</td><td>przez czas obsługi procesu, a następnie nie dłużej niż jest to potrzebne do wyjaśnienia sprawy lub obrony roszczeń</td></tr>
              <tr><td>Kontakt i reklamacje</td><td>uzasadniony interes oraz obowiązki prawne</td><td>do zakończenia korespondencji i upływu terminów dochodzenia roszczeń</td></tr>
              <tr><td>Bezpieczeństwo i zapobieganie nadużyciom</td><td>uzasadniony interes Administratora</td><td>przez okres niezbędny do analizy zdarzenia i zabezpieczenia roszczeń</td></tr>
            </tbody>
          </table>
        </div>

        <h2>4. Odbiorcy danych</h2>
        <p>Dane mogą być powierzane podmiotom zapewniającym infrastrukturę techniczną, hosting, bazę danych, uwierzytelnianie i bezpieczeństwo Serwisu, w szczególności dostawcom usług Cloudflare oraz Supabase. Dane z formularza adopcyjnego mogą zostać przekazane osobie lub organizacji odpowiedzialnej za danego kota, gdy jest to potrzebne do przeprowadzenia procesu adopcyjnego.</p>

        <h2>5. Przekazywanie danych poza Europejski Obszar Gospodarczy</h2>
        <p>Niektórzy dostawcy infrastruktury mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. W takim przypadku podstawą przekazania są mechanizmy przewidziane w przepisach o ochronie danych, w szczególności decyzje stwierdzające odpowiedni stopień ochrony lub standardowe klauzule umowne.</p>

        <h2>6. Prawa użytkownika</h2>
        <p>Osobie, której dane dotyczą, może przysługiwać prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu oraz cofnięcia zgody, gdy przetwarzanie opiera się na zgodzie. Można również wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.</p>

        <h2>7. Dobrowolność podania danych</h2>
        <p>Podanie danych jest dobrowolne, ale część z nich jest konieczna do założenia konta, publikacji ogłoszenia, skorzystania z formularza adopcyjnego lub uzyskania odpowiedzi.</p>

        <h2>8. Bezpieczeństwo</h2>
        <p>Administrator stosuje odpowiednie środki organizacyjne i techniczne, aby chronić dane przed nieuprawnionym dostępem, utratą, zmianą lub ujawnieniem.</p>

        <h2>9. Kontakt w sprawach danych</h2>
        <p>Wnioski dotyczące danych osobowych należy przesyłać na adres <a href="mailto:cichy1904@wp.pl">cichy1904@wp.pl</a>.</p>
      `
    },
    "polityka-cookies": {
      title: "Polityka cookies | KociDom",
      eyebrow: "Pliki cookies",
      heading: "Polityka cookies KociDom.pl",
      html: `
        <p class="legal-update">Ostatnia aktualizacja: 26 lipca 2026 r.</p>
        <h2>1. Czym są pliki cookies?</h2>
        <p>Cookies to niewielkie informacje zapisywane w urządzeniu użytkownika podczas korzystania ze strony internetowej. Mogą umożliwiać prawidłowe działanie logowania, zapamiętywanie ustawień oraz ochronę Serwisu.</p>

        <h2>2. Jakich cookies używa KociDom?</h2>
        <h3>Cookies niezbędne</h3>
        <p>Są potrzebne do działania podstawowych funkcji Serwisu, w szczególności logowania, uwierzytelniania, utrzymania sesji, bezpieczeństwa oraz komunikacji z bazą danych. Nie można ich wyłączyć z poziomu Serwisu bez utraty części funkcjonalności.</p>

        <h3>Cookies funkcjonalne</h3>
        <p>Mogą służyć do zapamiętania wybranych ustawień użytkownika i poprawy wygody korzystania z portalu.</p>

        <h3>Cookies analityczne i marketingowe</h3>
        <p>Na dzień ostatniej aktualizacji portal nie deklaruje używania narzędzi reklamowych ani analitycznych wymagających odrębnej zgody. Jeżeli takie narzędzia zostaną wdrożone, polityka zostanie zaktualizowana, a użytkownik otrzyma możliwość dokonania wyboru przed uruchomieniem opcjonalnych cookies.</p>

        <h2>3. Dostawcy technologii</h2>
        <p>W związku z obsługą hostingu, bezpieczeństwa i logowania dane techniczne mogą być przetwarzane przez dostawców infrastruktury, w szczególności Cloudflare oraz Supabase.</p>

        <h2>4. Zarządzanie cookies</h2>
        <p>Użytkownik może usuwać lub blokować cookies w ustawieniach swojej przeglądarki. Zablokowanie cookies niezbędnych może spowodować, że logowanie albo inne funkcje portalu przestaną działać prawidłowo.</p>

        <h2>5. Zmiany polityki</h2>
        <p>Polityka może być aktualizowana wraz ze zmianami technicznymi lub prawnymi. Aktualna wersja jest zawsze dostępna na tej stronie.</p>
      `
    }
  };

  const legalRoutes = Object.keys(pages);

  function createViews() {
    const main = document.querySelector("main#app");
    if (!main) return;

    legalRoutes.forEach(route => {
      if (document.getElementById(`legal-${route}`)) return;
      const data = pages[route];
      const section = document.createElement("section");
      section.id = `legal-${route}`;
      section.className = "wrap page legal-page hidden";
      section.innerHTML = `
        <div class="legal-shell">
          <a class="legal-back" href="#/">← Wróć do strony głównej</a>
          <span class="eyebrow">${data.eyebrow}</span>
          <h1>${data.heading}</h1>
          <div class="legal-content">${data.html}</div>
        </div>
      `;
      main.appendChild(section);
    });
  }

  function addFooterLinks() {
    const footerGrid = document.querySelector("footer .footer-grid");
    if (!footerGrid || document.querySelector('footer a[href="#/o-nas"]')) return;

    const group = document.createElement("div");
    group.className = "footer-legal-links";
    group.innerHTML = `
      <a href="#/o-nas">O nas</a>
      <a href="#/kontakt">Kontakt</a>
      <a href="#/regulamin">Regulamin</a>
      <a href="#/polityka-prywatnosci">Polityka prywatności</a>
      <a href="#/polityka-cookies">Cookies</a>
    `;
    footerGrid.appendChild(group);
  }

  function handleLegalRoute() {
    const route = (location.hash || "").replace(/^#\//, "").split("?")[0];
    if (!legalRoutes.includes(route)) {
      document.querySelectorAll(".legal-page").forEach(el => el.classList.add("hidden"));
      return;
    }

    const main = document.querySelector("main#app");
    if (!main) return;

    Array.from(main.children).forEach(el => el.classList.add("hidden"));
    const target = document.getElementById(`legal-${route}`);
    if (target) target.classList.remove("hidden");

    document.title = pages[route].title;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function init() {
    createViews();
    addFooterLinks();
    handleLegalRoute();
    window.addEventListener("hashchange", () => setTimeout(handleLegalRoute, 0));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
