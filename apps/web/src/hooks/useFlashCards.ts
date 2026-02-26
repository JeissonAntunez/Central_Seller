
// Importaciones y rutas 
import { useState } from "react";
import type { Card } from "../types/flashcard.types";


// Una interface  donde el cards tenga como valor un array llamado card
interface UseFlashCardsProps {
  cards: Card[];
}

// Una interface donde vamos declarar los valores o como variable: su valor  tengo funciones, booleanos y array
interface UseFlashCardsReturn {
  current: Card;
  currentIndex: number;
  total: number;
  progress: number;
  showAnswer: boolean;
  flipping: boolean;
  toggleAnswer: () => void;
  goNext: () => void;
  goPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

// Creo una funcion para exportar donde tiene como parametro un array que seria el cards que esta dentro de una interface UseFlashCardsProps entonces
// esto seria como useFlashCards (Card[] que es una  interface de una ruta import type { Card } from "../types/flashcard.types"; donde su valor seria Card{   id: number;
//question : string;answer : string;} : y el UseFlashCardsProps este seria la interface ) :  este dos puntos luego del parametro de la funcion si no entiendo
// pero creo que llama la inferface declaro antes 
// Ahora paso a las constante dentro de las funciones donde se crear dos constantes dentro un array  donde cada de esto el currentIndex y setCurrentIndex obtendra el valor se useState(0) esto si no sabria que valor tendria el useState
// ahora el showAnswer y setShowAnswer igual tendra el valor de useState(false)
// el flipping y setFlipping tendra el valor de useState(false)
// Importante entiendo que esto de set andes del nombre es un metodo de acceso que se puede modificar porque es set a diferencia de get que es obtener el valor

export function useFlashCards({ cards }: UseFlashCardsProps): UseFlashCardsReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [flipping, setFlipping] = useState(false);


  // aca el tottal va obtener la longitud del cards. que seria el array Card[]
  const total = cards.length;
  //  aca el current en la interface dice que tiene que valor un array y esta bien porque tiene el cards[currentIndex];
  // ahora no se que pasa como valor el currendIndex o seria como cards[0] 
  const current = cards[currentIndex];
  // aca el progress dice que tiene valor number esta bien
  // Entonces esto seria la barra de progreso  comienza asi ((0+1)/total) *100;
  const progress = ((currentIndex + 1) / total) * 100;


  //  esto es una constante donde tiene parametros pero un llave y valor  esto es admitible?  pero su valor  es separado de dos texto con |
  // al final es una funcion navigate
  const navigate = (direction: "prev" | "next") => {
    // aca si no se que valor pueda tener ya tu me diras el flipping o creo que es si el usaState no va bien lo omite lo que pasa es que no se hace el useStatee o que te duelve o que
    // o que su valor de useState
    if (flipping) return;
    setFlipping(true);
    setShowAnswer(false);
    // Esto es una funcion de modificar el tiempo algo asi hasta ahi noma entiendo que su respueta demora 300 milesegundos 
    // y entiendo que si el  se elige el next se va aprogresar es decir se avanzan la siguiente pregunta y tambien y sino el prev seria regresar
    setTimeout(() => {
      setCurrentIndex((prev) =>
        direction === "next"
          ? Math.min(prev + 1, total - 1)
          : Math.max(prev - 1, 0)
      );
      setFlipping(false);
    }, 300);
  };

  // 
  const toggleAnswer = () => setShowAnswer((prev) => !prev);
  const goNext = () => navigate("next");
  const goPrev = () => navigate("prev");

  return {
    current,
    currentIndex,
    total,
    progress,
    showAnswer,
    flipping,
    toggleAnswer,
    goNext,
    goPrev,
    canGoNext: currentIndex < total - 1,
    canGoPrev: currentIndex > 0,
  };
}