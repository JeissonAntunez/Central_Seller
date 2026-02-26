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

    

    let coffes = ["Espresso", "Latte", "Cappuccino"];
    let fis = ["Lion", ,"Tiger"];

    fis.forEach(f => {
        console.log(f);
    });
    coffes.forEach(coffe => {
        console.log(coffe);
    });

    let datoMath = coffes.map(coffe => coffe.toUpperCase()).sort().join(", ");

    console.log(datoMath);


    console.log("Objetos literales");

    function usuario(nombre, edad) {
        return {
            nombre: nombre,
            edad: edad
        };
    }

    console.log(usuario("Juan", 30));
    console.log("----------------------------- \n");
    console.log("----------------------------- \n");
    console.log("----------------------------- \n");
    console.log("----------------------------- \n");
    
    
    const tipo = "usuario";
    const nombre = "Alex";
    
    const persona ={
        nombre,
        [`${tipo}Id`]: 42,
        saludar() {
            console.log(`Hola, soy ${this.nombre} y mi ID es ${this.usuarioId}`);
        }
    }
    
    console.log(persona);
    persona.saludar();
    
    
    console.log("----------------------------- \n");
    console.log("--   Ejercicio Shorthand ----- \n");
    console.log("--   Objetos literales mejorados ----- \n");
    console.log("----------------------------- \n");
    
    
    const id = 543;
    const stock = 10;
    const categoria = "Electrónica";
    
    
    const producto ={
        id,
        stock,
        categoria,
        miProducto(){
            console.log(`Producto ID: ${this.id}, Stock: ${this.stock}, Categoria: ${this.categoria}`);
        }
    }
    
    producto.miProducto();
    
    
    console.log("----------------------------- \n");
    console.log("--   Expresiones regulares(<<RegExp>>) ----- \v");
    console.log("----------------------------- \n");
    
    
    // const texto = "El número de teléfono es 123-456-7890";
    // const regex = /de/;
    
    // const resultado = texto.match(regex);
    // console.log(regex.test(texto));
    // console.log(texto.match(regex));
    
    
    const texto = "Me encanta aprender JavaScript y practicar cada día javascript. \n JavaScript es un lenguaje de programación muy versátil javascript.";
    const patron = /javascript/gi; // La 'i' hace que no importe si es J o j.
    
    // Método .test() -> devuelve true o false
    console.log(patron.test(texto)); // true
    console.log(patron.exec(texto)); // ["JavaScript", index: 22, input: "Me encanta
    // Método .match() -> extrae la coincidencia
    console.log(texto.match(patron)); // ["JavaScript"]
    
    console.log("-- DEPENDIENDO DE LAS BANDERAS QUE PUEDEN SER /g  /i   /m  ,etc \n");

    console.log("---- AHORA PARA REEMPAZAR CON .replace() ----- \n");


    const textoReemplazar = "Me gusta el café, el café es mi bebida favorita.";

    const regexReemplazar = /café/g;

    const nuevoTexto = textoReemplazar.replace(regexReemplazar, "cacao");

    console.log(nuevoTexto); // "Me gusta el té, el té es mi bebida favorita."
