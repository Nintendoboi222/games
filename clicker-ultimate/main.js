/*	Clicker Ultimate

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Special Thanks to:
    David Stark (http://dhmholley.co.uk/incrementals.html) for the helpful tutorial.
    Zach Hood (https://trimps.github.io) for the inspiration.
*/

/*
=TODO LIST=
Gold needs to do more things
Achievements points to do something
Add more items to the tutorial
Have some sort of daily reward
Fix Equestrianism
Give messages with choice buttons
Turn millers into bakers with new age
Add setting to automatically purchase free upgrades
*/

function firstSetup() {
    document.body.addEventListener('keydown', function (event) {
        if (event.ctrlKey) {
            document.body.classList.add("ctrlDown");
        }
    });

    document.body.addEventListener('keyup', function (event) {
        if (!event.ctrlKey) {
            document.body.classList.remove("ctrlDown");
        }
    });
}

/**
 * Controls the flow of the game by calling the main game loop.
 */
function gameTimeout() {
    var tick = 1000 / game.global.speed;
    if (game.global.isPaused) {
        game.global.time += tick;
        setTimeout(gameTimeout, tick);
        return;
    }
    var now = new Date().getTime();
    //Catch stray values if they accumulate greatly
    if ((now - game.global.start - game.global.time) > 3600000) {
        game.global.start = now;
        game.global.time = 0;
        setTimeout(gameTimeout, (1000 / game.global.speed));
        return;
    }

    game.global.time += tick;
    var dif = (now - game.global.start) - game.global.time;

    while (dif >= tick) {
        runGameLoop(true);
        dif -= tick;
        game.global.time += tick;
    }
    runGameLoop();
    updateValues();
    setTimeout(gameTimeout, (tick - dif));
}

/**
 * Execute main game loop, throw errors found.
 * 
 * @param {bool} exhaustTick (Optional) Set to exhaust ticks.
 */
function runGameLoop(exhaustTick = false) {
    try {
        gameLoop(exhaustTick);
    } catch (err) {
        throw err;
    }
}

/**
 * Operations to run every tick.
 * 
 * @param {bool} exhaustTick Whether there are ticks to exhaust.
 */
var tempLoop = 0;
function gameLoop(exhaustTick) {
    loops++;
    getResources();

    if (game.global.autoClicking && game.player.autoClick > 1) {
        var autoClickRate = game.player.autoClick / 100;
        if (game.global.autoClicking == "start") {
            game.global.autoClicking = "wait";
            tempLoop = loops % 5;
        } else if (game.global.autoClicking == "wait" && (loops - tempLoop) % 5 == 0) {
            game.global.autoClicking = true;
            clickResource(game.global.autoClickingRes);
            tempLoop = loops % autoClickRate;
        } else if (game.global.autoClicking === true && (loops - tempLoop) % autoClickRate == 0) {
            clickResource(game.global.autoClickingRes, true);
        }
    }

    if (!exhaustTick) {
        sendMessages();
        sendAchievements();
    }
}

//FOR DEBUGGING
function cheat() {
    for (var r in game.resources) {
        if (game.resources[r].locked) continue;
        game.resources[r].current = game.resources[r].max;
        updateResValues(game.resources[r], true);
    }
}

/**
 * Stops/Starts the main game loop.
 */
function togglePause() {
    game.global.isPaused = !game.global.isPaused;
    updatePauseButton();
}

/**
 * Toggles the export modal window on and off.
 */
function toggleExport() {
    if (game.global.currentTooltip == "export" && game.global.isPaused) tooltip("pause");
    else updateModal("export");
}

/**
 * Toggles the import modal window on and off.
 */
function toggleImport() {
    if (game.global.currentTooltip == "import" && game.global.isPaused) tooltip("pause");
    else updateModal("import");
}

/**
 * Hides/exposes the delete save button.
 */
function toggleDeleteSave() {
    game.settings.hardResetExposed = !game.settings.hardResetExposed;
    updateDeleteSaveSetting();
    if (game.settings.hardResetExposed) message("The Delete Save button is now exposed in the bottom ribbon.", "warning");
}

/**
 * Updates the interface according to the hard reset setting.
 */
function updateDeleteSaveSetting() {
    document.getElementById("mnuCurrentDeleteSave").innerHTML = (game.settings.hardResetExposed ? "Exposed" : "Hidden");

    if (game.settings.hardResetExposed) {
        document.getElementById("deleteSaveButton").innerHTML = "<span>Delete Save</span>";
        document.getElementById("deleteSaveButton").onclick = function () { tooltip("delete"); };
    } else {
        document.getElementById("deleteSaveButton").innerHTML = "";
        document.getElementById("deleteSaveButton").onclick = undefined;
    }
}

/**
 * Enables and disabled tutorial messages/tips.
 */
function toggleTutorial() {
    if (game.settings.tutorialEnabled) game.settings.tutorialEnabled = false;
    else game.settings.tutorialEnabled = true;
    updateTutorialSetting();
    clearTimeout(tutorialTimer);
    if (game.settings.tutorialCompleted && game.settings.tutorialEnabled) tutorialTimer = setTimeout(randomTip, 300000);
}

/**
 * Updates the interface according to the tutorial setting.
 */
function updateTutorialSetting() {
    document.getElementById("mnuCurrentTutorial").innerHTML = (game.settings.tutorialEnabled ? "Enabled" : "Disabled");
}

/**
 * Changes the current version greeting.
 */
function toggleGreeting() {
    var availableGreetings = ["Latest Changes", "Version Number", "Simple", "None"];
    game.settings.greetingMessage = toggleOption(availableGreetings, game.settings.greetingMessage);
    updateGreeting();
}

/**
 * Updates the UI to reflect the Greeting setting.
 */
function updateGreeting() {
    document.getElementById("mnuCurrentLatestChanges").innerHTML = game.settings.greetingMessage;
}

/**
 * Changes showing round numbers in resource bars in the settings.
 */
function toggleRoundNumberSetting() {
    game.settings.roundResources = (game.settings.roundResources ? false : true);
    updateRoundNumberSetting();
    for (var res in game.resources) {
        updateResValues(game.resources[res], true);
    }
}

/**
 * Display the current rounding setting.
 */
function updateRoundNumberSetting() {
    document.getElementById("mnuCurrentRounding").innerHTML = (game.settings.roundResources ? "Yes" : "No");
}

/**
 * Changes how many decimal places are showing as the resource rate.
 */
function toggleDecimalPlacesSetting() {
    var decimals = game.settings.resourceDecimals;
    var availableDecimals = [0, 2, 3, 5];

    if (!game.settings.resourceAlwaysDecimals && decimals != 0) {
        game.settings.resourceAlwaysDecimals = true;
    } else {
        game.settings.resourceAlwaysDecimals = false;
        game.settings.resourceDecimals = toggleOption(availableDecimals, decimals);
    }
    updateDecimalPlacesSetting();
}

/**
 * Display the current rounding decimal places.
 */
function updateDecimalPlacesSetting() {
    document.getElementById("mnuCurrentDecimals").innerHTML = (game.settings.resourceAlwaysDecimals ? "Always " : "") + game.settings.resourceDecimals;
    for (var res in game.resources) {
        updateResRateValues(game.resources[res], true);
    }
}

/**
 * Changes the menu which opens when the user loads the game.
 */
function toggleDefaultMenu() {
    var availableMenuOptions = ["Keep Last Tab", "Always Messages", "Always Settings"];
    game.settings.defaultMenu = toggleOption(availableMenuOptions, game.settings.defaultMenu);
    updateDefaultMenu();
}

/**
 * Displays the current default menu option. 
 */
function updateDefaultMenu() {
    document.getElementById("mnuCurrentDefaultMenu").innerHTML = game.settings.defaultMenu;
}

/**
 * Changes the font size of messages.
 */
function toggleMsgFontSize() {
    var availableSizes = ["Small", "Normal", "Large", "Larger", "Huge"];
    game.settings.messagesSize = toggleOption(availableSizes, game.settings.messagesSize);
    updateMsgFontSize();
}

/**
 * Updates the current message font size in the Messages container.
 */
function updateMsgFontSize() {
    var msgClass = "";
    document.getElementById("MessagesContainer").classList.remove("msgFontSmall", "msgFontNormal", "msgFontLarge", "msgFontLarger", "msgFontHuge");
    switch (game.settings.messagesSize) {
        case "Small":
            msgClass = "msgFontSmall";
            break;
        case "Large":
            msgClass = "msgFontLarge";
            break;
        case "Larger":
            msgClass = "msgFontLarger";
            break;
        case "Huge":
            msgClass = "msgFontHuge";
            break;
        default:
            msgClass = "msgFontNormal";
    }
    document.getElementById("MessagesContainer").classList.add(msgClass);
    document.getElementById("mnuCurrentMsgSize").innerHTML = game.settings.messagesSize;
}

/**
 * Changes the current tooltip mode.
 */
function toggleTooltipModes() {
    var availableTooltipModes = ["Detailed", "Limited", "Disabled"];
    game.settings.tooltipMode = toggleOption(availableTooltipModes, game.settings.tooltipMode);
    updateTooltipMode();
}

/**
 * Toggles between a list of options, returning the next one.
 * 
 * @param {Array} availableOptions The full list of available options.
 * @param {object} currentSetting The currently selected option from the list. 
 */
function toggleOption(availableOptions, currentSetting) {
    var selection = 0;
    if (availableOptions.includes(currentSetting)) {
        selection = availableOptions.indexOf(currentSetting);
        selection++;
        if (selection >= availableOptions.length) selection = 0;
    }

    return availableOptions[selection];
}

/**
 * Displays the current tooltip mode in the menu.
 */
function updateTooltipMode() {
    document.getElementById("mnuCurrentLimitedTooltip").innerHTML = game.settings.tooltipMode;
}

/**
 * Turns skipping the first upgrade of the game on/off upon reset.
 */
function toggleAutoskipBeginning() {
    if (game.settings.skipFirstUpg) game.settings.skipFirstUpg = false;
    else game.settings.skipFirstUpg = true;
    updateAutoskipBeginning();
}

/**
 * Displays the current status of skipping the first upgrade.
 */
function updateAutoskipBeginning() {
    document.getElementById("mnuCurrentAutoskipBeginning").innerHTML = (game.settings.skipFirstUpg ? "Skip Beginning" : "Play Beginning");
}

/**
 * Sends the cumulated list of messages to the player.
 */
function sendMessages() {
    var number = game.global.messages.length;
    if (number < 1) return;
    var messages = game.global.messages;
    for (var i = 0; i < number; i++) {
        var message = messages[i];
        if (typeof message !== "object" || !message.content) continue;
        var elem = "<p class=\"msgBlock ";
        if (message.type == "save") {
            elem += "msgSave";
            var paras = document.getElementsByClassName('msgSave');
            while (paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            }
            number--;
        }
        else if (message.type == "warning") elem += "msgWarning";
        else if (message.type == "tutorial") elem += "msgTutorial";
        elem += "\">" + message.content + "</p>";

        var container = document.getElementById("MessagesContainer");
        container.innerHTML += elem;
        container.scrollTop = container.scrollHeight;
    }
    game.global.messages = [];
    if (game.settings.selectedMenu == "messages") return;
    game.global.unreadMessages += number;
    updateUnreadMessages();
}

/**
 * Adds a message to the list of messages to be sent.
 * 
 * @param {string} content The content of the message.
 * @param {string} type The type of the message to send.
 */
function message(content, type) {
    if (!content) return;
    var msg = {
        content: content,
        type: type
    };
    game.global.messages.push(msg);
}

/**
 * A leader is hired and greets the player.
 * 
 * @param {object} leader The hired leader.
 */
function leaderFirstGreeting(leader) {
    var messages = [];
    var empire = getEmpireLabel();
    var Empire = getEmpireLabel(true);

    switch (leader.personality) {
        case "wise":
            messages = ["Do you seek my counsel? Very well...", "May we help " + empire + " prosper.", "I foresaw our meeting in a dream.",
                "Wise of you to heed my counsel, lord.", Empire + " is destined for greatness with me at your side.", "Long may you reign over " + empire + "."];
            break;
        case "stern":
            messages = ["Out with it.", "For " + empire + "!", "Godspeed.", "Your orders?", "For victory.", "Hail.", "My liege.", "None can stand before us."];
            break;
        case "pious":
            messages = ["May God grant us victory.", "God watches over us.", "By the grace of God.", "We shall strive to earn God's favor."];
            break;
        default:
            messages = ["Hail, monarch.", "Well met.", "Salutations.", "My regards."];
    }

    message("<b>" + leader.label + "</b>: \"" + getRandom(messages) + "\"");
}

/**
 * A leader greets the player upon their return.
 */
function leaderGreeting() {
    var leaderList = [];
    for (var ldr in game.leaders) {
        if (!game.leaders[ldr].bought) continue;
        leaderList.push(game.leaders[ldr]);
    }

    if (leaderList.length < 1) return;

    var greetings = [];
    var reports = [];
    var titles = ["Emperor", "My King", "Your Excellency", "Ruler", "sire", "Monarch", "Leader", "Your Highness", "Your Grace", "my liege", "my lord"];
    var leader = getRandom(leaderList);
    var title = getRandom(titles);
    var Title = capitalize(title);
    var empire = getEmpireLabel();
    var Empire = getEmpireLabel(true);

    switch (leader.personality) {
        case "wise":
            greetings = [`${capitalize(title)}, you return!`, `I hope your travels treated you well, ${title}.`, `Ahh ${title}, I was pondering when you would return to us.`];
            break;
        case "stern":
            greetings = [`Godspeed ${title}.`, "Hail.", `${Title}!`, `Victory awaits, ${title}.`, `A triumphant return among us, ${title}.`, `${Title}, you're back!`];
            break;
        case "pious":
            greetings = [`Blessings, ${title}.`, `You bless us with your return, ${title}?`, `Grace to you, ${title}.` `God bless, ${title}.`];
            break;
        default:
            greetings = [`Hail, ${title}.`, `Greetings, ${title}.`, `Welcome back, ${title}.`, `${Title}.`];
    }

    switch (leader.personality) {
        case "wise":
            reports = ["Make haste, there is much to be done.", `${Empire} is in need of your guidance.`, `The people of ${empire} are in need of your guidance, ${title}.`, `Shall we tend to ${empire}?`];
            break;
        case "stern":
            reports = ["Do you have orders for us?", `Still none dare stand before the might of ${empire}.`, "Say the word, and it shall be done.", `${Empire} stands at the ready.`];
            break;
        case "pious":
            reports = [`God gracefully watched over ${empire} in your absence.`, `Thankfully, no harm was done to ${empire} while you were away.`, "If this pleases God, how may I be of use today?"];
            break;
        default:
            reports = [`Nothing to report on ${empire} in your absence, ${title}.`, `${Empire} has prospered in your absence.`, `The people of ${empire} awaited your return.`];
    }

    message(`<b>${leader.label}</b>: "${getRandom(greetings)} ${getRandom(reports)}"`);
}

/**
 * One of the player's hired leaders advises the player on what to purchase.
 * 
 * @param {string} age The age that was just unlocked.
 */
