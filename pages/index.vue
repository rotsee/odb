<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <v-row justify-center center class="my-4">
    <v-col :cols="12" class="justify-center d-flex">
      <hero-chart />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="auto" lg="6">
      <p>
        De flesta av de hundratalet lagändringarna i Offentlighets- och sekretesslagen (OSL) under den här mandatperioden är var för sig – med några undantag – oftast ganska små. Få av dem förändrar ensamma insynen i svenska myndigheters arbete så mycket att det förtjänar några rubriker. Men om var och en av dem inskränker öppenheten bara något, så riskerar de att sammantaget driva samhället mot ökad slutenhet.
      </p>
    </v-col>
    <v-col cols="auto" lg="6">
      <p>
        För att få en bild av hela lagändringspusslet, har vi byggt en databas över lagändringar i OSL, med start i början av förra manadatperioden. 
        Databasen innehåller omkring 200 lagändringar i OSL (alla substantiella ändringar av lagtexter, men inte vissa rubrikändringar, korrektur och liknande).
      </p>
      <a href="/metod">Läs mer »</a>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <sfs-table />
    </v-col>
  </v-row>
</template>

<script>
export default {
  setup: async function () {
  },
  data () {
    return {}
  },
}
</script>
<style>
.v-container {
  max-width: 1200px;
}
</style>