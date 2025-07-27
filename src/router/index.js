import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/DashboardView.vue"),
      meta: {
        title: "Dashboard - Sistema de Suscripciones",
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/SettingsView.vue"),
      meta: {
        title: "Configuración - Sistema de Suscripciones",
      },
    },
  ],
})

router.beforeEach((to) => {
  document.title = to.meta.title || "Sistema de Suscripciones"
})

export default router
