<script setup>
import { ref } from "vue"

import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const { pending, data: rawData } = await useFetch("/api/plusminus")

const chartData = computed(() => {
  if (pending.value) {
    return null
  }
  const years = Object.keys(rawData.value)
  const data = Object.values(rawData.value)
  return {
    labels: years,
    datasets: [{
      label: "Lagändringar som minskat öppenheten",
      data: data.map(x => -x.ökad),
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    }, {
      label: "Lagändringar som ökat öppenheten",
      data: data.map(x => x.minskad),
      backgroundColor: "rgba(75, 192, 192, 0.8)",
    }],
  }
})

const chartOptions = ref({
  responsive: true,
  indexAxis: 'y',
  scales: {
    y: {
      stacked: true,
    },
    x: {
      ticks: {
        callback: Math.abs,
      },
    },
  },
})

</script>
<template>
  <v-card max-width="700" :loading="pending">
    <v-card-title>
      Så har de senaste årens lagändringar förändrat öppenheten i samhället
    </v-card-title>
    <v-card-text>
      <bar
        v-if="chartData"
        :options="chartOptions"
        :data="chartData"
      />
      <p>Lagändringarna är ordnade efter årtalet de träder ikraft</p>
    </v-card-text>
  </v-card>
</template>
<style>
</style>