function leaderAdvice(age) {
    var leaderList = [];
    var empire = getEmpireLabel();
    var Empire = getEmpireLabel(true);
    for (var ldr in game.leaders) {
        if (!game.leaders[ldr].bought) continue;
        var leader = game.leaders[ldr];
        for (var adv in game.advancements) {
            var advancement = game.advancements[adv];
            if (advancement.parent != age || advancement.locked || advancement.bought) continue;
            if ((!leader.favored || !leader.favored.includes(adv)) && (!leader.unfavored || !leader.unfavored.includes(adv))) continue;
            leaderList.push({
                leader: leader.label,
                personality: leader.personality,
                advancement: advancement.label,
                position: leader.favored.includes(adv) ? "favor" : "unfavor"
            });
        }
    }

    if (leaderList.length < 1) return;
    var leaderPick = getRandom(leaderList);
    var messages = [];
    switch (leaderPick.personality) {
        case "wise":
            if (leaderPick.position == "favor") {
                messages = ["It would be wise of you to research <b>" + leaderPick.advancement + "</b>.", "May I recommend researching <b>" + leaderPick.advancement + "</b>?"];
            } else {
                messages = ["I do not think " + empire + " would benefit from <b>" + leaderPick.advancement + "</b>.", "I suggest avoiding the <b>" + leaderPick.advancement + "</b> advancement."];
            }
            break;
        case "stern":
            if (leaderPick.position == "favor") {
                messages = ["No doubt <b>" + leaderPick.advancement + "</b> would be worth the cost.", Empire + " would be better off with the <b>" + leaderPick.advancement + "</b> advancement.",
                "I urge you to consider purchasing <b>" + leaderPick.advancement + "</b>."];
            } else {
                messages = ["<b>" + leaderPick.advancement + "</b> seems like a waste of time.", "I advise against researching <b>" + leaderPick.advancement + "</b>."];
            }
            break;
        case "pious":
            if (leaderPick.position == "favor") {
                messages = ["I sense the <b>" + leaderPick.advancement + "</b> advancement has a lot of potential.", "My liege, <b>" + leaderPick.advancement + "</b> would change " + empire + " for the better."];
            } else {
                messages = ["I see no reason to invest in <b>" + leaderPick.advancement + "</b>.", "Wasting points on the <b>" + leaderPick.advancement + "</b> advancement would be a sin."];
            }
            break;
        default:
            if (leaderPick.position == "favor") {
                messages = ["<b>" + leaderPick.advancement + "</b> seems like a wise investment.", Empire + " could use <b>" + leaderPick.advancement + "</b>."];
            } else {
                messages = ["This <b>" + leaderPick.advancement + "</b> seems like a poor investment.", "I advise against choosing <b>" + leaderPick.advancement + "</b>."];
            }
    }

    message("<b>" + leaderPick.leader + "</b>: \"" + getRandom(messages) + "\"");
}

/**
 * One of the player's hired leaders sends a message to the player.
 * 
 * @param {object} advancement The specific advancement purchased.
 */
function leaderMessage(advancement) {
    if (game.player.currentLeaders == 0) return;

    var leaderList = [];
    var favoringList = [];
    var empire = getEmpireLabel();
    var Empire = getEmpireLabel(true);
    for (var ldr in game.leaders) {
        if (!game.leaders[ldr].bought) continue;
        if (game.leaders[ldr].favored && game.leaders[ldr].favored.includes(advancement.name)) {
            leaderList.push(ldr);
            favoringList.push("favor");
        } else if (game.leaders[ldr].unfavored && game.leaders[ldr].unfavored.includes(advancement.name)) {
            leaderList.push(ldr);
            favoringList.push("unfavor");
        }
    }

    if (leaderList.length < 1) return;
    var i = Math.floor(Math.floor(Math.random() * leaderList.length));
    var leader = game.leaders[leaderList[i]];
    var favor = favoringList[i];

    //send one of possible leader messages
    var availableMessages = [];
    if (favor == "favor") {
        availableMessages = [
            "<b>" + advancement.label + "</b> should prove useful later on.",
            Empire + " will be remembered for its <b>" + advancement.label + "</b>.",
            "Aah, <b>" + advancement.label + "</b>! A wise choice.",
            "I believe <b>" + advancement.label + "</b> will play an important role in " + empire + ".",
            "<b>" + advancement.label + "</b> will change the course of history for the better."
        ];
    } else {
        availableMessages = [
            "I do not think <b>" + advancement.label + "</b> will be beneficial in the long run.",
            "Was <b>" + advancement.label + "</b> really a wise investment?.",
            "<b>" + advancement.label + "</b> clearly was not worth the advancement points.",
            "I think there were better advancements to research than <b>" + advancement.label + "</b>.",
            Empire + " doesn't need <b>" + advancement.label + "</b> to prosper."
        ];
    }

    message("<b>" + leader.label + "</b>: \"" + getRandom(availableMessages) + "\"");
}

/**
 * Send a tutorial message to the user.
 * @param {string} type The type of tutorial message.
 */
function tutorialMessage(type) {
    if (!game.settings.tutorialEnabled) return;

    var tutorialMessages = {
        available: ["resources", "upgrades", "levels", "ages", "buildings", "highprogress", "themes", "tax", "prestige2", "prestige3", "tutorial", "selling"],
        gather: "Click on the <b>Gather</b> button above to fill the Progress Bar of a resource. Doing so will grant you resources which you can use to buy things with.",
        workers: "You can hover over the tile of a <b>Worker</b> to see what it does and how much it costs. The more workers you have, the more their effects stack!",
        workers2: "Some <b>Workers</b> have a constant cost to some resources. Be sure to read their descriptions before buying them.",
        resources: "Did you know? If you click on the name of a resource, you can get more information about what affects it and how you are collecting it.",
        upgrades: "Plan your <b>Upgrades</b> ahead of time so you know which resources' rates to improve upon. Buying the first available <b>Upgrade</b> may not always be the answer.",
        levels: "Some <b>Upgrades</b> have several <b>Tiers</b>, meaning they can be bought more than once. When hovering over the tile of an <b>Upgrade</b>, look for numbers right of the upgrade's name indicating which tier you are looking at.",
        advancements: "You can use <b>Advancement Points</b> to purchase <b>Advancements</b>, which are like <b>Upgrades</b> but better! Hover over them to see if any of them interest you.",
        ages: "Each time you advance to a new <b>Age</b>, you unlock <b>Advancements</b>. Keeping your <b>Advancement Points</b> for later, or buying the ones from previous ages are both valid strategies.",
        buildings: "<b>Buildings</b> are similar to <b>Workers</b>, but they typically bypass the <b>Progress Bar</b> by directly giving raw resources. Therefore the rate should not be the only thing to consider when deciding whether to buy a worker or a building.",
        highprogress: "Some resources are not always worth clicking your way through. Try to look for <b>Workers</b>, <b>Buildings</b> or <b>Upgrades</b> as alternatives.",
        themes: "You can change the look of the interface by changing the current <b>Theme</b> in the <b>Settings</b> menu. Give it a try!",
        trades: "<b>Trades</b> are exchanges of goods that can be repeatedly done to stimulate your economy. Some trades will require resources, other gold, or a mix of both. Make sure to have a look at the available trades when struggling with a particular resource.",
        tax: "Try to balance your ratio of workers-to-buildings to get the most out of your <b>Tax</b> and <b>Property Tax</b> trades. <b>Gold</b> is worth the trouble!",
        prestige: "The <b>Prestige</b> menu allows you to set out and leave your civilization behind in favor of building a <b>Colony</b>. Doing so means you will have to start from scratch, but you will be allowed to carry over <b>Prestige Points</b> and"
            + " <b>Advancement Points</b>. Prestige points can be used to purchase permanent bonuses that stick from colony to colony.",
        prestige2: "The further you go with your civilization, the more <b>Prestige Points</b> you gain. It's all about finding the right balance between progressing further and starting a new colony!",
        prestige3: "The more <b>Colonies</b> you build, the faster you get at reaching the next colony. On top of that, you may also discover <b>Secret Upgrades</b> as you create more colonies.",
        tutorial: "You can disable these tips by switching the tutorial off in the Settings.",
        leaders: "<b>Leaders</b> are unique characters with various benefits. It's worth mentioning you can only hire <b>one leader</b> for every colony you build, so better think twice before making your decision.",
        leaders2: "Don't be too eager to hire a <b>Leader</b>, as you will unlock more and more as your civilization progresses. As with other things, patience is a virtue.",
        leaders3: "<b>Leaders</b> you unlock stay available for hire on your subsequent colonies. Additionally, some <b>Leaders</b> can only be unlocked under special circumstances, so don't be afraid to experiment.",
        selling: "You can sell <b>Workers</b> and <b>Buildings</b> by holding the ctrl key before clicking on their respective button."
    };

    var item = type;
    var availableTypes = tutorialMessages.available;
    if (game.upgrades.upgLeaders.bought) availableTypes.push("leaders2", "leaders3");
    if (!item) {
        do item = getRandom(availableTypes);
        while (item == game.global.lastTip);
    }
    var msg = tutorialMessages[item];
    if (!msg) return;
    message("TIP: " + msg, "tutorial");
    game.global.lastTip = item;
}

/**
 * Finishes the tutorial and activates the random tips for the user.
 */
function finishTutorial() {
    if (game.settings.tutorialCompleted) return;
    game.settings.tutorialCompleted = true;
    tutorialTimer = setTimeout(randomTip, 300000);
}

/**
 * Throws a random tip at the user every 15 minutes.
 */
function randomTip() {
    if (!game.settings.tutorialEnabled || !game.settings.tutorialCompleted) return;
    tutorialMessage();
    setTimeout(randomTip, 900000);
}

/**
 * Sends the initial greeting message to the user.
 */
function greetingMessage() {
    document.getElementById("versionLabel").innerHTML = "v" + game.global.version;
    var msg = "";

    switch (game.settings.greetingMessage) {
        case "Latest Changes":
            msg = "Welcome to <b>v" + game.global.version + "</b>. Latest changes are as follows: <i>" + game.global.latestChanges + "</i>";
            break;
        case "Version Number":
            msg = "Welcome to <b>Clicker Ultimate</b> (v" + game.global.version + ")."
            break;
        case "Simple":
            msg = "Welcome to Clicker Ultimate!"
    }

    if (msg) {
        message(msg);
        leaderGreeting();
    }
}

/**
 * Update the displayed amount of unread messages in the menu bar.
 */
function updateUnreadMessages() {
    if (game.settings.selectedMenu == "messages") game.global.unreadMessages = 0;
    var number = (game.global.unreadMessages <= 0 ? "" : game.global.unreadMessages);
    if (number != "") number = (game.global.unreadMessages > 99 ? "99+" : game.global.unreadMessages);
    document.getElementById("mnuUnreadMessages").innerHTML = number;
}

/**
 * Extracts the import string from the import textarea and loads it.
 */
function importLoad() {
    var saveString = (document.getElementById("importText") ? document.getElementById("importText").value : "");
    if (saveString.length < 1) {
        message("Could not read your Import String. Please enter a valid Export String in the \"Import\" box in order to load your game.", "warning")
        toggleImport();
        return;
    }

    if (!load(saveString)) toggleImport();
}

/**
 * Toggle the autosave function & button on and off.
 */
function toggleAutosave() {
    game.settings.autoSaveEnabled = !game.settings.autoSaveEnabled;
    updateAutosaveButton();
    clearTimeout(autosaveTimer);
    autoSave();
}

/**
 * Autosave function that calls itself every minute.
 */
function autoSave() {
    if (!game.settings.autoSaveEnabled) return;
    save();
    autosaveTimer = setTimeout(autoSave, 60000);
}

/**
 * Main function to save game data. If not exporting, local storage is used.
 * 
 * @param {bool} isExport Whether an export string should be returned.
 * @return {string} The export string.
 */
function save(isExport) {
    var saveString = JSON.stringify(game);
    var saveGame = JSON.parse(saveString);

    //Delete unneeded data here
    var reference = newGame();
    for (var globalVal in saveGame.global) {
        if (globalVal == "version") continue;
        delete saveGame.global[globalVal];
    }

    //Reformat savestring to save space.
    saveGame = getDeltaOf(saveGame, reference);
    saveString = LZString.compressToBase64(JSON.stringify(saveGame));
    if (isExport) return saveString;

    try {
        localStorage.setItem("ClickerUltisvg", saveString);
        if (localStorage.getItem("ClickerUltisvg") == saveString) {
            var d = new Date();
            message("Game Saved (" + d.getHours() + ":" + d.getMinutes().toString().padStart(2, "0") + ")", "save");
            autosaving = false;
            localStorage.removeItem("theme");
        } else {
            message("Unable to save game. Please use the export feature instead to back up your progress.", "warning");
        }
    }
    catch (e) {
        if (e.name == "NS_ERROR_FILE_CORRUPTED") {
            message("Browser storage appears to be corrupted. Please clear your cookies from your browser and try again.", "warning");
        }
        else message("Unable to save game. Please use the export feature instead to back up your progress.", "warning");
        return;
    }
}

/**
 * Main function to load game data.
 * 
 * @param {string} saveString An import string. If not setup, local storage is used.
 * @return {bool} Whether loaded successfully.
 */
function load(saveString) {
    var saveGame;
    var fromImport = false;
    var oldVersion = '';

    if (saveString) {
        fromImport = true;

    } else {
        var unparsedSave;
        try {
            unparsedSave = localStorage.getItem("ClickerUltisvg");
            if (unparsedSave === null) {
                message("<b>Welcome to Clicker Ultimate!</b>");
                return false;
            }
        }
        catch (e) {
            message("Your browser is preventing access to localStorage. Please check your browser settings to ensure that cookies are not disabled.", "warning");
            game.settings.autoSaveEnabled = false;
            return false;
        }
    }

    try {
        saveGame = JSON.parse(LZString.decompressFromBase64(((fromImport) ? saveString : unparsedSave)));
    } catch (e) {
        message("Game could not be imported from the provided string.", "warning");
        return false;
    }
    if (!saveGame) {
        message("Game could not be imported from the provided string.", "warning");
        return false;
    }

    oldVersion = (saveGame.global.version) ? saveGame.global.version.split('.') : null;
    if (fromImport && oldVersion && oldVersion.length && isVersionNewer(oldVersion, game.global.version.split('.'))) {
        message("The imported string is from a newer version of the game. Please refresh your browser to get the latest version.", "warning");
        return false;
    }

    //Compatibility checks
    if (isVersionNewer([0, 2, 4], oldVersion)) {
        var i = 0;
        for (var ach in saveGame.achievements) {
            if (game.achievements[ach] && saveGame.achievements[ach].achieved) i += game.achievements[ach].points;
        }
        saveGame.player.achievementPoints = i;
    }

    //Reset game
    game = replaceValueBy(newGame(), saveGame);

    updateInterface();
    return true;
}

/**
 * Replaces an old value with a newer one. Goes through every property if it is an object.
 * 
 * @param {any} oldVal The original value/object to replace.
 * @param {any} newVal The new value/object to replace with.
 * @returns The curated new object.
 */
function replaceValueBy(oldVal, newVal) {
    if (typeof newVal === "undefined" || typeof newVal === "function" || newVal === null) return oldVal;
    if (typeof newVal !== "object" || newVal.constructor === Array) return newVal;

    var newObj = new Object();
    for (var part in oldVal) {
        if (part == "global" && typeof oldVal[part] === "object") newObj[part] = replaceValueBy(oldVal[part], oldVal[part]);
        else newObj[part] = replaceValueBy(oldVal[part], newVal[part]);
    }
    //Merge back structural changes to the save file
    for (var part in newVal) {
        if (typeof oldVal[part] === "undefined") newObj[part] = replaceValueBy(newVal[part], newVal[part]);
    }
    return newObj;
}

/**
 * Returns the difference between one object and a basic template.
 * 
 * @param {object} val The object that has differences.
 * @param {object} comparison The baseline object that serves as comparison.
 */
function getDeltaOf(val, comparison) {
    if (typeof comparison === "undefined" || typeof comparison === "function" || val == comparison) return null;
    if (typeof val !== "object") return val;

    var newObj = new Object();
    for (var part in val) {
        if (part == "global" && typeof val[part] === "object") newObj[part] = val[part];
        else if (typeof val[part] === "object" && typeof comparison[part] === "undefined") newObj[part] = replaceValueBy(val[part], val[part]);
        else {
            var newComparison = getDeltaOf(val[part], comparison[part]);
            if (newComparison === null) continue;
            newObj[part] = newComparison;
        }
    }
    if (Object.keys(newObj).length === 0) return null;
    return newObj;
}

/**
 * Check whether a provided version is newer than another.
 * 
 * @param {string} newVersion Version that should be new.
 * @param {string} oldVersion Version that should be old.
 * @return {bool} Whether newVersion is actually newer than oldVersion.
 */
function isVersionNewer(newVersion, oldVersion) {
    oldVersion = [parseInt(oldVersion[0], 10), parseInt(oldVersion[1], 10), parseInt(oldVersion[2], 10)];
    newVersion = [parseInt(newVersion[0], 10), parseInt(newVersion[1], 10), parseInt(newVersion[2], 10)];

    for (var i = 0; i < newVersion.length; i++) {
        if (newVersion[i] > oldVersion[i]) return true;
        else if (newVersion[i] < oldVersion[i]) return false;
    }
    return false;
}

/**
 * Gather every passively increasing resource.
 */
function getResources() {
    for (var resText in game.resources) {
        var resource = game.resources[resText];
        if (resource.locked) continue;
        gainResource(resource, resource.realRate, false);
    }
}

