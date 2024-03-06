# Öppenhetsdatabasen

Det här är en Nuxt3-driven publik sajt för SJF:s öppenhetsdatabas, en databas över lagändringar i Offentlighets- och sekretesslagen (OSL), kategoriserade efter om de var för sig ökat eller minskat öppenheten i samhället. Varje substantiell ändring i lagen är en datapunkt, vilket betyder att _en SFS kan kodas som flera lagändringar_, och samma SFS kan innehålla både ändringar som ökar och ändringar som minskar öppenheten.

Data för sajten skapas från ett Google Sheets-dokument som hålls uppdaterat av SJF:s yttrandefrihetsgrupp (sedan nedan).

Sajten är byggd med NuxtJS, Vuetify och Chart.js. Nuxt 3 bygger på Vue 3, vilket i sin tur betyder att vi kräver stöd för [ES2015](https://caniuse.com/es6). Vi gör inga försöka att polyfilla för antika webbläsare.

~~Sajtens backend ligger som .ts-filer under `./server/api`. Frontend-startpunkten är `app.vue`, med de båda vyerna (första-sida och innehållssida) under `./pages` och Vue-komponenter under `components`.~~

~~Innehållssidor servas med [Nuxts content-modul](https://content.nuxtjs.org/). Varje markdownfil som läggs under `./content`-mappen blir automatiskt en sida. Just nu finns bara en innehållssida: `/metod`.~~

**Uppdatering december 2023**  Sidan är nerskalad, och kan nu byggas statiskt med `npm run generate`!


## Buggar och utvecklingsförslag

Öppen Trellotavla finns här:
https://trello.com/b/FuCfdopz/%C3%B6ppenhetsdatabasen-sajt

## Utveckling


För att komma igång:

```sh
npm install
npm run dev
```

Det finns inga tester, men det kan vara värt att köra `npm run lint` innan du checkar in ändringar.

## Publicering

Sajten är testad med Node 19, 20 och 21, men bör i teorin fungera med alla NodeJS-versioner från och med 16.10.
`package.json` innehåller senast testade Node- och npm-versioner under `{ engines }`. Alla produktionsberoenden är pinnade till exakta versioner.

Bygga dynamisk sajt, med minimalt backend-API:

```sh
npm run build
npm run serve
```

Bygga statisk sajt, med all data i JSON-blobb:

```sh
npm run generate
```

Sajten ligger nu under `.output`, och kan servas på valfritt sätt. 

~~Se `test/embed.html` för exempel på inbäddningskod (notera att iframe-resize-scriptets version måste matcha det som används i appen!)~~

