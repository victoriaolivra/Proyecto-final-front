// Funciones puras para la "novedad del mes" (sin React ni red, fáciles de probar).

const esTexto = (valor) => typeof valor === "string" && valor.trim() !== "";

// Revisa lo que devolvió GET /api/promo y deja solo datos seguros.
// Devuelve null si no hay promo vigente o si la respuesta no tiene el formato esperado.
export function normalizarPromo(datos) {
  const promo = datos?.promo;
  if (!promo || !esTexto(promo.titulo) || !esTexto(promo.descripcion)) return null;
  return {
    titulo: promo.titulo,
    descripcion: promo.descripcion,
    vigenteHasta: typeof promo.vigenteHasta === "string" && /^\d{4}-\d{2}-\d{2}$/.test(promo.vigenteHasta)
      ? promo.vigenteHasta
      : null,
  };
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

// "2026-11-30" -> "30 de noviembre de 2026" (sin usar Date, para evitar corrimientos por zona horaria)
export function formatearFechaLimite(iso) {
  if (typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [anio, mes, dia] = iso.split("-").map(Number);
  if (mes < 1 || mes > 12 || dia < 1 || dia > 31) return null;
  return `${dia} de ${MESES[mes - 1]} de ${anio}`;
}