/**
 * Gets the current list of unlocked leaders.
 * @return {object} An array of leader strings.
 */
function getLeaders() {
    var leaderList = [];
    for (var ldr in game.leaders) {
        if (game.leaders[ldr].locked) continue;
        leaderList.push(ldr);
    }
    return leaderList;
}

/**
 * Gets the current list of unlocked advancements.
 * @return {object} An array of advancement strings.
 */
function getAdvancements() {
    var advancementList = [];
    for (var adv in game.advancements) {
        if (game.advancements[adv].locked || game.advancements[adv].bought) continue;
        advancementList.push(adv);
    }
    return advancementList;
}

/**
 * Provides a resource/buyer/etc. based on a string.
 * 
 * @param {string} what Text to interpret.
 * @param {bool} getParent (Optional) Whether to return the parent of the object.
 * @return {object} An object of the type matching the given string.
 */
function getFromText(what, getParent = false) {
    if (!what) return false;
    for (var gameVarText in game) {
        var gameVar = game[gameVarText];
        if (!gameVar[what]) continue;
        if (getParent) return gameVarText;
        return gameVar[what];
    }
    return false;
}

/**
 * The user clicks on a resource to gather it.
 * 
 * @param {string} what The type of resource clicked on.
 * @param {boolean} isAuto Whether the click was automatic or not.
 */
function clickResource(what, isAuto = false) {
    var resource = getFromText(what);
    var number = (resource.clickGain ? resource.clickGain : 1);
    if (game.player.doubleClick > 0 && game.global.clicks % game.player.doubleClick == 0) number *= 2;
    number = prettify(number * game.player.clickValue, 2);
    number = Math.max(number, 0.01);
    gainResource(resource, number, true);
    game.global.clicks++;
    if (isAuto) return;
    game.player.totalClicks++;
    updateStatistics();
    checkClickAchievements();
}

/**
 * The user holds the mouse button down to auto-gather a resource.
 * 
 * @param {string} what The type of resource targeted.
 */
function autoClick(what) {
    game.global.autoClickingRes = what;
    if (game.player.autoClick < 1) return;
    game.global.autoClicking = "start";
}

/**
 * Cancels the autoclick function on mouse up.
 * 
 * @param {string} what The type of resource targeted.
 */
function cancelAutoClick(what) {
    if (!what || what != game.global.autoClickingRes) {
        game.global.autoClicking = false;
        return;
    }
    game.global.autoClicking = false;
    game.global.autoClickingRes = "";
    clickResource(what);
}

/**
 * User clicks on an item to buy it.
 * 
 * @param {string} what The type of item to buy.
 */
function clickBuy(what) {
    var item = getFromText(what);
    var type = getFromText(what, true);
    if (!item || !type) return;
    switch (type) {
        case "workers":
            buyWorker(item, window.event.ctrlKey ? -1 : 1);
            break;
        case "buildings":
            buyBuilding(item, window.event.ctrlKey ? -1 : 1);
            break;
        case "upgrades":
            buyUpgrade(item);
            break;
        case "trades":
            buyTrade(item);
            break;
        case "advancements":
            buyAdvancement(item);
            leaderMessage(item);
            break;
        case "prestiges":
            buyPrestige(item);
            break;
        case "leaders":
            buyLeader(item);
            break;
    }
    if (game.global.currentTooltip == what) tooltip(what, null, false);
    updateAvailableUpgrades(true);
    updateStatistics();
}

/**
 * Adds/Removes an amount of gold from the player.
 * 
 * @param {number} number The amount of gold to add/substract.
 */
function gainGold(number) {
    if (!number || number == 0) return;
    game.player.gold = Math.floor(game.player.gold + number);
    updateGoldValues();
}

/**
 * Add a specified amount of resources to player storage.
 * 
 * @param {object} resource The type of resource to add.
 * @param {number} number The amount of resource units to add.
 * @param {bool} active (Optional) Whether this is user action.
 */
function gainResource(resource, number, active = false) {
    if (!resource || number == 0) return;
    number = prettify(number, 2)
    var initialCurrent = resource.current;
    resource.current = prettify(GetMax(resource, resource.current + number, hasParent(resource), active), 2);
    if (!active) resource.isActive = true;
    if (resource.current != initialCurrent) updateResValues(resource, true, (resource.current == resource.min));
}

/**
 * Lets the player buy a set amount of workers.
 * 
 * @param {object} worker The type of worker purchased.
 * @param {number} number The number of buyers to get.
 * @param {boolean} forFree Whether to get for free.
 */
function buyWorker(worker, number, forFree = false) {
    if (!worker || (!forFree && number > 0 && !canAfford(worker)) || (worker.current + number) < worker.free) return;
    worker.current += number;
    worker.top = Math.max(worker.current, worker.top);
    if (forFree) worker.free += number;
    if (worker.effect) worker.effect();
    for (var res in worker.resourceCost) {
        if (forFree || number < 1) break;
        var resource = getFromText(res);
        resource.current = prettify(resource.current - worker.resourceCost[res].current, 2);
        gainResource(getFromText(res + "P"), 0.001); //in case progress is maxed, reset automatically
        updateResValues(resource, true);
    }
    recalculateWorkerCost(worker);
    recalculateWorkerRate(worker);
    updateJobValues(worker, true);
}

/**
 * Lets the player buy a set amount of buildings.
 * 
 * @param {object} building The type of building purchased.
 * @param {number} number The number of buildings to get.
 * @param {boolean} forFree Whether to get for free.
 */
function buyBuilding(building, number, forFree = false) {
    if (!building || (!forFree && number > 0 && !canAfford(building)) || (building.current + number) < building.free) return;
    building.current += number;
    if (forFree) building.free += number;
    if (building.effect) building.effect();
    for (var res in building.resourceCost) {
        if (forFree || number < 1) break;
        var resource = getFromText(res);
        resource.current = prettify(resource.current - building.resourceCost[res].current, 2);
        gainResource(getFromText(res + "P"), 0.001); //in case progress is maxed, reset automatically
        updateResValues(resource, true)
    }
    recalculateBuildingCost(building);
    recalculateWorkerRate(building);
    updateJobValues(building, true);
}

/**
 * Lets the player buy a specific upgrade.
 * 
 * @param {object} upgrade The upgrade to purchase.
 */
function buyUpgrade(upgrade) {
    if (!upgrade || !canAfford(upgrade)) return;
    var isBought = false;
    if (typeof upgrade.level === "undefined" || upgrade.level >= upgrade.maxLevel) {
        isBought = true;
        upgrade.bought = true;
    }
    upgrade.effect();

    for (var res in upgrade.resourceCost) {
        var resource = getFromText(res);
        resource.current = prettify(resource.current - upgrade.resourceCost[res].current, 2);
        gainResource(getFromText(res + "P"), 0.001); //in case progress is maxed, reset automatically
        updateResValues(resource, true)
    }
    if (typeof upgrade.goldCost !== "undefined") gainGold(-upgrade.goldCost);

    if (isBought) {
        tooltip();
    } else {
        upgrade.level++;
    }
    recalculateUpgradeCost(upgrade);
    updateUpgradeValues(upgrade, true);
    if (upgrade.type && upgrade.type == "age") leaderAdvice(upgrade.name);
}

/**
 * Lets the player buy a specific leader.
 * 
 * @param {object} leader The leader to buy. 
 */
function buyLeader(leader) {
    if (!leader || leader.bought || game.player.currentLeaders >= game.player.maxLeaders || !canAfford(leader)) return;
    if (!game.achievements.achInformed.achieved) achieve("achInformed");
    leader.bought = true;
    leader.effect();
    for (var res in leader.resourceCost) {
        var resource = getFromText(res);
        resource.current = prettify(resource.current - leader.resourceCost[res].current, 2);
        gainResource(getFromText(res + "P"), 0.001); //in case progress is maxed, reset automatically
        updateResValues(resource, true)
    }
    if (leader.advCost) addAdvancementPoints(-leader.advCost);
    game.player.currentLeaders++;
    updateLeaderValues(leader, true);
    leaderFirstGreeting(leader);
}



/**
 * Lets the player buy a specific advancement.
 * 
 * @param {object} advancement The advancement to buy.
 * @param {bool} forFree Whether to give the advancement for free.
 */
function buyAdvancement(advancement, forFree = false) {
    if (!advancement || advancement.bought || (!forFree && !canAfford(advancement))) return;
    advancement.bought = true;
    advancement.effect();
    if (!forFree) addAdvancementPoints(-advancement.advCost);
    else updateAdvancementValues(true);
}

/**
 * Lets the player buy a specific prestige skill.
 * 
 * @param {object} prestige The prestige skill to buy.
 */
function buyPrestige(prestige) {
    if (!prestige || !canAfford(prestige) || prestige.bought) return;
    prestige.effect(prestige.level);
    if (typeof prestige.level === "undefined" || prestige.level >= prestige.maxLevel) {
        prestige.bought = true;
    } else {
        prestige.level++;
        if (prestige.level >= prestige.maxLevel) prestige.bought = true;
    }
    addPrestigePoints(-prestige.ptgCost, true);
}

/**
 * Lets the player purchase a specific trade.
 * 
 * @param {object} trade The trade to buy.
 */
function buyTrade(trade) {
    if (!trade || !canAfford(trade)) return;
    trade.effect();
    for (var res in trade.resourceCost) {
        var resource = getFromText(res);
        resource.current = prettify(resource.current - trade.resourceCost[res].current, 2);
        gainResource(getFromText(res + "P"), 0.001); //in case progress is maxed, reset automatically
        updateResValues(resource, true)
    }
    if (trade.goldCost) {
        gainGold(-trade.goldCost);
    }
    trade.current++;
    recalculateTradeCost(trade);
}

/**
 * Grants a player a passive bonus.
 * 
 * @param {object} passive The passive to buy.
 */
function buyPassive(passive) {
    if (!passive) return;
    passive.bought = true;
    if (passive.effect) passive.effect();

    for (var res in passive.resourceGain) {
        var resource = getFromText(res);
        if (!resource) continue;
        recalculateResRate(resource);
        updateResRateValues(resource, true);
    }
    achieve("achSleeper");
}

/**
 * Unlocks an achievement for the player.
 * 
 * @param {string} ach The name of the achievement being unlocked.
 */
function achieve(ach) {
    var achievement = getFromText(ach);
    if (!achievement || !achievement.label || achievement.achieved) return;
    game.global.achievements.push(achievement);
    achievement.achieved = true;
    game.player.achievementPoints += achievement.points;
    if (achievement.hidden) updateContainer("achievements");
    updateAchievementValues(true);
}

/**
 * Sends the achievements out to the screen.
 */
var achievementTimer = 0;
function sendAchievements() {
    if (achievementTimer != 0 || game.global.achievements.length <= 0) return;
    var achievement = game.global.achievements.shift();

    document.getElementById("achLabel").innerHTML = (achievement.fullLabel ? achievement.fullLabel : achievement.label);
    document.getElementById("achPoints").innerHTML = achievement.points ? achievement.points : 0;

    var achievementPill = document.getElementById("achievementPill");
    achievementPill.style.transition = "visibility 0s linear 0s, opacity 1s";
    achievementPill.style.visibility = "visible";
    achievementPill.style.opacity = 1;
    achievementTimer = setTimeout(hideAchievement, 4000);
}

/**
 * Hides the achievement popup.
 */
function hideAchievement() {
    clearTimeout(achievementTimer);
    achievementTimer = 0;
    if (game.global.achievements.length > 0) {
        sendingAchievements = false;
        return;
    }
    var achievementPill = document.getElementById("achievementPill");
    achievementPill.style.transition = "visibility 0s linear 1s, opacity 1s";
    achievementPill.style.opacity = 0;
    achievementPill.style.visibility = "hidden";
    sendingAchievements = false;
}

/**
 * Adds Advancement Points to the player.
 * 
 * @param {number} number How many points to add/remove.
 */
function addAdvancementPoints(number) {
    if (!number || number == 0) return;
    game.player.advancementPoints += number;
    updateAdvancementValues(true);
}

/**
 * Adds Prestige points to the player.
 * 
 * @param {number} number How many points to add/remove
 * @param {bool} now Whether to add the points now or next reset.
 */
function addPrestigePoints(number, now = false) {
    if (!number || number == 0) return;
    if (now) game.player.prestigePoints += number;
    else if (number < 0) game.player.nextPrestigePoints += number;
    else {
        game.player.prestigePoints += Math.min(game.player.convertPrestiges, number);
        game.player.nextPrestigePoints += Math.max(number - game.player.convertPrestiges, 0);
        game.player.convertPrestiges -= Math.min(game.player.convertPrestiges, number);
    }
    updatePrestigeValues(true);
}

/**
 * Upgrades the amount of resources gained between a child and its parents.
 * 
 * @param {string} what The child resource.
 * @param {number} number The amount to increase by.
 * @param {string} parent (Optional) The specific parent to target.
 */
function upgradeParentGain(what, number, parent = "") {
    var resource = getFromText(what);
    if (!hasParent(resource) || number == 0) return;
    for (var par in resource.parent) {
        if (parent.length > 0 && parent != par) continue;
        resource.parent[par].gain += number;
    }
    recalculateResRate(resource);
    updateResRateValues(resource, true);
}

/**
 * Upgrades the upper limit that can be held for a resource.
 * 
 * @param {string} what The resource to upgrade.
 * @param {number} number The amount to increase the max by.
 */
function upgradeMaxValue(what, number) {
    var resource = getFromText(what);
    if (!resource || number == 0) return;
    if (resource.max + number <= resource.min) resource.max = resource.min + 1;
    else resource.max += number;
    if (resource.current > resource.max) resource.current = resource.max;
    gainResource(getFromText(what + "P"), 0.001); //in case progress is maxed, reset automatically
    updateResValues(resource, true);
    if (hasParent(resource)) {
        recalculateResRate(resource);
        updateResRateValues(resource, true);
    }
}

/**
 * Upgrades the lower limit that can be held for a resource.
 * 
 * @param {string} what The resource to upgrade.
 * @param {number} number The amount to increase the min by.
 */
function upgradeMinValue(what, number) {
    var resource = getFromText(what);
    if (!resource || number == 0) return;
    if (resource.min + number >= resource.max) resource.min = resource.max - 1;
    else resource.min += number;
    if (resource.current < resource.min) resource.current = resource.min;
    updateResValues(resource, true);
    if (hasParent(resource)) {
        recalculateResRate(resource);
        updateResRateValues(resource, true);
    }
}

/**
 * Upgrades the amount of resources gained by user clicks for a resource.
 * 
 * @param {string} what The resource to upgrade.
 * @param {number} number The amount to increase the click gain by.
 */
function upgradeClickGain(what, number) {
    var resource = getFromText(what);
    if (!resource || number == 0) return;
    resource.clickGain += number;
}

/**
 * Upgrades the base resource gain rate of a worker.
 * 
 * @param {string} what The worker/building to upgrade.
 * @param {number} number The rate to increase the resource gain rate by. Use negatives to reduce resource costs.
 * @param {string} res (Optional) The specific resource targeted.
 */
function upgradeWorkerRate(what, number, res = "") {
    var worker = getFromText(what);
    if (!worker || number == 0) return;
    for (var resGain in worker.resourceGain) {
        if ((worker.resourceGain[resGain].base <= 0 && number >= 0) || (worker.resourceGain[resGain].base >= 0 && number <= 0)) continue;
        if (res.length > 0 && res != resGain) continue;
        worker.resourceGain[resGain].base = prettify(worker.resourceGain[resGain].base + Math.abs(number), 2);
    }
    recalculateWorkerRate(worker);
}

/**
 * Upgrades the base resource gain rate of a worker.
 * 
 * @param {string} what The worker/building to downgrade.
 * @param {number} number The rate to decrease the resource gain rate by. Use negatives to increase resource costs.
 */
function downgradeWorkerRate(what, number) {
    var worker = getFromText(what);
    if (!worker || number == 0) return;
    for (var resGain in worker.resourceGain) {
        if ((worker.resourceGain[resGain].base >= 0 && number <= 0) || (worker.resourceGain[resGain].base <= 0 && number >= 0)) continue;
        worker.resourceGain[resGain].base = prettify(worker.resourceGain[resGain].base - Math.abs(number), 2);
    }
    recalculateWorkerRate(worker);
}

/**
 * Add a new resourceGain block to a worker/building.
 * 
 * @param {string} what The target worker or building.
 * @param {string} res The type of resource to start gaining.
 * @param {number} number The initial amount of resource gathering.
 */
