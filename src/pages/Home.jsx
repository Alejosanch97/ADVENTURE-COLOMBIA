import React, { useState, useEffect } from 'react';
const video1 = "https://res.cloudinary.com/deafueoco/video/upload/v1776440899/02_1_rhsmu5.mov";

import "../Styles/home.css"; 
import icon1 from "../assets/img/icon2.png"; // Satisfacción (Trofeo/Laurel)
import icon2 from "../assets/img/icon1.png"; // Separar cupo (Ticket)
import icon3 from "../assets/img/icon3.png"; // No fees (Mapa/Planeación)
import icon4 from "../assets/img/icon4.png"; // WhatsApp (Teléfono/Soporte)
import icon5 from "../assets/img/icon5.png"; // Guías Expertos (Sombrero/Persona)
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"; 

// !!! SIMULACIÓN DE IMÁGENES: USARÉMOS TUS ENLACES DE PINTEREST PARA ESTE EJEMPLO !!!
const luxuryTrainImage = "https://i.pinimg.com/736x/ef/57/a0/ef57a0b2abf1eea377df36bcb10b872f.jpg";
const horsebackRidingImage = "https://i.pinimg.com/736x/1e/4a/68/1e4a687e8e603fa952e56478bbe89d8b.jpg";
// Usaremos una imagen diferente para la tercera tarjeta y para el carrusel, basada en tus imágenes
const mountainsImage = "https://i.pinimg.com/736x/a1/39/76/a13976e8f3a047bc081b942ee54ca96a.jpg"; 
const romeImage = "https://i.pinimg.com/736x/44/e6/3f/44e63fd319fe4ca864502c5819b45a6e.jpg";
const japanImage = "https://i.pinimg.com/736x/76/56/76/7656762ab886421ab64256716679d719.jpg"; // Usado para simular la pagoda de Japón
const costaRicaImage = "https://i.pinimg.com/736x/86/72/da/8672da141690b9098c9c433f1aae593b.jpg"; // Usado para simular la selva de Costa Rica
const europa = "https://i.pinimg.com/736x/74/f7/a0/74f7a0855a495544833890b5d76a27db.jpg";
const mexico = "https://i.pinimg.com/1200x/46/53/35/465335513731ac681e8d36069f85bb8f.jpg";

// Definimos la URL temporal de la imagen que quieres usar
const placeholderImage = "https://i.pinimg.com/1200x/f6/93/41/f693414005b0587cf29b3108560f0587.jpg";

// Datos para la nueva sección
const destinations = [
    { name: 'COLOMBIA', image: "https://i.pinimg.com/736x/4b/58/ae/4b58ae589fc8ce36b39ab2f10ed0cc3d.jpg" }, // Usando mountainsImage
    { name: 'PERU', image: "https://i.pinimg.com/736x/94/50/bd/9450bd49fb017c52b98e547e0c80997b.jpg" },
    { name: 'BOLIVIA', image: "https://i.pinimg.com/736x/e5/7d/76/e57d768313b871ffcb9bc15d829a550c.jpg" },
    { name: 'GUATEMALA', image: "https://i.pinimg.com/1200x/21/cc/c8/21ccc846e7dddb3b9aecec100ad2f300.jpg" },
    { name: 'MEXICO', image: "https://i.pinimg.com/736x/2f/f4/0d/2ff40d06f7e6fda235ea0fb00e6cd0b8.jpg" },
    { name: 'EUROPA', image: "https://i.pinimg.com/736x/8e/d0/2d/8ed02daed42b64b471af335418476f6f.jpg" }, // Usada antes para Europa
    { name: 'MEDITERRANEO', image: "https://i.pinimg.com/736x/4d/9e/7b/4d9e7be6d441142be895a0bceb03b285.jpg" },
    { name: 'ASIA', image: "https://i.pinimg.com/1200x/aa/df/ba/aadfba80c32936d84af2d27769dc73ab.jpg" },
];
const months = [
    { name: 'ENERO', image: "https://i.pinimg.com/1200x/59/80/a6/5980a68f9ee2f1f7ebf5167328755ebe.jpg"},
    { name: 'FEBRERO', image: "https://i.pinimg.com/1200x/de/e0/6b/dee06b291d70f5459e965e44efacf0be.jpg" },
    { name: 'MARZO', image: "https://i.pinimg.com/1200x/68/af/54/68af548a1630be18b563e648a84e6ffe.jpg" },
    { name: 'ABRIL', image: "https://i.pinimg.com/736x/74/fb/6d/74fb6df7ee3236bbc06c7651d0608489.jpg" },
    { name: 'MAYO', image: "https://i.pinimg.com/736x/47/cd/df/47cddf83fa7faaf352bc94c4aba68537.jpg" },
    { name: 'JUNIO', image: "https://i.pinimg.com/736x/20/9d/47/209d47305b5aa7ce86c04384c584ad50.jpg" },
    { name: 'JULIO', image: "https://i.pinimg.com/1200x/f8/8e/51/f88e510b0b5757e5cce2555ae7fd6636.jpg" },
    { name: 'AGOSTO', image: "https://i.pinimg.com/736x/32/2b/5b/322b5b7565606dab511e4dec4a51e718.jpg" },
    { name: 'SEPTIEMBRE', image: "https://i.pinimg.com/1200x/de/43/9a/de439a3eb58f2bae6ae8b3ba3f7b977f.jpg" },
    { name: 'OCTUBRE', image: "https://i.pinimg.com/736x/13/9a/dc/139adc9311f86bb537e7d0a6647b7727.jpg" },
    { name: 'NOVIEMBRE', image: "https://i.pinimg.com/1200x/14/93/98/149398dd95d4be3e1fbb1537ece43a4c.jpg" },
    { name: 'DICIEMBRE', image: "https://i.pinimg.com/736x/50/bc/3e/50bc3e37f2f9954a96412a9cafc6da55.jpg" },
];

