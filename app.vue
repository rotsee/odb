<template>
  <v-app>
    <v-app-bar app absolute class="py-2 px-4">
      <v-spacer  class="hidden-md-and-down"/>
      <v-app-bar-title class="app_bar_title">
        <nuxt-link href="/">
          <component
            :is="$route.name === 'index' ? 'h1' : 'span'"
            class="Typography__h1"
          >Öppenhetsdatabasen</component>
        </nuxt-link>
      </v-app-bar-title>
      <a href="https://www.sjf.se"  class="hidden-md-and-down">
        <nuxt-img
          max-width="222"
          height="60"
          src="/img/sjf-logo.svg"
          alt="Journalistförbundet"
        />
      </a>
      <v-spacer class="hidden-md-and-down"/>
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