function addWorkerRate(what, res, number) {
    var worker = getFromText(what);
    var resource = getFromText(res);
    if (!worker || !resource || number == 0 || worker.resourceGain[res]) return;
    worker.resourceGain[res] = {
        base: number,
        current: 0
    };

    recalculateWorkerRate(worker);
}

/**
 * Upgrade the rate of the return on a given trade.
 * 
 * @param {string} what The type of trade to upgrade.
 * @param {number} number The amount to increase/decrease the trade rate by.
 * @param {boolean} isCost Whether to affect the cost of a tax.
 */
function upgradeTradeRate(what, number, isCost = false) {
    var trade = getFromText(what);
    if (!trade || number == 0) return;

    if (!isCost) trade.rate += number;
    else trade.maxRate += number;

    updateTradeValues(trade);
}

/**
 * Upgrades the resource cost of a given rate.
 * 
 * @param {object} what The type of trade to upgrade
 * @param {number} number The new amount of the trade cost.
 * @param {string} resource (Optional) The specific resource targeted.
 */
function upgradeTradeCost(what, number, resource = "") {
    var trade = getFromText(what);
    if (!trade || number == 0) return;
    for (var res in trade.resourceCost) {
        if (!resource || res == resource) trade.resourceCost[res].base += number;
    }
    recalculateTradeCost(trade);
    updateTradeValues(trade);
}

/**
 * Upgrades the overall click rate of the player (affects clicking on resources).
 * 
 * @param {number} number The rate to increase the player clicking value by.
 */
function upgradePlayerClickGain(number) {
    if (!number || number == 0) return;
    game.player.clickValue = prettify(game.player.clickValue + number, 2);
    updateStatistics();
    if (game.player.clickValue >= 2) achieve("achPowerful");
}

/**
 * Upgrades the overall resource parent gain of the player
 * 
 * @param {number} number The rate to increase the resource parent gain by.
 */
function upgradePlayerParentGain(number) {
    if (!number || number == 0) return;
    game.player.parentValue = prettify(game.player.parentValue + number, 3);
    for (var wor in game.workers) {
        recalculateWorkerRate(game.workers[wor]);
    }
    updateStatistics();
}

/**
 * Upgrades the maximum amount of leaders a player can hire.
 * 
 * @param {number} number The number to increase the maximum amount of leaders by.
 */
function upgradeMaxLeaders(number) {
    if (!number || number == 0) return;
    game.player.maxLeaders += number;
    for (var ldr in game.leaders) {
        updateLeaderValues(getFromText(ldr));
    }
}

/**
 * Upgrades the player's overall upgrade cost.
 * 
 * @param {number} number Number to add to the cost multiplier. Use negative numbers to reduce prices.
 * @param {boolean} isAge (Optional) Whether to apply the cost upgrade to age upgrades only.
 */
function upgradeUpgradeCost(number, isAge = false) {
    if (!number || number == 0) return;
    if (isAge) game.player.ageCost = prettify(game.player.ageCost + number, 4);
    else game.player.upgradeCost = prettify(game.player.upgradeCost + number, 4);
    for (var upg in game.upgrades) {
        recalculateUpgradeCost(game.upgrades[upg]);
    }
    updateStatistics();
}

/**
 * Upgrades the player's overall worker cost.
 * 
 * @param {number} number Number to add to the cost multiplier. Use negative numbers to reduce prices.
 */
function upgradeWorkerCost(number) {
    if (!number || number == 0) return;
    game.player.workerCost = prettify(game.player.workerCost + number, 4);
    for (var wor in game.workers) {
        recalculateWorkerCost(game.workers[wor]);
    }
    updateStatistics();
}

/**
 * Upgades a worker's cost for a specific resource rate.
 * 
 * @param {string} wor The targeted worker.
 * @param {string} res The resource cost to modify.
 * @param {number} rate Number to add to the cost rate. Use negative numbers to reduce prices.
 */
function upgradeWorkerCostRate(wor, res, rate) {
    var worker = getFromText(wor);
    var resource = getFromText(res);
    if (rate == 0 || !worker || !resource) return;
    worker.resourceCost[res].rate = prettify(worker.resourceCost[res].rate + rate, 2);
    recalculateWorkerCost(worker);
}

/**
 * Upgrades the player's overall building cost.
 * 
 * @param {number} number Number to add to the cost multiplier. Use negative numbers to reduce prices.
 */
function upgradeBuildingCost(number) {
    if (!number || number == 0) return;
    game.player.buildingCost = prettify(game.player.buildingCost + number, 4);
    for (var bld in game.buildings) {
        recalculateBuildingCost(game.buildings[bld]);
    }
    updateStatistics();
}

/**
 * Performs a "Tax" action which provides gold to the player.
 * 
 * @param {number} workerRate How much gold each worker returns.
 * @param {number} buildingRate How much gold each building costs.
 * @param {bool} active Whether the tax should be run. If not we are only checking how much a tax would return.
 */
function tax(workerRate, buildingRate, active = true) {
    var number = 0;
    number += (getAmountWorkers() * workerRate);
    number += (getAmountBuildings() * buildingRate);
    if (number <= 0) number = 0;
    if (active && number == 0) achieve("achPureGreed");
    number += game.player.taxPassiveGold;
    number = Math.min(number, game.player.maxTax);
    if (!active) return number;
    gainGold(number);
}

/**
 * Upgrades the passive amount of gold collected by the player every tax.
 * 
 * @param {number} number Additional amount of gold to collect.
 */
function upgradeTaxPassiveGold(number) {
    if (!number || number == 0) return;
    game.player.taxPassiveGold += number;
}

/**
 * Upgrades the amount of gold carried over to the next colony.
 * 
 * @param {number} number The percentage to increase the rate by.
 */
function upgradePlayerGoldPrestige(number) {
    if (!number || number == 0) return;
    game.player.nextGoldRate += number;
}

/**
 * Checks whether the player can afford a provided object.
 * 
 * @param {object} what Any non-resource object that has a cost.
 * @return {bool} Whether the player has the resources to purchase the object.
 */
function canAfford(what) {
    if (!what) return false;
    for (var res in what.resourceCost) {
        if (getFromText(res).current < what.resourceCost[res].current) return false;
    }
    for (var req in what.requirements) {
        if (getFromText(req).level < what.requirements[req]) return false;
    }
    if (game.player.advancementPoints < what.advCost) return false;
    if (game.player.gold < what.goldCost) return false;
    if (game.player.prestigePoints < what.ptgCost) return false;
    if (game.player.colonies < what.colonies) return false;
    return true;
}

/**
 * Returns (or generates) the name of the current empire.
 * *n : adjective rather than noun.
 * t* : the name starts with "The".
 */
function getEmpireName() {
    if (game.player.empireName) return game.player.empireName;
    var prefixes = ["Greater *", "Upper *", "Lower *", "United *", "Northern *", "Southern *", "Eastern *", "Western *", "Holy *n Empire", "*n Imperium", "State of t*",
        "Dominion of t*", "Dutchy of t*", "Republic of t*", "t*n Republic", "Kingdom of t*", "*n Empire", "*n Dynasty", "*n Union", "*n Congregation", "*n Reign", "*n Reich",
        "*n Commonwealth", "County of t*", "Principality of t*", "Central *", "Outer *", "*n Order", "*n Federation", "Independant *", "North *", "South *", "West *", "East *"];
    var suffixes = ["Bavaria", "Germania", "Prussia", "Rome", "Austria", "Hungary", "Bulgaria", "Italy", "Germany", "Saxony", "Sicily", "Livonia", "Crimea", "Moldavia",
        "Byzantium", "Ottoman", "Albania", "Anatolia", "Macedonia", "Galicia", "Québec", "Serbia", "Sparta", "Athens", "Thebes", "Caledonia", "Francia", "Angles", "Wessex",
        "Russia", "Mongolia", "Macedonia", "Iberia", "Sumer", "Parthia", "Babylone", "Persia", "Assyria", "Egypt", "Spain", "America", "Akkad", "Arabia", "Cossackia"];
    var prefix = getRandom(prefixes);
    var suffix = getRandom(suffixes);
    var hasPrefix = false;
    if (prefix.includes("t*")) {
        prefix = prefix.replace("t*", "*");
        hasPrefix = true;
    }
    if (prefix.includes("*n")) {
        suffix = adjective(suffix);
        prefix = prefix.replace("*n", "*");
        hasPrefix = true;
    }
    var name = prefix.replace("*", suffix);
    game.player.empireName = name;
    game.player.empirePrefix = hasPrefix;
    return name;
}

/**
 * Returns the full name of the empire, with a prefix if applicable.
 * 
 * @param {boolean} capitalize Whether to capitalize the prefix if applicable.
 */
function getEmpireLabel(capitalize = false) {
    var name = "";
    if (game.player.empirePrefix) {
        if (capitalize) name += "The ";
        else name += "the ";
    }
    name += game.player.empireName;
    return name;
}

/**
 * Returns the current total amount of workers.
 */
function getAmountWorkers() {
    var number = 0;
    for (var wor in game.workers) {
        if (game.workers[wor].locked) continue;
        number += game.workers[wor].current;
    }
    return number;
}

/**
 * Returns the current total amount of buildings.
 */
function getAmountBuildings() {
    var number = 0;
    for (var bld in game.buildings) {
        if (game.buildings[bld].locked) continue;
        number += game.buildings[bld].current;
    }
    return number;
}

/**
 * Returns the amount of trades performed.
 */
function getAmountTrades() {
    var number = 0;
    for (var trd in game.trades) {
        if (game.trades[trd].locked) continue;
        number += game.trades[trd].current;
    }
    return number;
}

/**
 * Returns the current total amount of upgrades bought.
 */
function getAmountUpgrades() {
    var number = 0;
    for (var upg in game.upgrades) {
        if (game.upgrades[upg].locked || !game.upgrades[upg].bought) continue;
        number++;
    }
    return number;
}

/**
 * Returns the current total amount of prestiges bought.
 */
function getAmountPrestiges() {
    var number = 0;
    for (var ptg in game.prestiges) {
        if (game.prestiges[ptg].locked || !game.prestiges[ptg].bought) continue;
        number++;
    }
    return number;
}

/**
 * Returns the current total amount of achievements atained.
 */
function getAmountAchievements() {
    var number = 0;
    for (var ach in game.achievements) {
        if (!game.achievements[ach].achieved) continue;
        number++;
    }
    return number;
}

/**
 * Returns the current age the player is on.
 */
function getCurrentAge() {
    var age = "-";
    for (var upg in game.upgrades) {
        var upgrade = game.upgrades[upg];
        if (upgrade.type != "age" || upgrade.locked || !upgrade.bought) continue;
        age = upgrade.label;
    }
    return age;
}

/**
 * Returns the current total amount of advancements bought.
 */
function getAmountAdvancements() {
    var number = 0;
    for (var adv in game.advancements) {
        if (game.advancements[adv].locked || !game.advancements[adv].bought) continue;
        number++;
    }
    return number;
}

/**
 * Provides the full tooltip-formatted descripion for a provided resource.
 * 
 * @param {string} what The resource type.
 */
function getFullResDescription(what) {
    var description = "";
    var resource = getFromText(what);
    if (!resource) return definition;
    description = resource.description;
    if (game.settings.tooltipMode == "Limited") return description;
    description += "<span class =\"tooltipSmaller\">";
    for (var res in game.resources) {
        for (var parentBlock in game.resources[res].parent) {
            if (parentBlock == what) {
                var child = game.resources[res];
                if (child.rate == 0 && res != what + "P") continue;
                description += "<br />" + child.label + ":"
                    + (res == what + "P" ? "<br />" + prettify(child.clickGain * game.player.clickValue, 2, true) + " per click." : "")
                    + (res == what + "P" && child.rate > 0 ? "<br />" + prettify(child.rate, 2, true) + " per second." : "")
                    + "<br />" + prettify(child.parent[parentBlock].gain * game.player.parentValue, 2, true) + " " + resource.label + " upon completion.";
            }
        }
    }
    description += getResDescription(what, true);
    description += getResDescription(what, false);
    description += "</span>";
    return description;
}

/**
 * Provides the workers/buildings-related part of a resource description.
 * 
 * @param {string} what Type of the target resource.
 * @param {bool} positive Get only positive income. If false, only negative.
 */
function getResDescription(what, positive = true) {
    var description = "";
    var whatP = what + "P";
    var resource = getFromText(what);
    if (!resource) return definition;
    //passive bonuses
    for (var psv in game.passives) {
        if (!game.passives[psv].bought) continue;
        for (var gainBlock in game.passives[psv].resourceGain) {
            var passive = game.passives[psv];
            var passiveRate = passive.resourceGain[gainBlock].base;
            if (passiveRate == 0) continue;
            else if (positive && passiveRate < 0) continue;
            else if (!positive && passiveRate > 0) continue;
            if (gainBlock == what) {
                description += "<span style =\"color:" + (passiveRate > 0 ? "darkgreen" : "darkred") + ";\">"
                    + "<br />" + passive.label + " " + (passiveRate > 0 ? "giving" : "costing") + " " + prettify(Math.abs(passiveRate), 2, true) + " " + game.resources[gainBlock].label + " per second."
                    + "</span>";
            } else if (gainBlock == (whatP)) {
                description += "<span style =\"color:" + (passiveRate > 0 ? "darkgreen" : "darkred") + ";\">"
                    + "<br />" + passive.label + " " + (passiveRate > 0 ? "giving" : "costing") + " " + prettify(Math.abs(passiveRate), 2, true) + " " + game.resources[gainBlock].label + " per second. (" + prettify((passiveRate * game.resources[gainBlock].parent[what].gain * game.player.parentValue) / (game.resources[gainBlock].max - game.resources[gainBlock].min), 3, true) + " " + resource.name + " per second.)"
                    + "</span>";
            }
        }
    }
    //workers
    for (var wor in game.workers) {
        if (!game.workers[wor].current) continue;
        for (var gainBlock in game.workers[wor].resourceGain) {
            var worker = game.workers[wor];
            var workerRate = worker.resourceGain[gainBlock].current;
            if (workerRate == 0) continue;
            else if (positive && workerRate < 0) continue;
            else if (!positive && workerRate > 0) continue;
            if (gainBlock == what || gainBlock == whatP) {
                var rawResourceConversion = gainBlock == whatP ? " (" + prettify((workerRate * game.resources[gainBlock].parent[what].gain * game.player.parentValue) / (game.resources[gainBlock].max - game.resources[gainBlock].min), 3, true) + " " + resource.name + " per second.)" : "";
                description += "<span style =\"color:" + (workerRate > 0 ? "darkgreen" : "darkred") + ";\">"
                    + "<br />" + prettify(worker.current, 0, true) + " " + plural(worker) + " " + (workerRate > 0 ? "giving" : "costing") + " " + prettify(Math.abs(workerRate), 2, true) + " " + game.resources[gainBlock].label + " per second." + rawResourceConversion + "</span>";
            }
        }
    }
    //buildings
    for (var bld in game.buildings) {
        if (!game.buildings[bld].current) continue;
        for (var gainBlock in game.buildings[bld].resourceGain) {
            if (gainBlock == what || gainBlock == (whatP)) {
                var building = game.buildings[bld];
                var buildingRate = building.resourceGain[gainBlock].current;
                if (buildingRate == 0) continue;
                else if (positive && buildingRate < 0) continue;
                else if (!positive && buildingRate > 0) continue;
                var rawResourceConversion = gainBlock == whatP ? " (" + prettify((buildingRate * game.resources[gainBlock].parent[what].gain * game.player.parentValue) / (game.resources[gainBlock].max - game.resources[gainBlock].min), 3, true) + " " + resource.name + " per second.)" : "";
                description += "<span style =\"color:" + (buildingRate > 0 ? "darkgreen" : "darkred") + ";\">"
                    + "<br />" + building.current + " " + plural(building) + " " + (buildingRate > 0 ? "giving" : "costing") + " " + Math.abs(buildingRate) + " " + game.resources[gainBlock].label + " per second." + rawResourceConversion + "</span>";
            }
        }
    }
    return description;
}

/**
 * Returns the full description of a worker or building.
 * 
 * @param {object} worker The worker/building targetted.
 */
