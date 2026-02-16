// function Anagrama(dato1, dato2) {

//     let palabraSola = dato1;
//     let palabraSola2 = dato2;
//     let resultado = palabraSola.split("");
//     let resultado2 = palabraSola.split("");
//     let palabra1 = dato1.toLowerCase().split("").sort().join("");
//     let palabra2 = dato2.toLowerCase().split("").sort().join("");
   
//     let comparacion = JSON.stringify(palabraSola) === JSON.stringify(palabraSola2);
    




//     try { 

        
//         if (typeof dato1 !== "string" || typeof dato2 !== "string") {
//             throw new Error("Los datos deben ser de tipo string");
//         }  
//         else if (comparacion === true) {
//             throw new Error("Los datos no deben ser iguales");
//         }
            
//             console.log(`La palabra ${dato1} es un anagrama de ${dato2}: ${palabra1 === palabra2}`);
        

//     } catch(error) {
//         console.error("Error: " + error.message);
//     }

// }
// Anagrama("Amor", "Roma");
// Anagrama("Ballena", "Llenabas");
function Anagrama(dato1, dato2) {

    if (typeof dato1 !== "string" || typeof dato2 !== "string") {
        throw new Error("Los datos deben ser de tipo string");
    }

    if (dato1.toLowerCase() === dato2.toLowerCase()) {
        throw new Error("Las palabras no deben ser iguales");
    }

    const normalizar = palabra =>
        palabra
            .toLowerCase()
            .replace(/\s/g, "")
            .split("")
            .sort()
            .join("");

    return normalizar(dato1) === normalizar(dato2);
}

try {
    console.log(Anagrama("Amor", "Roma"));
    console.log(Anagrama("Ballena", "Llenaba"));
} catch (error) {
    console.error(error.message);
}
