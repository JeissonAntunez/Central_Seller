const numeroPrimo = (num) => {
    for (let contador = 2; contador <= num; contador++) {
        let esPrimo = true;

        for (let i = 2; i <= Math.sqrt(contador); i++) {
            if (contador % i === 0) {
                esPrimo = false;
                break;
            }
        }

        if (esPrimo) {
            console.log(`${contador} es un número primo`);
        }
    }
}

numeroPrimo(50);
