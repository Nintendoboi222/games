/**
 * Curates rogue decimals from a number.
 * 
 * @param {number} number Number with potential rogue decimals.
 * @param {number} decimals Max number of decimals desired.
 * @param {bool} forDisplay Whether the number sent will be shown on screen.
 * @return {number} Curated number with limited decimals.
 */
function prettify(number, decimals, forDisplay = false) {
    var normalizedDecimals = Math.pow(10, decimals);
    var newNumber = Math.round(number * normalizedDecimals) / normalizedDecimals;
    if (!forDisplay || newNumber < 10000) return newNumber;

    //Convert to readable output (string)
    //first turn our number to m * 1000^n
    var n = Math.floor(getBaseLog(newNumber, 1000));
    newNumber = newNumber / Math.pow(1000, n);
    var units = ["", "K", "M", "B", "T"];
    var unit = "";
    if (n < units.length) {
        unit = units[n];
    }
    else if (n == Infinity) {
        return "∞";
    }
    else {
        n -= units.length;
        //prefer not relying on ASCII table for number notations
        var alphabet = "abcdefghijklmnopqrstuvwxyz";
        var firstUnit = n / 26;
        var secondUnit = n % 26;
        unit = alphabet.charAt(firstUnit) + alphabet.charAt(secondUnit);
    }
    if (unit.length > 0) {
        newNumber = Math.floor(newNumber * 100);
        newNumber = prettify(newNumber / 100, 2);
    }
    return newNumber + unit;
}

/**
 * Returns the logarithmic function on a different base.
 * 
 * @param {number} number The original number (x) in our old equation ln(x)
 * @param {number} base The desired base (y) in our new equation log(x, y)
 */
function getBaseLog(number, base) {
    var number = Math.log(number) / Math.log(base)
    return prettify(number, 2);
}

/**
 * Gets the percentage represented by a number against a total value.
 * 
 * @param {number} number The number to check against.
 * @param {number} total The total value representing 100%.
 * @return {number} The percentage value between 0 and 100.
 */
function GetPercent(number, total) {
    if (number <= 0) return 0;
    if (number >= total) return 100;
    return prettify(number / total, 5) * 100;
}

/**
 * Returns the plural of a label if applicable.
 * 
 * @param {object} what The type of object to label.
 */
function plural(what) {
    var label = "";
    if (!what || !what.label) return label;
    label += what.label;
    if (what.current <= 1) return label;
    if (what.label.endsWith("y")) {
        label = label.slice(0, -1);
        label += "ies";
    } else if (what.label.endsWith("ch")) {
        label += "es";
    } else {
        label += "s";
    }
    return label;
}

/**
 * Returns the adjective of a label if applicable.
 * 
 * @param {string} what The word to adjectivize. 
 */
function adjective(what) {
    var label = "";
    if (!what) return label;
    label += what;
    if (label.endsWith("an") || label.endsWith("x")) {
        return label;
    } else if (label.endsWith("one")) {
        label = label.slice(0, -1);
        label += "ian";
    } else if (label.endsWith("e")) {
        label = label.slice(0, -1);
        label += "an";
    } else if (label.endsWith("r") || label.endsWith("t") || label.endsWith("d")) {
        label += "ian";
    } else if (label.endsWith("ny")) {
        label = label.slice(0, -1);
    } else if (label.endsWith("y")) {
        label = label.slice(0, -1);
        label += "ian";
    } else if (label.endsWith("bec")) {
        label = label.slice(0, -2);
        label += "écois";
    } else if (label.endsWith("ns")) {
        label = label.slice(0, -1);
        label += "ian";
    } else if (label.endsWith("les")) {
        label = label.slice(0, -2);
        label += "o";
    } else if (label.endsWith("es")) {
        label = label.slice(0, -2);
        label += "an";
    } else if (label.endsWith("um")) {
        label = label.slice(0, -2);
        label += "an";
    } else if (label.endsWith("ncia")) {
        label = label.slice(0, -3);
        label += "kish";
    } else if (label.endsWith("ain")) {
        label = label.slice(0, -2);
        label += "nish";
    } else if (label.endsWith("golia") || label.endsWith("kia")) {
        label = label.slice(0, -2);
    } else {
        label += "n";
    }
    return label;
}

/**
 * Capitalizes the first letter of a given word.
 * 
 * @param {string} what The word to capitalize.
 */
function capitalize(what) {
    if (!what || what.length == 0) return "";

    return what.charAt(0).toUpperCase() + what.slice(1);
}

/**
 * Returns a random item from a provided list.
 * 
 * @param {Array} list 
 */
function getRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}