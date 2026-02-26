const questionsAnswer = {
    "What is the difference between var, let, and const?": 
        "var is function-scoped. let and const are block-scoped; let allows reassignment, while const is constant.",
    
    "What is a callback in Javascript and its importance?": 
        "A function passed into another function as an argument, essential for asynchronous tasks.",
        "Valor" : "Respuesta"
};

const mostrarPreguntas = (objeto) => {
    // Usamos Object.entries para obtener un array de pares [llave, valor]
    Object.entries(objeto).forEach(([pregunta, respuesta]) => {
        console.log(`❓ Pregunta: ${pregunta}`);
        // console.log(`💡 Respuesta: ${respuesta}`);
        console.log("-----------------------");
    });
};

// Ejecutar la función
mostrarPreguntas(questionsAnswer);
