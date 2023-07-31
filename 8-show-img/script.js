let colorsArray = []; // Array para almacenar los colores generados

function displayImages() {
    let imageNumber = parseInt(document.getElementById("imageNumber").value);
    imageNumber = Math.min(imageNumber, 15); // Limitamos el número de cuadrados a 15

    const imageContainer = document.getElementById("imageContainer");
    const existingImages = imageContainer.children.length;
    const totalImages = imageNumber;

    if (existingImages < totalImages) {
        for (let i = existingImages; i < totalImages; i++) {
            const imageElement = createImage();
            imageContainer.appendChild(imageElement);
        }
    } else if (existingImages > totalImages) {
        for (let i = 0; i < existingImages - totalImages; i++) {
            imageContainer.removeChild(imageContainer.lastChild);
        }
    }

    // Actualizamos los colores solo si se han generado nuevos cuadrados
    if (existingImages !== totalImages) {
        setRandomColors();
    }
}

function createImage() {
    const imageElement = document.createElement("div");
    imageElement.className = "img-square";
    imageElement.style.backgroundImage = generateRandomGradient();
    return imageElement;
}

// Llamar a setRandomColors() al cargar la página inicialmente
setRandomColors();
// Llamar a displayImages() al cargar la página inicialmente
displayImages();
