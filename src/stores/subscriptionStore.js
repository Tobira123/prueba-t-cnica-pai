import { defineStore } from "pinia"
import { container } from "@/infrastructure/di/container.js"

export const useSubscriptionStore = defineStore("subscription", {
  state: () => ({
    user: null,
    subscription: null,
    payments: [],
    loading: {
      user: false,
      subscription: false,
      payments: false,
    },
    errors: {
      user: null,
      subscription: null,
      payments: null,
    },
    preferences: {
      notifications: true,
      theme: "light",
    },
  }),

  getters: {
    isLoading: (state) => {
      return Object.values(state.loading).some((loading) => loading)
    },
    hasErrors: (state) => {
      return Object.values(state.errors).some((error) => error !== null)
    },
  },

  actions: {
    /**
     * Carga los datos del usuario
     */
    async fetchUser() {
      this.loading.user = true
      this.errors.user = null

      try {
        const repository = container.get("subscriptionRepository")
        this.user = await repository.getUser()
      } catch (error) {
        this.errors.user = error.message
        console.error("Error loading user:", error)
      } finally {
        this.loading.user = false
      }
    },

    /**
     * Carga los datos de la suscripción
     */
    async fetchSubscription() {
      this.loading.subscription = true
      this.errors.subscription = null

      try {
        const repository = container.get("subscriptionRepository")
        this.subscription = await repository.getSubscription()
      } catch (error) {
        this.errors.subscription = error.message
        console.error("Error loading subscription:", error)
      } finally {
        this.loading.subscription = false
      }
    },

    /**
     * Carga el historial de pagos
     */
    async fetchPayments() {
      this.loading.payments = true
      this.errors.payments = null

      try {
        const repository = container.get("subscriptionRepository")
        this.payments = await repository.getPayments()
      } catch (error) {
        this.errors.payments = error.message
        console.error("Error loading payments:", error)
      } finally {
        this.loading.payments = false
      }
    },

    /**
     * Carga todos los datos
     */
    async fetchAllData() {
      await Promise.all([this.fetchUser(), this.fetchSubscription(), this.fetchPayments()])
    },

    /**
     * Actualiza las preferencias del usuario
     * @param {Object} newPreferences - Nuevas preferencias
     */
    updatePreferences(newPreferences) {
      this.preferences = { ...this.preferences, ...newPreferences }
      // En una implementación real, esto se enviaría al servidor
      localStorage.setItem("userPreferences", JSON.stringify(this.preferences))
    },

    /**
     * Carga las preferencias desde localStorage
     */
    loadPreferences() {
      const saved = localStorage.getItem("userPreferences")
      if (saved) {
        try {
          this.preferences = { ...this.preferences, ...JSON.parse(saved) }
        } catch (error) {
          console.error("Error loading preferences:", error)
        }
      }
    },
  },
})
