/**
 * Formatea un monto a moneda mexicana
 * @param {number} amount - Monto a formatear
 * @param {string} currency - Código de moneda (por defecto MXN)
 * @returns {string} Monto formateado
 */
export function formatCurrency(amount, currency = "MXN") {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "$0.00"
  }

  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    console.error("Error formatting currency:", error)
    return `$${amount.toFixed(2)}`
  }
}

/**
 * Mapea el estado de pago a color de chip de Vuetify
 * @param {string} status - Estado del pago
 * @returns {string} Color del chip
 */
export function getPaymentStatusColor(status) {
  const statusColors = {
    PAID: "success",
    PENDING: "warning",
    FAILED: "error",
  }

  return statusColors[status] || "default"
}

/**
 * Obtiene el texto legible del estado de pago
 * @param {string} status - Estado del pago
 * @returns {string} Texto del estado
 */
export function getPaymentStatusText(status) {
  const statusTexts = {
    PAID: "Pagado",
    PENDING: "Pendiente",
    FAILED: "Fallido",
  }

  return statusTexts[status] || status
}