function getFullWorkerDescription(worker) {
    var description = "";
    if (!worker || worker.current < 1) return description;
    description += "<br />Currently gives you:<b>";
    for (var gainBlock in worker.resourceGain) {
        var resource = game.resources[gainBlock];
        if (!resource || worker.resourceGain[gainBlock].current == 0) continue;
        description += "<br />" + resource.label + ": " + prettify(worker.resourceGain[gainBlock].current, 2, true) + "/sec";
    }
    description += "</b>"
    return description;
}


/**
 * Lists all the resource costs of a provided object.
 * 
 * @param {object} what The worker/upgrade/etc. to check for.
 * @return A string of resource costs, separated by commas.
 */
function getCostLabel(what) {
    if (!what) return;
    var costString = "";
    if (what.advCost) {
        if (costString.length > 0) costString += ", ";
        costString += "<span style='color: " + (game.player.advancementPoints >= what.advCost ? "green" : "red") + ";'>";
        costString += "Advancement Points: "
        costString += prettify(what.advCost, 0, true);
        costString += "</span>";
    }
    if (what.goldCost) {
        if (costString.length > 0) costString += ", ";
        if (game.player.gold >= what.goldCost) costString += "<span style='color: green;'>";
        else costString += "<span style='color: red;'>";
        costString += "Gold: ";
        costString += prettify(what.goldCost, 0, true);
        costString += "</span>";
    }
    for (var res in what.resourceCost) {
        var resource = getFromText(res);
        if (costString.length > 0) costString += ", ";
        if (resource.current >= what.resourceCost[res].current) costString += "<span style='color: green;'>";
        else costString += "<span style='color: red;'>";
        costString += resource.label + ": ";
        costString += prettify(what.resourceCost[res].current, 0, true);
        costString += "</span>";
    }
    return costString;
}

/**
 * Lists all the prestige requirements
 * 
 * @param {object} what The prestige to gather requirements from.
 * @returns A list of requirements for the target prestige.
 */
function getRequirementsLabel(what) {
    if (!what || !what.requirements) return "";
    var reqString = "";
    for (var req in what.requirements) {
        var target = getFromText(req);
        if (!target) continue;
        if (reqString.length > 0) reqString += ", ";
        if (target.level >= what.requirements[req]) reqString += "<span style='color: green;'>";
        else reqString += "<span style='color: red;'>";
        reqString += target.label + " (" + what.requirements[req] + ")";
        reqString += "</span>";
    }
    return "<br />Requirements: " + reqString;
}

/**
 * Unhides an aspect of the interface.
 * 
 * @param {string} what Indication of what is being unlocked.
 */
function unlock(...what) {
    var containers = [];
    for (var i = 0; i < what.length; i++) {
        var uiParts = ["resources", "advancements", "settings", "prestige", "reset"];
        if (uiParts.includes(what[i])) {
            unlockUI(what[i]);
            continue;
        }

        var item = getFromText(what[i]);
        var itemP = "";
        if (!item || !item.name || !item.locked) continue;
        var itemType = getFromText(what[i], true);

        if (itemType == "resources" && item.name.indexOf("Progress") === -1) {
            itemP = getFromText(what[i] + "P");
        } else if (itemType == "leaders" && !game.upgrades.upgLeaders.bought) continue;
        else if (item.hasOwnProperty("canUnlock") && !item.canUnlock()) continue;
        item.locked = false;
        if (itemP) itemP.locked = false;
        if (!containers.includes(itemType)) containers.push(itemType);
    }
    for (var container in containers) {
        updateContainer(containers[container]);
    }
}

/**
 * Unlocks major parts of the UI.
 * 
 * @param {string} what What should be unlocked.
 */
function unlockUI(what) {
    var resourceElem = false;
    if (what == "resources") {
        resourceElem = document.getElementById("ResourcesArea");
    } else if (what == "advancements") {
        document.getElementById("MenuSpacer").classList.add("locked");
        resourceElem = document.getElementById("AdvancementsArea");
    } else if (what == "settings") {
        game.player.settingsUnlocked = true;
        resourceElem = document.getElementById("MenuArea");
    } else if (what == "prestige") {
        game.player.prestigeUnlocked = true;
        updatePrestigeButton();
    } else if (what == "reset") {
        game.player.prestigeResetUnlocked = true;
        resourceElem = document.getElementById("PrestigeResetButton");
    }
    if (resourceElem && resourceElem.classList.contains("locked")) resourceElem.classList.remove("locked");
}

/**
 * Hides everything from the UI when resetting the game.
 */
function hideUI() {
    var elems = ["ResourcesArea", "AdvancementsArea", "WorkersTitle", "BuildingsTitle", "TradesTitle", "LeadersTitle",
        "WorkersContainer", "BuildingsContainer", "TradesContainer", "LeadersContainer", "PrestigeResetButton"];

    for (var i in elems) {
        var elem = document.getElementById(elems[i]);
        if (!elem) continue;
        elem.classList.add("locked");
    }
    document.getElementById("MenuSpacer").classList.remove("locked");
}

/**
 * Refreshes an entire container to order the items in it.
 * 
 * @param {string} what The container to refresh.
 */
function updateContainer(what) {
    var elems = [];
    switch (what) {
        case "resources":
            document.getElementById("ResourcesContainer").innerHTML = "<!-- Insert resources here -->";
            for (var res in game.resources) {
                if (game.resources[res].locked) continue;
                addResourceBlock(res);
            }
            break;
        case "workers":
            document.getElementById("WorkersContainer").innerHTML = "<!-- Insert workers here -->";
            for (var wor in game.workers) {
                if (game.workers[wor].locked) continue;
                elems = [
                    "WorkersTitle", "WorkersContainer",
                    "mnuStatsLabelWorkers", "mnuStatsCurrentWorkers",
                    "mnuStatsLabelWorkerCost", "mnuStatsCurrentWorkerCost"
                ];
                addWorkerBlock(wor);
            }
            break;
        case "buildings":
            document.getElementById("BuildingsContainer").innerHTML = "<!-- Insert buildings here -->";
            for (var bld in game.buildings) {
                if (game.buildings[bld].locked) continue;
                elems = [
                    "BuildingsTitle", "BuildingsContainer",
                    "mnuStatsLabelBuildings", "mnuStatsCurrentBuildings",
                    "mnuStatsLabelBuildingCost", "mnuStatsCurrentBuildingCost"
                ];
                addBuildingBlock(bld);
            }
            break;
        case "trades":
            document.getElementById("TradesContainer").innerHTML = "<!-- Insert trades here -->";
            for (var trd in game.trades) {
                if (game.trades[trd].locked) continue;
                elems = ["TradesTitle", "TradesContainer",
                    "mnuStatsLabelTrades", "mnuStatsCurrentTrades"];
                addTradeBlock(trd);
            }
            break;
        case "upgrades":
            document.getElementById("UpgradesContainer").innerHTML = "<!-- Insert upgrades here -->";
            for (var upg in game.upgrades) {
                if (game.upgrades[upg].locked) continue;
                elems = ["UpgradesTitle", "UpgradesContainer"];
                addUpgradeBlock(upg);
            }
            break;
        case "leaders":
            document.getElementById("LeadersContainer").innerHTML = "<!-- Insert leaders here -->";
            for (var ldr in game.leaders) {
                if (game.leaders[ldr].locked) continue;
                elems = ["LeadersTitle", "LeadersContainer",
                    "mnuStatsLabelLeaders", "mnuStatsCurrentLeaders"];
                addLeaderBlock(ldr);
            }
            break;
        case "advancements":
            document.getElementById("AdvancementsContainer").innerHTML = "<!-- Insert advancements here -->";
            for (var adv in game.advancements) {
                if (game.advancements[adv].locked) continue;
                elems = ["mnuStatsLabelAdvancements", "mnuStatsCurrentAdvancements"];
                addAdvancementBlock(adv);
            }
            break;
        case "prestiges":
            document.getElementById("PrestigeActiveContainer").innerHTML = "<!-- Insert active prestiges here -->";
            document.getElementById("PrestigePassiveContainer").innerHTML = "<!-- Insert passive prestiges here -->";
            document.getElementById("PrestigeOtherContainer").innerHTML = "<!-- Insert other prestiges here -->";
            for (var ptg in game.prestiges) {
                addPrestigeBlock(ptg)
            }
            break;
        case "achievements":
            document.getElementById("AchievementsContainer").innerHTML = "<!-- Insert achievements here -->";
            for (var ach in game.achievements) {
                addAchievementBlock(ach);
            }
            break;
    }
    for (var i in elems) {
        document.getElementById(elems[i]).classList.remove("locked");
    }
}

/**
 * Dynamically create a resource HTML block.
 * 
 * @param {string} res The type of resource to display.
 */
function addResourceBlock(res) {
    var resP = res + "P";
    var resource = getFromText(res);
    var childResource = getFromText(resP);
    if (!resource || !childResource || document.getElementById(resource.name + "Block")) return;
    var elem = "<div id=\"" + resource.name + "Block\" class=\"rsBlock\">"
        + "<div class =\"rsIndicator\">"
        + "<span id=\"" + resource.name + "Indicator\" onclick=\"tooltip('" + res + "')\" onmouseleave=\"tooltip()\">" + resource.label + "</span>"
        + "</div>"
        + "<div class=\"rsRate\">"
        + "<span>(</span>"
        + "<span id=\"" + resource.name + "DisplayRate\">" + getResRate(resource) + "</span>"
        + "<span>)</span>"
        + "</div>"
        + "<div id=\"" + resource.name + "Bar\" class=\"rsBar\">"
        + "<div id=\"Current" + resource.name + "Bar\" class=\"rsStockBar rsAnimated\" style=\"width: " + GetPercent(resource.current, resource.max) + "%;\">"
        + "<div class=\"rsCurrentTotal\">"
        + "<span id=\"Current" + resource.name + "\">" + prettify(resource.current, 0, true) + "</span>"
        + "<span>/</span>"
        + "<span id=\"Max" + resource.name + "\">" + prettify(resource.max, 0, true) + "</span>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div id=\"" + childResource.name + "Bar\" class=\"rsBar\">"
        + "<div id=\"Current" + childResource.name + "Bar\" class=\"rsProgressBar rsAnimated\" style=\"width: " + GetPercent(childResource.current, childResource.max) + "%;\">"
        + "<div class=\"rsCurrentTotal\">"
        + "<span id=\"Current" + childResource.name + "\">" + prettify(childResource.current, 0, true) + "</span>"
        + "<span>/</span>"
        + "<span id=\"Max" + childResource.name + "\">" + prettify(childResource.max, 0, true) + "</span>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class=\"rsGatherer button clickable\" onmousedown=\"autoClick('" + resP + "')\" onmouseup=\"cancelAutoClick('" + resP + "')\" onmouseleave=\"cancelAutoClick()\">"
        + "<span>Gather</span>"
        + "</div>"
        + "</div>";

    document.getElementById("ResourcesContainer").innerHTML += elem;
}

/**
 * Dynamically create a worker HTML block.
 * 
 * @param {string} wor The type of worker to display. 
 */
function addWorkerBlock(wor) {
    var worker = getFromText(wor);
    if (!worker || document.getElementById(worker.name + "Block")) return;
    var elem = "<div id=\"" + worker.name + "Block\" class=\"jbBlock\">"
        + "<div id=\"" + worker.name + "Button\" class=\"jbButton button clickable\" "
        + "onmouseover=\"tooltip('" + wor + "', event)\" onmouseleave=\"tooltip()\" "
        + "onclick=\"clickBuy('" + wor + "')\">"
        + "<div class=\"jbIndicator\">"
        + "<span>" + worker.label + "</span>"
        + "</div>"
        + "<div class=\"jbCurrent\">"
        + "<span id=\"Current" + worker.name + "\">" + prettify(worker.current, 0, true) + "</span>"
        + "</div>"
        + "</div>"
        + "</div>";

    document.getElementById("WorkersContainer").innerHTML += elem;
}

/**
 * Dynamically create a building HTML block.
 * 
 * @param {string} bld The type of building to display.
 */
function addBuildingBlock(bld) {
    var building = getFromText(bld);
    if (!building || document.getElementById(building.name + "Block")) return;
    var elem = "<div id=\"" + building.name + "Block\" class=\"jbBlock\">"
        + "<div id=\"" + building.name + "Button\" class=\"jbButton button clickable\" "
        + "onmouseover=\"tooltip('" + bld + "', event)\" onmouseleave=\"tooltip()\" "
        + "onclick=\"clickBuy('" + bld + "')\">"
        + "<div class=\"jbIndicator\">"
        + "<span>" + building.label + "</span>"
        + "</div>"
        + "<div class=\"jbCurrent\">"
        + "<span id=\"Current" + building.name + "\">" + prettify(building.current, 0, true) + "</span>"
        + "</div>"
        + "</div>"
        + "</div>";

    document.getElementById("BuildingsContainer").innerHTML += elem;
}

/**
 * Dynamically creates an upgrade HTML block.
 * 
 * @param {string} upg The type of upgrade to display.
 */
function addUpgradeBlock(upg) {
    var upgrade = getFromText(upg);
    if (!upgrade || upgrade.bought || document.getElementById(upgrade.name + "Block")) return;
    var specialUpgrade = "";
    if (upgrade.type == "free") specialUpgrade = "jbFree ";
    else if (upgrade.type == "age") specialUpgrade = "jbAge ";
    var elem = "<div id=\"" + upgrade.name + "Block\" class=\"jbBlock\">"
        + "<div id=\"" + upgrade.name + "Button\" class=\"jbButton button unclickable " + specialUpgrade + "\" "
        + "onmouseover=\"tooltip('" + upg + "', event)\" onmouseleave=\"tooltip()\" "
        + "onclick=\"clickBuy('" + upg + "')\">"
        + "<div class=\"upgIndicator\">"
        + "<span>" + upgrade.label + "</span>"
        + "</div>"
        + "</div>"
        + "</div>"

    document.getElementById("UpgradesContainer").innerHTML += elem;
}

/**
 * Dynamically creates a leader HTML block
 * 
 * @param {string} ldr The type of leader to display.
 */
function addLeaderBlock(ldr) {
    var leader = getFromText(ldr);
    if (!leader || document.getElementById(leader.name + "Block")) return;
    var elem = "<div id=\"" + leader.name + "Block\" class=\"jbBlock\">"
        + "<div id=\"" + leader.name + "Button\" class=\"jbButton button unclickable" + (leader.bought ? " advBought" : "") + "\""
        + "onmouseover=\"tooltip('" + ldr + "', event)\" onmouseleave=\"tooltip()\" "
        + "onclick=\"clickBuy('" + ldr + "')\">"
        + "<div class=\"upgIndicator\">"
        + "<span>" + leader.label + "</span>"
        + "</div>"
        + "</div>"
        + "</div>"

    document.getElementById("LeadersContainer").innerHTML += elem;
}

/**
 * Dynamically creates an advancement HTML block.
 * 
 * @param {string} adv The type of advancement to display.
 */
function addAdvancementBlock(adv) {
    var advancement = getFromText(adv);
    if (!advancement || document.getElementById(advancement.name + "Block")) return;
    var parent = getFromText(advancement.parent);
    if (!parent) return;

    if (!document.getElementById(parent.name + "advTitle")) {
        var parentElem = "<div id=\"" + parent.name + "advTitle\" class=\"jbTitle\">" + (!advancement.secret ? parent.label : "???") + "</div>"
            + "<div id=\"" + parent.name + "advContainer\" class=\"jbOutline\"></div>";
        document.getElementById("AdvancementsContainer").innerHTML += parentElem;
    } else if (!advancement.secret) document.getElementById(parent.name + "advTitle").innerHTML = parent.label;
    var elem = "<div id=\"" + advancement.name + "Block\" class=\"jbBlock\">"
        + "<div id=\"" + advancement.name + "Button\" class=\"jbButton button " + (advancement.bought ? "unclickable advBought" : "clickable") + "\" "
        + "onmouseover=\"tooltip('" + adv + "', event)\" onmouseleave=\"tooltip()\" "
        + "onclick=\"clickBuy('" + adv + "')\">"
        + "<div class=\"upgIndicator\">"
        + "<span>" + advancement.label + "</span>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "";
    document.getElementById(parent.name + "advContainer").innerHTML += elem;
}

/**
 * Dynamically creates a trade HTML block.
 * 
 * @param {string} trd The type of trade to display.
 */
