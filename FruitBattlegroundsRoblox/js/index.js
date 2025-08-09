class ServerEntry {
    constructor(serverId, serverTime, registerTime) {
        this.serverId = serverId;
        this.serverTime = serverTime;
        this.registerTime = registerTime;
        this.element = null;
    }

    getSpawnAtMinuteMark() {
        let spawnAtMinuteMark = this.registerTime.getMinutes() - this.serverTime;
        if (spawnAtMinuteMark < 0) {
            spawnAtMinuteMark += 60;
        }

        return spawnAtMinuteMark;
    }

    getSpawnInMinutes() {
        const spawnAtMinuteMark = this.getSpawnAtMinuteMark();
        let spawnInMinutes = spawnAtMinuteMark - new Date(Date.now()).getMinutes();
        if (spawnInMinutes < 0) {
            spawnInMinutes += 60;
        }

        return spawnInMinutes
    }

    getServerTime() {
        return this.serverTime;
    }

    toJson() {
        return new JsonServerEntry(this.serverId, this.serverTime, this.registerTime);
    }
}

class JsonServerEntry {
    constructor(serverId, serverTime, registerTime) {
        this.serverId = serverId;
        this.serverTime = serverTime;
        this.registerTime = registerTime;
    }
}

const serverEntriesStorageKey = "SERVER_ENTRIES";
let serverEntries = [];

function saveServersToStorage() {
    let jsonServerEntries = [];
    for (let i = 0; i < serverEntries.length; i++) {
        jsonServerEntries.push(serverEntries[i].toJson());
    }
    setStorageItem(serverEntriesStorageKey, jsonServerEntries);
}

function addServerEntryClick() {
    const serverId = document.querySelector('#serverId').value;
    let serverTime = document.querySelector('#serverTime').value;
    const registerTime = new Date(document.querySelector('#registerTime').value);

    let serverEntry = new ServerEntry(serverId, serverTime, registerTime);
    serverEntries.push(serverEntry);
    saveServersToStorage();
    createServerEntry(serverEntry);

    // Reset fields for easier adding
    setTimeout(() => {
        document.querySelector('#serverId').value = '';
        document.querySelector('#serverTime').value = '';
        document.querySelector('#registerTime').value = '';
    }, 250);
}

function fillServerEntries() {
    // array is in object so no loop is happening
    for (let i = 0; i < serverEntries.length; i++) {
        createServerEntry(serverEntries[i]);
    }
}

