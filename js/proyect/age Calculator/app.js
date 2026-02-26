// const valor = document.querySelector("#valorFecha");

// // Se activa cada vez que el usuario elige una fecha diferente
// valor.addEventListener("input", () => {
//     const valorTotal = valor.value;
//     const fechaLatam = new Date(valorTotal + "T00:00:00");
//     const fecha = fechaLatam.toLocaleDateString('es-ES');
    
//     // Obtener las fechas de hoy - la fecha actual
//     const hoy = new Date();
//     const mesActual = hoy.getMonth()+1;
//     const anioActual = hoy.getFullYear();


//     // // Crear una etiqueta 
//     // const texto = document.createElement("span")
//     // const etiquetaPadre = document.querySelector(".boton");
//     // const creadoElemento = etiquetaPadre.appendChild(texto);
//     // creadoElemento.innerText = `You are ${fechaActual}`


//     // Fecha de hoy
//     // const hoy = new Date();


//     // Para  Deseralizar o convertir el string a un objeto y asi obtener dia mes anio
//     const [dia, mes, anio] = fecha.split('/');
//     console.log(fecha);
//     console.log(dia);
//     console.log(mes);
//     console.log(anio);
//     const convertirTextoMes = Number.parseInt(mes);
//     // console.log(typeof(convertirTextoMes));
//     // console.log(typeof(mesActual));
//     // console.log(typeof(convertirTextoMes));
//     const anioUsuario = mesActual - convertirTextoMes;


//     // Cuanto anios tiene y mes de nacimiento
//     // const anioMes = mesActual - mes;
//     console.log(anioUsuario);
    
   
// });


const boton = document.querySelector("button");
const inputFecha = document.querySelector("#valorFecha");

boton.addEventListener("click", () => {
  const valorTotal = inputFecha.value;

  if (!valorTotal) {
    alert("Please enter a valid date.");
    return;
  }

  // Parse the date without timezone issues
  const [anio, mes, dia] = valorTotal.split('-').map(Number);
  console.log(valorTotal.split('-').map(Number));
  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1; // 1-12
  const diaActual = hoy.getDate();

  // Calculate year and month difference
  let aniosDiferencia = anioActual - anio;
  let mesesDiferencia = mesActual - mes;

  // Adjust if the birth month/day hasn't occurred yet this year
  if (mesesDiferencia < 0 || (mesesDiferencia === 0 && diaActual < dia)) {
    aniosDiferencia--;
    mesesDiferencia += 12;
  }

  // Display result
  const resultado = document.querySelector("#resultado");
  resultado.innerHTML = `You are <strong>${aniosDiferencia} years ${mesesDiferencia} months</strong> old`;
});