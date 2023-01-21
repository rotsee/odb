<template>
  <v-app>
    <v-app-bar app class="py-2 px-4">
      <a href="https://www.sjf.se">
        <v-img
          width="222"
          max-height="60"
          src="https://www.sjf.se//images/site-logo.svg"
          alt="Logotyp Journalistförbundet"
        />
      </a>
      <v-spacer />
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
        Öppenhetsdatabasen drivs av <a href="https://www.sjf.se/yrkesfragor/yttrandefrihet/yttrandefrihetsgruppen">Journalistförbundets yttrandefrihetsgrupp.</a>
      </small>
    </v-footer>
  </v-app>
</template>
<style>
.app_bar_title a {
  text-decoration: none;
}
</style>