function createServerEntry(serverEntry) {
    const container = document.createElement('div');
    container.id = serverEntry.serverId;
    serverEntry.element = container;

    const textContainer = document.createElement('div');
    textContainer.classList.add('dockpanel');
    textContainer.classList.add('gap-1');

    const marcoSpawnAtText = document.createElement('p');
    marcoSpawnAtText.style.minWidth = '100px';
    marcoSpawnAtText.id = 'marcoSpawnAtText';
    marcoSpawnAtText.innerText = `:${serverEntry.getSpawnAtMinuteMark()} (in ${serverEntry.getSpawnInMinutes()}m)`;

    const serverIdText = document.createElement('a');
    serverIdText.id = 'serverIdText';
    serverIdText.innerText = `${serverEntry.serverId}`;
    serverIdText.href = `https://www.roblox.com/games/start?placeId=105948031340420&launchData=9224601490/${serverEntry.serverId}`;
    serverIdText.target = '_blank';

    const SVG_NS = "http://www.w3.org/2000/svg";
    const deleteIconPath = document.createElementNS(SVG_NS, 'path');
    deleteIconPath.setAttribute('d', 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z');
    
    const deleteIconSvg = document.createElementNS(SVG_NS, 'svg');
    deleteIconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    deleteIconSvg.appendChild(deleteIconPath);

    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.appendChild(deleteIconSvg);

    const removeButton = document.createElement('button');
    removeButton.appendChild(deleteIcon);
    removeButton.addEventListener('click', function() {
        serverEntries = serverEntries.filter(entry => entry.serverId !== serverEntry.serverId);
        saveServersToStorage();
        container.remove();
    });

    // <div class="number-box">
    //     <button class="left">-</button>
    //     <p>32</p>
    //     <button class="right">+</button>
    // </div>

    const increaseTimeButton = document.createElement('button');
    increaseTimeButton.innerHTML = '+1';
    increaseTimeButton.addEventListener('click', function() {
        for (let i = 0; i < serverEntries.length; i++) {
            if (serverEntries[i].serverId === serverEntry.serverId) {
                serverEntries[i].serverTime++;
                if (serverEntries[i].serverTime > 59) {
                    serverEntries[i].serverTime = 0;
                }

                saveServersToStorage();
                updateServerEntryText(serverEntries[i]);
                break;
            }
        }
    });

    const decreaseTimeButton = document.createElement('button');
    decreaseTimeButton.innerHTML = '-1';
    decreaseTimeButton.addEventListener('click', function() {
        for (let i = 0; i < serverEntries.length; i++) {
            if (serverEntries[i].serverId === serverEntry.serverId) {
                serverEntries[i].serverTime--;
                if (serverEntries[i].serverTime < 0) {
                    serverEntries[i].serverTime = 59;
                }

                saveServersToStorage();
                updateServerEntryText(serverEntries[i]);
                break;
            }
        }
    });

    const editButton = document.createElement('button');
    editButton.id = 'editServerTimeButton';
    editButton.innerHTML = `Edit Servertime (${serverEntry.serverTime})`;
    editButton.addEventListener('click', function() {
        // do something
    });

    textContainer.appendChild(marcoSpawnAtText);
    textContainer.appendChild(serverIdText);
    textContainer.appendChild(removeButton);
    textContainer.appendChild(editButton);
    textContainer.appendChild(increaseTimeButton);
    textContainer.appendChild(decreaseTimeButton);

    container.appendChild(textContainer);

    document.querySelector('#serverEntryContainer').appendChild(container);
    updateServerEntryText(serverEntry);
}

function updateServerEntryText(serverEntry) {
    let spawnInMinutes = serverEntry.getSpawnInMinutes();
    const element = serverEntry.element.querySelector('#marcoSpawnAtText');
    const indicator = spawnInMinutes == 0 ? 'in <' : 'in';
    if (spawnInMinutes == 0) { spawnInMinutes = 1; }
    element.innerText = `:${serverEntry.getSpawnAtMinuteMark()} (${indicator} ${spawnInMinutes}m)`;

    element.classList = '';
    if (spawnInMinutes <= 3) {
        element.classList.add('boss-within-3m');
    } else if (spawnInMinutes <= 5) {
        element.classList.add('boss-within-5m');
    } else if (spawnInMinutes <= 15) {
        element.classList.add('boss-within-15m');
    } else if (spawnInMinutes <= 30) {
        element.classList.add('boss-within-30m');
    } else if (spawnInMinutes > 56) {
        element.classList.add('boss-over-within-4m');
    } else {
        element.classList.add('regular');
    }
    
    serverEntry.element.querySelector('#editServerTimeButton').innerText = `Edit Servertime (${serverEntry.getServerTime()})`;
}

function updateServerEntries() {
    for (let i = 0; i < serverEntries.length; i++) {
        updateServerEntryText(serverEntries[i]);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    //
    const exisitingEntries = getStorageItem(serverEntriesStorageKey) || [];
    for (let i = 0; i < exisitingEntries.length; i++) {
        serverEntries.push(new ServerEntry(exisitingEntries[i].serverId, exisitingEntries[i].serverTime, new Date(exisitingEntries[i].registerTime)));
    }
    fillServerEntries();

    // Update Entries
    const now = new Date(Date.now());
    setTimeout(() => {
        updateServerEntries();

        setInterval(() => {
            setTimeout(() => {
                updateServerEntries();
            }, 1000);
        }, 60 * 1000);
    }, ((60 - now.getSeconds()) * 1000 - now.getMilliseconds()));
});

document.querySelector('#serverId').addEventListener('change', () => {
    for (let i = 0; i < serverEntries.length; i++) {
        if (serverEntries[i].serverId === document.querySelector('#serverId').value) {
            alert('Server ID already exists');
        }
    }
});