import { SubscriptionRepository } from "@/domain/repositories/SubscriptionRepository.js"

/**
 * @class MockSubscriptionRepository
 * @extends {SubscriptionRepository}
 * @description Implementación mock del repositorio de suscripciones usando fetch
 */
export class MockSubscriptionRepository extends SubscriptionRepository {
  /**
   * @inheritdoc
   */
  async getUser() {
    try {
      const response = await fetch("/mock/user.json")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      // Validar que las fechas sean strings
      if (typeof data.joinedAt !== "string") {
        throw new Error("joinedAt debe ser un string en formato ISO 8601")
      }

      return data
    } catch (error) {
      console.error("Error fetching user data:", error)
      throw error
    }
  }

  /**
   * @inheritdoc
   */
  async getSubscription() {
    try {
      const response = await fetch("/mock/subscription.json")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      // Validar que las fechas sean strings
      if (typeof data.renewsAt !== "string") {
        throw new Error("renewsAt debe ser un string en formato ISO 8601")
      }

      return data
    } catch (error) {
      console.error("Error fetching subscription data:", error)
      throw error
    }
  }

  /**
   * @inheritdoc
   */
  async getPayments() {
    try {
      const response = await fetch("/mock/payments.json")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      // Validar que las fechas sean strings
      data.forEach((payment, index) => {
        if (typeof payment.date !== "string") {
          throw new Error(`payments[${index}].date debe ser un string en formato ISO 8601`)
        }
      })

      return data
    } catch (error) {
      console.error("Error fetching payments data:", error)
      throw error
    }
  }
}
