import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import {
  VCard, VCardTitle, VCardText, VCardActions,
  VIcon, VChip, VProgressCircular, VAlert,
  VList, VListItem, VListItemTitle, VBtn, VSpacer
} from 'vuetify/components'
import * as directives from 'vuetify/directives'
import PlanCard from '@/components/PlanCard.vue'

const vuetify = createVuetify({
  components: {
    VCard, VCardTitle, VCardText, VCardActions,
    VIcon, VChip, VProgressCircular, VAlert,
    VList, VListItem, VListItemTitle, VBtn, VSpacer
  },
  directives
})

const mockSubscription = {
  planId: 'pro_monthly',
  planName: 'Pro Mensual',
  price: 199,
  currency: 'MXN',
  status: 'ACTIVE',
  renewsAt: '2025-08-01T00:00:00Z',
  features: ['10 proyectos', 'Soporte prioritario']
}

describe('PlanCard', () => {
  it('renderiza datos del plan', () => {
    const wrapper = mount(PlanCard, {
      props: { subscription: mockSubscription, loading: false, error: '' },
      global: { plugins: [vuetify] }
    })
    expect(wrapper.text()).toContain('Plan Actual')
    expect(wrapper.text()).toContain(mockSubscription.planName)
    expect(wrapper.text()).toContain('Características incluidas')
    expect(wrapper.findComponent(VChip).exists()).toBe(true)
  })

  it('muestra estado de carga', () => {
    const wrapper = mount(PlanCard, {
      props: { loading: true, error: '', subscription: null },
      global: { plugins: [vuetify] }
    })
    expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true)
  })

  it('muestra mensaje de error', () => {
    const wrapper = mount(PlanCard, {
      props: { loading: false, error: 'falló', subscription: null },
      global: { plugins: [vuetify] }
    })
    expect(wrapper.findComponent(VAlert).exists()).toBe(true)
  })

  it('emite "manage-plan" al hacer click', async () => {
    const wrapper = mount(PlanCard, {
      props: { subscription: mockSubscription, loading: false, error: '' },
      global: { plugins: [vuetify] }
    })
    const btn = wrapper.find('[data-testid="manage-plan-btn"]')
    expect(btn.exists()).toBe(true)
    await btn.trigger('click')
    expect(wrapper.emitted('manage-plan')).toBeTruthy()
  })
})
