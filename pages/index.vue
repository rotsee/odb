<template>
  <v-card>
    <v-card-title>
      Öppenhetsdatabasen
    </v-card-title>
    <v-card-text>
      Topp-graf här:
      {{  summary }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
  }),
  setup: async function () {
    const summary = await $fetch("/api/summary")
    return { summary }
  },
}
</script>
<style>
</style>