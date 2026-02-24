/*
 * Escribe un programa que imprima los 50 primeros números de la sucesión
 * de Fibonacci empezando en 0.
 * - La serie Fibonacci se compone por una sucesión de números en
 *   la que el siguiente siempre es la suma de los dos anteriores.
 *   0, 1, 1, 2, 3, 5, 8, 13...
 */


// function fibonacci(n) {
//     let temp = [];

//     for (let i = 0; i < n; i++) {
//         if (i === 0) {
//             temp.push(0);
//         } else if (i === 1) {
//             temp.push(1);
//         } else {
//             temp.push(temp[i - 1] + temp[i - 2]);
//         } 
//     }
//     if(temp.push[n - 1] >= 50 {
//         break;
//     }
//     return temp;
// }

// console.log(fibonacci(50));

// function fibonacci(n) {
//     if (n === 0) return 0;
//     if (n === 1) return 1;

//     return fibonacci(n - 1) + fibonacci(n - 2);
// }

// for (let i = 0; i < 50; i++) {
//     console.log(fibonacci(i));
// }


function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n === 0) return 0;
    if (n === 1) return 1;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

for (let i = 0; i < 50; i++) {
    console.log(fibonacci(i));

    
}


