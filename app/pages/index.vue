<template>
  <v-container>
    <v-row justify-center center class="my-4">
      <v-col :cols="12" class="justify-center d-flex">
        <hero-chart />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto" lg="6">
        <p>
          De flesta lagändringar i Offentlighets- och sekretesslagen (OSL) är var för sig – med några undantag – ganska små. 
          Få av dem förändrar ensamma insynen i svenska myndigheters arbete så mycket att det förtjänar några rubriker. 
          Men om var och en av dem inskränker öppenheten bara något, så riskerar de att sammantaget driva samhället mot ökad slutenhet.
        </p>
      </v-col>
      <v-col cols="auto" lg="6">
        <p>
          För att få en bild av hela lagändringspusslet, har vi byggt en databas över lagändringar i OSL, med start 2018. 
          Databasen innehåller alla substantiella ändringar av lagtexter, men inte vissa rubrikändringar, korrektur och liknande.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <sfs-table />
      </v-col>
    </v-row>
  </v-container>
</template>
