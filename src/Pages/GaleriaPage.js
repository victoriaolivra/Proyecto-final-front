import React from 'react';
import "../Styles/Components/Pages/GaleriaPage.css";

const GaleriaPage = (props) => {
    return (
        <main className="holder pagina-galeria">
            <h2 className="titulo-pagina">Nuestras Delicias</h2>
            <div className="categoria">
                <h3>Tortas de cumpleaños</h3>
                <div className="galeria">
                    <img src="/images/tortaI.jpeg" alt="torta I" />
                    <img src="/images/tortaxl2.jpeg" alt="torta 2" />
                    <img src="/images/torta3.jpeg" alt="torta 3" />
                    <img src="/images/torta4.jpeg" alt="torta 4" />
                    <img src="/images/tortafrutilla.jpeg" alt="torta 5" />
                    <img src="/images/tortafruta.jpeg" alt="torta 6" />
                </div>
            </div>

            <div className="categoria">
                <h3>Tartas Frutales</h3>
                <div className="galeria">
                    <img src="/images/tartaI.jpeg" alt="tartafrutal 1" />
                    <img src="/images/tarta3.jpeg" alt="tartafrutal 2" />
                    <img src="/images/tartafrutal5.jpeg" alt="tartafrutal 3" />
                    <img src="/images/tartafrutal6.jpeg" alt="tartafrutal 4" />
                    <img src="/images/tartafrutaI.jpeg" alt="tartafrutal 5" />
                    <img src="/images/tartafrutal2.jpeg" alt="tartafrutal 6" />
                </div>
            </div>

            <div className="categoria">
                <h3>Clásicas</h3>
                <div className="galeria">
                    <img src="/images/tarta4.jpeg" alt="tarta 1" />
                    <img src="/images/tarta2.jpeg" alt="tarta 2" />
                    <img src="/images/tartabanana.jpeg" alt="tarta 3" />
                    <img src="/images/tartapistacho.jpeg" alt="tarta 4" />
                    <img src="/images/brownie2.jpeg" alt="tarta 5" />
                    <img src="/images/rogelI.jpeg" alt="tarta 6" />
                </div>
            </div>

            <div className="categoria">
                <h3>Box Materos</h3>
                <div className="galeria">
                    <img src="/images/tortamatera.jpeg" alt="matera 1" />
                    <img src="/images/boxcuatrocuarto.jpeg" alt="matera 2" />
                    <img src="/images/tortainvertida.jpeg" alt="matera 3" />
                    <img src="/images/budines.jpeg" alt="matera 4" />
                    <img src="/images/boxtartas.jpeg" alt="matera 5" />
                    <img src="/images/box4tarta.jpeg" alt="matera 6" />
                </div>
            </div>
        </main>
    )
}

export default GaleriaPage;