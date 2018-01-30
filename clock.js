let clock = null;

function buildClock() {
    const letters = [
        ["E", "S", "K", "I", "S", "T", "A", "F", "Ü", "N", "F"],
        ["Z", "E", "H", "N", "Z", "W", "A", "N", "Z", "I", "G"],
        ["D", "R", "E", "I", "V", "I", "E", "R", "T", "E", "L"],
        ["V", "O", "R", "F", "U", "N", "K", "N", "A", "C", "H"],
        ["H", "A", "L", "B", "A", "E", "L", "F", "Ü", "N", "F"],
        ["E", "I", "N", "S", "X", "Ä", "M", "Z", "W", "E", "I"],
        ["D", "R", "E", "I", "A", "U", "J", "V", "I", "E", "R"],
        ["S", "E", "C", "H", "S", "N", "L", "A", "C", "H", "T"],
        ["S", "I", "E", "B", "E", "N", "Z", "W", "Ö", "L", "F"],
        ["Z", "E", "H", "N", "E", "U", "N", "K", "U", "H", "R"]
    ];
    const clockArea = document.getElementById("clock");

    // create table
    clock = document.createElement("table");

    for (let i = 0; i <= 9; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j <= 10; j++) {
            const cell = document.createElement("td");
            cell.style.textAlign = "center";
            cell.innerHTML = letters[i][j];
            row.appendChild(cell);
        }

        clock.appendChild(row);
    }

    // append
    clockArea.appendChild(clock);
}

function getItem(i, j) {
    return clock.children[i].children[j];
}

function showWord(word) {
    for (let i = 0; i <= word.length - 1; i++) {
        getItem(word[i][0], word[i][1]).style.color = "black";
    }
}

function hideAll() {
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 10; j++) {
            getItem(i, j).style.color = "lightgray";
        }
    }
}

function showTime() {
    hideAll();

    showWord([[0, 0], [0, 1]]);         // ES
    showWord([[0, 3], [0, 4], [0, 5]]); // IST

    const minute = [
        [[9, 8], [9, 9], [9, 10]],                                                                 // UHR
        [[0, 7], [0, 8], [0, 9], [0, 10]],                                                         // FÜNF
        [[1, 0], [1, 1], [1, 2], [1, 3]],                                                          // ZEHN
        [[2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10]],                                 // VIERTEL
        [[1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10]],                                 // ZWANZIG
        [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10]], // DREIVIERTEL
    ];

    const before = [[3, 0], [3, 1], [3, 2]];        // VOR
    const past = [[3, 7], [3, 8], [3, 9], [3, 10]]; // NACH

    const half = [[4, 0], [4, 1], [4, 2], [4, 3]];  // HALB

    const hour = [
        [[5, 0], [5, 1], [5, 2], [5, 3]],                 // EINS
        [[5, 7], [5, 8], [5, 9], [5, 10]],                // ZWEI
        [[6, 0], [6, 1], [6, 2], [6, 3]],                 // DREI
        [[6, 7], [6, 8], [6, 9], [6, 10]],                // VIER
        [[4, 7], [4, 8], [4, 9], [4, 10]],                // FÜNF
        [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4]],         // SECHS
        [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5]], // SIEBEN
        [[7, 7], [7, 8], [7, 9], [7, 10]],                // ACHT
        [[9, 3], [9, 4], [9, 5], [9, 6]],                 // NEUN
        [[9, 0], [9, 1], [9, 2], [9, 3]],                 // ZEHN
        [[4, 5], [4, 6], [4, 7]],                         // ELF
        [[8, 6], [8, 7], [8, 8], [8, 9], [8, 10]],        // ZWÖLF
        [[5, 0], [5, 1], [5, 2]],                         // EIN
    ];

    const d = new Date()
    let curHour = d.getHours();
    const curMinute = d.getMinutes();

    if (curMinute >= 58 || curMinute <= 2) { // xx:58 - xx:02
        showWord(minute[0]); // UHR
    } else if (curMinute >= 3 && curMinute <= 7) { // xx:03 - xx:07
        showWord(minute[1]); // FÜNF
        showWord(past);      // NACH
    } else if (curMinute >= 8 && curMinute <= 12) { // xx:08 - xx:12
        showWord(minute[2]); // ZEHN
        showWord(past);      // NACH
    } else if (curMinute >= 13 && curMinute <= 17) { // xx:13 - xx:17
        showWord(minute[3]); // VIERTEL
        showWord(past);      // NACH
    } else if (curMinute >= 18 && curMinute <= 22) { // xx:18 - xx:22
        showWord(minute[4]); // ZWANZIG
        showWord(past);      // NACH
    } else if (curMinute >= 23 && curMinute <= 27) { // xx:23 - xx:27
        showWord(minute[1]); // FÜNF
        showWord(before);    // VOR
        showWord(half);      // HALB
    } else if (curMinute >= 28 && curMinute <= 32) { // xx:28 - xx:32
        showWord(half);      // HALB
    } else if (curMinute >= 33 && curMinute <= 37) { // xx:33 - xx:37
        showWord(minute[1]); // FÜNF
        showWord(past);      // NACH
        showWord(half);      // HALB
    } else if (curMinute >= 38 && curMinute <= 42) { // xx:38 - xx:42
        showWord(minute[4]); // ZWANZIG
        showWord(before);    // VOR
    } else if (curMinute >= 43 && curMinute <= 47) { // xx:43 - xx:47
        showWord(minute[5]); // DREIVIERTEL
    } else if (curMinute >= 48 && curMinute <= 52) { // xx:48 - xx:52
        showWord(minute[2]); // ZEHN
        showWord(before);    // VOR
    } else if (curMinute >= 53 && curMinute <= 57) { // xx:53 - xx:57
        showWord(minute[1]); // FÜNF
        showWord(before);    // VOR
    }

    if (curMinute >= 23) {
        curHour++;
    }

    if (curHour == 1 && (curMinute >= 58 || curMinute <= 2)) { // EIN UHR / nicht "EINS UHR"
        showWord(hour[12]);
    } else {
        showWord(hour[((curHour - 1) + 12) % 12]);
    }

    // calc update time
    setTimeout(() => showTime(), 5000);
}