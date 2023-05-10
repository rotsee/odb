<template>
  <v-app>
    <v-app-bar app flat color="#e7e7e7">
      <v-app-bar-title class="app_bar_title">
        <nuxt-link href="/">
          <component
            :is="$route.name === 'index' ? 'h1' : 'span'"
            class="Typography__h1"
          >Öppenhetsdatabasen</component>
        </nuxt-link>
      </v-app-bar-title>
    </v-app-bar>

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
.app_bar_title a {
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