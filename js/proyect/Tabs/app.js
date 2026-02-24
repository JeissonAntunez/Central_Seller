 
 
 
        const tabLinks = document.querySelectorAll('.tab-link');
        const tabContents = document.querySelectorAll('.tab-content');

        // Colores opcionales por tab (puedes quitarlos si prefieres todo negro)
        const colores = {
            '#tab1': '#111111',
            '#tab2': '#1a3a2a',
            '#tab3': '#1a1a3a',
            '#tab4': '#3a1a1a'
        };

        tabLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const destino = this.getAttribute('href');

                // Quitar active de todos los links y contenidos
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Activar el clickeado
                this.classList.add('active');
                const tabActivo = document.querySelector(destino);
                tabActivo.classList.add('active');
                tabActivo.style.backgroundColor = colores[destino];
            });
        });