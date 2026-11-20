// Funciones puras del formulario de contacto (sin React ni red, fáciles de probar).
// Las reglas son las mismas que valida el backend, para avisar antes de enviar; el backend vuelve a validar igual.

export const LIMITES = {
  nombre: { min: 2, max: 100 },
  telefono: { max: 30 },
  mensaje: { min: 5, max: 2000 },
};

export const CAMPOS = ["nombre", "telefono", "mensaje"];

// Cuenta caracteres reales (un emoji cuenta 1), igual que el backend
const largo = (texto) => Array.from(texto).length;

// Devuelve un objeto con un mensaje por cada campo inválido ({} si todo está bien)
export function validarContactoCliente({ nombre = "", telefono = "", mensaje = "" }) {
  const errores = {};
  const n = nombre.trim();
  const t = telefono.trim();
  const m = mensaje.trim();

  if (n === "") errores.nombre = "El nombre es obligatorio.";
  else if (largo(n) < LIMITES.nombre.min || largo(n) > LIMITES.nombre.max) {
    errores.nombre = `El nombre debe tener entre ${LIMITES.nombre.min} y ${LIMITES.nombre.max} caracteres.`;
  }

  const digitos = t.replace(/\D/g, "").length;
  if (t === "") errores.telefono = "El teléfono es obligatorio.";
  else if (t.length > LIMITES.telefono.max || !/^[0-9+()\-.\s]+$/.test(t) || digitos < 6 || digitos > 15) {
    errores.telefono = "Ingresá un teléfono válido, con entre 6 y 15 números (podés usar +, espacios y guiones).";
  }

  if (m === "") errores.mensaje = "El mensaje es obligatorio.";
  else if (largo(m) < LIMITES.mensaje.min || largo(m) > LIMITES.mensaje.max) {
    errores.mensaje = `El mensaje debe tener entre ${LIMITES.mensaje.min} y ${LIMITES.mensaje.max} caracteres.`;
  }

  return errores;
}

// Texto que viene del servidor: solo se usa si es un texto corto razonable
export function textoDelServidor(valor, maximo = 200) {
  return typeof valor === "string" && valor.trim() !== "" && valor.length <= maximo ? valor : null;
}

const ALTERNATIVA = " También podés contactarnos por los otros medios de esta página.";

// Convierte un error de axios en { mensaje, errores }:
//   mensaje: texto general para mostrar arriba del formulario
//   errores: mensajes por campo, solo si el servidor los mandó (solo campos conocidos y de tipo texto)
export function interpretarErrorEnvio(error) {
  const estado = error?.response?.status;
  const datos = error?.response?.data;

  if (estado === 400) {
    const errores = {};
    if (datos && typeof datos.errores === "object" && datos.errores !== null) {
      for (const campo of CAMPOS) {
        const texto = textoDelServidor(datos.errores[campo], 300);
        if (texto) errores[campo] = texto;
      }
    }
    return { mensaje: "Revisá los datos del formulario.", errores };
  }
  if (estado === 429) {
    return {
      mensaje: textoDelServidor(datos?.message) ?? "Enviaste varios mensajes seguidos. Probá de nuevo más tarde.",
      errores: {},
    };
  }
  if (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT") {
    return { mensaje: `El servidor tardó demasiado en responder. Probá de nuevo.${ALTERNATIVA}`, errores: {} };
  }
  if (estado) {
    return { mensaje: `Hubo un problema al enviar tu mensaje (código ${estado}). Probá de nuevo en unos minutos.${ALTERNATIVA}`, errores: {} };
  }
  return { mensaje: `No pudimos enviar tu mensaje. Revisá tu conexión e intentá de nuevo.${ALTERNATIVA}`, errores: {} };
}