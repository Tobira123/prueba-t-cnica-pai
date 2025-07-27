import { MockSubscriptionRepository } from "@/infrastructure/repositories/MockSubscriptionRepository.js"

/**
 * @class Container
 * @description Contenedor de inyección de dependencias
 */
class Container {
  constructor() {
    this.services = new Map()
    this.registerServices()
  }

  /**
   * Registra los servicios en el contenedor
   */
  registerServices() {
    this.services.set("subscriptionRepository", new MockSubscriptionRepository())
  }

  /**
   * Obtiene un servicio del contenedor
   * @param {string} serviceName - Nombre del servicio
   * @returns {*} Instancia del servicio
   */
  get(serviceName) {
    const service = this.services.get(serviceName)
    if (!service) {
      throw new Error(`Service ${serviceName} not found`)
    }
    return service
  }
}

export const container = new Container()
