let jsonText = document.getElementById("jsonText");
let jsonObjectText = document.getElementById("jsonObjectText");
jsonText.value = "bath_tap";

function ConvertJSON() {
    const name = jsonText.value;
    const className = GetClassName(name);
    const objectName = GetObjectName(name);
    let output = "";

    output += "public static final " + className + " " + objectName + " = new " + className + "(FabricBlockSettings.of(Material.LEAVES).strength(2.0f).nonOpaque().dynamicBounds());" + "\n";
    output += "\n";

    output += "stacks.add(new ItemStack(" + objectName + "));" + "\n";
    output += "\n";

    output += "Registry.register(Registry.BLOCK, id(\"" + name + "\"), " + objectName + ");" + "\n";
    output += "Registry.register(Registry.ITEM, id(\"" + name + "\"), new BlockItem(" + objectName + ", new FabricItemSettings().group(Clouds.CLOUDS_GROUP)));" + "\n";
    output += "BlockRenderLayerMap.INSTANCE.putBlock(" + objectName + ", RenderLayer.getTranslucent());" + "\n";

    jsonObjectText.value = output;
}

function GetClassName(name) {

    name = name.charAt(0).toUpperCase() + name.slice(1);

    for (let i = 0; i < name.length; i++) {
        if (name.charAt(i) == '_') {
            name = name.substr(0, i) + name.charAt(i + 1).toUpperCase() + name.substr(i + 2, name.length);
        }
    }

    return name;
}

function GetObjectName(name) {
    return name.toUpperCase();
}