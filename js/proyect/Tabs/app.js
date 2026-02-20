
// const tarjetaTabs = document.querySelectorAll('.tab-card');


// function mostrarContenido() {
//     tarjetaTabs.addEventListener('click', function() {
//         tarjetaTabs.style.background = 'red';
// });};


// mostrarContenido();


// export {mostrarContenido};



const tabs = document.querySelectorAll('.tab-link');
const contenidos = document.querySelectorAll('.tab-content');

function mostrarContenido(tabId) {
    // Ocultar todos los contenidos
    contenidos.forEach(function(contenido) {
        contenido.classList.remove('active');
    });

    // Mostrar solo el contenido del tab clickeado
    const tabActivo = document.querySelector(tabId);
    if (tabActivo) {
        tabActivo.classList.add('active');
    }
}

// Agregar evento a cada tab
tabs.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        const destino = this.getAttribute('href');
        mostrarContenido(destino);
    });
});

const colores = {
    '#tab1': '#FF6B6B',
    '#tab2': '#6BCB77',
    '#tab3': '#4D96FF',
    '#tab4': '#FFD93D'
};

tabs.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        const destino = this.getAttribute('href');
        mostrarContenido(destino);

        // Cambia el color del tab-content activo
        const tabActivo = document.querySelector(destino);
        tabActivo.style.backgroundColor = colores[destino];
    });
});