const testimonials = [
    {
        // 1. Avistamiento de Ballenas (Colombia)
        quote: "¡MAJESTUOSO! SENTIR LA FUERZA DE LAS JOROBADAS TAN CERCA FUE UN REGALO DE LA VIDA. LA NATURALEZA EN SU MÁXIMO ESPLENDOR.",
        author: "Camila Restrepo, Medellín, Colombia",
        image: "https://i.pinimg.com/736x/b9/d5/02/b9d5028ea1af229ab2ef328dfbd64853.jpg" // Simulación: Foto de una ballena jorobada saltando o aletas
    },
    {
        // 2. Nevado del Cocuy (Colombia)
        quote: "VER EL COCUY FUE UNA EXPERIENCIA QUE NOS CAMBIÓ LA PERCEPCIÓN DEL SILENCIO. UN DESAFÍO FÍSICO CON UNA RECOMPENSA VISUAL INCOMPARABLE.",
        author: "Andrés y Sofía, Bogotá, Colombia",
        image: "https://i.pinimg.com/736x/df/97/ed/df97ed33b3101aa5a7c85b06f1bc8eb3.jpg" // Simulación: Foto del glaciar o frailejones en el Cocuy
    },
    {
        // 3. Guatapé y El Peñol (Colombia)
        quote: "LOS COLORES DE GUATAPÉ SON UN ABRAZO AL ALMA. SUBIR EL PEÑOL Y VER ESE PAISAJE FUE VER CÓMO LA ALEGRÍA COLOMBIANA PINTÓ LA TIERRA.",
        author: "Ricardo Gómez, Cali, Colombia",
        image: "https://i.pinimg.com/736x/c1/ff/d0/c1ffd0f94d731160f7e1b2e40eaab7b2.jpg" // Simulación: Vista panorámica de Guatapé y el embalse desde el Peñol
    },
    {
        // 4. Perú (Mundo - Machu Picchu)
        quote: "¡LA PRIMERA VEZ HACIENDO SANDBOARD! QUÉ ADRENALINA. NO HAY MEJOR FORMA DE BAJAR ESAS DUNAS QUE CON LA ENERGÍA Y EL EQUIPO DE ADVENTURE. HUACACHINA ES INCREÍBLE.",
        author: "Alejo, Bogotá, Colombia",
        image: "https://i.pinimg.com/736x/2b/a7/0f/2ba70f8f93d72d0589613f8d9c1cfe26.jpg" // Simulación: Foto de Machu Picchu al amanecer
    },
    {
        // 5. Guatemala (Mundo - Tikal/Atitlán)
        quote: "Tikal y Atitlán son la prueba de que la magia existe. VOLVIMOS LLENOS DE NUEVAS AMISTADES Y CON LA CERTEZA DE QUE EL MUNDO ES UN TESORO.",
        author: "Juan Pablo, Pereira, Colombia",
        image: "https://i.pinimg.com/1200x/a1/9a/34/a19a34d7e160eba46686cb67bc020a6c.jpg" // Simulación: Foto del Lago Atitlán con volcanes
    },
    {
        // 6. Día de Muertos (Mundo - México)
        quote: "¡MÉXICO SUPERÓ TODO! NUNCA PENSÉ PASARLA TAN BIEN. CUMPLÍ EL SUEÑO DE CONOCER EL ORIGEN DE ESA MÚSICA QUE ME ENAMORÓ DE NIÑO. FUE PURA MAGIA Y ALEGRÍA.",
        author: "Don Lucho, Colombia",
        image: "https://i.pinimg.com/736x/5c/79/0d/5c790dae77314e59fdda693795a94bdd.jpg" // Simulación: Foto de una ofrenda colorida o catrinas en México
    }
    
];

