// MonthlyTripPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../Styles/monthlyTripPage.css'; 

// *******************************************************************
// 1. IMPORTAR EL NUEVO COMPONENTE PRELOADER
import LottiePreloader from '../components/LottiePreloader.jsx'; 
// *******************************************************************

// *******************************************************************
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyD_LV9XzHTtluFMsC4jyu8ZHdo-hIyqWyujQEeSdJ_AhziBhHpSq3rFoUhj0eMvPohpA/exec'; 
// *******************************************************************

// ✅ Componente TravelCard (con botón colapsable para Incluye)
const TravelCard = ({ viaje }) => {
    const [showInclusions, setShowInclusions] = useState(false); // Estado para el colapsable

    const formatCurrency = (value) => { 
        return new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: 'COP',
            minimumFractionDigits: 0 
        }).format(value);
    };
    
    // Enlace de WhatsApp
    const whatsappText = viaje.texto_whatsapp || viaje.texto_especifico || `Viaje a ${viaje.destino_especifico}`;
    const whatsappLink = `https://wa.me/3023042213?text=Hola,%20vi%20tu%20web%20y%20estoy%20interesado%20en%20el%20viaje%20a%20${encodeURIComponent(whatsappText)}`;
    
    // Lógica para el Enlace de Detalle Adicional
    const hasDetailLink = viaje.detalle_adicional_url && viaje.detalle_adicional_url.startsWith('http');
    const detailLink = hasDetailLink ? viaje.detalle_adicional_url : '#'; 

    // Cálculo de noches
    const date1 = new Date(viaje.fecha_inicio);
    const date2 = new Date(viaje.fecha_fin);
    const diffDays = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
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
                <p className="travel-card-subtitle-unique description-text-unique">{viaje.frase_motivacional}</p>
            </div>

            <div className="travel-card-hover-info-unique">
                <div className="travel-hover-details-wrapper-unique">
                    <div className="travel-detail-row-unique">
                        <span className="travel-detail-label-unique">🗓️ Fechas:</span>
                        <span className="travel-detail-value-unique">
                            {new Date(viaje.fecha_inicio).toLocaleDateString('es-CO')} - {new Date(viaje.fecha_fin).toLocaleDateString('es-CO')}
                        </span>
                    </div>
                    <div className="travel-detail-row-unique">
                        <span className="travel-detail-label-unique">🏷️ Tipo:</span>
                        <span className="travel-detail-value-unique">{viaje.tipo_viaje}</span>
                    </div>

                    {/* SECCIÓN COLAPSABLE DE INCLUYE (Mejorada) */}
                    <div className="travel-inclusions-container-unique">
                        <button 
                            className="travel-inclusions-toggle-btn-unique"
                            onClick={() => setShowInclusions(!showInclusions)}
                        >
                            <span>{showInclusions ? 'OCULTAR DETALLES' : 'VER QUÉ INCLUYE'}</span>
                            <i className={`fa-solid fa-chevron-${showInclusions ? 'up' : 'down'}`}></i>
                        </button>

                        <div className={`travel-inclusions-collapse-unique ${showInclusions ? 'is-open' : ''}`}>
                            <ul className="travel-inclusions-list-unique">
                                {inclusionsList.map((item, index) => (
                                    <li key={index}>
                                        <i className="fa-solid fa-check-circle"></i> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`travel-card-footer-unique ${hasDetailLink ? 'footer-two-buttons-unique' : 'footer-one-button-unique'}`}>
                <span className="travel-price-footer-unique">
                    Desde: 
                    <span className="travel-price-value-unique">{formatCurrency(viaje.valor_total)}</span>
                    <span className="travel-price-currency-unique">{viaje.moneda}</span>
                </span>
                
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


export const MonthlyTripPage = () => {
    const { month } = useParams();
    const displayMonth = month ? month.charAt(0).toUpperCase() + month.slice(1).toLowerCase() : 'Este Mes';
    const filterMonth = displayMonth.toUpperCase();

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(GAS_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                let data = await response.json();
                if (data.error) {
                    throw new Error(data.message || "Error desconocido de la API.");
                }

                // Filtrar por el mes dinámico
                const filteredTrips = data.filter(
                    (trip) => trip.mes_inicio && String(trip.mes_inicio).toUpperCase() === filterMonth
                );

                filteredTrips.sort((a, b) => (a.id_viaje > b.id_viaje ? 1 : -1));
                
                setTrips(filteredTrips);
            } catch (err) {
                setError("Error al cargar los datos: " + err.message);
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips(); 
    }, [month, filterMonth]); 

    if (loading) return <LottiePreloader />; 
    if (error) return <div className="error-page-month">Error: {error}</div>;

    return (
        <div className="monthly-page-wrapper">
            <header className="page-hero-monthly-unique"> 
                <div className="monthly-container-unique"> 
                    <p className="monthly-breadcrumb-unique">
                        <Link to="/">Inicio</Link> • Destinos • Viajes por Mes
                    </p>
                    <h1 className="monthly-main-title-unique">VIAJES ADVENTURE EN {displayMonth.toUpperCase()}</h1>
                </div>
            </header>

            <div className="monthly-trips-content-section-unique">
                <div className="monthly-container-unique">
                    {trips.length === 0 ? (
                        <h2 className="monthly-no-trips-message-unique">
                            ¡Qué lástima! No encontramos viajes con cupos disponibles para <strong>{displayMonth}</strong>.
                        </h2>
                    ) : (
                        <div className="monthly-trips-grid-unique">
                            {trips.map((trip) => (
                                <TravelCard key={trip.id_viaje} viaje={trip} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};