<template>
  <v-card
    class="mb-4"
    role="region"
    :aria-label="ariaLabel"
  >
    <v-card-title>
      <v-icon class="me-2" aria-hidden="true">mdi-account</v-icon>
      Información del Usuario
    </v-card-title>

    <v-card-text>
      <div v-if="loading" class="text-center" role="status" aria-live="polite">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-2">Cargando información del usuario…</p>
      </div>

      <div v-else-if="error" class="text-center">
        <v-alert type="error" :text="error" />
      </div>

      <div v-else-if="user">
        <v-row>
          <v-col cols="12" md="6">
            <div class="d-flex align-center mb-2">
              <v-icon class="me-2" color="primary" aria-hidden="true">mdi-account-circle</v-icon>
              <div>
                <div class="text-subtitle-2 text-medium-emphasis">Nombre</div>
                <div class="font-weight-medium">{{ user.name }}</div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex align-center mb-2">
              <v-icon class="me-2" color="primary" aria-hidden="true">mdi-email</v-icon>
              <div>
                <div class="text-subtitle-2 text-medium-emphasis">Correo</div>
                <div>{{ user.email }}</div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex align-center mb-2">
              <v-icon class="me-2" color="primary" aria-hidden="true">mdi-calendar</v-icon>
              <div>
                <div class="text-subtitle-2 text-medium-emphasis">Miembro desde</div>
                <div>{{ formatDate(user.joinedAt || user.createdAt) }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

/**
 * @typedef {{ id?: string|number, name: string, email: string, createdAt?: string, joinedAt?: string }} User
 */

const props = defineProps({
  user: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' }
})

const ariaLabel = computed(() =>
  `Resumen del usuario ${props.user?.name || 'Cargando'}`
)

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: '2-digit'
  })
}
</script>
