/**
 * Calcula el área de un polígono
 * @param {Object} poligono
 * @param {string} poligono.tipo
 * @param {Object} poligono.valores
 * @returns {number}
 */
const calcularArea = (poligono) => {


    // Entiendo que el if quiere decir que si  el primero poligono  es diferente a un Objeto me dara como error Poligono invalido
    // Y si el segundo poligono.tipo es diferente a un string me dara como error Poligono invalido
    // Y si el tercer poligono.valores es diferente a un Objeto me dara como error Poligono invalido
    if (!poligono || !poligono.tipo || !poligono.valores) {
        throw new Error("Polígono inválido");
    }

    // Esto es un objeto llamado estrategias que contiene tres propiedades: triangulo, cuadrado y rectangulo. Cada propiedad es una función que recibe un objeto con los valores necesarios para calcular el área del polígono correspondiente. Dentro de cada función se llama a la función validarValores para asegurarse de que los valores sean números positivos antes de realizar el cálculo del área.
    const estrategias = {

        triangulo: ({ base, altura }) => {
            validarValores([base, altura]);
            return (base * altura) / 2;
        },

        cuadrado: ({ lado }) => {
            validarValores([lado]);
            return lado * lado;
        },

        rectangulo: ({ base, altura }) => {
            validarValores([base, altura]);
            return base * altura;
        }
    };
    // Aquí se obtiene la estrategia correspondiente al tipo de polígono especificado en el objeto poligono. Se convierte el tipo a minúsculas para asegurar que la comparación sea insensible a mayúsculas. Si no se encuentra una estrategia para el tipo de polígono, se lanza un error indicando que el tipo no es soportado. Si se encuentra la estrategia, se llama a la función correspondiente pasando los valores del polígono para calcular el área.
    const estrategia = estrategias[poligono.tipo.toLowerCase()];

    if (!estrategia) {
        throw new Error(`Tipo de polígono no soportado: ${poligono.tipo}`);
    }

    return estrategia(poligono.valores);
};


const validarValores = (valores) => {
    valores.forEach(v => {
        if (typeof v !== "number" || v <= 0) {
            throw new Error("Los valores deben ser números positivos");
        }
    });
};


console.log(
    calcularArea({ tipo: "triangulo", valores: { base: 10, altura: 5 } })
);

/* Dejame explicarme haber si entendi la funcion de ValidarValorees donde
    tiene un parametro llamado valores que es un array, y luego hace un forEach para recorrer cada valor del array y verificar si es un numero positivo, si no lo es lanza un error. Entonces esta funcion se utiliza dentro de las estrategias para validar los valores antes de calcular el area del poligono.
 */

    