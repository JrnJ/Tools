/*
    #version: 1.3
    #2024 October 2
*/

/* <Config> */
const domain = window.location.hostname;
const cookieDomain = '.' + domain;
const cookiesAllowedName = "cookies";
/* </Config> */

/* <Events> */
document.addEventListener('DOMContentLoaded', function() {
    
});
/* </Events> */

/* <Theme Swapper> */
const themeCookieName = 'theme';
const themes = {
    'Dark': {
        path: './css/themes/theme-dark.css',
        name: 'Dark',
    },
    'Light': {
        path: './css/themes/theme-light.css',
        name: 'Light',
    },
    'Amoled': {
        path: './css/themes/theme-amoled.css',
        name: 'Amoled',
    },
    'Pink': {
        path: './css/themes/theme-pink.css',
        name: 'Pink',
    },
};
let currentTheme;

document.addEventListener('DOMContentLoaded', function() {
    checkIfCookiesAllowed();
    setTheme(getCookie(themeCookieName, cookieDomain));

    Object.keys(themes).forEach(key => {
        addThemeOption(themes[key], (currentTheme.name === themes[key].name));
    });

    document.querySelector('#theme-selector').addEventListener('change', (e) => {
        setTheme(e.target.value, false);
    });
});

function addThemeOption(theme, selected) {
    const option = document.createElement('option');
    option.value = theme.name;
    option.textContent = theme.name;
    if (selected) {
        option.selected = true;
    }

    document.querySelector('#theme-selector').appendChild(option);
}

function setTheme(theme) {
    if (!theme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            theme = 'Light';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: amoled)').matches) {
            theme = 'Amoled';
        } else {
            theme = 'Dark';
        } 
    }
    
    document.querySelector('#theme-current').href = themes[theme].path;
    currentTheme = themes[theme];
    setCookie(themeCookieName, themes[theme].name, cookieDomain);
}
/* </Theme Swapper> */

/* <Util> */
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    return overlay;
}
/* </Util> */

/* <Storage> */
function setStorageItem(key, value) {
    if (typeof(Storage) === undefined) {
        return null;
    }

    localStorage.setItem(key, value);
}

function getStorageItem(key) {
    if (typeof(Storage) === undefined) {
        return null;
    }

    return localStorage.getItem(key);
}

function checkIfCookiesAllowed() {
    if (getCookie(cookiesAllowedName, cookieDomain) === null) {
        askForAllowCookies();
        return false;
    }

    return true;
}

function askForAllowCookies() {
    const overlay = createOverlay();
    overlay.id = 'cookies-overlay';
    const container = document.createElement('div');
    container.classList.add('cookies-banner');

    const cookieMessage = document.createElement('p');
    cookieMessage.textContent = 'Cookies are used for storing your theme preferences.';

    const allowButton = document.createElement('button');
    allowButton.addEventListener('click', allowCookies);
    allowButton.textContent = 'Allow';

    const declineButton = document.createElement('button');
    declineButton.addEventListener('click', declineCookies);
    declineButton.textContent = 'Decline';

    overlay.appendChild(container);
    container.appendChild(cookieMessage);
    container.appendChild(allowButton);
    container.appendChild(declineButton);

    document.body.appendChild(overlay);
}

function allowCookies() {
    setCookie(cookiesAllowedName, 'true', cookieDomain);
    document.querySelector('#cookies-overlay').remove();
}

function declineCookies() {
    document.querySelector('#cookies-overlay').remove();
}

function setCookie(key, value, domain) {
    document.cookie = `${key}=${value}; path=/; domain=${domain};`;
}

function getCookie(key, domain) {
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}
/* </Storage> */