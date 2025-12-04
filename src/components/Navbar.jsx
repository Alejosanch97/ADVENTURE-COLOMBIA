import { useState, useEffect } from 'react'; 
// Importa el ícono, si usas react-icons. Ejemplo con FaBars:
// import { FaBars, FaTimes } from 'react-icons/fa'; 
// Si no, usaremos un div o button simple.

import { NavLink, Link} from "react-router-dom"; 
import { HashLink } from "react-router-hash-link";
import "../Styles/navbar.css";
import logo from "../assets/img/logo.png"; 

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false); 
    // ✨ NUEVO ESTADO: Controla si el menú móvil está abierto
    const [menuOpen, setMenuOpen] = useState(false); 

    useEffect(() => {
        // ... (Tu lógica existente para handleScroll)
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50; 
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);
    
    // ✨ NUEVA FUNCIÓN: Para alternar el estado del menú
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };
    
    // Función para determinar la clase activa de NavLink
    const getNavLinkClass = ({ isActive }) => 
        `nav-item ${isActive ? "active-link" : ""}`;
        
    // ✨ NUEVA FUNCIÓN: Para cerrar el menú al hacer clic en un enlace (útil en móvil)
    const closeMenu = () => {
        setMenuOpen(false);
    };
    
    return (
        <nav className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <HashLink to="/#top" className="navbar-logo" onClick={closeMenu}> 
                    <img src={logo} alt="Puro Momentum Logo" className="logo" /> 
                </HashLink>

                {/* ✨ BOTÓN DE HAMBURGUESA: visible solo en móvil (estilo en CSS) */}
                <button className="menu-toggle" onClick={handleMenuToggle} aria-label="Abrir menú">
                    {/* Puedes usar íconos, o simplemente tres barras (estilizadas en CSS) */}
                    {menuOpen ? (
                        <div className="icon-close">X</div> // O <FaTimes />
                    ) : (
                        <div className="icon-menu">☰</div> // O <FaBars />
                    )}
                </button>


                {/* Enlaces de Navegación: Añadimos la clase 'open' si menuOpen es true */}
                <div className={`navbar-links ${menuOpen ? 'open' : ''}`}> 
                    <HashLink to="/#top" className="nav-item" onClick={closeMenu}>Inicio</HashLink> 
                    <NavLink to="/demo" className={getNavLinkClass} onClick={closeMenu}>NUESTRO PROCESO</NavLink>
                    <NavLink to="/colombia" className={getNavLinkClass} onClick={closeMenu}>Colombia</NavLink>
                    <NavLink to="/todos-los-viajes" className={getNavLinkClass} onClick={closeMenu}>VIAJES</NavLink>
                    
                    {/* Botón de Contacto VERSIÓN MÓVIL (nav-button-mobile) - Se oculta en desktop por CSS */}
                    <a
                        href="https://wa.me/3023042213"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-button-link nav-button-mobile" 
                        onClick={closeMenu} 
                    >
                        <div className="cta-btn"> 
                            CONTÁCTANOS
                        </div>
                    </a>
                </div>

                {/* BOTÓN DE CONTACTO VERSIÓN ESCRITORIO (navbar-button-desktop) */}
                <div className="navbar-button-desktop">
                    {/* AQUI ESTABA EL CODIGO DUPLICADO QUE CAUSABA EL SEGUNDO BOTÓN */}
                    <a
                        href="https://wa.me/3023042213"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-button-link" // Solo se usa la clase base de estilo de enlace
                    >
                        <div className="cta-btn">
                            CONTÁCTANOS
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    );
};