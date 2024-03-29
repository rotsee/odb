<template>
  <v-card :loading="pending">
    <v-card-title class="text-wrap">
      Lagändringar i OSL de senaste åren
    </v-card-title>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title expand-icon="mdi-menu-down">
            <v-icon class="mr-2" icon="mdi-filter" color="grey" />
            Filter
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="auto" lg="6">
                    <v-select
                      v-model="filter.sekretess"
                      multiple
                      chips
                      label="Sekretess"
                      :single-line="false"
                      :items="['ökad', 'minskad', {title: 'ingen förändring', value: ''}]"
                    />
                  </v-col>
                  <v-col cols="auto" lg="6">
                    <v-checkbox
                      v-model="filter.eu"
                      label="Endast EU-relaterade ändringar"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <label class="v-label">Antal år som sekretessen gäller</label>
                    <v-range-slider
                      v-model="filter.sekretess_range"
                      thumb-label="always"
                      :step="10"
                      show-ticks="always"
                      :min="0"
                      :max="70"
                      color="grey"
                      strict
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :items-per-page="20"
        :items-per-page-options="[20, 50, 100, -1]"
        items-per-page-text="Ändringar per sida"
        page-text="{0}–{1} av {2}"
      >
        <template #item.sfs="{ item }">
          <a
            target="_new"
            :href="item.sfs_url"
          >
            {{ item.sfs }}
          </a>
        </template>
        <template #item.sekretess="{ item }">
          {{ item.sekretess }}
        </template>
        <template #item.chapter-paragraph="{ item }">
          <v-tooltip v-if="item.chapter" :text="chapters[item.chapter]">
            <template #activator="{ props }">
              <span v-bind="props" style="white-space: nowrap">
                {{ item.chapter }}
                <span v-if="item.paragraph" class="mx-1">
                  § {{ item.paragraph }}
                </span>
                <a
                  v-if="item.chapter && item.paragraph"
                  class="table_link"
                  target="_new"
                  :href="`https://lagen.nu/2009:400#K${item.chapter}P${item.paragraph}S1`"
                >
                  <v-icon
                    icon="mdi-open-in-new"
                    color="grey"
                    size="small"
                  />
                </a>
              </span>
            </template>
          </v-tooltip>
        </template>
        <template #item.sdate="{ item }">
          <span v-if="item.sdate">
            {{ formatStartDate(item.sdate) }}
          </span>
        </template>
        <template #item.prop="{ item }">
          <span v-for="p, idx in item.prop" :key="p">
            <a
              target="_new"
              :href="item.prop_link[idx]"
            >
              {{ p.slice(2) }}
            </a>
            <span v-if="item.prop.length > idx + 1">
              &nbsp;&middot;&#32;
            </span>
          </span>
        </template>
        <template #item.kategori="{ item }">
          <span v-if="item.eu">
            EU-lagstiftning &middot;
          </span>
          <span v-if="item.validity">
            Sekretess i {{ item.validity }} år &middot;
          </span>
          <span>
            {{ item.pages }} {{ item.pages === 1 ? "sida" : "sidor" }} ändringsförfattning
          </span>
        </template>

        <template #footer.prepend>
          <v-btn
            variant="text"
            href="/data/data.csv"
            icon="mdi-download"
            title="Ladda ner tabellen"
          />
          <v-spacer />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'

  const { pending, data: tableDataRaw } = await useFetch("/api/table")
  const filter = ref({
    sekretess: ["ökad", "minskad", ""],
    sekretess_range: [0, 70],
    eu: false,
  })
  const tableData = computed(() => {
    if (pending.value) {
      return null
    }
    if (!tableDataRaw.value) {
      return null
    }
    return tableDataRaw
      .value
      .filter(row => filter.value.sekretess.includes(row.sekretess))
      .filter(row => row.eu || !filter.value.eu)
      .filter(row => (
        !row.validity && !filter.value.sekretess_range[0]
      ) || (
        row.validity >= filter.value.sekretess_range[0] && row.validity <= filter.value.sekretess_range[1])
      )
  })
  const chapters = {
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
  }
  const headers = [
    {
      title: "SFS",
      key: "sfs",
    },
    {
      title: "Kapitel och paragraf",
      key: "chapter-paragraph",
    },
    {
      title: "Ökad/minskad sekretess",
      key: "sekretess",
    },
    {
      title: "Startdatum",
      key: "sdate",
    },
    {
      title: "Proposition(er)",
      key: "prop",
    },
    {
      title: "Övrigt",
      key: "kategori",
    },
  ]
  const formatStartDate = d => {
    if (d === "9") {
      return "i.u."
    }
    const opts = {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
    const f = new Intl.DateTimeFormat("sv-SE", opts)
    const parts = d.split(" ")
    const date = new Date(parts[0])
    return f.format(date)
  }
  /*
  const itemRowBackground = item => {
    if (item.sekretess === "ökad") {
      return "sekretess_ökad"
    }
    if (item.sekretess === "minskad") {
      return "sekretess_minskad"
    }
  }
  */
</script>
<style>
.table_link {
  text-decoration: none;
}
.sekretess_ökad {
  background-color: rgba(255, 99, 132, 0.8);
}
.sekretess_minskad {
  background-color: rgba(75, 192, 192, 0.8);
}
</style>