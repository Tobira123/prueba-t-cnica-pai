<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Sistema de Suscripciones</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item
          v-for="item in navigationItems"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          exact
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      navigationItems: [
        {
          title: 'Pai',
          icon: 'mdi-view-dashboard',
          to: '/dashboard',
        },
        {
          title: 'Configuración',
          icon: 'mdi-cog',
          to: '/settings',
        },
      ],
    }
  },
}
</script>
