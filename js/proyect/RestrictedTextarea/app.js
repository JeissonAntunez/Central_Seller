// const textarea = document.getElementById("mensaje");
// const contador = textarea.value.length;
// const span = document.createElement("span");
// const max = 10;


// span.textContent = `${contador} / ${max}`

// textarea.addEventListener("input", () => {
//     const longitud = textarea.value.length;

//     contador.textContent = `${longitud} / ${max}`;

//     if (longitud === max) {
//         document.textarea.appendChild(span);
//         textarea.style.border = "2px solid red";
//         span.style.position = "relative";
//         span.textContent = `${longitud} / ${max}`;
        
       
//     } else {
//         textarea.style.border = "2px solid black";
//     }
// });

// const textareas = document.querySelectorAll(".texto");
// const max = 30;

// textareas.forEach((textarea) => {
//   // Crear el wrapper
//   const wrapper = document.createElement("div");
//   wrapper.style.position = "relative";
//   wrapper.style.display = "inline-block";

//   // Crear el span contador
//   const span = document.createElement("span");
//   span.textContent = `0 / ${max}`;
//   span.classList.add("contador");

//   // Insertar wrapper en el DOM y mover el textarea dentro
//   textarea.parentNode.insertBefore(wrapper, textarea);
//   wrapper.appendChild(textarea);
//   wrapper.appendChild(span);

//   // Evento input
//   textarea.addEventListener("input", () => {
//     const longitud = textarea.value.length;
//     span.textContent = `${longitud} / ${max}`;

//     if (longitud === max) {
//       textarea.style.border = "2px solid red";
//       span.style.color = "red";
//     } else {
//       textarea.style.border = "2px solid black";
//       span.style.color = "gray";
//     }
//   });
// });


const textareas = document.querySelectorAll(".texto");
const max = 30;

textareas.forEach((textarea) => {
  // Asignar maxlength desde JS
  textarea.maxLength = max;

  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";

  const span = document.createElement("span");
  span.textContent = `0 / ${max}`;
  span.classList.add("contador");

  textarea.parentNode.insertBefore(wrapper, textarea);
  wrapper.appendChild(textarea);
  wrapper.appendChild(span);

  textarea.addEventListener("input", () => {
    const longitud = textarea.value.length;
    span.textContent = `${longitud} / ${max}`;

    if (longitud === max) {
      textarea.style.border = "2px solid red";
    //   textarea.style.background = "blue";
      span.style.color = "red";
    } else {
      textarea.style.border = "2px solid black";
      span.style.color = "gray";
    }
  });
});