import React from 'react';
import "../Styles/footer.css";

export const Footer = () => (
    <footer className="simple-footer">
        <div className="container footer-content">
            <p className="footer-brand">ADVENTURE COLOMBIA</p>
            <p className="footer-credits">
                Un proyecto de <strong>Daniel Gutiérrez</strong>
            </p>
            <p className="footer-motto">
                Creado por un explorador con la pasión de hacer realidad cada sueño.
            </p>
        </div>
    </footer>
);