# KociDom — instrukcja uruchomienia

To jest gotowa wersja portalu działająca jako statyczna strona na Cloudflare Pages i korzystająca z Supabase.

## 1. Uzupełnij połączenie z Supabase

Otwórz plik `config.js` i podmień:

- `WKLEJ_TUTAJ_PROJECT_URL`
- `WKLEJ_TUTAJ_ANON_PUBLIC_KEY`

Dane znajdziesz w Supabase w ustawieniach projektu, w sekcji API / Data API.

Wklejaj wyłącznie klucz `anon` / `publishable`.

**Nie wklejaj klucza `service_role`.**

## 2. Wgraj stronę na Cloudflare Pages

Spakowany ZIP możesz wgrać przez:

Workers & Pages → Twój projekt → Create deployment / Upload assets

Najbezpieczniej:
1. rozpakować ZIP,
2. uzupełnić `config.js`,
3. ponownie spakować zawartość folderu,
4. wgrać ZIP do Cloudflare.

W katalogu głównym ZIP muszą znajdować się:
- `index.html`
- `styles.css`
- `app.js`
- `config.js`

## 3. Logowanie

Użytkownicy mogą:
- rejestrować konta,
- logować się,
- dodawać ogłoszenia,
- oglądać własne zgłoszenia.

Administrator może:
- oglądać oczekujące ogłoszenia,
- zatwierdzać,
- odrzucać z podaniem powodu.

## 4. Konfiguracja e-mail w Supabase

W Supabase przejdź do:

Authentication → URL Configuration

Ustaw `Site URL` na:
`https://koci-dom.pages.dev`

W `Redirect URLs` dodaj:
`https://koci-dom.pages.dev/**`

## 5. Ważne

Strona korzysta z tabeli `public.cats`, tabeli `public.admins`, funkcji `public.is_admin()` i bucketa `cat-images`, utworzonych w poprzednich krokach.
