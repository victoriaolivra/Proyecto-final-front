import React, { useState } from "react";
import '../../Styles/Components/Layout/Nav.css';
import { NavLink } from "react-router-dom";

const Nav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav>
            <button
                type="button"
                className="hamburger"
                aria-expanded={isOpen}
                aria-controls="menu-principal"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰ Menú
            </button>
            <div className="holder">
                <ul id="menu-principal" className={isOpen ? "open" : ""}>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "activo" : undefined} onClick={() => setIsOpen(false)}>Home</NavLink></li>
                    <li><NavLink to="/nosotros" className={({ isActive }) => isActive ? "activo" : undefined} onClick={() => setIsOpen(false)}>Nosotros</NavLink></li>
                    <li><NavLink to="/servicios" className={({ isActive }) => isActive ? "activo" : undefined} onClick={() => setIsOpen(false)}>Servicios</NavLink></li>
                    <li><NavLink to="/galeria" className={({ isActive }) => isActive ? "activo" : undefined} onClick={() => setIsOpen(false)}>Galería</NavLink></li>
                    <li><NavLink to="/novedades" className={({ isActive }) => isActive ? "activo" : undefined} onClick={() => setIsOpen(false)}>Novedades</NavLink></li>
                    <li><NavLink to="/contacto" className={({ isActive }) => isActive ? "activo" : undefined} onClick={() => setIsOpen(false)}>Contacto</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;