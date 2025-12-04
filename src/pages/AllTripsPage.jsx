// AllTripsPage.jsx
import React, { useState, useEffect } from 'react';
import '../Styles/colombiaPage2.css'; 
import { Link } from 'react-router-dom';

// *******************************************************************
import LottiePreloader from '../components/LottiePreloader.jsx';
// *******************************************************************

// *******************************************************************
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyD_LV9XzHTtluFMsC4jyu8ZHdo-hIyqWyujQEeSdJ_AhziBhHpSq3rFoUhj0eMvPohpA/exec'; 
// *******************************************************************

// ✅ Componente TravelCard (con clases -unique y lógica de botones duales/simples)
const TravelCard = ({ viaje }) => {
    // FUNCIÓN DE FORMATO DE MONEDA (sin cambios)
    const formatCurrency = (value) => { 
        const currencyCode = viaje.moneda || 'COP';
        return new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: currencyCode, 
            minimumFractionDigits: 0 
        }).format(value);
    };

    // Lógica para el Enlace de Detalle Adicional
    const whatsappText = viaje.texto_whatsapp || `Viaje a ${viaje.destino_especifico}`;
    const whatsappLink = `https://wa.me/3023042213?text=Hola,%20vi%20tu%20web%20y%20estoy%20interesado%20en%20el%20viaje%20a%20${encodeURIComponent(whatsappText)}`;
    
    // Lógica para el Enlace de Detalle Adicional
    const hasDetailLink = viaje.detalle_adicional_url && String(viaje.detalle_adicional_url).startsWith('http');
    const detailLink = hasDetailLink ? viaje.detalle_adicional_url : '#'; 

    // Cálculo de noches
    const date1 = new Date(viaje.fecha_inicio);
    const date2 = new Date(viaje.fecha_fin);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nights = diffDays > 0 ? diffDays : 1; 

    // Lista de inclusiones
    const inclusionsList = viaje.incluye ? viaje.incluye.split(',').map(item => item.trim()) : [];

    return (
        // ✅ CLASE BASE: travel-card-unique
        <div className="travel-card-unique"> 
            {/* ✅ Clases de encabezado corregidas */}
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

            {/* ✅ Clases de contenido corregidas y descripción restringida */}
            <div className="travel-card-content-base-unique">
                <h3 className="travel-card-title-unique">{viaje.destino_especifico} ({viaje.pais})</h3>
                <p className="travel-card-subtitle-unique description-text-unique">{viaje.frase_motivacional}</p>
            </div>

            {/* ✅ Clases de hover corregidas */}
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

            {/* ✅ Lógica de Footer Corregida (Doble o Simple) */}
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


export const AllTripsPage = () => { 
    const [allTrips, setAllTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // ... (Lógica de Fetch sin cambios) ...
        const fetchTrips = async () => {
            try {
                const response = await fetch(GAS_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                let data = await response.json();
                if (data.error) {
                    throw new Error(data.message || "Error desconocido de la API de Apps Script.");
                }

                // **FILTRADO ELIMINADO: USAR TODOS LOS DATOS**
                const tripsData = data; 

                // Ordenar por Mes de Inicio 
                tripsData.sort((a, b) => {
                    const monthOrder = { 
                        ENERO: 1, FEBRERO: 2, MARZO: 3, ABRIL: 4, MAYO: 5, JUNIO: 6,
                        JULIO: 7, AGOSTO: 8, SEPTIEMBRE: 9, OCTUBRE: 10, NOVIEMBRE: 11, DICIEMBRE: 12
                    };
                    const monthA = a.mes_inicio ? String(a.mes_inicio).toUpperCase() : '';
                    const monthB = b.mes_inicio ? String(b.mes_inicio).toUpperCase() : '';
                    return (monthOrder[monthA] || 0) - (monthOrder[monthB] || 0);
                });

                // Agrupar por Mes de Inicio
                const groupedTrips = tripsData.reduce((acc, trip) => {
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

    // Usar el LottiePreloader
    if (loading) return <LottiePreloader />; 
    
    if (error) return <div className="colombia-error-page">Error: {error}</div>;

    const months = Object.keys(allTrips);

    return (
        // ✅ Page Wrapper para el Sticky Footer
        <div className="colombia-page-wrapper">
            {/* Encabezado */}
            <header className="page-hero-colombia-unique"> 
                <div className="colombia-container-unique"> 
                    <p className="colombia-breadcrumb-unique">
                        <Link to="/">Inicio</Link> • Destinos • Todos los Viajes
                    </p>
                    <h1 className="colombia-main-title-unique">NUESTROS VIAJES</h1>
                    <p className="colombia-subtitle-unique">Explora todas nuestras opciones, nacionales e internacionales.</p>
                </div>
            </header>

            {/* ✅ Sección de Contenido con flex-grow: 1 */}
            <div className="colombia-trips-content-section-unique">
                <div className="colombia-container-unique">
                    {months.length === 0 ? (
                        // ✅ Mensaje de error con clase única
                        <h2 className="colombia-no-trips-message-unique">
                            ¡Qué lástima! No tenemos viajes con cupos disponibles por ahora.
                        </h2>
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