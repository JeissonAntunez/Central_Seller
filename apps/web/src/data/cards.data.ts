import type { Card } from "../types/flashcard.types";

export const cards: Card[] = [
  {
    id: 1,
    question: "¿Qué es React?",
    answer:
      "React es una biblioteca de JavaScript desarrollada por Meta para construir interfaces de usuario mediante componentes reutilizables y un DOM virtual.",
  },
  {
    id: 2,
    question: "¿Qué es TypeScript?",
    answer:
      "TypeScript es un superconjunto de JavaScript que añade tipado estático opcional, lo que permite detectar errores en tiempo de compilación.",
  },
  {
    id: 3,
    question: "¿Cuál es la diferencia entre var, let y const?",
    answer:
      "En JavaScript, var tiene alcance de función y puede redeclararse. let y const tienen alcance de bloque: let permite reasignación mientras que const no. Sin embargo, los objetos con const sí pueden modificar su contenido.",
  },
  {
    id: 4,
    question: "¿Qué es un Hook en React?",
    answer:
      "Los Hooks son funciones especiales de React que permiten usar estado y otras características de React en componentes funcionales, como useState, useEffect y useCallback.",
  },
  {
    id: 5,
    question: "¿Qué es el Virtual DOM?",
    answer:
      "El Virtual DOM es una representación en memoria del DOM real. React lo usa para calcular los cambios mínimos necesarios antes de actualizar el DOM real, mejorando el rendimiento.",
  },
];