function addTradeBlock(trd) {
    var trade = getFromText(trd);
    if (!trade || document.getElementById(trade.name + "Block")) return;
    var elem = "<div id=\"" + trade.name + "Block\" class=\"jbBlock\">"
        + "<div id=\"" + trade.name + "Button\" class=\"jbButton button unclickable\" "
        + "onmouseover=\"tooltip('" + trd + "', event)\" onmouseleave=\"tooltip()\" "
        + "onclick=\"clickBuy('" + trd + "')\">"
        + "<div class=\"upgIndicator\">"
        + "<span>" + trade.label + "</span>"
        + "</div>"
        + "</div>"
        + "</div>"

    document.getElementById("TradesContainer").innerHTML += elem;
}

/**
 * Dynamically creates a prestige HTML block.
 * 
 * @param {string} ptg The type of prestige to display.
 */
function addPrestigeBlock(ptg) {
    var prestige = getFromText(ptg);
    if (!prestige || document.getElementById(prestige.name + "Block")) return;

    var elem = "<div id=\"" + prestige.name + "Block\" class=\"jbBlock ptgBlock\">"
        + "<div id=\"" + prestige.name + "Button\" class=\"jbButton button unclickable\" "
        + "onmouseover=\"tooltip('" + ptg + "', event)\" onmouseleave=\"tooltip()\" "
        + "onclick=\"clickBuy('" + ptg + "')\">"
        + "<div class=\"jbIndicator\">"
        + "<span>" + prestige.label + "</span>"
        + "</div>"
        + "<div class=\"jbCurrent\">"
        + "<span id=\"" + prestige.name + "CurrentLevel\">" + prestige.level + "/" + prestige.maxLevel + "</span>"
        + "</div>"
        + "</div>"
        + "</div>";

    var containerName = "";
    switch (prestige.type) {
        case "active":
            containerName = "PrestigeActiveContainer";
            break;
        case "passive":
            containerName = "PrestigePassiveContainer";
            break;
        default:
            containerName = "PrestigeOtherContainer";
    }

    document.getElementById(containerName).innerHTML += elem;
}

/**
 * Dynamically creates an achievement HTML block.
 * 
 * @param {string} ach The type of achievement to display.
 */
function addAchievementBlock(ach) {
    var achievement = getFromText(ach);
    if (!achievement || document.getElementById(achievement.name + "Block")) return;
    var label = (!achievement.achieved && achievement.hidden) ? "???" : achievement.label;
    var elem = "<div id=\"" + achievement.name + "Block\" class=\"jbBlock achBlock\">"
        + "<div id=\"" + achievement.name + "Button\" class=\"jbButton achButton button unclickable\" "
        + "onmouseover=\"tooltip('" + ach + "', event)\" onmouseleave=\"tooltip()\">"
        + "<div class=\"upgIndicator\">"
        + "<span>" + label + "</span>"
        + "</div>"
        + "</div>"
        + "</div>"

    document.getElementById("AchievementsContainer").innerHTML += elem;
}

/**
 * Unlocks all the advancements related to an age.
 * 
 * @param {object} age The specific age being unlocked.
 * @param {number} number The amount of Advancement Points to grant.
 */
function advanceAge(age, number = 0) {
    if (!age || !age.name) return;
    addAdvancementPoints(number);
    for (var adv in game.advancements) {
        var advancement = game.advancements[adv];
        if (age.name != advancement.parent || advancement.secret) continue;
        unlock(adv);
    }
    updateAdvancementValues(true);
    updateStatistics();
    message(getEmpireLabel(true) + " has entered the <b>" + age.label + "</b>.");
}

/**
 * Update the current gather rate of a type of workers.
 * 
 * @param {object} worker The type of worker to check.
 * @param {bool} skipResources Whether to skip recalculating resources rates.
 */
function recalculateWorkerRate(worker, skipResources = false) {
    if (!worker) return 0;

    for (var res in worker.resourceGain) {
        var gainBlock = worker.resourceGain[res];
        var resource = getFromText(res);
        if (!resource) continue;

        gainBlock.current = prettify(gainBlock.base * worker.current, 2);
        if (!skipResources) {
            recalculateResRate(resource);
            updateResRateValues(resource, true);
        }
    }
}

/**
 * Update the current cost of the next worker to buy.
 * 
 * @param {object} worker The worker to check.
 */
function recalculateWorkerCost(worker) {
    if (!worker) return;

    for (var res in worker.resourceCost) {
        var costBlock = worker.resourceCost[res];
        costBlock.current = costBlock.base;
        var workerCurrent = worker.current - worker.free;
        for (var i = 0; i < workerCurrent; i++) {
            costBlock.current = Math.ceil(costBlock.rate * costBlock.current);
        }
        costBlock.current = Math.ceil(costBlock.current * game.player.workerCost);
    }
}

/**
 * Update the current cost of the next building to buy.
 * 
 * @param {object} building The building to check.
 */
function recalculateBuildingCost(building) {
    if (!building) return;

    for (var res in building.resourceCost) {
        var costBlock = building.resourceCost[res];
        costBlock.current = costBlock.base;
        var buildingCurrent = building.current - building.free;
        for (var i = 0; i < buildingCurrent; i++) {
            costBlock.current = Math.ceil(costBlock.rate * costBlock.current);
        }
        costBlock.current = Math.ceil(costBlock.current * game.player.buildingCost);
    }
}

/**
 * Update the current cost of the next upgrade level to buy.
 * 
 * @param {object} upgrade The upgrade to check.
 */
function recalculateUpgradeCost(upgrade) {
    if (!upgrade) return;
    for (var res in upgrade.resourceCost) {
        var costBlock = upgrade.resourceCost[res];
        costBlock.current = costBlock.base;
        for (var i = 0; i < (upgrade.level - 1); i++) {
            if (!costBlock.rate) break;
            costBlock.current = Math.ceil(costBlock.rate * costBlock.current);
        }
        if (upgrade.type == "age") continue;
        costBlock.current = Math.ceil(costBlock.current * game.player.upgradeCost);
        if (typeof upgrade.goldCostBase !== "undefined") upgrade.goldCost = Math.ceil(upgrade.goldCostBase * game.player.upgradeCost);
    }
}

/**
 * Recalculates the current cost of the next trade to buy.
 * 
 * @param {object} trade The trade to check.
 */
function recalculateTradeCost(trade) {
    if (!trade) return;
    for (var res in trade.resourceCost) {
        var costBlock = trade.resourceCost[res];
        if (!costBlock.rate) costBlock.current = costBlock.base;
        else costBlock.current = prettify(costBlock.base * Math.pow(costBlock.rate, trade.current), 0);
    }
    if (!trade.goldBase) return;
    if (!trade.goldRate) trade.goldCost = trade.goldBase;
    else trade.goldCost = prettify(trade.goldBase * Math.pow(trade.goldRate, trade.current), 0);
}

/**
 * Recalculates the rate of passive gain of a resource.
 * 
 * @param {object} resource The specific resource targeted.
 */
function recalculateResRate(resource) {
    if (!resource) return;
    resource.rate = 0;
    resource.realRate = 0;
    resource.displayRate = 0;
    //TODO Optimize this
    //workers
    for (var wor in game.workers) {
        if (!game.workers[wor].current) continue;
        for (var res in game.workers[wor].resourceGain) {
            var gainResource = getFromText(res);
            if (resource.name == gainResource.name) {
                var addRate = game.workers[wor].resourceGain[res].current;
                resource.rate = prettify(resource.rate + addRate, 2);
                resource.displayRate = prettify(resource.displayRate + addRate, 5);
            }
        }
    }
    //buildings
    for (var bld in game.buildings) {
        if (!game.buildings[bld].current) continue;
        for (var res in game.buildings[bld].resourceGain) {
            var gainResource = getFromText(res);
            if (resource.name == gainResource.name) {
                var addRate = game.buildings[bld].resourceGain[res].current;
                resource.rate = prettify(resource.rate + addRate, 2);
                resource.displayRate = prettify(resource.displayRate + addRate, 5);
            }
        }
    }
    //passive bonuses
    for (var psv in game.passives) {
        if (!game.passives[psv].bought) continue;
        for (var res in game.passives[psv].resourceGain) {
            var gainResource = getFromText(res);
            if (resource.name == gainResource.name) {
                var addRate = game.passives[psv].resourceGain[res].base;
                resource.rate = prettify(resource.rate + addRate, 2);
                resource.displayRate = prettify(resource.displayRate + addRate, 5);
            }
        }
    }
    //child resources
    for (var res in game.resources) {
        if (game.resources[res].locked) continue;
        for (var par in game.resources[res].parent) {
            var parent = getFromText(par);
            if (resource.name == parent.name) {
                var childResource = game.resources[res];
                resource.displayRate = prettify(resource.displayRate + (childResource.rate * (childResource.parent[par].gain * game.player.parentValue) / (childResource.max - childResource.min)), 5);
            }

        }
    }
    resource.realRate = prettify(resource.rate / game.global.speed, 3);

    //update parents
    for (var par in resource.parent) {
        recalculateResRate(getFromText(par));
    }
}

/**
 * Resets the game when a player starts a colony.
 */
function prestigeReset() {
    var leadersUnlocked = game.upgrades.upgLeaders.bought;
    var leadersList = getLeaders();
    var carryover = {
        player: {
            colonies: game.player.colonies + 1,
            totalClicks: game.player.totalClicks,
            gold: Math.round(game.player.gold * game.player.nextGoldRate),
            advancementPoints: (game.player.advancementPoints + game.player.nextAdvancementPoints),
            prestigePoints: (game.player.prestigePoints + game.player.nextPrestigePoints),
            prestigeUnlocked: true,
            achievementPoints: game.player.achievementPoints,
            doubleClick: game.player.doubleClick
        }
    };
    carryover.global = game.global;
    carryover.settings = game.settings;
    carryover.settings.tutorialCompleted = false;
    carryover.prestiges = game.prestiges;
    carryover.achievements = game.achievements;
    carryover.upgrades = {
        upgLeaders: {
            locked: game.upgrades.upgLeaders.locked,
            bought: game.upgrades.upgLeaders.bought
        }
    };
    if (leadersUnlocked) {
        carryover.leaders = game.leaders;
        for (var ldr in leadersList) {
            var leader = leadersList[ldr];
            carryover.leaders[leader] = {
                locked: game.leaders[leader].locked,
                bought: false
            };
        }
    }

    var loadString = LZString.compressToBase64(JSON.stringify(carryover));
    if (!load(loadString)) message("There was a problem with resetting the game.", "warning");
    applyPrestiges();
    if (game.player.colonies <= 1) tutorialMessage("prestige3");
    if (game.settings.skipFirstUpg) clickBuy("upgWater");
    message("A new colony was built: <b>" + game.player.empireName + "</b>.");

    if (!game.achievements.achColonist.achieved && game.player.colonies > 0) achieve("achColonist");
    else if (!game.achievements.achPioneer.achieved && game.player.colonies >= 5) achieve("achPioneer");
    else if (!game.achievements.achLuminary.achieved && game.player.colonies >= 10) achieve("achLuminary");
    else if (!game.achievements.achPatrician.achieved && game.player.colonies >= 30) achieve("achPatrician");
}

/**
 * Refreshes entire interface.
 */
function updateInterface() {
    hideUI();
    updateTheme();
    document.getElementById("MessagesContainer").innerHTML = "<!-- Insert messages here -->";
    document.getElementById("AchievementsContainer").innerHTML = "<!-- Insert achievements here -->";
    lockStatistics();
    updateAutosaveButton();
    tooltip();
    updatePrestigeButton();
    getDefaultMenu();
    updateMenuInterface();
    if (game.player.settingsUnlocked) document.getElementById("MenuArea").classList.remove("locked");
    else document.getElementById("MenuArea").classList.add("locked");
    recalculateEverything();
    updateValues(true);
    updateRoundNumberSetting();
    updateDecimalPlacesSetting();
    updateGreeting();
    updateTutorialSetting();
    updateMsgFontSize();
    updateTooltipMode();
    updateDefaultMenu();
    updateDeleteSaveSetting();
    updateStatistics();
}

/**
 * Updates all the data labels in the interface.
 * 
 * @param {bool} forceUpdate (Optional) Force values to be updated regardless of user input.
 */
function updateValues(forceUpdate = false) {
    if (forceUpdate) {
        updateContainer("resources");
        updateContainer("workers");
        updateContainer("buildings");
        updateContainer("trades");
        updateContainer("upgrades");
        updateContainer("leaders");
        updateContainer("advancements");
        updateContainer("prestiges");
        updateContainer("achievements");
    }
    //resources
    for (var res in game.resources) {
        var resource = game.resources[res];
        if (forceUpdate && !resource.locked) unlock("resources");
        updateResRateValues(resource, forceUpdate);
        updateResValues(resource, forceUpdate ? true : resource.isActive);
    }
    //workers
    for (var wor in game.workers) {
        var worker = game.workers[wor];
        updateJobValues(worker, forceUpdate);
        if (game.global.currentTooltip == wor) tooltip(wor, null, false);
    }
    //buildings
    for (var bld in game.buildings) {
        var building = game.buildings[bld];
        updateJobValues(building, forceUpdate);
        if (game.global.currentTooltip == bld) tooltip(bld, null, false);
    }
    //trades
    for (var trd in game.trades) {
        var trade = game.trades[trd];
        updateTradeValues(trade);
        if (game.global.currentTooltip == trd) tooltip(trd, null, false);
    }
    updateGoldValues(forceUpdate);
    //upgrades
    for (var upg in game.upgrades) {
        var upgrade = game.upgrades[upg];
        updateUpgradeValues(upgrade, forceUpdate);
        if (game.global.currentTooltip == upg) tooltip(upg, null, false);
    }
    //leaders
    for (var ldr in game.leaders) {
        var leader = game.leaders[ldr];
        updateLeaderValues(leader, forceUpdate);
        if (game.global.currentTooltip == ldr) tooltip(ldr, null, false);
    }
    updateAvailableUpgrades(forceUpdate);
    //advancements
    for (var adv in game.advancements) {
        var advancement = game.advancements[adv];
        if (forceUpdate && !advancement.locked) {
            unlock("advancements");
            break;
        }
    }
    updateAdvancementValues(forceUpdate);
    //prestiges
    updatePrestigeValues(forceUpdate);
    //achievements
    updateAchievementValues(forceUpdate);
}

/**
 * Sets the selected menu to the default menu option.
 */
function getDefaultMenu() {
    switch (game.settings.defaultMenu) {
        case "Always Messages":
            game.settings.selectedMenu = "messages";
            break;
        case "Always Settings":
            game.settings.selectedMenu = "settings";
            break;
    }
}

/**
 * Display the activated menu for the player.
 */
function updateMenuInterface() {
    var availableMenus = ["messages", "statistics", "achievements", "prestige", "settings"];
    if (!availableMenus.includes(game.settings.selectedMenu)) game.settings.selectedMenu = "messages";
    //Clear all menus
    document.getElementById("mnuMessagesButton").classList.remove("selected");
    document.getElementById("mnuStatisticsButton").classList.remove("selected");
    document.getElementById("mnuAchievementsButton").classList.remove("selected");
    document.getElementById("mnuPrestigeButton").classList.remove("selected");
    document.getElementById("mnuSettingsButton").classList.remove("selected");
    document.getElementById("MessagesArea").classList.add("locked");
    document.getElementById("StatisticsArea").classList.add("locked");
    document.getElementById("AchievementsArea").classList.add("locked");
    document.getElementById("PrestigeArea").classList.add("locked");
    document.getElementById("SettingsArea").classList.add("locked");

    updateUnreadMessages();
    if (game.settings.selectedMenu == "messages") {
        document.getElementById("MessagesArea").classList.remove("locked");
        document.getElementById("MessagesContainer").scrollTop = document.getElementById("MessagesContainer").scrollHeight;
        document.getElementById("mnuMessagesButton").classList.add("selected");
    } else if (game.settings.selectedMenu == "statistics") {
        document.getElementById("StatisticsArea").classList.remove("locked");
        document.getElementById("mnuStatisticsButton").classList.add("selected");
    } else if (game.settings.selectedMenu == "achievements") {
        document.getElementById("AchievementsArea").classList.remove("locked");
        document.getElementById("mnuAchievementsButton").classList.add("selected");
    } else if (game.settings.selectedMenu == "prestige") {
        document.getElementById("PrestigeArea").classList.remove("locked");
        document.getElementById("mnuPrestigeButton").classList.add("selected");
    } else if (game.settings.selectedMenu == "settings") {
        document.getElementById("SettingsArea").classList.remove("locked");
        document.getElementById("mnuSettingsButton").classList.add("selected");
    }
}

