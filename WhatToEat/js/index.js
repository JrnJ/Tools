const recipes = [
    {
        name: "Yakisoba",
        time: "35m",
    },
    {
        name: "Teriyaki",
        time: "45m",
    },
    {
        name: "Noodles met Mango",
    },
    {
        name: "Aardappelroosjes, kip en bonen",
        time: "30m",
    },
    {
        name: "Spagehtti, rode saus met brocoli, tomaat, olijven en spekjes",
    },
    {
        name: "Tortilla met rode saus, mais, paprika(rood) en kip",
    },
    {
        name: "Rijst met bonen en kip",
        time: "25m",
    },
    {
        name: "Spaghetti met groene pesto, zalm en cherry tomaatjes uit de oven",
    },
    {
        name: "Spaghetti bolosgnaise",
    },
    {
        name: "Pasteitjes met kippenragout",
    },
    {
        name: "Lasagne",
    },
    {
        name: "Zelfgemaakte pizza",
        time: "20m",
    },
    {
        name: "Pannekoeken met soep",
        time: "15m",
    },
    {
        name: "Spaghetti carbonade",
        time: "15m",
    },
]

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#generate-dish').addEventListener('click', () => {
        const dish = getRandomDish();
        document.querySelector('#dish-name-text').textContent = dish.name;
        document.querySelector('#dish-time-text').textContent = 'Time: ' + dish.time;
    });
});

function getRandomDish() {
    return recipes[Math.floor(Math.random() * recipes.length)];
}