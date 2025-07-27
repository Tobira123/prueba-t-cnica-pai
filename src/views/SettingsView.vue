<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-6">Configuración</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <v-icon class="me-2">mdi-cog</v-icon>
            Preferencias de Usuario
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="savePreferences">
              <v-row>
                <v-col cols="12">
                  <h3 class="text-h6 mb-4">Notificaciones</h3>

                  <v-switch
                    v-model="localPreferences.notifications"
                    label="Recibir notificaciones por email"
                    color="primary"
                    hide-details
                    class="mb-4"
                  />
                </v-col>

                <v-col cols="12">
                  <h3 class="text-h6 mb-4">Apariencia</h3>

                  <v-select
                    v-model="localPreferences.theme"
                    :items="themeOptions"
                    label="Tema de la aplicación"
                    variant="outlined"
                    hide-details
                    class="mb-4"
                  />
                </v-col>

                <v-col cols="12">
                  <h3 class="text-h6 mb-4">Información de Cuenta</h3>

                  <v-text-field
                    :model-value="accountInfo.name"
                    label="Nombre completo"
                    variant="outlined"
                    readonly
                    class="mb-4"
                  />

                  <v-text-field
                    :model-value="accountInfo.email"
                    label="Correo electrónico"
                    variant="outlined"
                    readonly
                    class="mb-4"
                  />

                  <v-alert type="info" variant="tonal" class="mb-4">
                    <v-icon>mdi-information</v-icon>
                    Para cambiar tu información personal, contacta al soporte técnico.
                  </v-alert>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="flat"
              :loading="saving"
              @click="savePreferences"
            >
              <v-icon class="me-2">mdi-content-save</v-icon>
              Guardar Cambios
            </v-btn>

            <v-btn variant="outlined" @click="resetPreferences">
              <v-icon class="me-2">mdi-restore</v-icon>
              Restaurar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon class="me-2">mdi-help-circle</v-icon>
            Ayuda y Soporte
          </v-card-title>

        <v-card-text>
            <v-list density="compact" class="bg-transparent">
              <v-list-item
                prepend-icon="mdi-book-open"
                title="Documentación"
                subtitle="Guías y tutoriales"
                @click="openDocumentation"
              />
              <v-list-item
                prepend-icon="mdi-email"
                title="Contactar Soporte"
                subtitle="Enviar un mensaje"
                @click="contactSupport"
              />
              <v-list-item
                prepend-icon="mdi-frequently-asked-questions"
                title="Preguntas Frecuentes"
                subtitle="Respuestas rápidas"
                @click="openFAQ"
              />
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>
            <v-icon class="me-2">mdi-information</v-icon>
            Información del Sistema
          </v-card-title>

          <v-card-text>
            <v-list density="compact" class="bg-transparent">
              <v-list-item>
                <v-list-item-title>Versión</v-list-item-title>
                <v-list-item-subtitle>1.0.0</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Última actualización</v-list-item-title>
                <v-list-item-subtitle>25 de julio, 2025</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar para confirmaciones -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscriptionStore.js'

defineOptions({ name: 'SettingsView' })

const subscriptionStore = useSubscriptionStore()
const saving = ref(false)

const localPreferences = reactive({
  notifications: true,
  theme: 'light',
})

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
})

const themeOptions = [
  { title: 'Claro', value: 'light' },
  { title: 'Oscuro', value: 'dark' },
  { title: 'Automático', value: 'auto' },
]

const accountInfo = computed(() => ({
  name: subscriptionStore.user?.name || 'Cargando...',
  email: subscriptionStore.user?.email || 'Cargando...',
}))

async function savePreferences() {
  saving.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    subscriptionStore.updatePreferences(localPreferences)
    snackbar.message = 'Preferencias guardadas correctamente'
    snackbar.color = 'success'
    snackbar.show = true
  } catch (error) {
    console.error('Error saving preferences:', error)
    snackbar.message = 'Error al guardar las preferencias'
    snackbar.color = 'error'
    snackbar.show = true
  } finally {
    saving.value = false
  }
}

function resetPreferences() {
  localPreferences.notifications = true
  localPreferences.theme = 'light'
  snackbar.message = 'Preferencias restauradas'
  snackbar.color = 'info'
  snackbar.show = true
}

function openDocumentation() {
  console.log('Abrir documentación')
  snackbar.message = 'Abriendo documentación...'
  snackbar.color = 'info'
  snackbar.show = true
}

function contactSupport() {
  console.log('Contactar soporte')
  snackbar.message = 'Abriendo formulario de contacto...'
  snackbar.color = 'info'
  snackbar.show = true
}

function openFAQ() {
  console.log('Abrir FAQ')
  snackbar.message = 'Abriendo preguntas frecuentes...'
  snackbar.color = 'info'
  snackbar.show = true
}

onMounted(async () => {
  if (!subscriptionStore.user) {
    await subscriptionStore.fetchUser()
  }
  subscriptionStore.loadPreferences()
  Object.assign(localPreferences, subscriptionStore.preferences)
})
</script>
