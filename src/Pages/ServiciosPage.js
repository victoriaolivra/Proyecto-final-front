import React from "react";
import "../Styles/Components/Pages/ServiciosPage.css";

const ServiciosPage = (props) => {
    return (
        <section className="holder pagina-servicios">
            <h2 className="titulo-pagina">Servicios</h2>
            <div className="info">
                <p>En Bakes Lourdes hacemos que cada celebración sea única, especial y, sobre todo, deliciosa.✨ </p>
                <p>Creamos propuestas de pasteleria artesanal y catering salado, pensados para acompañar todo tipo de eventos y adaptarnos a cada ocasión.</p>
            </div>

            <div className="mesa-dulce">
                <h3>Servicio de Mesa Dulce. </h3>
                <p>Diseñamos mesas dulces personalizadas con todo lo que necesitás para darle un toque especial a tu celebración.</p>
                <p>Cada propuesta se adapta a la temática, estilo y preferencias de tu evento, cuidando tanto los sabores como la presentación.</p>

                <div className="galeria"> 
                   <img src="/images/mesadulceI.jpg" alt="mesa dulce 1" />
                   <img src="/images/mesadulce2.jpg" alt="mesa dulce 2" />
                   <img src="/images/mesadulce3.jpg" alt="mesa dulce 3" />
                   <img src="/images/mesadulce4.jpg" alt="mesa dulce 4" />
                   <img src="/images/mesadulce5.jpg" alt="mesa dulce 5" />
                   <img src="/images/mesadulce6.jpg" alt="mesa dulce 6" />
                </div>
            </div>

            <div className="catering-saldado">
                <h3>Servicio de Catering Salado.</h3>
                <p>También ofrecemos opciones saladas para que puedas completar tu evento con una propuesta variada y deliciosa, pensadas para acompañar cada celebración.</p>

                <div className="galeria">
                  <img src="/images/CATSL.jpg" alt="salado 1" />
                  <img src="/images/catering3.jpg" alt="salado 2" />
                  <img src="/images/catering4.jpg" alt="salado 3" />
                  <img src="/images/catering5.jpg" alt="salado 4" />
                  <img src="/images/catering6.jpg" alt="salado 5" />
                  <img src="/images/catering7.jpg" alt="salado 6" />
                </div>
            </div>
        </section>
    ); 
}

export default ServiciosPage;