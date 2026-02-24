// const  buttonprimero = document.getElementsByClassName("button1");
// const  cambiaColorSvg = document.getElementsByClassName("svgcolor");


// buttonprimero.addEventListener('click', () => {
//         cambiaColorSvg.style.fill = "blue";
// });
// Seleccionamos TODOS los botones
const botones = document.querySelectorAll(".button1");

botones.forEach((boton) => {
    boton.addEventListener('click', () => {
        // Buscamos el contenedor padre específico de ESTE botón
        const contenedor = boton.closest(".one-container");
        const svgPath = boton.querySelector("path");

        // Verificamos si ya existe el div de respuesta dentro de este contenedor
        let respuesta = contenedor.querySelector(".respuesta-div");

        if (respuesta) {
            // Si ya existe, lo quitamos (cerrar)
            respuesta.remove();
            svgPath.style.fill = "white";
        } else {
            // Si no existe, lo creamos (abrir)
            const nuevoDiv = document.createElement("div");
            nuevoDiv.classList.add("respuesta-div"); // Le ponemos una clase para identificarlo
            nuevoDiv.textContent = "roadmap.sh is a community effort to create roadmaps...";
            
            // Estilos que pediste
            nuevoDiv.style.border = "2px solid black";
            nuevoDiv.style.marginTop = "10px";
            nuevoDiv.style.padding = "10px";
            nuevoDiv.style.borderRadius = "8px";

            contenedor.appendChild(nuevoDiv);
            svgPath.style.fill = "blue"; // Cambia a azul al abrir
        }
    });
});

