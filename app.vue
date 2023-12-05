<script setup>
const route = useRoute()
</script>
<template>
  <v-app>
    <v-toolbar flat color="#e7e7e7">
      <template #title>
        <nuxt-link href="/" class="app_bar_title">
          <component
            :is="route.name === 'index' ? 'h1' : 'span'"
            class="Typography__h1"
          >Öppenhetsdatabasen</component>
        </nuxt-link>
      </template>
    </v-toolbar>

    <v-main>
      <NuxtPage keep-alive />
    </v-main>

    <v-footer>
      <small>
        Öppenhetsdatabasen drivs av 
        <a href="https://www.sjf.se/yrkesfragor/yttrandefrihet/yttrandefrihetsgruppen">Journalistförbundets yttrandefrihetsgrupp</a>. 
      </small>
    </v-footer>
  </v-app>
</template>
<style>
a.app_bar_title {
  text-decoration: none;
}
.v-container {
  max-width: 1200px;
}
</style>