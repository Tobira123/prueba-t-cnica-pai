/**
 * Formatea una fecha ISO 8601 a formato legible en español mexicano
 * @param {string} isoDateString - Fecha en formato ISO 8601
 * @param {Object} options - Opciones de formateo
 * @returns {string} Fecha formateada
 */
export function formatDate(isoDateString, options = {}) {
  if (!isoDateString || typeof isoDateString !== "string") {
    return "Fecha no válida"
  }

  try {
    const date = new Date(isoDateString)

    if (isNaN(date.getTime())) {
      return "Fecha no válida"
    }

    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Mexico_City",
      ...options,
    }

    return new Intl.DateTimeFormat("es-MX", defaultOptions).format(date)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Fecha no válida"
  }
}

/**
 * Formatea una fecha ISO 8601 a formato corto
 * @param {string} isoDateString - Fecha en formato ISO 8601
 * @returns {string} Fecha formateada en formato corto
 */
export function formatDateShort(isoDateString) {
  return formatDate(isoDateString, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Formatea una fecha ISO 8601 incluyendo hora
 * @param {string} isoDateString - Fecha en formato ISO 8601
 * @returns {string} Fecha y hora formateadas
 */
export function formatDateTime(isoDateString) {
  return formatDate(isoDateString, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
