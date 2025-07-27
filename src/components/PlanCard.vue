<template>
  <v-card
    class="mb-4"
    elevation="2"
    role="region"
    :aria-label="`Plan ${subscription?.planName || 'Cargando'} - ${subscription?.status || ''}`"
  >
    <v-card-title class="d-flex align-center">
      <v-icon class="me-2" color="primary" aria-hidden="true">mdi-crown</v-icon>
      <span>Plan Actual</span>
      <v-spacer />
      <v-chip
        v-if="subscription"
        :color="statusColor"
        size="small"
        variant="flat"
        :aria-label="`Estado del plan: ${statusText}`"
      >
        <v-icon :icon="statusIcon" size="small" class="me-1" aria-hidden="true" />
        {{ statusText }}
      </v-chip>
    </v-card-title>

    <v-card-text>
      <!-- Loading -->
      <div v-if="loading" class="text-center" role="status" aria-live="polite">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-2">Cargando información del plan...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center">
        <v-alert type="error" :text="error" />
      </div>

      <!-- Content -->
      <div v-else-if="subscription">
        <!-- Título y precio -->
        <div class="mb-4">
          <h3 class="text-h4 font-weight-bold text-primary mb-2">
            {{ subscription.planName }}
          </h3>
          <div class="d-flex align-baseline">
            <span class="text-h3 font-weight-bold text-primary">
              {{ formatCurrency(subscription.price, subscription.currency || 'MXN') }}
            </span>
            <span class="text-body-1 text-medium-emphasis ms-2">/mes</span>
          </div>
        </div>

        <!-- Próxima renovación -->
        <div class="mb-4">
          <div class="d-flex align-center mb-2">
            <v-icon class="me-2" color="success" aria-hidden="true">:calendar-check</v-icon>
            <div>
              <div class="text-subtitle-2 text-medium-emphasis">Próxima renovación</div>
              <div class="text-body-1 font-weight-medium">
                {{ formatDate(subscription.renewsAt) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Características -->
        <div v-if="Array.isArray(subscription.features) && subscription.features.length">
          <h4 class="text-h6 mb-3">
            <v-icon class="me-2" aria-hidden="true">:star</v-icon>
            Características incluidas
          </h4>

          <v-list density="compact" class="bg-transparent" aria-label="Características del plan">
            <v-list-item
              v-for="(feature, index) in subscription.features"
              :key="index"
              class="px-0"
              :title="feature"
            >
              <template #prepend>
                <v-icon color="success" size="small" aria-hidden="true">:check-circle</v-icon>
              </template>
              <v-list-item-title class="text-body-2">
                {{ feature }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-card-text>

    <v-card-actions v-if="subscription && !loading">
      <v-btn
        color="primary"
        variant="outlined"
        prepend-icon=":cog"
        data-testid="manage-plan-btn"
        @click="emit('manage-plan')"
        aria-label="Gestionar plan de suscripción"
      >
        Gestionar plan
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  subscription: {
    type: Object,
    default: null
  },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' }
})

const emit = defineEmits(['manage-plan'])

function formatCurrency(amount, currency) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch {
    const a = typeof amount === 'number' && Number.isFinite(amount) ? amount.toFixed(2) : String(amount)
    return `${a} ${currency}`
  }
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

const STATUS_MAP = {
  ACTIVE:   { text: 'Activo',   color: 'success', icon: ':check-circle' },
  INACTIVE: { text: 'Inactivo', color: 'error',   icon: ':close-circle' },
  CANCELLED:{ text: 'Cancelado',color: 'warning', icon: ':cancel' },
  EXPIRED:  { text: 'Expirado', color: 'error',   icon: ':clock-alert' }
}

const statusEntry = computed(() => (props.subscription?.status && STATUS_MAP[props.subscription.status]) || null)
const statusText  = computed(() => statusEntry.value?.text ?? '—')
const statusColor = computed(() => statusEntry.value?.color ?? 'default')
const statusIcon  = computed(() => statusEntry.value?.icon ?? ':help-circle')
</script>
