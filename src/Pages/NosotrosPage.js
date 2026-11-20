import React from "react";
import "../Styles/Components/Pages/NosotrosPage.css";


const NosotrosPage = (props) => {
    return (
        <main className="holder pagina-nosotros">
            <div className="sobre-nosotros">
                <h2 className="titulo-pagina">Sobre Nosotros</h2>
                <p>Bakes Lourdes nació de una pasión por la pastelería y el deseo de transformar cada celebración en un recuerdo especial. Lo que comenzó como un pequeño emprendimiento desde casa, hoy da un nuevo paso con la apertura de su primer local.</p>
                <p>Cada torta, postre y creación está elaborado de forma artesanal, utilizando los mejores ingredientes y dedicando especial atención a cada detalle. Nuestro objetivo es ofrecer sabores únicos y hacer que cada cliente disfrute de un momento dulce e inolvidable.</p>
            </div>

            <div className="persona-destacada">
                <img src="/images/louNuev.jpeg" alt="Lourdes Parez" />
                <div className="persona-texto">
                    <h3>Lourdes Parez</h3>
                    <h4>Pastelera y Fundadora de Bakes Lourdes</h4>
                    <p>Soy Lourdes, la persona detrás de "Bakes Lourdes". Desde siempre disfruté preparar postres y sorprender a mi familia y amigos con nuevas recetas. Con el tiempo, esta pasión se convirtió en un sueño, abrir mi propia pastelería.</p>
                    <p>Hoy estoy dando mis primeros pasos con este emprendimiento, creando productos artesanales con mucho cariño y dedicación.</p>
                </div>
            </div>
        </main>
    );
}

export default NosotrosPage; 