/**
 * Resets visible statistics to default.
 */
function lockStatistics() {
    var elems = [
        "mnuStatsLabelColony", "mnuStatsColony",
        "mnuStatsLabelAge", "mnuStatsCurrentAge",
        "mnuStatsLabelWorkers", "mnuStatsCurrentWorkers",
        "mnuStatsLabelBuildings", "mnuStatsCurrentBuildings",
        "mnuStatsLabelTrades", "mnuStatsCurrentTrades",
        "mnuStatsLabelAdvancements", "mnuStatsCurrentAdvancements",
        "mnuStatsLabelWorkerCost", "mnuStatsCurrentWorkerCost",
        "mnuStatsLabelBuildingCost", "mnuStatsCurrentBuildingCost",
        "mnuStatsLabelLeaders", "mnuStatsCurrentLeaders",
        "mnuStatsLabelPrestiges", "mnuStatsCurrentPrestiges",
        "mnuStatsLabelAchievements", "mnuStatsCurrentAchievements"
    ];
    for (var i in elems) {
        document.getElementById(elems[i]).classList.add("locked");
    }
}

/**
 * Displays the current Statistic values.
 */
function updateStatistics() {
    setElement("mnuStatsCurrentName", getEmpireName());
    var age = getCurrentAge();
    setElement("mnuStatsCurrentAge", age);
    if (age != "-") {
        unhideElement("mnuStatsLabelAge");
        unhideElement("mnuStatsCurrentAge");
    }
    setElement("mnuStatsColony", game.player.colonies);
    setElement("mnuStatsCurrentPrestiges", prettify(getAmountPrestiges(), 0, true));
    if (game.player.colonies > 0) {
        unhideElement("mnuStatsLabelColony");
        unhideElement("mnuStatsColony");
        unhideElement("mnuStatsLabelPrestiges");
        unhideElement("mnuStatsCurrentPrestiges");
    }
    var ach = getAmountAchievements();
    setElement("mnuStatsCurrentAchievements", prettify(ach, 0, true));
    if (ach > 0) {
        unhideElement("mnuStatsLabelAchievements");
        unhideElement("mnuStatsCurrentAchievements");
    }
    setElement("mnuStatsCurrentClicks", prettify(game.player.totalClicks, 0, true));
    setElement("mnuStatsCurrentWorkers", prettify(getAmountWorkers(), 0, true));
    setElement("mnuStatsCurrentBuildings", prettify(getAmountBuildings(), 0, true));
    setElement("mnuStatsCurrentTrades", prettify(getAmountTrades(), 0, true));
    setElement("mnuStatsCurrentUpgrades", prettify(getAmountUpgrades(), 0, true));
    setElement("mnuStatsCurrentLeaders", game.player.currentLeaders + " / " + game.player.maxLeaders);
    setElement("mnuStatsCurrentAdvancements", prettify(getAmountAdvancements(), 0, true));
    setElement("mnuStatsCurrentClickPower", prettify(game.player.clickValue * 100, 2, true) + "%");
    setElement("mnuStatsCurrentParentValue", prettify(game.player.parentValue * 100, 2, true) + "%");
    setElement("mnuStatsCurrentWorkerCost", prettify(game.player.workerCost * 100, 2, true) + "%");
    setElement("mnuStatsCurrentBuildingCost", prettify(game.player.buildingCost * 100, 2, true) + "%");
    setElement("mnuStatsCurrentUpgradeCost", prettify(game.player.upgradeCost * 100, 2, true) + "%");
}

/**
 * Sets an HTML element to a provided value. Use to catch missing elements.
 * 
 * @param {string} elementId The ID of the HTML element to edit.
 * @param {string} value The value to set in the innerHTML param.
 */
function setElement(elementId, value) {
    var element = document.getElementById(elementId);
    if (!element) {
        message("A new version was detected. Please Save your game and refresh the page to get it.", "warning");
        return;
    }
    element.textContent = value;
}

/**
 * Unhides an HTML element. Use to catch missing elements.
 * 
 * @param {string} elementId The ID of the HTML element to display.
 */
function unhideElement(elementId) {
    var element = document.getElementById(elementId);
    if (!element) {
        message("A new version was detected. Please Save your game and refresh the page to get it.", "warning");
        return;
    }
    element.classList.remove("locked");
}

/**
 * Updates the label on the prestige button depending on the player having unlocked the section.
 */
function updatePrestigeButton() {
    var newText = "???";
    if (game.player.prestigeUnlocked) newText = "Prestige";
    document.getElementById("mnuPrestigeLabel").innerHTML = newText;
    if (game.player.prestigeResetUnlocked) document.getElementById("PrestigeResetButton").classList.remove("locked");
}

/**
 * Applies the selected theme to the UI.
 */
function updateTheme() {
    var availableThemes = game.global.availableThemes;
    if (!availableThemes.includes(game.settings.selectedTheme)) game.settings.selectedTheme = "defaultTheme";
    //Clear previous theme
    document.body.className = "";
    updateGraphics();
    localStorage.removeItem("theme");

    var i = game.global.availableThemes.indexOf(game.settings.selectedTheme);
    document.body.classList.add(game.global.availableThemes[i]);
    document.getElementById("mnuCurrentTheme").innerHTML = game.global.themeNames[i];
}

/**
 * Switch the active menu for another.
 * 
 * @param {object} what The menu to display.
 */
function switchMenu(what) {
    if (game.settings.selectedMenu == what) return;
    if (what == "prestige" && !game.player.prestigeUnlocked) return;
    game.settings.selectedMenu = what;
    updateMenuInterface();
}

/**
 * Toggles between the different available UI themes.
 */
function switchTheme() {
    game.settings.selectedTheme = toggleOption(game.global.availableThemes, game.settings.selectedTheme);
    localStorage.setItem("theme", game.settings.selectedTheme);
    updateTheme();
}

/**
 * Toggles the fancy graphics settings.
 */
function switchGraphics() {
    game.settings.fancyGraphics = !game.settings.fancyGraphics;
    updateGraphics();
}

/**
 * Updates the graphics settings to its new value.
 */
function updateGraphics() {
    if (game.settings.fancyGraphics) {
        document.body.classList.add("fancy");
    } else {
        document.body.classList.remove("fancy");
    }
    document.getElementById("mnuCurrentGraphics").innerHTML = game.settings.fancyGraphics ? "Fancy" : "Default";
}

/**
 * Checks for new updates to pop up for the user.
 * 
 * @param {bool} active Whether this is user action.
 */
function updateAvailableUpgrades(active = false) {
    //available upgrades based on passive actions
    if (!active && !game.upgrades.upgJewelers.locked) return;
    if (game.upgrades.upgBucket.locked && game.resources.wood.current >= 1) { unlock("upgBucket"); tutorialMessage("levels"); }
    else if (game.upgrades.upgBarrels.locked && game.resources.water.current == game.resources.water.max && game.resources.wood.current >= 1) unlock("upgBarrels");
    else if (game.upgrades.upgShed.locked && game.resources.wood.current == game.resources.wood.max) unlock("upgShed");
    else if (game.upgrades.upgMasonry.locked && game.resources.stone.current >= 1) unlock("upgMasonry", "upgMineCart");
    else if (game.upgrades.upgWaterDam.locked && game.resources.water.current >= 60) unlock("upgWaterDam");
    else if (game.upgrades.upgIronBucket.locked && game.resources.iron.current >= 1) unlock("upgIronBucket", "upgIronAxe", "upgIronPickaxe");
    else if (game.upgrades.upgNourishment.locked && game.resources.wheat.current >= 15) unlock("upgNourishment", "upgIrrigation", "upgApprenticeship");
    else if (game.upgrades.upgJewelers.locked && game.resources.diamond.current >= 1) unlock("upgJewelers", "upgDiamondTrade", "upgDiamondBucket", "upgDiamondAxe", "upgDiamondPickaxe", "upgDiamondSickle");

    if (!active) return;

    //check for achievements
    if (!game.achievements.achWillOfThePeople.achieved && game.buildings.waterMill.current >= 20 && game.buildings.grainMill.current >= 20 && getAmountTrades() < 1) achieve("achWillOfThePeople");
    else if (!game.achievements.achPolymath.achieved && getAmountTrades() >= 100 && getAmountUpgrades() >= 100) achieve("achPolymath");
}

/**
 * Checks for click-related achievements.
 */
function checkClickAchievements() {
    if (game.player.totalClicks >= 100000) {
        if (game.achievements.achExpert.achieved) return;
        achieve("achExpert");
    } else if (game.player.totalClicks >= 10000) {
        if (game.achievements.achJourneyman.achieved) return;
        achieve("achJourneyman");
    } else if (game.player.totalClicks >= 1000) {
        if (game.achievements.achApprentice.achieved) return;
        achieve("achApprentice");
    } else if (game.player.totalClicks >= 100) {
        if (game.achievements.achBeginner.achieved) return;
        achieve("achBeginner");
    }
}

/**
 * Updates the gold-related HTML elements.
 * @param {bool} active Whether this is user action.
 */
function updateGoldValues(active = true) {
    if (!active) return;
    var elem = document.getElementById("TradesGoldIndicator");
    var newGold = prettify(game.player.gold, 0, true);
    if (elem.textContent == newGold) return;
    elem.textContent = newGold;
}

/**
 * Updates all advancement-related HTML elements
 * 
 * @param {bool} active Whether this is user action.
 */
function updateAdvancementValues(active = false) {
    if (!active) return;
    var points = (game.player.advancementPoints > 0 ? "<span style=\"color:greenyellow;\">" : "<span>") + game.player.advancementPoints + " " + (game.player.advancementPoints > 1 ? "Points" : "Point") + "</span>";
    document.getElementById("AdvancementsPoints").innerHTML = points + " Available";
    for (var adv in game.advancements) {
        var advancement = game.advancements[adv];
        var advBlock = document.getElementById(advancement.name + "Block");
        var advButton = document.getElementById(advancement.name + "Button");
        if (!advBlock || !advButton) continue;

        if (advancement.bought) {
            advButton.classList.replace("clickable", "unclickable");
            advButton.classList.add("advBought");
            continue;
        }
        if (!advancement.locked) {
            if (canAfford(advancement)) {
                if (advButton.classList.contains("unclickable")) advButton.classList.replace("unclickable", "clickable");
            } else {
                if (advButton.classList.contains("clickable")) advButton.classList.replace("clickable", "unclickable");
            }
            advBlock.classList.remove("locked");
        } else advBlock.classList.add("locked");
    }
}

/**
 * Applies the purchased prestige skills. To be used when resetting the game.
 */
function applyPrestiges() {
    for (var ptg in game.prestiges) {
        var prestige = game.prestiges[ptg];
        if (prestige.level < 1 || prestige.oneTime) continue;
        //apply once per level
        for (var i = 0; i < prestige.level; i++) {
            prestige.effect(i);
        }
    }
}

/**
 * Updates all prestige-related HTML elements.
 * 
 * @param {bool} active Whether this is user action.
 */
function updatePrestigeValues(active = false) {
    if (!active) return;
    var pointsIndication = game.player.prestigePoints > 0 ? "<span style='color:greenyellow;'>" + game.player.prestigePoints + "</span>" : game.player.prestigePoints;
    document.getElementById("PrestigeCurrentPoints").innerHTML = pointsIndication + (game.player.nextPrestigePoints > 0 ? " (<span style='color:greenyellow;'>+" + game.player.nextPrestigePoints + "</span>)" : "");
    for (var ptg in game.prestiges) {
        var prestige = game.prestiges[ptg];
        var ptgBlock = document.getElementById(prestige.name + "Block");
        var ptgButton = document.getElementById(prestige.name + "Button");
        var ptgIndicator = document.getElementById(prestige.name + "CurrentLevel");
        if (!ptgBlock || !ptgButton || !ptgIndicator) continue;

        ptgIndicator.textContent = prestige.level + "/" + prestige.maxLevel;
        if (prestige.bought) {
            ptgButton.classList.replace("clickable", "unclickable");
            ptgButton.classList.remove("ptgInProgress");
            ptgButton.classList.add("ptgBought");
            continue;
        }
        if (canAfford(prestige)) {
            if (ptgButton.classList.contains("unclickable")) ptgButton.classList.replace("unclickable", "clickable");
            ptgButton.classList.remove("ptgInProgress");
        } else {
            if (ptgButton.classList.contains("clickable")) ptgButton.classList.replace("clickable", "unclickable");
            if (prestige.level > 0) ptgButton.classList.add("ptgInProgress");
        }
    }
}

/**
 * Updates all achievement-related HTML elements.
 * 
 * @param {bool} active Whether this is user action.
 */
function updateAchievementValues(active = false) {
    if (!active) return;
    document.getElementById("achCurrentPoints").innerHTML = game.player.achievementPoints;
    for (var ach in game.achievements) {
        var achievement = game.achievements[ach];
        var achBlock = document.getElementById(achievement.name + "Block");
        var achButton = document.getElementById(achievement.name + "Button");
        if (!achBlock || !achButton) continue;
        if (achievement.hidden && !achievement.achieved) continue;

        if (achievement.achieved) {
            achButton.classList.remove("achHidden");
            achButton.classList.add("achAchieved");
        }
    }
}

/**
 * Recalculate the values prone to important changes in every aspect of the game (don't call this often).
 */
function recalculateEverything() {
    for (var wor in game.workers) {
        var worker = game.workers[wor];
        recalculateWorkerCost(worker);
        recalculateWorkerRate(worker, true);
    }
    for (var bld in game.buildings) {
        var building = game.buildings[bld];
        recalculateBuildingCost(building);
        recalculateWorkerRate(building, true);
    }
    for (var res in game.resources) {
        recalculateResRate(game.resources[res]);
    }
    for (var upg in game.upgrades) {
        recalculateUpgradeCost(game.upgrades[upg]);
    }
    for (var trd in game.trades) {
        recalculateTradeCost(game.trades[trd]);
    }
}

/**
 * Update the interface elements according to the provided resource.
 * 
 * @param {object} resource The resource information to display.
 * @param {bool} active  Whether this is user action.
 * @param {bool} resetting Whether we should be checking to reset & skip animations.
 */
function updateResValues(resource, active, resetting = false) {
    if (!active || resource.locked) return;
    var newCurrent = (game.settings.roundResources ? Math.floor(resource.current) : resource.current);
    newCurrent = prettify(newCurrent, 2, true);
    var currentElem = document.getElementById("Current" + resource.name);
    if (currentElem.textContent != newCurrent) currentElem.textContent = newCurrent;
    var newMax = prettify(resource.max, 2, true);
    currentElem = document.getElementById("Max" + resource.name);
    if (currentElem.textContent != newMax) currentElem.textContent = newMax;
    var currentBar = document.getElementById("Current" + resource.name + "Bar");
    if (resetting) currentBar.classList.remove("rsAnimated");
    else if (!currentBar.classList.contains("rsAnimated")) currentBar.classList.add("rsAnimated");
    var newPercent = GetPercent(resource.current, resource.max) + "%";
    if (currentBar.style.width != newPercent) currentBar.style.width = newPercent;
}

/**
 * Update the interface elements related to rates for the provided resource.
 * 
 * @param {object} resource The resource rate information to display.
 * @param {bool} active Whether this is user action
 */
function updateResRateValues(resource, active) {
    if (!active || resource.locked) return;
    if (hasParent(resource)) {
        for (var parent in resource.parent) updateResRateValues(getFromText(parent), active);
        return;
    }
    document.getElementById(resource.name + "DisplayRate").textContent = getResRate(resource);
}

/**
 * Returns the label of the rate for a resource.
 * 
 * @param {object} resource The target resource.
 * @return {string} The label for the display rate.
 */
function getResRate(resource) {
    if (!resource) return "";
    var decimals = game.settings.resourceDecimals;
    if (decimals < 0 || decimals > 5) decimals = 2;
    var number = prettify(Math.abs(resource.displayRate), decimals, true);
    if (game.settings.resourceAlwaysDecimals && Math.abs(resource.displayRate) < 10000) number = number.toFixed(decimals);
    return (resource.displayRate < 0 ? "-" : "+") + number + "/sec";
}

/**
 * Update the HTML elements according to the provided job.
 * 
 * @param {object} job The worker information to display.
 * @param {bool} active  Whether this is user action.
 */
