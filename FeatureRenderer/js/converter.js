const literal_renderFeature = "FeatureRenderer";
const literal_entityModel = "EntityModel";

// Variables
let featureName;
let modName;
let packageName;
let texturePath;
let textureWidth;
let textureHeight;

let clientModName;
let rootName;
let entityModelLayer;

let modelName;
let featureRenderClassName;
let entityModelClassName;

class InputData {
    constructor(featureName, modName, packageName, texturePath, textureWidth, textureHeight) {
        this.featureName = featureName;
        this.modName = modName;
        this.packageName = packageName;
        this.texturePath = texturePath;
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputData = getInputFromStorage();
    document.querySelector('#featureName').value = inputData.featureName;
    document.querySelector('#modName').value = inputData.modName;
    document.querySelector('#packageName').value = inputData.packageName;
    document.querySelector('#texturePath').value = inputData.texturePath;
    document.querySelector('#textureWidth').value = inputData.textureWidth;
    document.querySelector('#textureHeight').value = inputData.textureHeight;
});

function createOutputFile(fileName, text) {
    const container = document.createElement('div');
    container.classList.add('fileOutput');

    const title = document.createElement('p');
    title.textContent = fileName + '.java';
    container.appendChild(title);

    const textArea = document.createElement('textarea');
    textArea.textContent = text;
    container.appendChild(textArea);

    document.querySelector('#outputs').appendChild(container);
}

function convert() {
    saveInputToStorage();

    setVariables();
    createClientVariables();
    createEntityModel();
    createFeatureRenderer();
    createEntityModelsMixin();
    createPlayerEntityRendererMixin();
}

function setVariables() {
    featureName = document.querySelector('#featureName').value;
    modName = document.querySelector('#modName').value;
    packageName = document.querySelector('#packageName').value;

    texturePath = document.querySelector('#texturePath').value;
    textureWidth = document.querySelector('#textureWidth').value;
    textureHeight = document.querySelector('#textureHeight').value;

    clientPackageName = packageName + 'Client';
    clientModName = modName + 'Client';
    rootName = modName.toLowerCase();
    entityModelLayer = featureName.replace(/(?<!^)([A-Z])/g, '_$1').toUpperCase();
    entityModelLayerName = entityModelLayer.toLowerCase();
    
    modelName = featureName + literal_entityModel;
    featureRenderClassName = featureName + literal_renderFeature;
    entityModelClassName = featureName + literal_entityModel;
}

function createClientVariables() {
    output = `public static final EntityModelLayer ${entityModelLayer} = new EntityModelLayer(${modName}.id("${entityModelLayerName}"), "main");\r\n`;
    output += `public static final String ${entityModelLayer}_PART = "${entityModelLayerName}_part";\r\n`;
    
    createOutputFile(clientModName, output);
}

function createEntityModel() {
    output = `package ${packageName}.${rootName}.model;\r\n\r\n`;

    output += `import ${packageName}.${rootName}.${clientModName};\r\n`;
    output += `import net.minecraft.client.model.*;\r\n`;
    output += `import net.minecraft.client.render.entity.model.SinglePartEntityModel;\r\n`;
    output += `import net.minecraft.entity.LivingEntity;\r\n`;

    output += `\r\npublic class ${entityModelClassName}<T extends LivingEntity> extends SinglePartEntityModel<T> {\r\n\r\n`;
    output += `private final ModelPart root;\r\n`;
    output += `\r\n`;

    output += `public ${entityModelClassName}(ModelPart root) {\r\n`;
    output += `this.root = root;\r\n`;
    output += `}\r\n\r\n`;
    output += `public static TexturedModelData getTexturedModelData() {\r\n`;
    output += `ModelData modelData = new ModelData();\r\n`;
    output += `ModelPartData modelPartData = modelData.getRoot();\r\n`;
    output += `\r\n// Pivot:   The rotation point\r\n`;
    output += `// Offset:  Offset from 0, 0, 0 (based on parent)\r\n`;
    output += `modelPartData.addChild(${clientModName}.${entityModelLayer}_PART,\r\n`;
    output += `ModelPartBuilder.create().uv(0, 0)\r\n`;
    output += `.cuboid(0.0f, 0.0f, 0.0f, 8.0f, 8.0f, 8.0f),\r\n`;
    output += `ModelTransform.of(0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f));\r\n`;
    output += `\r\n`;
    output += `return TexturedModelData.of(modelData, ${textureWidth}, ${textureHeight});\r\n`;
    output += `}\r\n\r\n`;
    output += `@Override\r\n`;
    output += `public ModelPart getPart() {\r\n`;
    output += `return this.root;\r\n`;
    output += `}\r\n\r\n`;
    output += `@Override\r\n`;
    output += `public void setAngles(T entity, float limbAngle, float limbDistance, float animationProgress, float headYaw, float headPitch) {\r\n`;
    output += `\r\n`;
    output += `}\r\n`;
    output += `}`;
    
    createOutputFile(entityModelClassName, output);
}

