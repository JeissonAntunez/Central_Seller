
    // Seleccionamos los elementos del DOM
    const banner       = document.getElementById('cookie-banner');
    const notificacion = document.getElementById('notificacion');
    const btnResetear  = document.getElementById('btn-resetear');

    // Al cargar la página, revisa si el usuario ya tomó una decisión
    window.addEventListener('load', () => {
      const decision = localStorage.getItem('cookieDecision');
      if (decision) {
        // Si ya decidió, ocultamos el banner
        ocultarBanner();
      }
    });

    function aceptarCookies() {
      localStorage.setItem('cookieDecision', 'aceptado');
      ocultarBanner();
      mostrarNotificacion('✅ Cookies aceptadas', 'aceptado');
    }

    function rechazarCookies() {
      localStorage.setItem('cookieDecision', 'rechazado');
      ocultarBanner();
      mostrarNotificacion('❌ Cookies rechazadas', 'rechazado');
    }

    function ocultarBanner() {
      // Manipulamos el DOM para ocultar el banner
      banner.classList.add('oculto');
      btnResetear.style.display = 'inline-block';
    }

    function mostrarBanner() {
      // Quitamos la clase para mostrarlo de nuevo
      banner.classList.remove('oculto');
      btnResetear.style.display = 'none';
      localStorage.removeItem('cookieDecision');
    }

    function mostrarNotificacion(mensaje, tipo) {
      notificacion.textContent = mensaje;
      notificacion.className   = tipo; // aplica el estilo correcto
      notificacion.style.display = 'block';
    //   notificacion.style.backgroundColor = 'blue'

      // Ocultar después de 3 segundos
      setTimeout(() => {
        notificacion.style.display = 'none';
      }, 3000);
    }
  