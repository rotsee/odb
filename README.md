# Öppenhetsdatabasen

Det här är en Nuxt3-driven publik sajt för SJF:s öppenhetsdatabas, en databas över lagändringar i Offentlighets- och sekretesslagen (OSL), kategoriserade efter om de var för sig ökat eller minskat öppenheten i samhället. Varje substantiell ändring i lagen är en datapunkt, vilket betyder att _en SFS kan kodas som flera lagändringar_, och samma SFS kan innehålla både ändringar som ökar och ändringar som minskar öppenheten.

Data för sajten skapas från ett Google Sheets-dokument som hålls uppdaterat av SJF:s yttrandefrihetsgrupp (sedan nedan).

Sajten är byggd med NuxtJS, Vuetify och Chart.js. Nuxt 3 bygger på Vue 3, vilket i sin tur betyder att vi kräver stöd för [ES2015](https://caniuse.com/es6). Vi gör inga försöka att polyfilla för antika webbläsare.
Sajtens backend ligger som .ts-filer under `./server/api`. Frontend-startpunkten är `app.vue`, med de båda vyerna (första-sida och innehållssida) under `./pages` och Vue-komponenter under `components`.

Innehållssidor servas med [Nuxts content-modul](https://content.nuxtjs.org/). Varje markdownfil som läggs under `./content`-mappen blir automatiskt en sida. Just nu finns bara en innehållssida: `/metod`.

”Senast uppdaterad”-datumet i sidfoten är tills vidare hårdkodat i `app.vue`.


## Buggar och utvecklingsförslag

Öppen Trellotavla finns här:
https://trello.com/b/FuCfdopz/%C3%B6ppenhetsdatabasen-sajt

## Utveckling

För att komma igång:

```sh
npm install
npm run dev
```

Se `test/embed.html` för exempel på inbäddningskod (notera att iframe-resize-scriptets version måste matcha det som används i appen!)

Det finns inga tester, men det kan vara värt att köra `npm run lint` innan du checkar in ändringar.

## Publicering

Sajten är bara testad med Node 19, men bör i teorin fungera med alla NodeJS-versioner från och med 16.10.
`package.json` innehåller testade Node- och npm-versioner under `{ engines }`. Alla produktionsberoenden är pinnade till exakta versioner.

```sh
npm run build
npm run serve
```

## Uppdatering

Datafilerna är för tillfället incheckade i repot, men på sikt kan man tänka sig att bygga dem tillsammas med sajten, med pythonscriptet `./dev/create-site-data.py`

Processen ser ut så här:

1. Hämta data från Google Sheets
2. Hämta ytterligare data för varje SFS (t.ex. förarbeten och datum) från rkrattsbaser.gov.se och lägg till i datan. Notera att den ny version av den sajten kommer att lanseras så småningom. En tidig version finns på beta.rkrattsbaser.gov.se, och ser så här långt (maj 2023) snarlik ut.
3. Parsa förarbetena (ett ostrukturerat textfält) till en lista, och filtrera ut propparna
4. Slå upp propparna i Riksdagens API (om du läser den här texten har du nog redan koll på Regeringskansliets bländande brist på strukturerad data...), hämta nerladdningslänkarna, och lägg till dem i datan
5. Hämta själva SFS-dokumentet från antingen rkrattsdb.gov.se eller svenskforfattningssamling.se (beroende på hur gamla de är). OBS: Om det finns ett permanent filsystem i produktionsmiljön kan det vara värt att lagra filerna där, eftersom det kan ta lång tid att ladda ner dem alla annars.
6. Öppna PDF:erna och extrahera texten. Just nu lägger vi till antal ord(-ish) och sidor till datan, men vi skulle också kunna spara innehållet för att göra dem sökbara (i ett ambitiöst utförande med en dokumentdatabas, typ Elastic Search, alternativt så tokeniserar och stemmar man bara med t.ex. NLTK, och sparar en bag-of-words, eller ett bloomfilter eller likande i datan); eller för att söka efter specifika begrepp eller liknande.
7. Spara en json-fil till sajten, och en csv-fil för nerladdning.

Just nu läser vi alltså in all data i en stor jsonblobb. Det är ännu så länge inga problem, eftersom det bara rör sig om några hundra rader. Skulle databasen uppdateras bakåt i tiden, kan API:et möjligen behöva serva datan i mindre bitar så småningom.

Du behöver en nyckel till Google-sheetsdokumentet i en miljövariabel `GOOGLE_SHEETS_KEY`, eller .env-fil, se .env.sample, för att köra scripet mot Google Sheets-dokumentet (med `--sheet`). Det går också att köra på en lokal csv-fil (med `--input`).

```sh
pip install -r requirements.txt
./create-site-data.py --help
```

(Beroende på miljö vill sannolikt hellre installera Pythonberoendena med virtualenv eller liknanden)

Kör tester:
```sh
python3 -m pytest tests.py
```

Du kan generera sajtdata direkt från 
./create-site-data.py --sheet 1HLS9N3GclVLP0LPZAvJd7pzYaZCYnZ3OjUWV7kMhV2Q