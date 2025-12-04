// ColombiaPage.jsx
import React, { useState, useEffect } from 'react';
import '../Styles/colombiaPage.css';
import { Link } from 'react-router-dom';

// *******************************************************************
// 1. IMPORTAR EL NUEVO COMPONENTE PRELOADER
import LottiePreloader from '../components/LottiePreloader.jsx';
// *******************************************************************

// *******************************************************************
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyD_LV9XzHTtluFMsC4jyu8ZHdo-hIyqWyujQEeSdJ_AhziBhHpSq3rFoUhj0eMvPohpA/exec'; 
// *******************************************************************


// Componente TravelCard (AHORA CON CLASES ÚNICAS Y LÓGICA DE DOBLE BOTÓN)
const TravelCard = ({ viaje }) => {
    
    const formatCurrency = (value) => { 
        // Usar la moneda del viaje si está disponible, si no, usa COP (asumiendo que es Colombia)
        const currencyCode = viaje.moneda || 'COP';
        return new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: currencyCode,
            minimumFractionDigits: 0 
        }).format(value);
    };

    // Lógica de Enlaces
    const whatsappText = viaje.texto_whatsapp || `Viaje a ${viaje.destino_especifico}`;
    // NOTA: Asegúrate de reemplazar 'TUNUMERO_TELEFONO' con tu número real
    const whatsappLink = `https://wa.me/3023042213?text=Hola,%20vi%20tu%20web%20y%20estoy%20interesado%20en%20el%20viaje%20a%20${encodeURIComponent(whatsappText)}`;
    
    // Lógica para el Enlace de Detalle Adicional
    const hasDetailLink = viaje.detalle_adicional_url && String(viaje.detalle_adicional_url).startsWith('http');
    const detailLink = hasDetailLink ? viaje.detalle_adicional_url : '#'; 

    const date1 = new Date(viaje.fecha_inicio);
    const date2 = new Date(viaje.fecha_fin);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nights = diffDays > 0 ? diffDays : 1; 

    const inclusionsList = viaje.incluye ? viaje.incluye.split(',').map(item => item.trim()) : [];

    return (
        // CLASE ÚNICA
        <div className={`travel-card-colombia ${hasDetailLink ? 'travel-card-dual-footer-colombia' : ''}`}> 
            
            <div className="travel-card-header-colombia">
                <span className="travel-nights-label-colombia">{nights} NOCHES</span>
                <span className="travel-cups-label-colombia">
                    {viaje.cupos_disponibles} CUPOS
                </span>
            </div>
            
            <img 
                src={viaje.imagen_url} 
                alt={viaje.destino_especifico} 
                className="travel-card-image-colombia" 
            />

            {/* CLASE ÚNICA */}
            <div className="travel-card-content-base-colombia">
                <h3 className="travel-card-title-colombia">{viaje.destino_especifico}</h3>
                <p className="travel-card-subtitle-colombia">{viaje.frase_motivacional}</p>
            </div>

            {/* CLASE ÚNICA */}
            <div className="travel-card-hover-info-colombia">
                {/* CLASE ÚNICA */}
                <div className="travel-hover-details-wrapper-colombia">
                    {/* CLASES ÚNICAS */}
                    <div className="travel-detail-row-colombia">
                        <span className="travel-detail-label-colombia">🗓️ Fechas:</span>
                        <span className="travel-detail-value-colombia">{new Date(viaje.fecha_inicio).toLocaleDateString('es-CO')} - {new Date(viaje.fecha_fin).toLocaleDateString('es-CO')}</span>
                    </div>
                    {/* CLASES ÚNICAS */}
                    <div className="travel-detail-row-colombia">
                        <span className="travel-detail-label-colombia">🏷️ Tipo:</span>
                        <span className="travel-detail-value-colombia">{viaje.tipo_viaje}</span>
                    </div>

                    <h4 className="travel-inclusions-title-colombia">INCLUYE:</h4>
                    <ul className="travel-inclusions-list-colombia">
                        {inclusionsList.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* CLASE ÚNICA Y MODIFICADOR DE FOOTER */}
            <div className={`travel-card-footer-colombia ${hasDetailLink ? 'footer-two-buttons-colombia' : ''}`}>
                
                {/* CLASES ÚNICAS */}
                <span className="travel-price-footer-colombia">
                    Desde: 
                    <span className="travel-price-value-colombia">{formatCurrency(viaje.valor_total)}</span>
                    <span className="travel-price-currency-colombia">{viaje.moneda || 'COP'}</span>
                </span>
                
                {hasDetailLink ? (
                    /* CLASE ÚNICA */
                    <div className="travel-buttons-group-colombia"> 
                        <a 
                            href={detailLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="travel-explore-btn-colombia btn-details-colombia"
                        >
                            VER DETALLES
                        </a>

                        <a 
                            href={whatsappLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="travel-explore-btn-colombia btn-whatsapp-colombia"
                        >
                            EXPLORAR VIAJE
                        </a>
                    </div>
                ) : (
                    <a 
                        href={whatsappLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="travel-explore-btn-colombia btn-whatsapp-colombia"
                    >
                        EXPLORAR VIAJE
                    </a>
                )}
            </div>
        </div>
    );
};


export const ColombiaPage = () => {
// ... (Lógica de estado y fetch sin cambios)
    const [allTrips, setAllTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Lógica de fetch
        const fetchTrips = async () => {
            try {
                // ... lógica de fetch de la API de GAS
                const response = await fetch(GAS_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                let data = await response.json();
                if (data.error) {
                    throw new Error(data.message || "Error desconocido de la API de Apps Script.");
                }

                const colombiaTrips = data.filter(
                    (trip) => trip.pais && String(trip.pais).toUpperCase() === 'COLOMBIA'
                );

                colombiaTrips.sort((a, b) => {
                    const monthOrder = { 
                        ENERO: 1, FEBRERO: 2, MARZO: 3, ABRIL: 4, MAYO: 5, JUNIO: 6,
                        JULIO: 7, AGOSTO: 8, SEPTIEMBRE: 9, OCTUBRE: 10, NOVIEMBRE: 11, DICIEMBRE: 12
                    };
                    const monthA = a.mes_inicio ? String(a.mes_inicio).toUpperCase() : '';
                    const monthB = b.mes_inicio ? String(b.mes_inicio).toUpperCase() : '';
                    return (monthOrder[monthA] || 0) - (monthOrder[monthB] || 0);
                });

                const groupedTrips = colombiaTrips.reduce((acc, trip) => {
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
    }, []); 

    if (loading) return <LottiePreloader />; 
    
    if (error) return <div className="colombia-error-page">Error: {error}</div>;

    const months = Object.keys(allTrips);

    return (
        <div className="colombia-page-wrapper">
            <header className="page-hero-colombia-unique"> 
                <div className="colombia-container-unique"> 
                    <p className="colombia-breadcrumb-unique">
                        <Link to="/">Inicio</Link> • Destinos • Colombia
                    </p>
                    <h1 className="colombia-main-title-unique">COLOMBIA</h1>
                </div>
            </header>

            <div className="colombia-trips-content-section-unique">
                <div className="colombia-container-unique">
                    {months.length === 0 ? (
                        <h2 className="colombia-no-trips-message-unique">¡Qué lástima! No tenemos viajes con cupos disponibles por ahora.</h2>
                    ) : (
                        months.map((month) => (
                            <div key={month} className="colombia-month-group-unique">
                                <h2 className="colombia-month-subtitle-unique">{month}</h2>
                                <div className="colombia-trips-grid-unique">
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