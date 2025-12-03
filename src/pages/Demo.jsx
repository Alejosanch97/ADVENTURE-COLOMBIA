// Demo.jsx (CÓDIGO CORREGIDO Y CON FUNCIONALIDAD DE CLIC Y SCROLL CONTROLADO)

import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react'; // 👈 IMPORTAR useRef
import "../Styles/demo.css"; 

// =================================================================
// 1. IMPORTAR LAS IMÁGENES (Se mantiene igual)
// =================================================================
const stepImage1 = 'https://i.pinimg.com/1200x/72/0c/b6/720cb6a3cb354d4885be409ba528ed60.jpg'; 
const stepImage2 = 'https://i.pinimg.com/1200x/ff/26/21/ff2621724f1cf5e8012820cd3bc7e2fd.jpg';
const stepImage3 = 'https://i.pinimg.com/1200x/76/2e/fe/762efe7ab6168eeb331a5967f6509687.jpg';
const stepImage4 = 'https://i.pinimg.com/1200x/3b/37/40/3b3740da17ecebb000f2b8bee1a810e0.jpg';
const stepImage5 = 'https://i.pinimg.com/736x/2b/48/16/2b4816379801246810ee679e976bc3a1.jpg';
const stepImage6 = 'https://i.pinimg.com/736x/76/56/76/7656762ab886421ab64256716679d719.jpg';
const stepImage7 = 'https://i.pinimg.com/736x/a3/75/61/a375614f257c37b8ecd4bcd95d490945.jpg';

const imageMap = {
    'step-bg-1': stepImage1,
    'step-bg-2': stepImage2,
    'step-bg-3': stepImage3,
    'step-bg-4': stepImage4,
    'step-bg-5': stepImage5,
    'step-bg-6': stepImage6,
    'step-bg-7': stepImage7,
};

const stepsData = [
    // (Se mantiene igual, ¡7 pasos!)
    { num: '01', title: 'Inspírate y Elige', desc: 'Navega por nuestra amplia oferta de viajes nacionales e internacionales. Tu próxima gran aventura comienza aquí, impulsada por la pasión colombiana.', imageKey: 'step-bg-1', colorClass: 'color-darkblue' },
    { num: '02', title: 'Asesoría y Conexión Directa', desc: 'Selecciona tu viaje ideal y contáctanos vía WhatsApp. Nuestro equipo te brindará asesoría personalizada y el link para la separación de cupo.', imageKey: 'step-bg-2', colorClass: 'color-lightgreen' },
    { num: '03', title: 'Asegura tu Aventura', desc: 'Realiza la separación de tu cupo con el valor mínimo requerido. ¡Felicidades! Estás un paso más cerca de vivir tu sueño.', imageKey: 'step-bg-3', colorClass: 'color-tan' },
    { num: '04', title: 'Preparación y Charla Viajera', desc: 'Únete a nuestro grupo privado de viajeros y participa en las charlas virtuales informativas. Resolvemos tus dudas logísticas y te damos consejos clave.', imageKey: 'step-bg-4', colorClass: 'color-lightblue' },
    { num: '05', title: 'Soporte y Cierre', desc: 'Te acompañamos en el proceso final. Recibe el itinerario detallado y el soporte final pre-viaje de nuestros expertos.', imageKey: 'step-bg-5', colorClass: 'color-darkgreen' },
    { num: '06', title: '¡Vive la Felicidad!', desc: 'Es hora de desconectar, emocionarte y disfrutar tu viaje al máximo. Crea recuerdos imborrables y siente la alegría de la aventura.', imageKey: 'step-bg-6', colorClass: 'color-red' },
    { num: '07', title: 'Conexión para Siempre', desc: 'El viaje terminó, pero la amistad continúa. Comparte tus fotos, sigue haciendo parte de nuestra comunidad y ¡planeemos tu próxima escapada!', imageKey: 'step-bg-7', colorClass: 'color-orange' }
];

