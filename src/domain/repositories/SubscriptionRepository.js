/**
 * @interface SubscriptionRepository
 * @description Repositorio para manejar datos de suscripciones
 */
export class SubscriptionRepository {
  /**
   * Obtiene la información del usuario
   * @returns {Promise<Object>} Datos del usuario
   */
  async getUser() {
    throw new Error("Method not implemented")
  }

  /**
   * Obtiene la suscripción activa
   * @returns {Promise<Object>} Datos de la suscripción
   */
  async getSubscription() {
    throw new Error("Method not implemented")
  }

  /**
   * Obtiene el historial de pagos
   * @returns {Promise<Array>} Lista de pagos
   */
  async getPayments() {
    throw new Error("Method not implemented")
  }
}
