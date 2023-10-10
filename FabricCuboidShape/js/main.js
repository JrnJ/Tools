const inputName = document.getElementById("inputName");

const inputSizeX = document.getElementById("inputSizeX");
const inputSizeY = document.getElementById("inputSizeY");
const inputSizeZ = document.getElementById("inputSizeZ");

const inputPosX = document.getElementById("inputPosX");
const inputPosY = document.getElementById("inputPosY");
const inputPosZ = document.getElementById("inputPosZ");

const blockSize = 16.0;

const output = document.getElementById("output");

function showOutput() {
    let finalOutput = "";
    let minX = parseFloat(inputPosX.value);
    let minY = parseFloat(inputPosY.value);
    let minZ = parseFloat(inputPosZ.value);
    let maxX = parseFloat(inputSizeX.value) + parseFloat(inputPosX.value);
    let maxY = parseFloat(inputSizeY.value) + parseFloat(inputPosY.value);
    let maxZ = parseFloat(inputSizeZ.value) + parseFloat(inputPosZ.value);
    finalOutput += inputName.value + "EAST_SHAPE = Block.createCuboidShape(" + minX + ", " + minY + ", " + minZ + ", " + maxX + ", " + maxY + ", " + maxZ +");" + "\n";
    finalOutput += inputName.value + "SOUTH_SHAPE = Block.createCuboidShape(" + minZ + ", " + minY + ", " + minX + ", " + maxZ + ", " + maxY + ", " + maxX +");" + "\n";

    minX = blockSize - parseFloat(inputSizeX.value);
    // 2 12 14 | 1 2 1
    // 9 3 6 | 0 3 5

    // 16 - 2 - 1

    // minX = blockSize - parseFloat(inputSizeX.value) + 1;
    minX = blockSize - parseFloat(inputSizeX.value) - parseFloat(inputPosX.value);
    minY = parseFloat(inputPosY.value);
    minZ = parseFloat(inputPosZ.value);
    maxX = blockSize - parseFloat(inputPosX.value);
    maxY = parseFloat(inputSizeY.value) + parseFloat(inputPosY.value);
    maxZ = blockSize - parseFloat(inputPosZ.value);
    finalOutput += inputName.value + "WEST_SHAPE = Block.createCuboidShape(" + minX + ", " + minY + ", " + minZ + ", " + maxX + ", " + maxY + ", " + maxZ +");" + "\n";
    finalOutput += inputName.value + "NORTH_SHAPE = Block.createCuboidShape(" + minZ + ", " + minY + ", " + minX + ", " + maxZ + ", " + maxY + ", " + maxX +");";
    
    output.value = finalOutput;
}

showOutput();