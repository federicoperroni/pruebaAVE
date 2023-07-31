// Función para generar un gradiente de colores aleatorios en formato hexadecimal
function generateRandomGradient() {
    const color1 = generateRandomColor();
    const color2 = generateRandomColor();
    return `linear-gradient(to bottom right, ${color1}, ${color2})`;
}

function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);
}

function componentToHex(component) {
    const hex = component.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function setRandomColors() {
    const root = document.documentElement;
    root.style.setProperty("--color1", colorsArray[0] || generateRandomGradient());
    root.style.setProperty("--color2", colorsArray[1] || generateRandomGradient());
}
