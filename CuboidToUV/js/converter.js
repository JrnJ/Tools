let uvMap = [];

const imageContainer = document.getElementById("imageContainer");

let xInput = document.getElementById("xInput");
let yInput = document.getElementById("yInput");
let zInput = document.getElementById("zInput");

function CopyIntoArray(toCopy, startX, startY) {
    // x -> How many columns to skip
    // y -> How many rows    to skip per column

    let toCopyX = toCopy[0].length;
    let toCopyY = toCopy.length;

    // Fill Array
    for (let y = 0; y < toCopyY; y++) {
        for (let x = 0; x < toCopyX; x++) {
            uvMap[y + startY][x + startX] = toCopy[y][x];
        }
    }
}

function CreatePNG(array, pixelSize) {

    // Create Canvas
    let c = document.createElement("canvas");
    c.height = array[0].length * pixelSize;
    c.width = array.length * pixelSize;

    // Add Canvas to Body
    document.body.appendChild(c);
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            ctx.fillStyle = "rgba(" +
                array[i][j][0] +
                "," + array[i][j][1] +
                "," + array[i][j][2] +
                "," + array[i][j][3] +
                ")";

            ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
        }
    }

    let png = document.createElement("img");
    png.src = c.toDataURL("image/png");

    c.remove();

    imageContainer.appendChild(png);
}

function FillUV(sizeX, sizeY, sizeZ) {

    uvMap = [];

    // 8 x 6 x 6
    // let columns = sizeY + sizeX + sizeY + sizeX + 2;
    let columns = (sizeZ * 2) + (sizeX * 2);
    let rows = sizeY + sizeZ;

    let gridAlternation = 0;

    // Create White Image
    for (let y = 0; y < columns; y++) {

        uvMap.push([]);
        gridAlternation++;

        for (let x = 0; x < rows; x++) {
            gridAlternation++;
            uvMap[y].push([255 - (gridAlternation % 2 * 50), 255 - (gridAlternation % 2 * 50), 255 - (gridAlternation % 2 * 50), 1 / 255 * 0]);
        }
    }

    let uhm = 0;

    // Create Cube Faces
    let blockSide1 = [];

    // Fill Array
    for (let y = 0; y < sizeX; y++) {

        blockSide1.push([]);
        uhm++;

        for (let x = 0; x < sizeZ; x++) {
            uhm++;
            blockSide1[y].push([255 - (uhm % 2 * 50), 0, 0, 1 / 255 * 255]);
        }
    }

    // Copy Into the uvMap
    CopyIntoArray(blockSide1, 0, sizeZ);

    let blockSide2 = [];

    // Fill Array
    for (let y = 0; y < sizeX; y++) {

        blockSide2.push([]);
        uhm++;

        for (let x = 0; x < sizeZ; x++) {
            uhm++;
            blockSide2[y].push([0, 255 - (uhm % 2 * 50), 0, 1 / 255 * 255]);
        }
    }

    // Copy Into the uvMap
    CopyIntoArray(blockSide2, 0, sizeZ + sizeX);

    let blockSide3 = [];

    // Fill Array
    for (let y = 0; y < sizeZ; y++) {

        blockSide3.push([]);
        uhm++;

        for (let x = 0; x < sizeY; x++) {
            uhm++;
            blockSide3[y].push([0, 0, 255 - (uhm % 2 * 50), 1 / 255 * 255]);
        }
    }

    // Copy Into the uvMap
    CopyIntoArray(blockSide3, sizeZ, 0);

    let blockSide4 = [];

    // Fill Array
    for (let y = 0; y < sizeX; y++) {

        blockSide4.push([]);
        uhm++;

        for (let x = 0; x < sizeY; x++) {
            uhm++;
            blockSide4[y].push([255 - (uhm % 2 * 50), 128 - (uhm % 2 * 50), 0, 1 / 255 * 255]);
        }
    }

    // Copy Into the uvMap
    CopyIntoArray(blockSide4, sizeZ, sizeZ);

    let blockSide5 = [];

    // Fill Array
    for (let y = 0; y < sizeZ; y++) {

        blockSide5.push([]);
        uhm++;

        for (let x = 0; x < sizeY; x++) {
            uhm++;
            blockSide5[y].push([0, 255 - (uhm % 2 * 50), 255 - (uhm % 2 * 50), 1 / 255 * 255]);
        }
    }

    // Copy Into the uvMap
    CopyIntoArray(blockSide5, sizeZ, sizeZ + sizeX);

    let blockSide6 = [];

    // Fill Array
    for (let y = 0; y < sizeX; y++) {

        blockSide6.push([]);
        uhm++;

        for (let x = 0; x < sizeY; x++) {
            uhm++;
            blockSide6[y].push([255 - (uhm % 2 * 50), 0, 255 - (uhm % 2 * 50), 1 / 255 * 255]);
        }
    }

    // Copy Into the uvMap
    CopyIntoArray(blockSide6, sizeZ, sizeZ + sizeX + sizeZ);

    CreatePNG(uvMap, 25);
    CreatePNG(uvMap, 1);
}

function CreatePNGClick() {

    // Remove Children
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
    }

    FillUV(parseInt(xInput.value), parseInt(yInput.value), parseInt(zInput.value));
}