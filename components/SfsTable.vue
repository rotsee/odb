<template>
  <v-card>
    <v-card-title>
      Lagändringar de senaste åren
    </v-card-title>
    <v-card-text>
      <v-data-table
        v-model:page="tablePage"
        :headers="headers"
        :items="data"
        :items-per-page="rowsPerPage"
        hide-default-footer
        @update:options="options = $event"
      >
        <template #item.chapter="{ item }">
          <span class="mr-2">{{ item.value.chapter }}</span>
          <v-tooltip :text="chapters[item.value.chapter]">
            <template  #activator="{ props }">
              <v-icon icon="mdi-information" color="grey" size="small" v-bind="props"/>
            </template>
          </v-tooltip>
        </template>
        <template #bottom>
          <v-pagination
            v-model="tablePage"
            :length="options.pageCount"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  setup: async function ({ $vuetify }) {
    const data = await $fetch("/api/table")
    return { data }
  },
  data () {
    return {
      tablePage: 1,
      options: {
        pageCount: 1,
      },
      rowsPerPage: 15,
      chapters: {
        1: "Lagens innehåll",
        2: "Lagens tillämpningsområde",
        3: "Definitioner",
        4: "Allmänna åtgärder för att underlätta sökande efter allmänna handlingar, m.m.",
        5: "Registrering av allmänna handlingar och sekretessmarkering",
        6: "Utlämnande av allmänna handlingar och uppgifter, överklagande, m.m.",
        7: "ALLMÄNNA BESTÄMMELSER OM SEKRETESS",
        8: "Vilka sekretessen gäller mot",
        9: "Förbud i annan lagstiftning mot att röja eller utnyttja uppgift",
        10: "Sekretessbrytande bestämmelser och bestämmelser om undantag från sekretess",
        11: "Överföring av sekretess",
        12: "Sekretess i förhållande till den enskilde själv, m.m.",
        13: "Rätten att meddela och offentliggöra uppgifter",
        14: "Ansvar",
        15: "Sekretess till skydd för rikets säkerhet eller dess förhållande till andra stater eller mellanfolkliga organisationer",
        16: "Sekretess till skydd för rikets centrala finanspolitik, penningpolitik eller valutapolitik",
        17: "Sekretess till skydd främst för myndigheters verksamhet för inspektion, kontroll eller annan tillsyn",
        18: "Sekretess till skydd främst för intresset av att förebygga eller beivra brott",
        19: "Sekretess till skydd för det allmännas ekonomiska intresse",
        20: "Sekretess till skydd för intresset av att bevara djur- eller växtart",
        21: "Sekretess till skydd för uppgift om enskilds personliga förhållanden oavsett i vilket sammanhang uppgiften förekommer",
        22: "Sekretess till skydd för enskild vid folkbokföring, delgivning, m.m.",
        23: "Sekretess till skydd för enskild i utbildningsverksamhet, m.m.",
        24: "Sekretess till skydd för enskild inom forskning och statistik",
        25: "Sekretess till skydd för enskild i verksamhet som avser hälso- och sjukvård, m.m.",
        26: "Sekretess till skydd för enskild inom socialtjänst, vid kommunal bostadsförmedling, adoption, m.m.",
        27: "Sekretess till skydd för enskild inom verksamhet som rör skatt, tull, m.m.",
        28: "Sekretess till skydd för enskild när det gäller socialförsäkringar, studiestöd, arbetsmarknad, m.m.",
        29: "Sekretess till skydd för enskild i verksamhet som rör transporter och andra former av kommunikation",
        30: "Sekretess till skydd för enskild i verksamhet som avser tillsyn m.m. i fråga om näringslivet",
        31: "Sekretess till skydd för enskild i annan verksamhet med anknytning till näringslivet",
        32: "Sekretess till skydd för enskild i verksamhet som rör annan tillsyn, granskning, övervakning, m.m.",
        33: "Sekretess till skydd för enskild hos Diskrimineringsombudsmannen, Barnombudsmannen, Konsumentombudsmannen och Institutet för mänskliga rättigheter, m.m.",
        34: "Sekretess till skydd för enskild vid utsökning och indrivning, skuldsanering, m.m.",
        35: "Sekretess till skydd för enskild i verksamhet som syftar till att förebygga eller beivra brott, m.m.",
        36: "Sekretess till skydd för enskild i vissa mål och ärenden hos domstol, i vissa fall av medling, i ärenden om rättshjälp, m.m.",
        37: "Sekretess till skydd för enskild vid utlänningskontroll, i Schengensamarbetet, m.m.",
        38: "Sekretess till skydd för enskild i verksamhet som rör totalförsvar, krisberedskap, m.m.",
        39: "Sekretess till skydd för enskild i personaladministrativ verksamhet",
        40: "Sekretess till skydd för enskild hos övriga myndigheter och i övriga verksamheter",
        41: "Riksdagen och regeringen",
        42: "Riksdagens ombudsmän, Justitiekanslern, Säkerhets- och integritetsskyddsnämnden och undersökningskommissioner, m.m.",
        43: "Domstolar m.m.",
        44: "Tystnadsplikt som följer av andra författningar och som inskränker rätten att meddela och offentliggöra uppgifter",
      },
      headers: [
        {
          title: 'SFS',
          key: 'sfs',
        },
        {
          title: 'Kapitel',
          key: 'chapter',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
<style>
</style>