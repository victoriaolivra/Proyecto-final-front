import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Components/Pages/NovedadesPage.css";
import { api } from "../api";
import { mensajeDeError, normalizarNovedades } from "../utils/novedades";
import { normalizarPromo } from "../utils/promo";
import ModalPromo from "../Components/ModalPromo";

const NovedadesPage = () => {
    const [estado, setEstado] = useState({ cargando: true, novedades: [], error: null });
    // Cada vez que cambia, se vuelve a pedir la lista (botón "Reintentar")
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        const controlador = new AbortController();
        setEstado((anterior) => ({ ...anterior, cargando: true, error: null }));

        api.get("/api/novedades", { signal: controlador.signal })
            .then((respuesta) => {
                setEstado({ cargando: false, novedades: normalizarNovedades(respuesta.data), error: null });
            })
            .catch((error) => {
                if (axios.isCancel(error)) return; // el usuario salió de la página: no hay nada que mostrar
                setEstado({ cargando: false, novedades: [], error: mensajeDeError(error) });
            });

        // Si se sale de la página antes de que llegue la respuesta, se cancela el pedido
        return () => controlador.abort();
    }, [intento]);

    // Promo del mes: se pide aparte, y si falla o no hay promo vigente, simplemente no aparece el botón
    const [promo, setPromo] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        const controlador = new AbortController();
        api.get("/api/promo", { signal: controlador.signal })
            .then((respuesta) => setPromo(normalizarPromo(respuesta.data)))
            .catch(() => setPromo(null));
        return () => controlador.abort();
    }, []);

    const { cargando, novedades, error } = estado;

    return (
        <section className="holder pagina-novedades">
            <h2 className="titulo-pagina">Novedades y Fechas Especiales</h2>
            <div className="intro-novedades">
                <h3>✨ Momentos Especiales ✨</h3>
                <h4>Celebramos cada ocasión con un sabor único.</h4>
                <p>Descubrí nuestras propuestas especiales para las fechas más importantes del año y sorprendé a quienes más querés con un detalle especial.</p>
            </div>

            {promo && (
                <div className="promo-barra">
                    <button type="button" className="boton boton-promo" aria-haspopup="dialog" onClick={() => setModalAbierto(true)}>
                        Novedad del mes
                    </button>
                </div>
            )}

            {modalAbierto && promo && (
                <ModalPromo promo={promo} onCerrar={() => setModalAbierto(false)} />
            )}

            {cargando && (
                <p className="estado-novedades" role="status">Cargando novedades...</p>
            )}

            {error && (
                <div className="estado-novedades estado-error" role="alert">
                    <p>{error}</p>
                    <button type="button" onClick={() => setIntento((n) => n + 1)}>Reintentar</button>
                </div>
            )}

            {!cargando && !error && novedades.length === 0 && (
                <p className="estado-novedades">Por ahora no hay novedades. ¡Volvé pronto!</p>
            )}

            {novedades.map((novedad) => (
                <div className="fecha-especial" key={novedad.id}>
                    <div className="texto-fecha">
                        <h3>{novedad.titulo}</h3>
                        <h4>{novedad.subtitulo}</h4>
                        <p>{novedad.cuerpo}</p>
                    </div>
                    {novedad.imagenes.length > 0 && (
                        <div className={novedad.imagenes.length > 1 ? "foto-fecha doble" : "foto-fecha"}>
                            {novedad.imagenes.map((url, i) => (
                                <img
                                    key={`${url}-${i}`}
                                    src={url}
                                    alt={novedad.imagenes.length > 1 ? `${novedad.titulo} (foto ${i + 1})` : novedad.titulo}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default NovedadesPage;