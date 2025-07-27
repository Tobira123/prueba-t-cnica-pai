import { describe, it, expect, beforeEach, vi } from "vitest"
import { MockSubscriptionRepository } from "@/infrastructure/repositories/MockSubscriptionRepository.js"

// Mock global fetch
global.fetch = vi.fn()

describe("MockSubscriptionRepository", () => {
  let repository

  beforeEach(() => {
    repository = new MockSubscriptionRepository()
    vi.clearAllMocks()
  })

  describe("getUser", () => {
    it("should fetch and return user data with string date", async () => {
      const mockUserData = {
        id: "usr_001",
        name: "Tobías Rodríguez",
        email: "tobias@example.com",
        joinedAt: "2024-11-15T18:30:00Z",
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserData,
      })

      const result = await repository.getUser()

      expect(fetch).toHaveBeenCalledWith("/mock/user.json")
      expect(result).toEqual(mockUserData)
      expect(typeof result.joinedAt).toBe("string")
    })

    it("should throw error if joinedAt is not a string", async () => {
      const mockUserData = {
        id: "usr_001",
        name: "Tobías Rodríguez",
        email: "tobias@example.com",
        joinedAt: 1640995200000, // timestamp instead of string
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserData,
      })

      await expect(repository.getUser()).rejects.toThrow("joinedAt debe ser un string en formato ISO 8601")
    })
  })

  describe("getPayments", () => {
    it("should fetch and return payments array with string dates", async () => {
      const mockPayments = [
        { id: "pay_1001", date: "2025-07-01T12:00:00Z", amount: 199.0, currency: "MXN", status: "PAID" },
        { id: "pay_1000", date: "2025-06-01T12:00:00Z", amount: 199.0, currency: "MXN", status: "PAID" },
      ]

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPayments,
      })

      const result = await repository.getPayments()

      expect(fetch).toHaveBeenCalledWith("/mock/payments.json")
      expect(result).toEqual(mockPayments)
      expect(Array.isArray(result)).toBe(true)
      result.forEach((payment) => {
        expect(typeof payment.date).toBe("string")
      })
    })

    it("should throw error if any payment date is not a string", async () => {
      const mockPayments = [{ id: "pay_1001", date: 1640995200000, amount: 199.0, currency: "MXN", status: "PAID" }]

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPayments,
      })

      await expect(repository.getPayments()).rejects.toThrow("payments[0].date debe ser un string en formato ISO 8601")
    })
  })

  describe("getSubscription", () => {
    it("should fetch and return subscription data with string date", async () => {
      const mockSubscription = {
        planId: "pro_monthly",
        planName: "Pro Mensual",
        price: 199.0,
        currency: "MXN",
        status: "ACTIVE",
        renewsAt: "2025-08-01T00:00:00Z",
        features: ["Proyectos ilimitados"],
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSubscription,
      })

      const result = await repository.getSubscription()

      expect(fetch).toHaveBeenCalledWith("/mock/subscription.json")
      expect(result).toEqual(mockSubscription)
      expect(typeof result.renewsAt).toBe("string")
    })
  })
})
