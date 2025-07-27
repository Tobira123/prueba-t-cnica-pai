<template>
  <tr
    role="row"
    :aria-label="rowAriaLabel"
  >
    <td class="text-left">
      <div class="font-weight-medium">{{ payment.id }}</div>
    </td>

    <td class="text-left">
      <div class="text-body-2">{{ formatDateShort(payment.date) }}</div>
    </td>

    <td class="text-left">
      <div class="font-weight-medium">
        {{ formatCurrency(payment.amount, payment.currency || 'MXN') }}
      </div>
    </td>

    <td class="text-left">
      <v-chip
        :color="status.color"
        size="small"
        variant="flat"
        :aria-label="`Estado del pago: ${status.text}`"
      >
        <v-icon :icon="status.icon" size="small" class="me-1" aria-hidden="true" />
        {{ status.text }}
      </v-chip>
    </td>

    <td class="text-right">
      <v-btn
        size="small"
        variant="text"
        :aria-label="`Ver detalles del pago ${payment.id}`"
        data-testid="view-payment-details-btn"
        @click="emit('view-details', payment)"
      >
        <v-icon start aria-hidden="true">mdi-eye</v-icon>
        Ver
      </v-btn>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue'

/**
 * @typedef {{ id: string, date: string, amount: number, status: string, currency?: string }} Payment
 */

const props = defineProps({
  payment: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-details'])

const STATUS_MAP = {
  PAID:    { text: 'Pagado',    color: 'success', icon: 'mdi-check-circle' },
  PENDING: { text: 'Pendiente', color: 'warning', icon: 'mdi-clock'        },
  FAILED:  { text: 'Fallido',   color: 'error',   icon: 'mdi-alert'        }
}

const status = computed(() => STATUS_MAP[props.payment.status] || {
  text: 'Desconocido', color: 'default', icon: 'mdi-help-circle'
})

const rowAriaLabel = computed(() =>
  `Pago ${props.payment.id} del ${formatDateShort(props.payment.date)} por ` +
  `${formatCurrency(props.payment.amount, props.payment.currency || 'MXN')} - ` +
  `Estado: ${status.value.text}`
)

function formatDateShort(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: '2-digit'
  })
}

function formatCurrency(amount, currency) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency
    }).format(amount)
  } catch {
    return `${amount.toFixed?.(2) ?? amount} ${currency}`
  }
}
</script>
