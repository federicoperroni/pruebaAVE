function multiply(x, y) {
    if (x === 0 || y === 0) return 0
    if (y > 0) return x + multiply(x, y - 1)
    if (y < 0) return -multiply(x, -y);
}

console.log('Multiplicar 8 y 4 sin operador "*", resultado: ', multiply(8, 4))
console.log('Multiplicar -3 y 6 sin operador "*", resultado: ', multiply(-3, 6))
console.log('Multiplicar 3 y -6 sin operador "*", resultado: ', multiply(3, -6))
console.log('Multiplicar -4 y -5 sin operador "*", resultado: ', multiply(-4, -5))