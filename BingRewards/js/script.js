const searchQueries = [
    'luffy gear 5', 'one piece anime', 'plushies',
    'chat gpt', 'google gemini', 'discord',
    'dolphin blog', 'cemu blog', 'roblox',
    'youtube', 'reddit', 'crunchyroll',
    'stackoverflow', 'cpp forum', 'flutter',
    'nintendo', 'minecraft', 'terraria',
    'steam', 'steam db', 'steam price charts',
    'minecraft vertical piston extender', 'minecraft 3x3 piston door', 'minecraft wiki',
    'luffy devil fruit', 'one piece devil fruits', 'one piece chopper devil fruit',
    'one piece awakenings', 'a certain scientific railgun season 4 date', 'konosuba new season date',
];
let currentQueries = [];

const searchInterval = 2000;
const pointsPerSearch = 3;
const bing30 = 30;
const bing90 = 90;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#bing-30').addEventListener('click', () => {
        currentQueries = searchQueries;

        let counter = 0;
        const interval = setInterval(() => {
            counter++;
            randomBingSearch();

            if (counter > bing30 / pointsPerSearch) {
                clearInterval(interval);
                return;
            }
        }, searchInterval);
    });

    document.querySelector('#bing-90').addEventListener('click', () => {
        
    });
});

function randomBingSearch() {
    const queryIndex = Math.floor(Math.random() * currentQueries.length);
    const query = currentQueries[queryIndex];

    const newTab = window.open(`https://www.bing.com/search?q=${query}`, '_blank');
    newTab.location.href = 'javascript:void(0)';

    currentQueries.splice(queryIndex, 1);
}