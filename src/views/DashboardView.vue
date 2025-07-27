<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-6">Pai</h1>
      </v-col>
    </v-row>

    <!-- Alertas de error globales -->
    <v-row v-if="subscriptionStore.hasErrors">
      <v-col cols="12">
        <v-alert
          v-for="(error, key) in subscriptionStore.errors"
          :key="key"
          v-show="error"
          type="error"
          closable
          class="mb-4"
          @click:close="subscriptionStore.errors[key] = null"
        >
          <strong>Error al cargar {{ key }}:</strong> {{ error }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <!-- Resumen del usuario -->
      <v-col cols="12" lg="4">
        <UserSummary
          :user="subscriptionStore.user"
          :loading="subscriptionStore.loading.user"
          :error="subscriptionStore.errors.user"
        />
      </v-col>

      <!-- Información del plan -->
      <v-col cols="12" lg="8">
        <PlanCard
          :subscription="subscriptionStore.subscription"
          :loading="subscriptionStore.loading.subscription"
          :error="subscriptionStore.errors.subscription"
          @manage-plan="handleManagePlan"
        />
      </v-col>
    </v-row>

    <!-- Historial de pagos -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2">mdi-credit-card</v-icon>
            Historial de Pagos
            <v-spacer />
          </v-card-title>

          <v-card-text>
            <div v-if="subscriptionStore.loading.payments" class="text-center py-8">
              <v-progress-circular indeterminate color="primary" />
              <p class="mt-2">Cargando historial de pagos...</p>
            </div>

            <div v-else-if="subscriptionStore.errors.payments" class="text-center py-4">
              <v-alert type="error" :text="subscriptionStore.errors.payments" />
            </div>

            <div v-else-if="subscriptionStore.payments.length === 0" class="text-center py-8">
              <v-icon size="64" color="grey-lighten-1">mdi-credit-card-off</v-icon>
              <p class="text-h6 mt-4 text-medium-emphasis">No hay pagos registrados</p>
            </div>

            <v-table v-else role="table" aria-label="Historial de pagos">
              <thead>
                <tr role="row">
                  <th scope="col" class="text-left font-weight-bold">ID</th>
                  <th scope="col" class="text-left font-weight-bold">Fecha</th>
                  <th scope="col" class="text-left font-weight-bold">Monto</th>
                  <th scope="col" class="text-left font-weight-bold">Estado</th>
                  <th scope="col" class="text-left font-weight-bold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <PaymentItem
                  v-for="payment in subscriptionStore.payments"
                  :key="payment.id"
                  :payment="payment"
                  @view-details="handleViewPaymentDetails"
                />
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog para detalles del pago -->
    <v-dialog v-model="paymentDialog" max-width="500">
      <v-card v-if="selectedPayment">
        <v-card-title>
          <v-icon class="me-2">mdi-receipt</v-icon>
          Detalles del Pago
        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-title>ID del Pago</v-list-item-title>
              <v-list-item-subtitle>{{ selectedPayment.id }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fecha</v-list-item-title>
              <v-list-item-subtitle>{{ formatDateTime(selectedPayment.date) }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Monto</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatCurrency(selectedPayment.amount, selectedPayment.currency) }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Estado</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  :color="getPaymentStatusColor(selectedPayment.status)"
                  size="small"
                  variant="flat"
                >
                  {{ getPaymentStatusText(selectedPayment.status) }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="paymentDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSubscriptionStore } from '@/stores/subscriptionStore.js'
import UserSummary from '@/components/UserSummary.vue'
import PlanCard from '@/components/PlanCard.vue'
import PaymentItem from '@/components/PaymentItem.vue'
import { formatCurrency, getPaymentStatusColor, getPaymentStatusText } from '@/services/currencyFormatter.js'
import { formatDateTime } from '@/services/dateFormatter.js'

defineOptions({ name: 'DashboardView' })

const subscriptionStore = useSubscriptionStore()

const paymentDialog = ref(false)
/** @type {import('vue').Ref<null | {
 *  id:string,date:string,amount:number,currency?:string,status:string
 * }>}
 */
const selectedPayment = ref(null)

function handleManagePlan() {
  // En una implementación real, navegarías a la página de gestión del plan
  console.log('Gestionar plan')
}

function handleViewPaymentDetails(payment) {
  selectedPayment.value = payment
  paymentDialog.value = true
}

onMounted(async () => {
  subscriptionStore.loadPreferences()
  await subscriptionStore.fetchAllData()
})
</script>
