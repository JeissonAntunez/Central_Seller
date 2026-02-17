import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logoCentralSeller from '../../assets/img/logoseller.png';


const RegisterPage1 = () => {
  // const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Información Personal
    fullName: '',
    email: '',
    
    // Detalles de la Tienda
    storeName: '',
    documentId: '',
    phoneNumber: '',
    
    // Seguridad
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre completo es requerido';
    if (!formData.email.trim()) newErrors.email = 'El correo electrónico es requerido';
    if (!formData.storeName.trim()) newErrors.storeName = 'El nombre de la tienda es requerido';
    if (!formData.documentId.trim()) newErrors.documentId = 'El documento de identidad es requerido';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'El número de teléfono es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'Debes aceptar la política de privacidad';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = () => {
    const password = formData.password;
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;
    
    return Math.min(strength, 100);
  };

  const getPasswordStrengthLabel = () => {
    const strength = calculatePasswordStrength();
    if (strength === 0) return '';
    if (strength < 50) return 'Débil';
    if (strength < 75) return 'Media';
    return 'Fuerte';
  };

  const getPasswordStrengthColor = () => {
    const strength = calculatePasswordStrength();
    if (strength < 50) return '#ef4444';
    if (strength < 75) return '#f59e0b';
    return '#10b981';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // try {
    //   // Simulación de registro
    //   await new Promise(resolve => setTimeout(resolve, 2000));
    //   console.log('Registro exitoso:', formData);
    //   alert('¡Cuenta profesional creada exitosamente!');
    // } catch (error) {
    //   console.error('Error en el registro:', error);
    // } finally {
    //   setIsLoading(false);
    // }
    try {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en el registro");
  }

  console.log("Registro exitoso:", data);
  alert("Cuenta creada correctamente 🚀");

} catch (error: any) {
  console.error(error);
  alert(error.message);
}
 finally {
    setIsLoading(false) // 🔥 ESTO ES CLAVE
  }

  };

  return (
    <div className="register-container">
      {/* Lado izquierdo - Branding */}
      <div className="register-left">
        <div className="brand-content">
          <div className="logo-wrapper">
            <div className="logo-icon">
              <img src={logoCentralSeller} alt="icono del saas"  />
            </div>
            {/* <h1 className="brand-name">Marketplace</h1> */}
          </div>

          <h2 className="brand-headline">
            Impulsa tu negocio al siguiente nivel.
          </h2>

          <p className="brand-description">
            Gestione inventario, ventas y clientes en una sola plataforma segura y escalable diseñada para el comercio moderno.
          </p>

          <div className="trust-badges">
            <div className="badge">
              <div className="badge-icon">👥</div>
              <div className="badge-content">
                <div className="badge-title">Más de 10,000 tiendas</div>
                <div className="badge-subtitle">confían en nosotros</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="register-right">
        <div className="form-wrapper">
          <div className="form-header">
            <h2 className="form-title">Registro Profesional</h2>
            <p className="form-subtitle">Complete la información para configurar su entorno de administración.</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* INFORMACIÓN PERSONAL */}
            <div className="form-section">
              <div className="section-header">
                <svg className="section-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <h3 className="section-title">INFORMACIÓN PERSONAL</h3>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Nombre Completo</label>
                  <div className="input-container">
                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <div className="input-container">
                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="juan@ejemplo.com"
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
            </div>

            {/* DETALLES DE LA TIENDA */}
            <div className="form-section">
              <div className="section-header">
                <svg className="section-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                <h3 className="section-title">DETALLES DE LA TIENDA</h3>
              </div>

              <div className="form-group full-width">
                <label htmlFor="storeName" className="form-label">Nombre de la Empresa / Tienda</label>
                <div className="input-container">
                  <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  <input
                    id="storeName"
                    name="storeName"
                    type="text"
                    value={formData.storeName}
                    onChange={handleChange}
                    className={`form-input ${errors.storeName ? 'error' : ''}`}
                    placeholder="Ej: Mi Tienda Online S.A.S"
                  />
                </div>
                {errors.storeName && <span className="error-message">{errors.storeName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="documentId" className="form-label">Documento de Identidad / NIT</label>
                  <div className="input-container">
                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <input
                      id="documentId"
                      name="documentId"
                      type="text"
                      value={formData.documentId}
                      onChange={handleChange}
                      className={`form-input ${errors.documentId ? 'error' : ''}`}
                      placeholder="900.123.456-1"
                    />
                  </div>
                  {errors.documentId && <span className="error-message">{errors.documentId}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber" className="form-label">Número de Teléfono</label>
                  <div className="input-container">
                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                      placeholder="+57 300 000 0000"
                    />
                  </div>
                  {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                </div>
              </div>
            </div>

            {/* SEGURIDAD DE LA CUENTA */}
            <div className="form-section">
              <div className="section-header">
                <svg className="section-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="section-title">SEGURIDAD DE LA CUENTA</h3>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <div className="input-container">
                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="• • • • • • • •"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className="strength-fill" 
                          style={{ 
                            width: `${calculatePasswordStrength()}%`,
                            backgroundColor: getPasswordStrengthColor()
                          }}
                        />
                      </div>
                      <span className="strength-label" style={{ color: getPasswordStrengthColor() }}>
                        Fortaleza de contraseña: {getPasswordStrengthLabel()}
                      </span>
                    </div>
                  )}
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <div className="input-container">
                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="• • • • • • • •"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>
            </div>

            {/* TÉRMINOS Y CONDICIONES */}
            <div className="terms-section">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span className="checkbox-checkmark"></span>
                <span className="checkbox-label">
                  Acepto los{' '}
                  <a href="#" className="terms-link" onClick={(e) => e.preventDefault()}>
                    Términos y Condiciones
                  </a>{' '}
                  de uso de la plataforma.
                </span>
              </label>
              {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}

              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span className="checkbox-checkmark"></span>
                <span className="checkbox-label">
                  He leído y acepto la{' '}
                  <a href="#" className="terms-link" onClick={(e) => e.preventDefault()}>
                    Política de Privacidad
                  </a>{' '}
                  y tratamiento de datos.
                </span>
              </label>
              {errors.acceptPrivacy && <span className="error-message">{errors.acceptPrivacy}</span>}
            </div>

            {/* BOTÓN DE SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <>
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75" />
                  </svg>
                  Creando cuenta...
                </>
              ) : (
                <>
                  Crear Mi Cuenta Profesional
                  <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>

            {/* FOOTER */}
            <div className="form-footer">
              <p className="login-prompt">
                ¿Ya tienes una cuenta corporativa?{' '}
                {/* <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); alert('Ir a login'); }}>
                  Inicia Sesión aquí
                </a> */}
                  <Link to="/login" className="login-link">
                                Inicia sesión
                              </Link>
              </p>
            </div>

            {/* SECURITY BADGES */}
            <div className="security-badges">
              <div className="security-badge">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>CIFRADO SSL 256-BIT</span>
              </div>
              <div className="security-badge">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>PROTECCIÓN DE DATOS</span>
              </div>
            </div>
          </form>
        </div>
      </div>

   
    </div>
  );
};

export default RegisterPage1;