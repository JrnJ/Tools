/*
    #version: 1.0
    #2024 June 24
*/

/* <Config> */
const domain = 'jeroenj.com';
const cookieDomain = '.' + domain;
/* </Config> */

/* <Events> */
document.addEventListener('DOMContentLoaded', function() {
    
});
/* </Events> */

/* <Style Swapper> */
const styles = {
    'dark': './css/themes/theme-dark.css',
    'light': './css/themes/theme-light.css',
    'amoled': './css/themes/theme-amoled.css',
    'pink': './css/themes/theme-pink.css',
};
const styleCookieName = 'theme';

document.addEventListener('DOMContentLoaded', function() {
    setStyle(getCookie(styleCookieName, cookieDomain));
});

function setStyle(style) {
    if (!style) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            style = 'light';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: amoled)').matches) {
            style = 'amoled';
        } else {
            style = 'dark';
        } 
    }
    
    document.querySelector('#theme-current').href = styles[style];
    setCookie(styleCookieName, style, cookieDomain);
}
/* </Style Swapper> */

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