import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Components/Pages/HomePage.css";

const HomePage = (props) => {
    return (
        <main className="holder pagina-home">
            <section className="hero">
                <img src="/images/imghome.jpeg" alt="local bakes lourdes" />
                <div className="hero-texto">
                    <span className="hero-etiqueta">Pastelería artesanal</span>
                    <h2>Bienvenidos a Bakes Lourdes</h2>
                    <p>Donde cada creación está hecha con dedicación, ingredientes de calidad y un toque de dulzura.</p>
                    <div className="hero-botones">
                        <Link className="boton" to="/galeria">Ver la galería</Link>
                        <Link className="boton boton-claro" to="/contacto">Contactanos</Link>
                    </div>
                </div>
            </section>

            <section className="bienvenidos">
                <h3>Dulces momentos, hechos a mano</h3>
                <p>Descubrí tortas, postres y delicias artesanales pensados para hacer de cada momento una ocasión especial.</p>

                <div className="valores">
                    <div className="valor">
                        <h4>Dedicación</h4>
                        <p>Cada creación se prepara con tiempo y mucho cuidado.</p>
                    </div>
                    <div className="valor">
                        <h4>Ingredientes de calidad</h4>
                        <p>Elegimos lo mejor para que el sabor se note en cada bocado.</p>
                    </div>
                    <div className="valor">
                        <h4>Un toque de dulzura</h4>
                        <p>Detalles pensados para sorprender en cada celebración.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}


export default HomePage;