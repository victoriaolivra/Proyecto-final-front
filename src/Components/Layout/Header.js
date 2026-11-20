import React from "react";
import '../../Styles/Components/Layout/Header.css';

const Header =  (props) => {
    return (
        <header>
            <div className="holder">
                <img src="/images/logonew.jpeg" width="100" alt="bakes lourdes" />
                <div className="marca">
                    <h1>Bakes Lourdes</h1>
                    <span className="firma">hecho a mano, con amor</span>
                </div>
            </div>
        </header>
    );
}

export default Header;