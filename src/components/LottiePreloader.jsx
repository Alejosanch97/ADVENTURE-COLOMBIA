import React from 'react';
import Lottie from 'lottie-react';
import video from '../assets/img/Avion.json'; 
import '../Styles/lottiePreloader.css'; 
import fondo from "../assets/img/fondo.jpg"; // Mantener import por si se necesita después

const LottiePreloader = () => {
    return (
        // Contenedor principal con clase única
        <div className="lottie-preloader-container-full">

            {/* Marcadores de Esquina (Corner Markers) - Clases únicas */}
            <div className="lottie-preloader-corner-marker top-left"></div>
            <div className="lottie-preloader-corner-marker top-right"></div>
            <div className="lottie-preloader-corner-marker bottom-left"></div>
            <div className="lottie-preloader-corner-marker bottom-right"></div>

            {/* Wrapper de contenido con clase única */}
            <div className="lottie-preloader-content-wrapper">
                
                {/* 1. TEXTO DINÁMICO CON EFECTO STAGGERED - Clases únicas */}
                <div className="lottie-preloader-dynamic-text-group">
                    <p className="lottie-preloader-dynamic-word word-1">Dream.</p>
                    <p className="lottie-preloader-dynamic-word word-2">Explore.</p>
                    <p className="lottie-preloader-dynamic-word word-3">Adventure.</p>
                </div>
                
                {/* 2. Lottie Animation - No estaba en el original, pero si la añades, usa esta clase:
                <Lottie 
                    animationData={video} 
                    loop={true} 
                    className="lottie-preloader-animation" 
                /> */}

                {/* 3. MENSAJE DE CARGA - Clase única */}
                <p className="lottie-preloader-loading-message-dynamic">
                    Preparando tu próxima adventure...
                </p>
                
                {/* 4. BARRA DE CARGA ESTÉTICA - Clases únicas */}
                <div className="lottie-preloader-loading-bar-placeholder">
                    <div className="lottie-preloader-loading-bar-progress"></div>
                </div>
            </div>
        </div>
    );
};

export default LottiePreloader;