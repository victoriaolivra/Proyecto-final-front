import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Styles/Components/ModalPromo.css";
import { formatearFechaLimite } from "../utils/promo";

// Cartel con la promo del mes. Se cierra con la X, con "Cerrar", con la tecla Esc o tocando afuera.
const ModalPromo = ({ promo, onCerrar }) => {
    const dialogoRef = useRef(null);
    const botonCerrarRef = useRef(null);
    const cerrarRef = useRef(onCerrar);
    cerrarRef.current = onCerrar;

    useEffect(() => {
        const anterior = document.activeElement; // para devolverle el foco al botón que abrió el cartel
        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden"; // la página de atrás no se mueve mientras está abierto
        botonCerrarRef.current?.focus();

        const alTeclear = (evento) => {
            if (evento.key === "Escape") {
                cerrarRef.current();
                return;
            }
            if (evento.key !== "Tab" || !dialogoRef.current) return;
            // El foco se queda dentro del cartel: Tab después del último vuelve al primero
            const enfocables = dialogoRef.current.querySelectorAll("a[href], button:not([disabled])");
            if (enfocables.length === 0) return;
            const primero = enfocables[0];
            const ultimo = enfocables[enfocables.length - 1];
            if (evento.shiftKey && document.activeElement === primero) {
                evento.preventDefault();
                ultimo.focus();
            } else if (!evento.shiftKey && document.activeElement === ultimo) {
                evento.preventDefault();
                primero.focus();
            }
        };
        document.addEventListener("keydown", alTeclear);

        return () => {
            document.removeEventListener("keydown", alTeclear);
            document.body.style.overflow = overflowAnterior;
            anterior?.focus?.();
        };
    }, []);

    const fechaLimite = formatearFechaLimite(promo.vigenteHasta);

    return (
        <div
            className="modal-fondo"
            onMouseDown={(evento) => {
                if (evento.target === evento.currentTarget) {
                    evento.preventDefault(); // así el navegador no le saca el foco al botón al que vuelve el cartel
                    onCerrar(); // solo si tocó el fondo, no el cartel
                }
            }}
        >
            <div className="modal-promo" role="dialog" aria-modal="true" aria-labelledby="modal-promo-titulo" ref={dialogoRef}>
                <button type="button" className="modal-x" onClick={onCerrar} aria-label="Cerrar" ref={botonCerrarRef}>
                    ×
                </button>
                <span className="modal-etiqueta">Novedad del mes</span>
                <h3 id="modal-promo-titulo">{promo.titulo}</h3>
                <p className="modal-descripcion">{promo.descripcion}</p>
                {fechaLimite && <p className="modal-vigencia">Válida hasta el {fechaLimite}</p>}
                <div className="modal-acciones">
                    <Link className="boton" to="/contacto" onClick={onCerrar}>Quiero aprovecharla</Link>
                    <button type="button" className="modal-cerrar" onClick={onCerrar}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalPromo;