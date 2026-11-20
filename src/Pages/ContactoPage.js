import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../Styles/Components/Pages/ContactoPage.css";
import { api } from "../api";
import { CAMPOS, LIMITES, interpretarErrorEnvio, textoDelServidor, validarContactoCliente } from "../utils/contacto";

const VACIO = { nombre: "", telefono: "", mensaje: "" };

const ContactoPage = (props) => {
    const [valores, setValores] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);
    // Resultado del último envío: { tipo: "ok" | "error", texto }
    const [resultado, setResultado] = useState(null);

    const enviandoRef = useRef(false); // evita enviar dos veces si se toca el botón muy rápido
    const controladorRef = useRef(null);

    // Si se sale de la página mientras se envía, se cancela el pedido
    useEffect(() => () => controladorRef.current?.abort(), []);

    const cambiar = (evento) => {
        const { name, value } = evento.target;
        setValores((anterior) => ({ ...anterior, [name]: value }));
        // Al corregir un campo, se le quita su error y el mensaje general
        setErrores((anterior) => {
            if (!anterior[name]) return anterior;
            const { [name]: _quitado, ...resto } = anterior;
            return resto;
        });
        setResultado(null);
    };

    const enfocarPrimerError = (conErrores) => {
        const campo = CAMPOS.find((c) => conErrores[c]);
        if (campo) document.getElementById(campo)?.focus();
    };

    const enviar = async (evento) => {
        evento.preventDefault();
        if (enviandoRef.current) return;

        const limpios = {
            nombre: valores.nombre.trim(),
            telefono: valores.telefono.trim(),
            mensaje: valores.mensaje.trim(),
        };

        // 1) Revisión rápida antes de molestar al servidor
        const erroresCliente = validarContactoCliente(limpios);
        if (Object.keys(erroresCliente).length > 0) {
            setErrores(erroresCliente);
            setResultado(null);
            enfocarPrimerError(erroresCliente);
            return;
        }

        // 2) Envío
        enviandoRef.current = true;
        setEnviando(true);
        setErrores({});
        setResultado(null);
        const controlador = new AbortController();
        controladorRef.current = controlador;

        try {
            const respuesta = await api.post("/api/contacto", limpios, { signal: controlador.signal });
            setValores(VACIO);
            setResultado({
                tipo: "ok",
                texto: textoDelServidor(respuesta.data?.message) ?? "¡Gracias! Recibimos tu mensaje.",
            });
        } catch (error) {
            if (axios.isCancel(error)) return; // se salió de la página: no hay nada que mostrar
            const { mensaje, errores: delServidor } = interpretarErrorEnvio(error);
            setErrores(delServidor);
            setResultado({ tipo: "error", texto: mensaje });
            enfocarPrimerError(delServidor);
        } finally {
            enviandoRef.current = false;
            if (!controlador.signal.aborted) setEnviando(false);
        }
    };

    // Atributos de accesibilidad de cada campo: avisan a los lectores de pantalla cuál tiene error
    const atributosError = (campo) => ({
        "aria-invalid": errores[campo] ? "true" : "false",
        "aria-describedby": errores[campo] ? `error-${campo}` : undefined,
    });

    return (
        <main className="holder pagina-contacto">
         <h2 className="titulo-pagina">Contactanos</h2>
            <p className="subtitulo-pagina">¿Tenés una consulta, querés hacer un pedido o pedir un presupuesto? Completá el formulario y nos pondremos en contacto con vos.</p>

            <div className="contacto-contenedor">

                <div className="columna-form">
                    <form className="formulario" onSubmit={enviar} noValidate>
                        {resultado && (
                            <p
                                className={resultado.tipo === "ok" ? "mensaje-formulario mensaje-ok" : "mensaje-formulario mensaje-error"}
                                role={resultado.tipo === "ok" ? "status" : "alert"}
                            >
                                {resultado.texto}
                            </p>
                        )}
                        <p>
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={valores.nombre}
                                onChange={cambiar}
                                maxLength={LIMITES.nombre.max}
                                autoComplete="name"
                                disabled={enviando}
                                {...atributosError("nombre")}
                            />
                            {errores.nombre && <span className="error-campo" id="error-nombre">{errores.nombre}</span>}
                        </p>
                        <p>
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="text"
                                inputMode="tel"
                                id="telefono"
                                name="telefono"
                                value={valores.telefono}
                                onChange={cambiar}
                                maxLength={LIMITES.telefono.max}
                                autoComplete="tel"
                                disabled={enviando}
                                {...atributosError("telefono")}
                            />
                            {errores.telefono && <span className="error-campo" id="error-telefono">{errores.telefono}</span>}
                        </p>
                        <p>
                            <label htmlFor="mensaje">Mensaje</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                value={valores.mensaje}
                                onChange={cambiar}
                                maxLength={LIMITES.mensaje.max}
                                disabled={enviando}
                                {...atributosError("mensaje")}
                            ></textarea>
                            <span className="contador-mensaje">{valores.mensaje.length}/{LIMITES.mensaje.max}</span>
                            {errores.mensaje && <span className="error-campo" id="error-mensaje">{errores.mensaje}</span>}
                        </p>
                        <p>
                            <input type="submit" value={enviando ? "Enviando..." : "Enviar mensaje"} disabled={enviando} />
                        </p>
                    </form>
                </div>


                <div className="datos">
                    <h3>Información de Contacto</h3>
                    <p>También podes contactarte con nosotros usando los siguientes medios:</p>
                    <ul>
                     <li><strong>Teléfono</strong>3772-436374</li>
                     <li><strong>Email</strong>contacto@bakeslourdes.com</li>
                     <li><strong>Instagram</strong>@Bakes.Lourdes</li>
                     <li><strong>Dirección</strong>La Cruz y Alvear - Corrientes</li>
                    </ul>

                    <div className="mapa">
                        <iframe
                            title="mapa la cruz"
                            src="https://www.google.com/maps?q=La%20Cruz%20Corrientes%20Alvear&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactoPage;