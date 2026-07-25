# KociDom v2

Wersja zawiera:

1. logowanie i rejestrację,
2. formularz dodawania kota ze zdjęciem,
3. panel administratora,
4. osobną stronę każdego kota,
5. wyszukiwarkę, filtry i sortowanie.

## Aktualizacja

1. Najpierw uruchom `supabase-setup-v2.sql` w:
   Supabase → SQL Editor → New query → wklej całość → Run.

2. Otwórz `config.js` i wklej te same dane, które masz obecnie:
   - Project URL
   - Publishable key

3. Wgraj wszystkie pliki do repozytorium GitHub, zastępując poprzednie:
   - index.html
   - styles.css
   - app.js
   - config.js
   - README.md

4. Cloudflare wdroży zmiany automatycznie.

## Test

- utwórz zwykłe konto,
- zaloguj się,
- dodaj kota,
- konto administratora otworzy Panel admina,
- zaakceptuj ogłoszenie,
- ogłoszenie pojawi się na stronie głównej.