function updateJobValues(job, active) {
    //Disable/Enable the job button regardless user activity
    var jobButton = document.getElementById(job.name + "Button");
    if (!jobButton) return;

    if (canAfford(job)) {
        if (jobButton.classList.contains("unclickable")) jobButton.classList.replace("unclickable", "clickable");
    } else {
        if (jobButton.classList.contains("clickable")) jobButton.classList.replace("clickable", "unclickable");
    }

    if (!active) return;
    document.getElementById("Current" + job.name).textContent = prettify(job.current, 0, true);
}

/**
 * Update the HTML elements according to the provided upgrade.
 * 
 * @param {object} upgrade The upgrade information to display.
 * @param {bool} active Whether this is user action. 
 */
function updateUpgradeValues(upgrade, active) {
    var upgBlock = document.getElementById(upgrade.name + "Block");
    var upgButton = document.getElementById(upgrade.name + "Button");
    if (!upgBlock || !upgButton) return;
    if (!upgrade.locked && !upgrade.bought) {
        if (canAfford(upgrade)) {
            if (upgButton.classList.contains("unclickable")) upgButton.classList.replace("unclickable", "clickable");
        } else {
            if (upgButton.classList.contains("clickable")) upgButton.classList.replace("clickable", "unclickable");
        }
    }

    if (!active) return;
    if (!upgrade.locked && !upgrade.bought) upgBlock.classList.remove("locked");
    else if (upgrade.bought) upgBlock.remove();
    else upgBlock.classList.add("locked");
}

/**
 * Update the HTML elements according to the provided leader.
 * 
 * @param {what} leader The leader information to display.
 */
function updateLeaderValues(leader, active = false) {
    var ldrButton = document.getElementById(leader.name + "Button");
    if (!ldrButton) return;

    if (!leader.bought && canAfford(leader) && game.player.currentLeaders < game.player.maxLeaders) {
        if (ldrButton.classList.contains("unclickable")) ldrButton.classList.replace("unclickable", "clickable");
    } else {
        if (ldrButton.classList.contains("clickable")) ldrButton.classList.replace("clickable", "unclickable");
    }

    if (!active) return;
    if (leader.bought) {
        ldrButton.classList.replace("clickable", "unclickable");
        ldrButton.classList.add("advBought");
    }
}

/**
 * Update the HTML elements according to the provided trade.
 * 
 * @param {object} trade The trade information to display.
 */
function updateTradeValues(trade) {
    if (trade.locked) return;
    var trdBlock = document.getElementById(trade.name + "Block");
    var trdButton = document.getElementById(trade.name + "Button");
    if (!trdBlock || !trdButton) return;
    if (canAfford(trade)) {
        if (trdButton.classList.contains("unclickable")) trdButton.classList.replace("unclickable", "clickable");
    } else {
        if (trdButton.classList.contains("clickable")) trdButton.classList.replace("clickable", "unclickable");
    }

}

/**
 * Refresh the autosave button to reflect game settings. 
 */
function updateAutosaveButton() {
    var autoSaveButton = document.getElementById("autosaveButton");
    autoSaveButton.classList.remove("autosaveON");
    autoSaveButton.classList.remove("autosaveOFF");
    if (game.settings.autoSaveEnabled) {
        autoSaveButton.classList.add("autosaveON");
        document.getElementById("autosaveLabel").textContent = "Autosave (ON)"
    } else {
        autoSaveButton.classList.add("autosaveOFF");
        document.getElementById("autosaveLabel").textContent = "Autosave (OFF)"
    }
}

/**
 * Refresh the pause button to reflect current game state.
 */
function updatePauseButton() {
    if (game.global.isPaused) {
        updateModalBackground(false, true);
        document.getElementById("pauseButton").classList.add("pauseON");
        document.getElementById("pauseLabel").textContent = "Unpause"
        if (game.global.currentTooltip == "") tooltip("pause");
    } else {
        if (game.global.currentTooltip == "pause") tooltip();
        document.getElementById("pauseButton").classList.remove("pauseON");
        document.getElementById("pauseLabel").textContent = "Pause"
    }
}

/**
 * Toggles the modal window on and off.
 * 
 * @param {string} what Type of the modal window to show/hide.
 */
function updateModal(what) {
    if (!what || game.global.currentTooltip == what) {
        tooltip();
    } else if (what == "import") {
        updateModalBackground(false, true);
        tooltip("import");
        if (document.getElementById("importText")) document.getElementById("importText").focus();
    } else if (what == "export") {
        updateModalBackground(false, true);
        tooltip("export");
    }
}

/**
 * Toggles the modal background to disallow user interaction with the interface.
 * 
 * @param {bool} hide Whether the background should be hidden.
 * @param {bool} menuAllowed Whether the bottom ribbon should still be active.
 */
function updateModalBackground(hide = true, menuAllowed = false) {
    if (hide) {
        document.getElementById("bgDisable").classList.replace("mdShow", "mdHide");
        document.getElementById("bgDisable").classList.remove("menuAllowed");
        return;
    }
    if (menuAllowed) document.getElementById("bgDisable").classList.add("menuAllowed");
    document.getElementById("bgDisable").classList.replace("mdHide", "mdShow");
}

/**
 * Copies the export string into the cliboard of the user.
 */
function copyExport() {
    var exportText = document.getElementById("exportText");
    if (!exportText) return;
    exportText.disabled = false;
    exportText.focus();
    exportText.select();
    document.execCommand("copy");
    document.getSelection().removeAllRanges();
    exportText.disabled = true;
}

/**
 * Deletes the current save and resets the game.
 */
function deleteSave() {
    localStorage.removeItem("ClickerUltisvg");
    localStorage.removeItem("theme");
    location.reload();
}

/**
 * Shows/hides the tooltip modal based on a provided instruction.
 * 
 * @param {string} what Name of the object to display.
 * @param {object} event MouseEvent, used to position the tooltip.
 * @param {bool} repositionTooltip Whether to reposition the tooltip.
 */
function tooltip(what = "hide", event = null, repositionTooltip = true) {
    var tooltipDiv = document.getElementById("tooltipContainer");
    var centerDiv = true;
    if (!what || what == "hide") {
        tooltipDiv.style.display = "none";
        game.global.currentTooltip = "";
        updateModalBackground();
        return;
    }

    var titleText = "Title";
    var mainText = "Main";
    var bottomText = "Bottom";

    if (what == "pause") {
        titleText = "PAUSED";
        mainText = "Your game is paused. Click the \"Unpause\" button to resume.";
        bottomText = "<div class=\"mdButton mdRed button\" onclick=\"togglePause()\"><span>Unpause</span></div>";
    } else if (what == "export") {
        titleText = "Export"
        mainText = "Copy/Paste the following text to import your game:<textarea id=\"exportText\" class=\"mdTextArea\" disabled>" + save(true) + "</textarea>";
        bottomText = "<div class=\"mdButton mdGreen button\" onclick=\"copyExport()\">Copy to Clipboard</div><div class=\"mdButton mdGray button\" onclick=\"toggleExport()\"><span>Close</span></div>";
    } else if (what == "import") {
        titleText = "Import";
        mainText = "Paste the export string here:<textarea id=\"importText\" class=\"mdTextArea\"></textarea>";
        bottomText = "<div class=\"mdButton mdGreen button\" onclick=\"importLoad()\">Load</div><div class=\"mdButton mdGray button\" onclick=\"toggleImport()\">Close</div>";
    } else if (what === "delete") {
        titleText = "Delete Save";
        mainText = "Delete your save and reset the game? (This cannot be undone)";
        bottomText = "<div class=\"mdButton mdRed button\" onclick=\"deleteSave()\">Yes</div><div class=\"mdButton mdGray button\" onclick=\"tooltip()\">Cancel</div>";
        updateModalBackground(false, true);
    } else if (what == "colony") {
        var advPts = prettify(game.player.advancementPoints + game.player.nextAdvancementPoints + (game.prestiges.ptgAdvanced.level * game.prestiges.ptgAdvanced.rate), 0, true);
        var ptgPts = prettify(game.player.prestigePoints + game.player.nextPrestigePoints, 0, true);
        var gold = prettify(Math.floor(game.player.gold * game.player.nextGoldRate), 0, true);
        titleText = "Start a new colony?";
        mainText = "Are you sure you want to start a new colony? Your progress will be reset, however you will be allowed to keep the following:<b><br />" + ptgPts + " Prestige Point" + (ptgPts > 1 ? "s" : "") + "<br />" + advPts + " Advancement Point" + (advPts > 1 ? "s" : "");
        if (gold > 0) mainText += "<br />" + gold + " Gold";
        mainText += "</b>";
        bottomText = "<div class=\"mdButton mdGreen button\" onclick=\"prestigeReset()\">Yes</div><div class=\"mdButton mdGray button\" onclick=\"tooltip()\">Cancel</div>";
        updateModalBackground(false, false);
    } else {
        //Tooltip is tied to a resource/workers/etc.
        if (game.settings.tooltipMode == "Disabled") return;
        centerDiv = false;
        var item = getFromText(what);
        if (!item) return;
        var itemType = getFromText(what, true);

        if (itemType == "workers" || itemType == "buildings") {
            titleText = item.label;
            if (game.settings.tooltipMode == "Limited") mainText = item.description();
            else mainText = item.description() + getFullWorkerDescription(item);
            bottomText = getCostLabel(item);
        } else if (itemType == "upgrades") {
            titleText = (item.fullLabel ? item.fullLabel : item.label) + (item.level > 0 ? " (" + item.level + "/" + item.maxLevel + ")" : "");
            mainText = item.description();
            if (item.colonies > 0 && item.colonies > game.player.colonies) mainText += "<br /><span style='color: red;'>You need to have built at least <b>" + item.colonies + (item.colonies > 1 ? " Colonies" : " Colony") + "</b> to purchase this upgrade.</span>"
            var tempBottomText = getCostLabel(item);
            if (tempBottomText.length < 1) bottomText = "<span style='color: green;'>This upgrade is free!</span>";
            else bottomText = tempBottomText;
        } else if (itemType == "advancements") {
            titleText = item.label;
            mainText = item.description();
            bottomText = (item.bought ? "<span style='color: green;'>You have this advancement.</span>" : "This advancement costs <span style='color: " + (game.player.advancementPoints >= item.advCost ? "green" : "red") + ";'>" + item.advCost + "</span> Advancement " + (item.advCost > 1 ? "Points" : "Point") + ".");
        } else if (itemType == "trades") {
            titleText = (item.fullLabel ? item.fullLabel : item.label);
            mainText = item.description();
            bottomText = getCostLabel(item);
        } else if (itemType == "resources") {
            titleText = item.label;
            mainText = getFullResDescription(what);
            bottomText = "Total gather rate: " + (item.displayRate <= 0 ? "<span style='color: red;'>" : "<span style='color: green;'>") + item.displayRate + "</span> per second.";
        } else if (itemType == "prestiges") {
            titleText = item.label + (item.maxLevel > 0 ? " (" + Math.min((item.level + 1), item.maxLevel) + "/" + item.maxLevel + ")" : "");
            mainText = item.description() + getRequirementsLabel(item);
            bottomText = (item.bought ? "<span style='color: green;'>You have this prestige skill.</span>" : "This prestige skill costs <span style='color: " + (game.player.prestigePoints >= item.ptgCost ? "green" : "red") + ";'>" + item.ptgCost + "</span> Prestige " + (item.ptgCost > 1 ? "Points" : "Point") + ".");
        } else if (itemType == "leaders") {
            titleText = (item.fullLabel ? item.fullLabel : item.label);
            mainText = item.description() + "<br/><span class='tooltipSmaller'>\"" + item.quote + "\"</span>";
            if (item.bought) bottomText = "<span style='color: green;'>You hired this leader.</span>";
            else {
                bottomText = getCostLabel(item);
                if (game.player.currentLeaders >= game.player.maxLeaders) bottomText += "<br /><span style='color:red;'>You cannot hire an additional leader.</span>";
            }
        } else if (itemType == "achievements") {
            if (item.hidden && !item.achieved) {
                titleText = "";
                mainText = "This achievement is hidden.";
                bottomText = "Achievement Points: " + (item.points ? item.points : "0");
            } else {
                titleText = (item.fullLabel ? item.fullLabel : item.label);
                var progress = item.hasOwnProperty("progress") && !item.achieved ? "<br /><span class =\"tooltipSmaller\">" + item.progress() + "</span>" : "";
                mainText = item.description() + progress;
                bottomText = "Achievement Points: " + (item.points ? item.points : "0");
                if (item.achieved) bottomText += "<span style='color: green;'> (You have this achievement.)</span>";
            }
        }
    }

    //Update the tooltip HTML elements
    document.getElementById("tooltipTop").innerHTML = titleText;
    document.getElementById("tooltipMain").innerHTML = mainText;
    document.getElementById("tooltipBottom").innerHTML = bottomText;
    tooltipDiv.style.display = "block";
    game.global.currentTooltip = (what ? what : "");

    if (!repositionTooltip) return;
    positionTooltip(tooltipDiv, event, centerDiv)
}

/**
 * Reposition the informational tooltip close to the user's mouse.
 * 
 * @param {object} tooltipDiv The HTML element of the tooltip itself.
 * @param {object} event MouseEvent, used to position the tooltip.
 * @param {bool} isCenter Whether the tooltip should be centered.
 */
function positionTooltip(tooltipDiv, event, isCenter) {
    var bodw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var bodh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var tiph = Math.max(tooltipDiv.clientHeight, tooltipDiv.scrollHeight, tooltipDiv.offsetHeight);
    var tipw = bodw * .300;
    var spacing = bodh * 0.03;
    var setLeft;
    var setTop;

    if (isCenter) {
        //Centered tooltip acting as modal
        tooltipDiv.style.left = "35vw"; //50vw - (tipw / 2)
        tooltipDiv.style.top = "calc(50% - " + (tiph / 2) + "px)";
        return;
    } else {
        //Dynamic MouseEvent tooltip
        var x = 0;
        var y = 0;
        var e = (event || window.event);
        if (!e) return;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else if (e.clientX || e.clientY) {
            x = e.clientX;
            y = e.clientY;
        }

        setLeft = x + spacing;
        if ((setLeft + tipw) > bodw) setLeft = (bodw - tipw - spacing);
        setTop = y - tiph - spacing;
        if (setTop < 0) setTop = y + spacing;
    }

    tooltipDiv.style.left = Math.floor(setLeft) + "px";
    tooltipDiv.style.top = Math.floor(setTop) + "px";
}

/**
 * Ensures a provided object's current value does not go over its maximum value.
 * 
 * @param {object} what The resource/object to verify.
 * @param {number} number The number we are trying to assign.
 * @param {bool} resets Should the value be back to minimum when going over the maximum?
 * @param {bool} active Whether this is triggered by the user.
 * @return {number} A number that can be safely assigned to the provided object.
 */
function GetMax(what, number, resets, active) {
    if (!what) return;
    if (resets && number >= what.max) {
        var toReset = false;
        for (var par in what.parent) {
            var parent = getFromText(par);
            if (what.name.includes(parent.name) && parent.current != parent.max) toReset = true;
        }
        if (!hasParent(what) || toReset) {
            //add resources to each parent since we are resetting
            for (var par in what.parent) {
                var parent = getFromText(par);
                var parentGain = prettify(what.parent[par].gain * game.player.parentValue, 2);
                gainResource(parent, parentGain, active);
            }
            if (game.prestiges.ptgLoopClicking.bought) return GetMax(what, (number - what.max), resets, active);
            return what.min;
        }
        else return what.max;
    }
    if (number < what.min) return what.min;
    if (what.max > number) return number;
    return what.max;
}

/**
 * Checks whether the provided object has a parent object.
 * 
 * @param {object} what The object.
 * @return {boolean} Whether a parent was found.
 */
function hasParent(what) {
    if (!what || !what.parent || Object.keys(what.parent).length === 0) return false;
    return true;
}

//override newGame data
if (!load()) updateInterface();
greetingMessage();

//main game loop
var loops = 0;
setTimeout(gameTimeout, (1000 / game.global.speed));

//inital setup
firstSetup();

//unhide body
document.body.classList.remove("locked");
//save game every minute
var autosaveTimer = setTimeout(autoSave, 60000);
//display tips for user
var tutorialTimer = setTimeout(randomTip, 300000);