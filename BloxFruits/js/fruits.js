class BloxFruit {
    constructor(name, value, tradeEase) {
        this.name = name;
        this.value = value;
        this.tradeEase = tradeEase;

        this.amount = 0;
    }
};

const fruitContainer = document.getElementById("fruit-container");
const fruitValueContainer = document.getElementById("fruit-value-container");

let fruits = [];

function createFruits() {
    const LeopardValue = 1;
    const DragonValue = LeopardValue / 2;
    const BuddhaValue = DragonValue / 3;
    const PortalValue = BuddhaValue / 2;
    const LoveValue = BuddhaValue; // dit is tricky om te krijgen though

    const LeopardFruit = new BloxFruit("Leopard", LeopardValue, 1);
    fruits.push(LeopardFruit);

    const DragonFruit = new BloxFruit("Dragon", DragonValue, 1);
    fruits.push(DragonFruit);

    const SpiritFruit = new BloxFruit("Spirit", BuddhaValue * 2, 1);
    fruits.push(SpiritFruit);

    const ControlFruit = new BloxFruit("Control", SpiritFruit.value, 1);
    fruits.push(ControlFruit);

    const VenomFruit = new BloxFruit("Venom", BuddhaValue, 1);
    fruits.push(VenomFruit);

    const ShadowFruit = new BloxFruit("Shadow", BuddhaValue, 1);
    fruits.push(ShadowFruit);

    const DoughFruit = new BloxFruit("Dough", DragonValue, 1);
    fruits.push(DoughFruit);

    const GravityFruit = new BloxFruit("Gravity", PortalValue, 0.02);
    fruits.push(GravityFruit);

    const BlizzardFruit = new BloxFruit("Blizzard", BuddhaValue, 1);
    fruits.push(BlizzardFruit);

    const PawFruit = new BloxFruit("Paw", PortalValue, 0.01);
    fruits.push(PawFruit);

    const RumbleFruit = new BloxFruit("Rumble", BuddhaValue, 1);
    fruits.push(RumbleFruit);

    const PortalFruit = new BloxFruit("Portal", PortalValue, 1);
    fruits.push(PortalFruit);

    const PhoenixFruit = new BloxFruit("Phoenix", PortalValue, 1);
    fruits.push(PhoenixFruit);

    const SpiderFruit = new BloxFruit("String", PortalValue, 0.01);
    fruits.push(SpiderFruit);

    const LoveFruit = new BloxFruit("Love", LoveValue, 1);
    fruits.push(LoveFruit);

    const BuddhaFruit = new BloxFruit("Buddha", BuddhaValue, 1);
    fruits.push(BuddhaFruit);

    const QuakeFruit = new BloxFruit("Quake", LoveFruit.value, 0.1);
    fruits.push(QuakeFruit);

    const MagmaFruit = new BloxFruit("Magma", QuakeFruit.value, 0.1);
    fruits.push(MagmaFruit);

    // Worth nothing
    const BarrierFruit = new BloxFruit("Barrier", 0, 0);
    fruits.push(BarrierFruit);

    // Worth nothing
    const RubberFruit = new BloxFruit("Rubber", 0, 0);
    fruits.push(RubberFruit);

    const LightFruit = new BloxFruit("Light", MagmaFruit.value / 2, 0.05);
    fruits.push(LightFruit);

    //
    const DiamondFruit = new BloxFruit("Diamond", 0, 0);
    fruits.push(DiamondFruit);

    //
    const ReviveFruit = new BloxFruit("Revive", 0, 0);
    fruits.push(ReviveFruit);

    //
    const DarkFruit = new BloxFruit("Dark", 0, 0);
    fruits.push(DarkFruit);

    //
    const SandFruit = new BloxFruit("Sand", 0, 0);
    fruits.push(SandFruit);

    // //
    // const IceFruit = new BloxFruit("Ice", 0, 0);
    // fruits.push(IceFruit);

    // //
    // const FalconFruit = new BloxFruit("Falcon", 0, 0);
    // fruits.push(FalconFruit);

    // //
    // const FlameFruit = new BloxFruit("Flame", 0, 0);
    // fruits.push(FlameFruit);

    // //
    // const SpikeFruit = new BloxFruit("Spike", 0, 0);
    // fruits.push(SpikeFruit);

    // //
    // const SmokeFruit = new BloxFruit("Smoke", 0, 0);
    // fruits.push(SmokeFruit);

    // const Fruit = new BloxFruit("", LeopardFruit.value / 2, 1);
    // fruits.push(Fruit);
}

