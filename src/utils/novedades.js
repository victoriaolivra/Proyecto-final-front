// Funciones puras para trabajar con lo que devuelve GET /api/novedades (sin React ni red, fáciles de probar).

const esTexto = (valor) => typeof valor === "string" && valor.trim() !== "";
const esUrlHttp = (valor) => typeof valor === "string" && /^https?:\/\//i.test(valor);

// Revisa la respuesta del servidor y deja solo datos seguros para mostrar.
// Si lo que llegó no es una lista (por ejemplo, otra página en esa dirección), es un error, no "no hay novedades".
export function normalizarNovedades(datos) {
  if (!Array.isArray(datos)) throw new Error("FORMATO_INVALIDO");

  return datos
    .filter((n) => n && (typeof n.id === "number" || typeof n.id === "string") && esTexto(n.titulo))
    .map((n) => ({
      id: n.id,
      titulo: n.titulo,
      subtitulo: typeof n.subtitulo === "string" ? n.subtitulo : "",
      cuerpo: typeof n.cuerpo === "string" ? n.cuerpo : "",
      // Solo direcciones http(s), y como máximo 2 imágenes
      imagenes: Array.isArray(n.imagenes) ? n.imagenes.filter(esUrlHttp).slice(0, 2) : [],
    }));
}

// Convierte un error de axios en un mensaje claro para la persona que visita la web
export function mensajeDeError(error) {
  if (error?.message === "FORMATO_INVALIDO") {
    return "El servidor respondió algo inesperado. Probá de nuevo más tarde.";
  }
  if (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT") {
    return "El servidor tardó demasiado en responder. Probá de nuevo.";
  }
  if (error?.response) {
    return `Hubo un problema en el servidor (código ${error.response.status}). Probá de nuevo en unos minutos.`;
  }
  return "No pudimos conectar con el servidor. Revisá tu conexión e intentá de nuevo.";
}