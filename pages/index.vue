<template>
  <v-card>
    <v-card-title>
      Öppenhetsdatabasen
    </v-card-title>
    <v-card-text>
      <Bar
        id="hero-chart"
        :options="chartOptions"
        :data="chartData"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar },
  data () {
    const data = Object.values(this.plusMinus)
    return {
      chartOptions: {
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
        }
      },
      chartData: {
        labels: this.years,
        datasets: [{
          label: "Lagändringar som minskat öppenheten",
          data: data.map(x => -x.ökad),
          backgroundColor: "rgba(255, 99, 132, 0.8)",
        }, {
          label: "Lagändringar som ökat öppenheten",
          data: data.map(x => x.minskad),
          backgroundColor: "rgba(75, 192, 192, 0.8)",
        }]
      }
    }
  },
  setup: async function () {
    const plusMinus = await $fetch("/api/plusminus")
    const years = Object.keys(plusMinus)
    return { plusMinus, years }
  },
}
</script>
<style>
</style>