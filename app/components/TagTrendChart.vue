<script setup>
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  CategoryScale, LinearScale,
} from "chart.js"
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const { data: trendData } = await useFetch("/api/tags")

const tag1 = ref("vård") //ref("visselblåsare")
const tag2 = ref("terrorism") //ref("polisiär datainsamling")

const COLORS = ["#ed8123", "#63c29e"]

const chartData = computed(() => {
  if (!trendData.value || (!tag1.value && !tag2.value)) return null
  const { data, periods } = trendData.value
  const datasets = [tag1.value, tag2.value]
    .filter(Boolean)
    .map((tag, i) => ({
      label: tag,
      data: [
        +(data[tag].first * 100).toFixed(1),
        +(data[tag].last * 100).toFixed(1),
      ],
      borderColor: COLORS[i],
      backgroundColor: COLORS[i],
      pointRadius: 6,
      tension: 0,
    }))
  return {
    labels: [periods.first.label, periods.last.label],
    datasets,
  }
})

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      ticks: {
        precision: 0,
        maxTicksLimit: 4,
        callback: v => `${v} %`,
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`,
      },
    },
  },
}
</script>
<template>
  <v-card max-width="700">
    <v-card-title class="text-wrap">
      Jämför ämnen över tid
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="tag1"
            :items="trendData?.tags ?? []"
            label="Tagg 1"
            density="compact"
            color="#ed8123"
            clearable
          />
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="tag2"
            :items="trendData?.tags ?? []"
            label="Tagg 2"
            density="compact"
            color="#63c29e"
            clearable
          />
        </v-col>
      </v-row>
      <Line
        v-if="chartData"
        :options="chartOptions"
        :data="chartData"
      />
      <p class="mt-2 text-caption text-medium-emphasis">
        Utveckling för andel lagändringar per period som har respektive ämnestagg. 
        Lagändringarna är automatiskt klassificerade efter ämne, varför enstaka märkliga kategoriseringar kan förekomma. 
        Här visas bara ämnen som förekommer i minst tio olika dokument, och Y-axeln är en grov uppskattning.
      </p>
    </v-card-text>
  </v-card>
</template>
