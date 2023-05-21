<template>
  <v-app>
    <v-toolbar flat color="#e7e7e7">
      <template #title>
        <nuxt-link href="/" class="app_bar_title">
          <component
            :is="$route.name === 'index' ? 'h1' : 'span'"
            class="Typography__h1"
          >Öppenhetsdatabasen</component>
        </nuxt-link>
      </template>
    </v-toolbar>

    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>

    <v-footer>
      <small>
        Öppenhetsdatabasen drivs av 
        <a href="https://www.sjf.se/yrkesfragor/yttrandefrihet/yttrandefrihetsgruppen">Journalistförbundets yttrandefrihetsgrupp</a>. 
        Senast uppdaterad i april 2023.
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
#sjf-logo {
  height: 60px;
}
@media only screen 
and (max-device-width: 800px) {
  #sjf-logo {
    height: 40px;
  }
}
@media only screen 
and (max-device-width: 600px) {
  #sjf-logo {
    height: 30px;
  }
}
@media only screen 
and (max-device-width: 400px) {
  #sjf-logo {
    height: 20px;
  }
}
</style>