function createFeatureRenderer() {
    let output = `package ${packageName}.${rootName}.renderfeature;\r\n\r\n`;
    output += `import ${packageName}.${rootName}.${modName};\r\n`;
    output += `import ${packageName}.${rootName}.${clientModName};\r\n`;
    output += `import ${packageName}.${rootName}.model.${featureName + literal_entityModel};\r\n`;
    output += `import net.minecraft.client.render.OverlayTexture;\r\n`;
    output += `import net.minecraft.client.render.RenderLayer;\r\n`;
    output += `import net.minecraft.client.render.VertexConsumer;\r\n`;
    output += `import net.minecraft.client.render.VertexConsumerProvider;\r\n`;
    output += `import net.minecraft.client.render.entity.feature.FeatureRenderer;\r\n`;
    output += `import net.minecraft.client.render.entity.feature.FeatureRendererContext;\r\n`;
    output += `import net.minecraft.client.render.entity.model.EntityModel;\r\n`;
    output += `import net.minecraft.client.render.entity.model.EntityModelLoader;\r\n`;
    output += `import net.minecraft.client.render.item.ItemRenderer;\r\n`;
    output += `import net.minecraft.client.util.math.MatrixStack;\r\n`;
    output += `import net.minecraft.entity.LivingEntity;\r\n`;
    output += `import net.minecraft.util.Identifier;\r\n`;

    output += `\r\npublic class ${featureRenderClassName}<T extends LivingEntity, M extends EntityModel<T>> extends FeatureRenderer<T, M> {\r\n\r\n`;
    output += `private static final Identifier TEXTURE = ${modName}.id("textures/${texturePath}.png");\r\n`;
    output += `private final ${modelName}<T> entityModel;\r\n`;
    output += `\r\npublic ${featureRenderClassName}(FeatureRendererContext<T, M> context, EntityModelLoader loader) {\r\n`;
    output += `super(context);\r\n`;
    output += `this.entityModel = new ${modelName}<>(loader.getModelPart(${clientModName}.${entityModelLayer}));\r\n`;
    output += `}\r\n`;
    output += `\r\n@Override\r\n`;
    output += `public void render(MatrixStack matrices, VertexConsumerProvider vertexConsumers, int light, T entity, float limbAngle, float limbDistance,\r\n`;
    output += `float tickDelta, float animationProgress, float headYaw, float headPitch) {\r\n\r\n`;
    output += `VertexConsumer vertexConsumer = ItemRenderer.getArmorGlintConsumer(vertexConsumers, RenderLayer.getArmorCutoutNoCull(TEXTURE), false, false);\r\n`;
    output += `this.getContextModel().copyStateTo(this.entityModel);\r\n`;
    output += `this.entityModel.setAngles(entity, limbAngle, limbDistance, animationProgress, headYaw, headPitch);\r\n`;
    output += `this.entityModel.render(\r\n`;
    output += `matrices, vertexConsumer, light,\r\n`;
    output += `OverlayTexture.DEFAULT_UV,\r\n`;
    output += `1.0f, 1.0f, 1.0f, 1.0f\r\n`;
    output += `);\r\n`;
    output += `}\r\n`;
    output += ``;
    output += ``;
    output += `}`;

    createOutputFile(featureRenderClassName, output);
}

function createEntityModelsMixin() {
    output = ``;
    output += `@Mixin(EntityModels.class)\r\n`;
    output += `public class EntityModelsMixin {\r\n\r\n`;
    output += `@Inject(at = @At(value = "TAIL"), method = "getModels", cancellable = true)\r\n`;
    output += `private static void getModels(CallbackInfoReturnable<Map<EntityModelLayer, TexturedModelData>> cir) {\r\n`;
    output += `HashMap<EntityModelLayer, TexturedModelData> map = new HashMap<EntityModelLayer, TexturedModelData>(cir.getReturnValue());\r\n`;
    output += `\r\n\r\nmap.put(${clientModName}.${entityModelLayer}, ${entityModelClassName}.getTexturedModelData());\r\n\r\n\r\n`;
    output += `cir.setReturnValue(map);\r\n`;
    output += `}\r\n`;
    output += `}`;

    createOutputFile("EntityModelsMixin", output);
}

function createPlayerEntityRendererMixin() {
    output = `this.addFeature(new ${featureRenderClassName}<>(this, ctx.getModelLoader()));`;

    createOutputFile("PlayerEntityRenderer", output);
}

function getInputFromStorage() {
    if (typeof(Storage) === undefined) {
        return "";
    }

    const inputData = new InputData(
        localStorage.getItem("featureName"),
        localStorage.getItem("modName"),
        localStorage.getItem("packageName"),
        localStorage.getItem("texturePath"),
        localStorage.getItem("textureWidth"),
        localStorage.getItem("textureHeight")
    );

    return inputData;
}

function saveInputToStorage() {
    if (typeof(Storage) === undefined) {
        return "";
    }

    localStorage.setItem("featureName", document.querySelector('#featureName').value);
    localStorage.setItem("modName", document.querySelector('#modName').value);
    localStorage.setItem("packageName", document.querySelector('#packageName').value);

    localStorage.setItem("texturePath", document.querySelector('#texturePath').value);
    localStorage.setItem("textureWidth", document.querySelector('#textureWidth').value);
    localStorage.setItem("textureHeight", document.querySelector('#textureHeight').value);
}