// Inputs
const imageWidth = document.getElementById("image-width");
const imageHeight = document.getElementById("image-height");

const aspectWidth = document.getElementById("aspect-width");
const aspectHeight = document.getElementById("aspect-height");

// Visual
const desiredAspectRatio = document.getElementById("desired-aspect-ratio");
const generatedAspectRatio = document.getElementById("generated-aspect-ratio");

// Values
const maxWidth = 300;

// OnInput Methods
function imageHeightOnInput() {
    updatePixelVisual();
}

function imageWidthOnInput() {
    updatePixelVisual();
}

function aspectHeigthOnInput() {
    updateAspectRatioVisual();
}

function aspectWidthOnInput() {
    updateAspectRatioVisual();
}

// Methods
function updatePixelVisual() {
    // generatedAspectRatio.style.width = 100 + "px";

    // For every 1 pixel in Height, you need ... in Width
    const aspectRatio = imageWidth.value / imageHeight.value;
    generatedAspectRatio.style.width = (maxWidth * aspectRatio) + "px";
    generatedAspectRatio.style.height = maxWidth + "px";
}

function updateAspectRatioVisual() {
    // desiredAspectRatio.style.width = 100 + "px";
    
    const aspectRatio = aspectWidth.value / aspectHeight.value;
    desiredAspectRatio.style.width = (maxWidth * aspectRatio) + "px";
    desiredAspectRatio.style.height = maxWidth + "px";
}