function visualizeFruits() {
    for (let i = 0; i < fruits.length; i++) {
        fruitContainer.appendChild(visualizeFruit(fruits[i]));
    }
}

function visualizeFruit(fruit) {
    //
    const fruitItem = document.createElement('div');
    fruitItem.className = "fruit-item dockpanel";

    const fruitImg = document.createElement('img');
    fruitImg.src = "./images/" + fruit.name + ".png";
    fruitItem.appendChild(fruitImg);

    const textDiv = document.createElement('div');

    const fruitName = document.createElement('p');
    fruitName.textContent = fruit.name + " | " + fruit.value.toFixed(3);
    textDiv.appendChild(fruitName);

    const tradeEase = document.createElement('p');
    tradeEase.textContent = "Trade Ease: " + fruit.tradeEase;
    textDiv.appendChild(tradeEase);

    const fruitAmount = document.createElement('input');
    fruitAmount.type = "number";
    fruitAmount.value = fruit.amount;
    fruitAmount.min = 0;
    fruitAmount.oninput = function() { updateFruitAmount(fruit, fruitAmount.value); };
    textDiv.appendChild(fruitAmount);

    fruitItem.appendChild(textDiv);

    return fruitItem;
}

function updateFruitAmount(fruit, value) {
    for (let i = 0; i < fruits.length; i++) {
        if (fruit.name == fruits[i].name) {
            fruits[i].amount = value;
        }
    }

    calculateFruitsValue();
}

function calculateFruitsValue() {
    // Empty first
    while (fruitValueContainer.firstChild) {
        fruitValueContainer.removeChild(fruitValueContainer.firstChild);
    }

    let totalValue = 0.0;
    for (let i = 0; i < fruits.length; i++) {
        // Show value
        totalValue += fruits[i].amount * fruits[i].value;
    }

    for (let i = 0; i < fruits.length; i++) {
        if (fruits[i].value <= 0) continue;

        if (totalValue >= fruits[i].value) {
            // Add
            const fruit = fruits[i];
            let amount = 0;
            while (totalValue >= fruits[i].value && fruits[i].value > 0) {
                totalValue -= fruit.value;
                amount++;
            }

            fruitValueContainer.appendChild(visualizeFruitValue(fruit, amount));
        }
    }
}

function visualizeFruitValue(fruit, fruitAmount) {
    // <div class="fruit-value-item dockpanel">
    //                     <img src="./images/Leopard.png">
    //                     <div>
    //                         <p>Leopard</p>
    //                         <p>Amount: 1</p>
    //                         <p>Trade Ease: 1</p>
    //                     </div>
    //                 </div>

    //
    const fruitItem = document.createElement('div');
    fruitItem.className = "fruit-value-item dockpanel";

    const fruitImg = document.createElement('img');
    fruitImg.src = "./images/" + fruit.name + ".png";
    fruitItem.appendChild(fruitImg);

    const textDiv = document.createElement('div');

    const fruitName = document.createElement('p');
    fruitName.textContent = fruit.name;
    textDiv.appendChild(fruitName);

    const amount = document.createElement('p');
    amount.textContent = "Amount: " + fruitAmount;
    textDiv.appendChild(amount);

    const tradeEase = document.createElement('p');
    tradeEase.textContent = "Trade Ease: " + fruit.tradeEase;
    textDiv.appendChild(tradeEase);

    fruitItem.appendChild(textDiv);

    return fruitItem;
}

function onWindowLoaded() {
    createFruits();
    visualizeFruits();
}

window.onload = onWindowLoaded();