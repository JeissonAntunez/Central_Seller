import React from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import '../../styles/Dashboard.css';

// Datos de ejemplo para el gráfico de rendimiento
const performanceData = [
  { fecha: 'LUN', ventas: 2400, ingresos: 1800, visitantes: 400 },
  { fecha: 'MAR', ventas: 1398, ingresos: 1200, visitantes: 300 },
  { fecha: 'MIE', ventas: 9800, ingresos: 8500, visitantes: 800 },
  { fecha: 'JUE', ventas: 3908, ingresos: 3200, visitantes: 450 },
  { fecha: 'VIE', ventas: 4800, ingresos: 4100, visitantes: 650 },
  { fecha: 'SAB', ventas: 3800, ingresos: 3300, visitantes: 520 },
  { fecha: 'DOM', ventas: 4300, ingresos: 3700, visitantes: 580 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Cards de métricas */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">VENTAS BRUTAS</span>
            <svg className="metric-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="metric-value">$140.00</div>
          <div className="metric-change positive">+2.5%</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">SALDO DISPONIBLE</span>
            <svg className="metric-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="metric-value">$2,450.00</div>
          <div className="metric-info">Próximo pago: 7 de feb 2025</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">ÓRDENES TOTALES</span>
            <svg className="metric-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <div className="metric-value">48</div>
          <div className="metric-change negative">-21%</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">VISITAS ÚNICAS</span>
            <svg className="metric-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="metric-value">1,240</div>
          <div className="metric-change positive">+16.4%</div>
        </div>
      </div>

      {/* Sección de gráficos */}
      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <div className="card-header">
            <h3 className="card-title">Rendimiento Comercial</h3>
            <div className="chart-filters">
              <button className="filter-btn active">7 días</button>
              <button className="filter-btn">30 días</button>
              <button className="filter-btn">12 meses</button>
            </div>
          </div>
          
          {/* Gráfico de líneas con Recharts */}
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a8e063" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a8e063" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="fecha" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '14px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="ventas" 
                  stroke="#56ab2f" 
                  fillOpacity={1}
                  fill="url(#colorVentas)"
                  name="Ventas"
                />
                <Area 
                  type="monotone" 
                  dataKey="ingresos" 
                  stroke="#3b82f6" 
                  fillOpacity={1}
                  fill="url(#colorIngresos)"
                  name="Ingresos"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card news-card">
          <div className="card-header">
            <h3 className="card-title">Novedades Central</h3>
          </div>
          <div className="news-list">
            <div className="news-item">
              <div className="news-indicator"></div>
              <div className="news-content">
                <h4 className="news-title">Actualización de comisiones</h4>
                <p className="news-description">
                  Revisa los nuevos términos vigentes desde 1 febrero.
                </p>
              </div>
            </div>
            <div className="news-item">
              <div className="news-indicator blue"></div>
              <div className="news-content">
                <h4 className="news-title">Webinar: Gestión de Inventario</h4>
                <p className="news-description">
                  Inscríbete para aprender a optimizar tu stock...
                </p>
              </div>
            </div>
            <div className="news-item">
              <div className="news-indicator green"></div>
              <div className="news-content">
                <h4 className="news-title">Nueva integración disponible</h4>
                <p className="news-description">
                  Conecta tu tienda con MercadoPago fácilmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estado del catálogo */}
      <div className="dashboard-grid two-columns">
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Estado del Catálogo</h3>
            <a href="#" className="card-link">Ver catálogo →</a>
          </div>
          <div className="catalog-stats">
            <div className="stat-item">
              <div className="stat-number green">124</div>
              <div className="stat-label">APROBADOS</div>
            </div>
            <div className="stat-item">
              <div className="stat-number red">2</div>
              <div className="stat-label">RECHAZADOS</div>
            </div>
            <div className="stat-item">
              <div className="stat-number gray">15</div>
              <div className="stat-label">SIN IMAGEN</div>
            </div>
          </div>
          
          {/* Productos recientes */}
          <div className="product-list">
            <div className="product-item">
              <div className="product-image">
                <div className="product-placeholder">📱</div>
              </div>
              <div className="product-info">
                <h5>Reloj inteligente Sport Pro</h5>
                <span className="product-status approved">Activa</span>
              </div>
            </div>
            <div className="product-item">
              <div className="product-image">
                <div className="product-placeholder">🎧</div>
              </div>
              <div className="product-info">
                <h5>Audífonos Premium Wireless</h5>
                <span className="product-status pending">Sin imágenes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Carga Masiva de Productos</h3>
          </div>
          <div className="upload-section">
            <div className="upload-icon">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h4>Arrastra archivos para subir</h4>
            <p>O busca en tu ordenador los archivos .xlsx o .csv</p>
            <button className="upload-button">Seleccionar Archivo</button>
            
            <div className="template-downloads">
              <a href="#" className="template-link">
                📄 Plantilla de Productos (Excel)
              </a>
              <a href="#" className="template-link">
                📋 Guía de Categorías (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;