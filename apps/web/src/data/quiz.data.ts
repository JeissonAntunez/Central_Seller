import type { QuizQuestion } from "../types/quiz.types";

export const quizData = {
  title: "JavaScript & React",
  description: "Evalúa tu dominio del ecosistema moderno de frontend.",
  totalTime: 60,
  questions: [
    {
      id: 1,
      question: "¿Cuál es la diferencia entre == y === en JavaScript?",
      options: [
        { id: "a", text: "No hay diferencia, ambos comparan valores" },
        { id: "b", text: "=== compara valor y tipo sin coerción; == aplica coerción de tipos" },
        { id: "c", text: "== es más estricto que ===" },
        { id: "d", text: "=== solo funciona con strings y números" },
      ],
      correctId: "b",
      explanation: "=== no convierte tipos: 0 === '0' es false. Con ==, JavaScript intenta igualar los tipos primero, por eso 0 == '0' es true.",
    },
    {
      id: 2,
      question: "¿Qué devuelve typeof null en JavaScript?",
      options: [
        { id: "a", text: '"null"' },
        { id: "b", text: '"undefined"' },
        { id: "c", text: '"object"' },
        { id: "d", text: '"boolean"' },
      ],
      correctId: "c",
      explanation: 'typeof null === "object" es un bug histórico de JS desde 1995. Se mantuvo para no romper código existente.',
    },
    {
      id: 3,
      question: "¿Qué hace useEffect con un array de dependencias vacío []?",
      options: [
        { id: "a", text: "Corre en cada render" },
        { id: "b", text: "No corre nunca" },
        { id: "c", text: "Corre una sola vez al montar el componente" },
        { id: "d", text: "Corre solo al desmontar" },
      ],
      correctId: "c",
      explanation: "[] como dependencias equivale a componentDidMount: el effect corre una vez, después del primer render, sin volver a ejecutarse.",
    },
    {
      id: 4,
      question: "¿Cuál es la forma correcta de actualizar un objeto en useState?",
      options: [
        { id: "a", text: "state.name = 'nuevo'; setState(state)" },
        { id: "b", text: "setState({ ...state, name: 'nuevo' })" },
        { id: "c", text: "Object.assign(state, { name: 'nuevo' }); setState(state)" },
        { id: "d", text: "Cualquiera funciona igual en React" },
      ],
      correctId: "b",
      explanation: "Nunca mutes el estado directamente. Spread crea un nuevo objeto; React detecta el cambio de referencia y re-renderiza.",
    },
    {
      id: 5,
      question: "¿Para qué sirve useCallback en React?",
      options: [
        { id: "a", text: "Para ejecutar código asíncrono limpiamente" },
        { id: "b", text: "Para memorizar el resultado de un cálculo costoso" },
        { id: "c", text: "Para memorizar la referencia de una función entre renders" },
        { id: "d", text: "Es un alias de useEffect" },
      ],
      correctId: "c",
      explanation: "useCallback devuelve la misma referencia de función si las dependencias no cambian. Evita que componentes hijo con React.memo se re-rendericen.",
    },
    {
      id: 6,
      question: "¿Qué es el event bubbling?",
      options: [
        { id: "a", text: "Un evento se propaga del hijo hacia los ancestros en el DOM" },
        { id: "b", text: "Un evento baja del padre hacia todos los hijos" },
        { id: "c", text: "Dos eventos ocurren simultáneamente" },
        { id: "d", text: "Un error al usar addEventListener incorrectamente" },
      ],
      correctId: "a",
      explanation: "Los eventos burbujean hacia arriba: click en un <button> también dispara el evento en su <div> padre. Se detiene con stopPropagation().",
    },
    {
      id: 7,
      question: "¿Cuál es la diferencia entre useMemo y useCallback?",
      options: [
        { id: "a", text: "Son idénticos, solo difieren en el nombre" },
        { id: "b", text: "useMemo memoriza el valor devuelto; useCallback memoriza la función en sí" },
        { id: "c", text: "useCallback memoriza el valor; useMemo memoriza la función" },
        { id: "d", text: "useMemo es para primitivos, useCallback para objetos" },
      ],
      correctId: "b",
      explanation: "useMemo(() => calcular(), [deps]) cachea el resultado. useCallback(fn, [deps]) cachea la función. useMemo(fn) ≈ useCallback + ejecución inmediata.",
    },
    {
      id: 8,
      question: "¿Qué problema resuelve el Virtual DOM?",
      options: [
        { id: "a", text: "Guarda los componentes en una base de datos en memoria" },
        { id: "b", text: "Calcula el mínimo de cambios necesarios antes de tocar el DOM real" },
        { id: "c", text: "Reemplaza completamente al DOM del navegador" },
        { id: "d", text: "Es una librería externa que React usa opcionalmente" },
      ],
      correctId: "b",
      explanation: "React mantiene una copia del DOM en JS. Al cambiar el estado, compara (diffing) el VDOM anterior con el nuevo y solo actualiza lo que cambió.",
    },
  ] as QuizQuestion[],
};