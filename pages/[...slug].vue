<!-- Catch-all för content-sidoor -->
<template>
  <v-row>
    <v-col>
      <ContentDoc>
        <template #not-found>
          <h1>Hoppsan!</h1>
          <p>Det finns ingen sådan sidan.</p>
        </template>
      </ContentDoc>
      <p class="mt-4"><nuxt-link to="/">&larr; Tillbaka till förstasidan</nuxt-link></p>
    </v-col>
  </v-row>
</template>
