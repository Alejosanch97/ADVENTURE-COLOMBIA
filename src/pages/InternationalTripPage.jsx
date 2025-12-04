// InternationalTripPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../Styles/internationalTripPage.css'; 

// *******************************************************************
// 1. IMPORTAR EL NUEVO COMPONENTE PRELOADER
import LottiePreloader from '../components/LottiePreloader.jsx'; 
// *******************************************************************

// VERIFICA ESTA URL: Debe ser el 'exec' de tu última implementación
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyD_LV9XzHTtluFMsC4jyu8ZHdo-hIyqWyujQEeSdJ_AhziBhHpSq3rFoUhj0eMvPohpA/exec'; 
// *******************************************************************


// Componente TravelCard (con lógica de botones duales/simples mejorada)
const TravelCard = ({ viaje }) => {
    // FUNCIÓN DE FORMATO DE MONEDA (sin cambios)
    const formatCurrency = (value) => { 
        return new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: 'COP',
            minimumFractionDigits: 0 
        }).format(value);
    };

    // 1. Enlace de WhatsApp (siempre necesario)
    const whatsappText = viaje.texto_whatsapp || viaje.texto_especifico || `Viaje a ${viaje.destino_especifico}`;
    const whatsappLink = `https://wa.me/3023042213?text=Hola,%20vi%20tu%20web%20y%20estoy%20interesado%20en%20el%20viaje%20a%20${encodeURIComponent(whatsappText)}`;
    
    // 2. Lógica para el Enlace de Detalle Adicional
    const hasDetailLink = viaje.detalle_adicional_url && viaje.detalle_adicional_url.startsWith('http');
    const detailLink = hasDetailLink ? viaje.detalle_adicional_url : '#'; 

    const date1 = new Date(viaje.fecha_inicio);
    const date2 = new Date(viaje.fecha_fin);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nights = diffDays > 0 ? diffDays : 1; 

    const inclusionsList = viaje.incluye ? viaje.incluye.split(',').map(item => item.trim()) : [];

    return (
        <div className="travel-card-unique"> 
            <div className="travel-card-header-unique">
                <span className="travel-nights-label-unique">{nights} NOCHES</span>
                <span className="travel-cups-label-unique">
                    {viaje.cupos_disponibles} CUPOS
                </span>
            </div>
            
            <img 
                src={viaje.imagen_url} 
                alt={viaje.destino_especifico} 
                className="travel-card-image-unique" 
            />

            <div className="travel-card-content-base-unique">
                <h3 className="travel-card-title-unique">{viaje.destino_especifico}</h3>
                {/* ✅ CORRECCIÓN 1: Aplicamos la clase de restricción de texto */}
                <p className="travel-card-subtitle-unique description-text-unique">{viaje.frase_motivacional}</p>
            </div>

            <div className="travel-card-hover-info-unique">
                <div className="travel-hover-details-wrapper-unique">
                    <div className="travel-detail-row-unique">
                        <span className="travel-detail-label-unique">🗓️ Fechas:</span>
                        <span className="travel-detail-value-unique">{new Date(viaje.fecha_inicio).toLocaleDateString('es-CO')} - {new Date(viaje.fecha_fin).toLocaleDateString('es-CO')}</span>
                    </div>
                    <div className="travel-detail-row-unique">
                        <span className="travel-detail-label-unique">🏷️ Tipo:</span>
                        <span className="travel-detail-value-unique">{viaje.tipo_viaje}</span>
                    </div>

                    <h4 className="travel-inclusions-title-unique">INCLUYE:</h4>
                    <ul className="travel-inclusions-list-unique">
                        {inclusionsList.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ✅ CORRECCIÓN 2: Usamos 'footer-two-buttons-unique' o 'footer-one-button-unique' */}
            <div className={`travel-card-footer-unique ${hasDetailLink ? 'footer-two-buttons-unique' : 'footer-one-button-unique'}`}>
                <span className="travel-price-footer-unique">
                    Desde: 
                    <span className="travel-price-value-unique">{formatCurrency(viaje.valor_total)}</span>
                    <span className="travel-price-currency-unique">{viaje.moneda}</span>
                </span>
                
                {/* 🎯 El contenedor de botones es clave para el flexbox */}
                <div className="travel-buttons-group-unique"> 
                    {hasDetailLink && (
                        <a 
                            href={detailLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="travel-explore-btn-unique btn-details-unique"
                        >
                            VER DETALLES
                        </a>
                    )}

                    <a 
                        href={whatsappLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="travel-explore-btn-unique btn-whatsapp-unique"
                    >
                        EXPLORAR VIAJE
                    </a>
                </div>
            </div>
        </div>
    );
};


export const InternationalTripPage = () => {
    const { country } = useParams();
    const displayCountry = country ? country.charAt(0).toUpperCase() + country.slice(1).toLowerCase() : 'Viajes Internacionales';

    const [allTrips, setAllTrips] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lógica de Fetch (sin cambios en la funcionalidad)
    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1. Obtener todos los viajes de la API de GAS
                const response = await fetch(GAS_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                let data = await response.json();
                if (data.error) {
                    throw new Error(data.message || "Error desconocido de la API de Apps Script.");
                }

                // 2. Filtrar solo los viajes del país dinámico
                const targetCountry = displayCountry.toUpperCase();
                const filteredTrips = data.filter(
                    (trip) => trip.pais && String(trip.pais).toUpperCase() === targetCountry
                );

                // 3. Ordenar y Agrupar los viajes por MES_INICIO
                filteredTrips.sort((a, b) => {
                    const monthOrder = { 
                        ENERO: 1, FEBRERO: 2, MARZO: 3, ABRIL: 4, MAYO: 5, JUNIO: 6,
                        JULIO: 7, AGOSTO: 8, SEPTIEMBRE: 9, OCTUBRE: 10, NOVIEMBRE: 11, DICIEMBRE: 12
                    };
                    const monthA = a.mes_inicio ? String(a.mes_inicio).toUpperCase() : '';
                    const monthB = b.mes_inicio ? String(b.mes_inicio).toUpperCase() : '';
                    return (monthOrder[monthA] || 0) - (monthOrder[monthB] || 0);
                });

                const groupedTrips = filteredTrips.reduce((acc, trip) => {
                    const month = trip.mes_inicio ? String(trip.mes_inicio).toUpperCase() : 'SIN MES';
                    if (!acc[month]) {
                        acc[month] = [];
                    }
                    acc[month].push(trip);
                    return acc;
                }, {});

                setAllTrips(groupedTrips);
            } catch (err) {
                setError("Error al cargar los datos de viajes: " + err.message);
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips(); 
    }, [country, displayCountry]); 

    // *****************************************************************
    // 2. REEMPLAZO CLAVE: Usar el LottiePreloader en lugar del div simple
    // *****************************************************************
    if (loading) return <LottiePreloader />; // Muestra la animación mientras loading es true
    // *****************************************************************
    
    if (error) return <div className="international-error-page">Error: {error}</div>;

    const months = Object.keys(allTrips);

    return (
        <div className="international-page-wrapper">
            <header className="page-hero-international-unique"> 
                <div className="international-container-unique"> 
                    <p className="international-breadcrumb-unique">
                        <Link to="/">Inicio</Link> • Destinos • {displayCountry}
                    </p>
                    <h1 className="international-main-title-unique">{displayCountry.toUpperCase()}</h1>
                </div>
            </header>

            <div className="international-trips-content-section-unique">
                <div className="international-container-unique">
                    {months.length === 0 ? (
                        <h2 className="international-no-trips-message-unique">
                            ¡Qué lástima! No tenemos viajes a {displayCountry} con cupos disponibles por ahora.
                        </h2>
                    ) : (
                        months.map((month) => (
                            <div key={month} className="international-month-group-unique">
                                <h2 className="international-month-subtitle-unique">{month}</h2>
                                <div className="international-trips-grid-unique">
                                    {allTrips[month].map((trip) => (
                                        <TravelCard key={trip.id_viaje} viaje={trip} />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};