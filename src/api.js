// Conexión con el backend. La dirección sale de REACT_APP_API_URL (archivo .env); si falta, usa la de desarrollo.
import axios from "axios";

export const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:3001").replace(/\/+$/, "");

// Si el servidor no responde en 8 segundos, se corta y se muestra un error en vez de quedar cargando para siempre
export const api = axios.create({ baseURL: API_URL, timeout: 8000 });