// ===============================================
// FUNCIÓN CLAVE: Determina la ruta de navegación
// ===============================================
const getCountryPath = (countryName) => {
    const normalizedName = countryName.toUpperCase();
    if (normalizedName === 'COLOMBIA') {
        // Ruta fija para Colombia
        return '/colombia';
    } else {
        // Ruta dinámica para viajes internacionales (ej: /viajes-internacionales/peru)
        // Convertimos el nombre a minúsculas para el parámetro de la URL
        return `/viajes-internacionales/${countryName.toLowerCase()}`;
    }
};

export const Home = () => {
    const videoSources = [video1];
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('destination'); // Estado para controlar el filtro activo
    // *** ESTADO Y DATOS PARA EL CARRUSEL DE TESTIMONIOS ***
    const [currentIndex, setCurrentIndex] = useState(0);

    // CLAVE: Clonamos el primer testimonio al final para el loop
    const carouselItems = [...testimonials, testimonials[0]];
    const totalOriginalItems = testimonials.length;
    const totalCarouselItems = carouselItems.length; // N + 1

    // *** LÓGICA DE MOVIMIENTO AUTOMÁTICO (Loop Infinito) ***
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                
                // Si el índice es el último (el clon: N)
                if (nextIndex >= totalCarouselItems) {
                    return 0; // Regresa al índice 0 (T0 original)
                }

                // CLAVE DEL LOOP: Cuando se desliza al clon (índice N-1), 
                // debemos saltar instantáneamente al índice 0.
                if (nextIndex === totalCarouselItems - 1) {
                    
                    // 1. Espera la duración de la transición (800ms)
                    setTimeout(() => {
                        const carousel = document.querySelector('.testimonial-content-scroll');
                        if (carousel) {
                            // 2. Desactivamos la transición para el salto instantáneo
                            carousel.style.transition = 'none';
                            setCurrentIndex(0); // Saltamos al T0 original
                            
                            // 3. Reactivamos la transición para el siguiente deslizamiento suave
                            setTimeout(() => {
                                carousel.style.transition = 'transform 0.8s ease-in-out';
                            }, 50); // Pequeño retraso
                        }
                    }, 800); // Duración de la transición CSS
                    
                    return nextIndex; // Devolvemos el índice del clon (N-1) para que el deslizamiento se complete
                }
                
                return nextIndex; // Continúa el movimiento normal (0 -> 1 -> 2)
            });
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(interval);
    }, [totalCarouselItems]);

    // Función para manejar el cambio manual (al hacer clic en los puntos)
    const handleDotClick = (index) => {
        const carousel = document.querySelector('.testimonial-content-scroll');
        if (carousel) {
            carousel.style.transition = 'transform 0.8s ease-in-out';
            setCurrentIndex(index);
        }
    };
    
    // CLAVE: Calculamos el índice para los puntos (excluyendo el clon)
    const dotIndex = currentIndex % totalOriginalItems; 
    
    // CLAVE: Desactivamos la transición en el JSX cuando el índice es 0, 
    // pero solo si estamos viniendo del clon (para el salto instantáneo).
    const isInstantJump = currentIndex === 0 && document.querySelector('.testimonial-content-scroll')?.style.transition === 'none';
    // **********************************************
    // * CAMBIO CLAVE: Videos cambian cada 5 segundos *
    // **********************************************
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex(prevIndex => 
                (prevIndex + 1) % videoSources.length
            );
        }, 4000); // 5000ms = 5 segundos
        return () => clearInterval(interval);
    }, [videoSources.length]);

    // *** FUNCIÓN CLAVE PARA NAVEGAR Y FILTRAR ***
    const handleNavigateToMonth = () => {
        // 1. Establece el filtro a 'month'
        setActiveFilter('month');

        // 2. Espera un ciclo de renderizado (setTimeout 0) para asegurar que el estado se actualice
        // y luego desplázate al ID deseado.
        setTimeout(() => {
            const section = document.getElementById('viajes-por-mes');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    };

    return (
        <main>
            {/* ======================================= */}
            {/* SECCIÓN 1: HERO/VIDEO BACKGROUND (DISEÑO MEJORADO) */}
            {/* ======================================= */}
            <section className="hero-section">
                <div className="video-background">
                    <video 
                        className="video-element"
                        key={currentVideoIndex}
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        src={videoSources[currentVideoIndex]}
                    />
                </div>
                <div className="hero-content">
                    <div className="text-center">
                        <h1 className="hero-title">
                            EL MUNDO ESPERA <br />
                            {/* Aplicamos el color amarillo aquí */}
                            <span className="colombia-yellow"> TU PRÓXIMA GRAN HISTORIA.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Permite que COLOMBIA y el MUNDO te despierten. Nuestras historias ya están listas: una melodía de paisajes, sabores y la felicidad que te espera con los brazos abiertos.
                        </p>
                        <div className="hero-actions">
                            {/* Aplicamos las clases para el efecto hover Rojo/Azul */}
                            <button 
                                className="btn-browse btn-azul-hover"
                                onClick={handleNavigateToMonth} // <-- USAMOS LA FUNCIÓN AQUÍ
                            >
                                MIRA LOS DESTINOS QUE TE ESPERAN
                            </button>
                        </div>
                    </div>
                </div>
                <div className="scroll-indicator">SCROLL</div>
            </section>

            {/* ======================================= */}
            {/* SECCIÓN 2A: THE LUXURY TRAVEL EXPERTS (TEXTO CENTRADO) */}
            {/* Se ve en la Imagen 3 de tu último envío */}
            {/* ======================================= */}
            <section className="travel-experts-section">
                <div className="container text-center">
                    {/* *** CAMBIO CLAVE EN EL TÍTULO *** */}
                    <h2 className="section-title">
                        <span className="colombia-yellow-bg">🇨🇴 PASIÓN COLOMBIANA</span>, EXPERIENCIA GLOBAL
                    </h2>
                    
                    <p className="section-body">
                        Somos la alegría que viaja. Seleccionamos las experiencias más emblemáticas de Colombia y destinos asombrosos del mundo. Nuestra pasión es conectarte con el sabor vibrante de nuestra gente.
                    </p>
                    <p className="section-body">
                        <span className="colombia-red-text">¡La felicidad nos espera!</span> Empecemos esta gran historia.
                    </p>
                    
                    {/* Aplicamos la clase para el hover Azul */}
                    <Link to="/todos-los-viajes" className="btn-start-journey btn-blue-hover">
                        INICIA TU ADVENTURE
                    </Link>
                </div>
            </section>

            {/* ======================================= */}
            {/* SECCIÓN 2B: HOW WE'RE DIFFERENT (LAS 3 TARJETAS) */}
            {/* Se ve en la Imagen 4/5 de tu último envío */}
            {/* ======================================= */}
            <section className="how-were-different-section">
                <div className="container">
                    <h2 className="section-header">ESTA ES LA ALEGRÍA QUE NOS HACE ÚNICOS</h2>
                    
                    <div className="difference-cards-col">
                        {/* Tarjeta 1 */}
                        <div className="card-item">
                            <div className="card-image-wrapper">
                                <img src={luxuryTrainImage} alt="Luxury Expertise" className="card-image" />
                            </div>
                            <h4 className="card-title">EXPERIENCIA CON ALMA COLOMBIANA</h4>
                            <p className="card-description">
                                Somos más que expertos; somos viajeros que viven y sienten el mundo, de la Sierra Nevada al Amazonas. Nuestro gran trayecto nacional e internacional es tu garantía de viaje y la amistad sincera que nos define.
                            </p>
                        </div>
                        
                        {/* Tarjeta 2 */}
                        <div className="card-item">
                            <div className="card-image-wrapper">
                                <img src={horsebackRidingImage} alt="Unparalleled Access" className="card-image" />
                            </div>
                            <h4 className="card-title">ACCESO SIN LÍMITES AL MUNDO</h4>
                            <p className="card-description">
                                Viajamos con el corazón. Dejamos atrás las rutas obvias para abrirte puertas a conexiones íntimas y profundas. Te llevamos a ver el mundo de cerca, con la curiosidad y el asombro que mereces.
                            </p>
                        </div>
                        
                        {/* Tarjeta 3 */}
                        <div className="card-item">
                            <div className="card-image-wrapper">
                                <img src={mountainsImage} alt="Completely Bespoke" className="card-image" />
                            </div>
                            <h4 className="card-title">ARTESANOS DE TUS SUEÑOS</h4>
                            <p className="card-description">
                                Tu sueño, nuestra misión. Facilitamos cada paso de ese viaje que siempre has querido hacer. Quitamos los "peros" del camino para que, sin importar tu profesión, solo tengas que vivir, emocionado y libre.
                            </p>
                        </div>
                    </div>
                     <div className="full-width-button-wrapper">
                        <Link to="/demo">
                            <button className="btn-learn-process">
                                APRENDE SOBRE NUESTRO PROCESO
                            </button>
                        </Link>
                     </div>
                </div>
            </section>

            {/* ======================================= */}
            {/* SECCIÓN 3: POPULAR TRIPS SECTION (SCROLL HORIZONTAL) */}
            {/* Se ve en la Imagen 6 de tu último envío */}
            {/* ======================================= */}
            <section className="popular-trips-section">
                <div className="popular-trips-inner">
                    {/* Columna Izquierda: Títulos y Botones (Estilo Sidebar) */}
                    <div className="trips-sidebar">
                        <h2 className="sidebar-title">¡LA AVENTURA ES AQUÍ!</h2>
                        <p className="sidebar-subtitle">
                            LOS VIAJES QUE ESTÁN HACIENDO HISTORIA.
                        </p>
                        {/* Las imágenes no muestran botones aquí, solo el texto y el título */}
                    </div>

                    {/* Columna Derecha: Carrusel (Scroll Horizontal) */}
                    <div className="trips-carousel">
                        <div className="carousel-content">
                            
                            {/* Tarjeta de Viaje 1 */}
                            <div className="trip-card">
                                <div className="trip-card-image-wrapper">
                                    <img src={romeImage} alt="Rome, Colosseum" className="trip-card-image" />
                                    <span className="card-duration">8 NOCHES</span>
                                </div>
                                <div className="trip-card-text">
                                    <h4 className="trip-card-title">PERÚ: LA RUTA MÁS EMOCIONANTE HACIA EL CORAZÓN DE LOS ANDES.</h4>
                                    <button 
                                        className="btn-trip-explore"
                                        onClick={() => window.open('https://www.canva.com/design/DAGIasNvDmg/l9UQzb2z5vuI-xvjr71vjw/view?utm_content=DAGIasNvDmg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4347b4fc4d#1', '_blank')}
                                    >
                                        ¡VIVE LA AVENTURA!
                                    </button>
                                </div>
                            </div>

                            {/* Tarjeta de Viaje 2 */}
                            <div className="trip-card">
                                <div className="trip-card-image-wrapper">
                                    <img src={japanImage} alt="Japan Pagoda" className="trip-card-image" />
                                    <span className="card-duration">8 NOCHES / 12 NOCHES</span>
                                </div>
                                <div className="trip-card-text">
                                    <h4 className="trip-card-title">GUATEMALA: AVENTURA ENTRE VOLCANES, SELVAS Y CULTURA</h4>
                                    <button 
                                        className="btn-trip-explore"
                                        onClick={() => window.open('https://www.canva.com/design/DAGZHwUoeIY/7HcyBVUHcEY7wsPNnYhlYg/view?utm_content=DAGZHwUoeIY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h89eaa2676f', '_blank')}
                                    >
                                        ¡VIVE LA AVENTURA!
                                    </button>
                                </div>
                            </div>

                            {/* Tarjeta de Viaje 3 */}
                            <div className="trip-card">
                                <div className="trip-card-image-wrapper">
                                    <img src={costaRicaImage} alt="Costa Rica Bridge" className="trip-card-image" />
                                    <span className="card-duration">8 NIGHTS</span>
                                </div>
                                <div className="trip-card-text">
                                    <h4 className="trip-card-title">BOLIVIA: LA RUTA DEL SURREALISMO ANDINO (UYUNI, LAGO TITICACA Y DESIERTO DALÍ)</h4>
                                    <button 
                                        className="btn-trip-explore"
                                        onClick={() => window.open('https://www.canva.com/design/DAGIainxJEU/KOTkXw06Xxva2VnbwhaE6g/view?#1', '_blank')}
                                    >
                                        ¡VIVE LA AVENTURA!
                                    </button>
                                </div>
                            </div>

                            {/* Tarjeta de Viaje 4 (Para forzar el scroll) */}
                            <div className="trip-card">
                                <div className="trip-card-image-wrapper">
                                    <img src={europa} alt="Greece Beach" className="trip-card-image" />
                                    <span className="card-duration">17 NOCHES</span>
                                </div>
                                <div className="trip-card-text">
                                    <h4 className="trip-card-title">EUROPA: LA TRAVESÍA APASIONANTE ENTRE ARTE, GASTRONOMÍA Y CIUDADES DE ENSUEÑO</h4>
                                    <button className="btn-trip-explore">¡VIVE LA AVENTURA!</button>
                                </div>
                            </div>
                            {/* Tarjeta de Viaje 5 (Para forzar el scroll) */}
                            <div className="trip-card">
                                <div className="trip-card-image-wrapper">
                                    <img src={mexico} alt="Greece Beach" className="trip-card-image" />
                                    <span className="card-duration">8 NOCHES</span>
                                </div>
                                <div className="trip-card-text">
                                    <h4 className="trip-card-title">¡LA MAGIA DE MÉXICO TE ESPERA! EXPLORA MAYAS, SABORES Y FESTEJOS ETERNOS.</h4>
                                    <button className="btn-trip-explore">¡VIVE LA AVENTURA!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ======================================= */}
            {/* SECCIÓN 4: HOW DO YOU TRAVEL? (FILTROS CORREGIDOS) */}
            {/* ======================================= */}
            <section className="travel-finder-section" id="viajes-por-mes">
                <div className="container">
                    <h2 className="finder-main-title">¿CUÁL SERÁ TU PRÓXIMO GRAN VIAJE?</h2>
                    
                    {/* Controles de Filtro */}
                    <div className="finder-filters">
                        <button 
                            className={`filter-btn ${activeFilter === 'destination' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('destination')}
                        >
                            POR DESTINO
                        </button>
                        <button 
                            className={`filter-btn ${activeFilter === 'month' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('month')}
                        >
                            POR MES
                        </button>
                    </div>

                    {/* Contenido de las Tarjetas (Grid) */}
                    <div className={`finder-content-grid ${activeFilter === 'destination' ? 'grid-4-cols' : 'grid-6-cols'}`}>
                        
                        {/* Renderizar Destinos */}
                        {activeFilter === 'destination' && destinations.map((item, index) => (
                            // *** RUTA DINÁMICA POR PAÍS ***
                            <Link 
                                key={`dest-${index}`} 
                                to={getCountryPath(item.name)} 
                                className="grid-item destination-link"
                            >
                                <img src={item.image} alt={item.name} className="grid-image" />
                                <span className="item-label">{item.name}</span>
                            </Link>
                        ))}

                        {/* Renderizar Meses - ¡CORRECCIÓN APLICADA AQUÍ! */}
                        {activeFilter === 'month' && months.map((item, index) => (
                            // *** RUTA DINÁMICA POR MES HACIA MonthlyTripPage ***
                            <Link 
                                key={`month-${index}`} 
                                // to debe apuntar a la nueva ruta y pasar el mes en minúsculas
                                to={`/viajes-por-mes/${item.name.toLowerCase()}`} 
                                className="grid-item month-link"
                            >
                                <img src={item.image} alt={item.name} className="grid-image" />
                                <span className="item-label">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            {/* ======================================= */}
            {/* SECCIÓN 5: TESTIMONIOS / COMENTARIOS (LOOP INFINITO) */}
            {/* ======================================= */}
            <section className="testimonials-section">
                <div className="container">
                    <h2 className="testimonials-main-title">¿POR QUÉ LOS VIAJEROS ELIGEN NUESTRA PASIÓN?</h2>

                    <div className="testimonial-carousel-wrapper">
                        
                        <div 
                            className="testimonial-content-scroll"
                            style={{ 
                                // Se mueve al 50% por cada tarjeta (muestra 2 a la vez)
                                transform: `translateX(-${currentIndex * 50}%)`,
                                // CLAVE: Se maneja la transición directamente en el useEffect/CSS
                            }}
                        >
                            {/* *** Usamos el array CLONADO *** */}
                            {carouselItems.map((testimonial, index) => (
                                <div key={index} className="testimonial-card">
                                    
                                    <div className="testimonial-image-wrapper">
                                        <img 
                                            src={testimonial.image} 
                                            alt={`Testimonio de ${testimonial.author}`} 
                                            className="testimonial-image" 
                                        />
                                    </div>
                                    
                                    <div className="testimonial-text-content">
                                        <span className="quote-icon">“</span>
                                        <p className="quote-text">{testimonial.quote}</p>
                                        <p className="quote-author">{testimonial.author}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    
                    {/* *** INDICADORES DE PUNTOS (Dots) *** */}
                    <div className="carousel-dots">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === dotIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                                aria-label={`Ir al testimonio ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </section>
            {/* ======================================= */}
            {/* SECCIÓN 6: POR QUÉ ELEGIRNOS (ICONOS DE ASSETS) */}
            {/* ======================================= */}
            <section className="why-choose-us-section">
                <div className="container">
                    <h2 className="why-main-title">¿POR QUÉ ELEGIRNOS?</h2>
                    
                    <div className="title-underline"></div> 

                    <div className="value-icon-grid wide-grid">
                        
                        {/* Item 1: Satisfacción */}
                        <div className="value-item">
                            <div className="value-icon-wrapper">
                                <img src={icon1} alt="Satisfacción 100%" className="value-icon-img" />
                            </div>
                            <p className="value-label">Satisfacción casi del 100%</p>
                        </div>

                        {/* Item 2: Separación de cupo */}
                        <div className="value-item">
                            <div className="value-icon-wrapper">
                                <img src={icon2} alt="Separar cupo" className="value-icon-img" />
                            </div>
                            <p className="value-label">Separa tu cupo con valor mínimo</p>
                        </div>

                        {/* Item 3: Sin Fees Extras */}
                        <div className="value-item">
                            <div className="value-icon-wrapper">
                                <img src={icon3} alt="No fees extras" className="value-icon-img" />
                            </div>
                            <p className="value-label">No hay Fees Extras o de Planeación</p>
                        </div>

                        {/* Item 4: Línea WhatsApp Activa */}
                        <div className="value-item">
                            <div className="value-icon-wrapper">
                                <img src={icon4} alt="Línea WhatsApp activa" className="value-icon-img" />
                            </div>
                            <p className="value-label">Línea WhatsApp muy activa y dispuesta a ayudarte</p>
                        </div>

                        {/* Item 5: Guías Expertos */}
                        <div className="value-item">
                            <div className="value-icon-wrapper">
                                <img src={icon5} alt="Guías Expertos" className="value-icon-img" />
                            </div>
                            <p className="value-label">Guías Privados Expertos</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* ======================================= */}
            {/* SECCIÓN 7: LLAMADA A LA ACCIÓN (CTA) */}
            {/* Basado en Captura de pantalla 2025-12-02 a la(s) 8.39.59 p.m..jpg */}
            {/* ======================================= */}
            <section className="cta-section">
                <div className="container cta-content">
                    <h2 className="cta-title">LISTO PARA TU ADVENTURE?</h2>
                    <a
                        href="https://wa.me/3023042213"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-btn"
                    >
                        CONTÁCTANOS
                    </a>
                </div>
            </section>
        </main>
    );
};