export const Demo = () => {
    const [activeStep, setActiveStep] = useState('01');
    const isScrolling = useRef(false); // 👈 REF para controlar si el scroll está en curso
    // 🚀 AJUSTE CLAVE AQUÍ: useEffect para forzar el scroll al inicio (Paso 1)
    useEffect(() => {
        // Asegura que el scroll esté en la parte superior (posición 0) al cargar la página.
        window.scrollTo(0, 0); 
    }, []); // El array vacío [] asegura que se ejecute solo al montar.
    
    // Función para manejar el CLIC en los DOTS
    const handleDotClick = (stepNum) => {
        const stepElement = document.querySelector(`#step-${stepNum}`);
        if (stepElement) {
            // 1. Desactivar la detección de scroll temporalmente
            isScrolling.current = true; 
            
            // 2. Desplazarse suavemente a la sección
            window.scrollTo({
                top: stepElement.offsetTop,
                behavior: 'smooth'
            });

            // 3. Actualizar el estado activo inmediatamente
            setActiveStep(stepNum);

            // 4. Reactivar la detección de scroll después de la animación
            // La animación 'smooth' suele durar ~500ms, usamos 700ms para seguridad.
            setTimeout(() => {
                isScrolling.current = false;
            }, 700); 
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            // 👈 Ignorar la detección de scroll si estamos haciendo scroll programado (por clic)
            if (isScrolling.current) return; 

            const steps = document.querySelectorAll('.step-section');
            let currentActiveStep = '01'; 

            steps.forEach((step) => {
                const stepTop = step.getBoundingClientRect().top;
                const stepHeight = step.offsetHeight;
                
                // Mantiene el paso activo si está cerca del centro de la vista
                if (stepTop <= window.innerHeight / 2 && stepTop + stepHeight > window.innerHeight / 2) {
                    currentActiveStep = step.getAttribute('data-step-number');
                }
            });
            
            setActiveStep(currentActiveStep);
        };

        // Usa un temporizador para evitar cálculos excesivos durante el scroll
        let scrollTimeout;
        const throttledScroll = () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    handleScroll();
                    scrollTimeout = null;
                }, 50); // Ajusta la frecuencia de actualización
            }
        };

        window.addEventListener('scroll', throttledScroll);
        handleScroll(); // Establece el paso inicial

        return () => window.removeEventListener('scroll', throttledScroll);
    }, []);

    return (
        <main className="how-it-works-page">
            
            {/* Indicador Central Fijo */}
            <div className="fixed-step-indicator">
                <h1 className="how-it-works-title">HOW IT ALL WORKS</h1> 
                
                <div className="step-circle-wrapper">
                    <div className="step-number-circle">
                        <span className="step-number">{activeStep}</span>
                        {/* Puntos de la animación */}
                        {stepsData.map((step, index) => (
                            <div 
                                key={index}
                                className={`dot dot-${index + 1} ${activeStep === step.num ? 'dot-active' : ''}`}
                                onClick={() => handleDotClick(step.num)} // 👈 AÑADIR EVENTO onClick
                                style={{ pointerEvents: 'auto' }} // 👈 Habilitar el clic sobre el dot
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contenedor de las Secciones que se Desplazan */}
            <div className="steps-container">
                {stepsData.map((step, index) => {
                    const isEven = (index + 1) % 2 === 0;
                    
                    return (
                        <section 
                            key={step.num} 
                            className={`step-section ${step.colorClass}`}
                            data-step-number={step.num}
                            id={`step-${step.num}`} // 👈 ID para la navegación
                        >
                            <div className="step-content-container">
                                
                                <div className={`step-half step-image-side ${isEven ? 'order-1' : 'order-2'}`}>
                                    <img 
                                        src={imageMap[step.imageKey]} 
                                        alt={`Paso ${step.num}: ${step.title}`}
                                        className="step-image" 
                                    />
                                </div>

                                <div className={`step-half step-text-side ${isEven ? 'order-2' : 'order-1'}`}>
                                    
                                    <div className="step-text-details">
                                        <h3 className="step-small-title">STEP {step.num}</h3>
                                        <p className="step-description">{step.desc}</p>
                                        <p className="step-title-alt">{step.title}</p>
                                    </div>
                                </div>

                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
};