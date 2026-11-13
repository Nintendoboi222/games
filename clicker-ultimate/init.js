function newGame() {
    var initData = {
        global: {
            version: "0.2.07",
            latestChanges: "Added leader greetings & minor bug fixes",
            start: new Date().getTime(),
            time: 0,
            speed: 10,
            isPaused: false,
            currentTooltip: "",
            availableThemes: ["defaultTheme", "nightTheme", "crimsonTheme", "turtleTheme", "strikingTheme", "indigoTheme", "arcticTheme", "victoryTheme"],
            themeNames: ["Default", "Quiet Night", "Crimson Sky", "Turtle", "Lightning Strike", "Indigo Rush", "Arctic Metal", "Victory"],
            messages: [],
            achievements: [],
            unreadMessages: 0,
            lastTip: "",
            autoClicking: false,
            autoClickingRes: "",
            clicks: 0
        },
        settings: {
            selectedMenu: "messages",
            defaultMenu: "Keep Last Tab",
            selectedTheme: "defaultTheme",
            fancyGraphics: false,
            autoSaveEnabled: true,
            tutorialEnabled: true,
            tutorialCompleted: false,
            greetingMessage: "Latest Changes",
            roundResources: true,
            resourceDecimals: 2,
            resourceAlwaysDecimals: false,
            messagesSize: "Normal",
            tooltipMode: "Detailed",
            skipFirstUpg: true,
            hardResetExposed: false
        },
        player: {
            empireName: "",
            empirePrefix: false,
            totalClicks: 0,
            settingsUnlocked: false,
            prestigeUnlocked: false,
            prestigeResetUnlocked: false,
            colonies: 0,
            clickValue: 1,
            parentValue: 1,
            workerCost: 1,
            buildingCost: 1,
            upgradeCost: 1,
            ageCost: 1,
            advancementPoints: 0,
            nextAdvancementPoints: 0,
            gold: 0,
            nextGoldRate: 0,
            taxPassiveGold: 0,
            maxTax: 100,
            prestigePoints: 0,
            nextPrestigePoints: 0,
            achievementPoints: 0,
            autoClick: 0,
            doubleClick: 0,
            convertPrestiges: 0,
            maxLeaders: 1,
            currentLeaders: 0
        },
        resources: {
            water: {
                name: "Water",
                label: "Water",
                description: "A very important resource. This is the foundation which will be built upon, you can feel it in your bones.",
                current: 0,
                min: 0,
                max: 10,
                //rate
                //parent
                clickGain: 1,
                isActive: false,
                locked: true
            },
            waterP: {
                name: "WaterProgress",
                label: "Water Progress",
                current: 0,
                min: 0,
                max: 10,
                parent: {
                    water: {
                        gain: 1
                    }
                },
                clickGain: 1,
                isActive: false,
                locked: true
            },
            wood: {
                name: "Wood",
                label: "Wood",
                description: "Though more difficult to acquire than Water, it is nonetheless just as useful. Most basic things can be built from Wood. This should make your life easier.",
                current: 0,
                min: 0,
                max: 10,
                clickGain: 1,
                isActive: false,
                locked: true
            },
            woodP: {
                name: "WoodProgress",
                label: "Wood Progress",
                current: 0,
                min: 0,
                max: 25,
                parent: {
                    wood: {
                        gain: 1
                    }
                },
                clickGain: 1,
                isActive: false,
                locked: true
            },
            stone: {
                name: "Stone",
                label: "Stone",
                description: "Stone is much sturdier than Wood, and as such should prove much more useful in the long run. Not the kind of thing you want to mine yourself.",
                current: 0,
                min: 0,
                max: 5,
                clickGain: 1,
                isActive: false,
                locked: true
            },
            stoneP: {
                name: "StoneProgress",
                label: "Stone Progress",
                current: 0,
                min: 0,
                max: 50,
                parent: {
                    stone: {
                        gain: 1
                    }
                },
                clickGain: 1,
                isActive: false,
                locked: true
            },
            iron: {
                name: "Iron",
                label: "Iron",
                description: "The process of extracting and processing iron is complicated, but rewarding. Manipulating such a tough metal will prove useful in the long run.",
                current: 0,
                min: 0,
                max: 15,
                clickGain: 1,
                isActive: false,
                locked: true
            },
            ironP: {
                name: "IronProgress",
                label: "Iron Progress",
                current: 0,
                min: 0,
                max: 1000,
                parent: {
                    iron: {
                        gain: 5
                    }
                },
                clickGain: 1,
                isActive: false,
                locked: true
            },
            wheat: {
                name: "Wheat",
                label: "Wheat",
                description: "Useful resource for managing a large amount of people. Processing wheat into various foods is a useful way of making commerce flourish, as it is easy to gather and store.",
                current: 0,
                min: 0,
                max: 2000,
                clickGain: 1,
                isActive: false,
                locked: true
            },
            wheatP: {
                name: "WheatProgress",
                label: "Wheat Progress",
                current: 0,
                min: 0,
                max: 5,
                parent: {
                    wheat: {
                        gain: 1
                    }
                },
                clickGain: 1,
                isActive: false,
                locked: true
            },
            silver: {
                name: "Silver",
                label: "Silver",
                description: "This rarer material reflects light very well, which seems to make it worth finding a use to. Mining for Silver will also grant you <b>Stone</b> as a result of your mining experience.",
                current: 0,
                min: 0,
                max: 200,
                clickGain: 1,
                isActive: false,
                locked: true
            },
            silverP: {
                name: "SilverProgress",
                label: "Silver Progress",
                current: 0,
                min: 0,
                max: 2500,
                parent: {
                    stone: {
                        gain: 50
                    },
                    silver: {
                        gain: 10
                    }
                },
                clickGain: 1,
                isActive: false,
                locked: true
            },
            diamond: {
                name: "Diamond",
                label: "Diamond",
                description: "A rare gem of great value. Though its stunnings aesthetic properties are key to its popularity, it may find its proper use yet with a bit of work.",
                current: 0,
                min: 0,
                max: 1000,
                clickGain: 1,
                isActive: false,
                locked: true
            },
            diamondP: {
                name: "DiamondProgress",
                label: "Diamond Progress",
                current: 0,
                min: 0,
                max: 10000,
                parent: {
                    diamond: {
                        gain: 80
                    }
                },
                clickGain: 1,
                isActive: false,
                locked: true
            }
        },
        workers: {
            waterFetcher: {
                name: "WaterFetcher",
                label: "Water Fetcher",
                description: function () { return "A simple worker that carries water back to your stockage. A single worker gives you <b>Water Progress</b> at a rate of <b>" + this.resourceGain.waterP.base + " per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    waterP: {
                        base: 0.1
                    }
                },
                resourceCost: {
                    water: {
                        base: 1,
                        rate: 1.25
                    }
                },
                effect: function () { achieve("achThirsty"); },
                locked: true
            },
            lumberjack: {
                name: "Lumberjack",
                label: "Lumberjack",
                description: function () { return "A simple worker that carries wood back to your stockage. A single worker gives you <b>Wood Progress</b> at a rate of <b>" + this.resourceGain.woodP.base + " per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    woodP: {
                        base: 0.2
                    }
                },
                resourceCost: {
                    water: {
                        base: 3,
                        rate: 1.35
                    },
                    wood: {
                        base: 1,
                        rate: 1.35
                    }
                },
                locked: true
            },
            miner: {
                name: "Miner",
                label: "Miner",
                description: function () {
                    var desc = "";
                    if (this.resourceGain.water && this.resourceGain.water.base < 0) {
                        desc = "Poor souls are meant to toil away their life in a dark desolate place. Such a worker gives you <b>Stone Progress</b> at a rate of <b>" + this.resourceGain.stoneP.base + " per second</b>, but will cost you <b>" + Math.abs(this.resourceGain.water.base) + " Water per second</b>.";
                    } else {
                        desc = "Educated workers who attained mastery in extracting stone from the ground. Each worker provides you <b>Stone Progress</b> at a rate of <b>" + this.resourceGain.stoneP.base + " per second</b>.";
                    }
                    if (this.resourceGain.diamondP && this.resourceGain.diamondP.base > 0) desc += " Additionally grants <b>" + this.resourceGain.diamondP.base + " Diamond Progress per second</b>."
                    return desc;
                },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    stoneP: {
                        base: 0.4
                    },
                    water: {
                        base: -0.1
                    }
                },
                resourceCost: {
                    water: {
                        base: 45,
                        rate: 1.35
                    },
                    wood: {
                        base: 20,
                        rate: 1.35
                    }
                },
                effect: function () { if ((game.workers.waterFetcher.top - game.workers.waterFetcher.free) < 1 && (game.workers.lumberjack.top - game.workers.lumberjack.free) < 1) achieve("achCraven"); },
                locked: true
            },
            ironsmith: {
                name: "Ironsmith",
                label: "Ironsmith",
                description: function () { return "Experts in the extraction of <b>Iron</b>, these workers will work tirelessly, providing you a bonus of <b>" + this.resourceGain.ironP.base + " Iron Progress per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    ironP: {
                        base: 5
                    }
                },
                resourceCost: {
                    water: {
                        base: 200,
                        rate: 1.35
                    },
                    iron: {
                        base: 10,
                        rate: 1.25
                    }
                },
                effect: function () { if (this.current >= 25) achieve("achSmithy"); },
                locked: true
            },
            farmer: {
                name: "Farmer",
                label: "Farmer",
                description: function () { return "Farmers are an important workforce you likely couldn't do without. Each Farmer will supply <b>" + this.resourceGain.wheatP.base + " Wheat Progress per second</b>, but cost <b>" + Math.abs(this.resourceGain.water.base) + " Water per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    water: {
                        base: -0.2
                    },
                    wheatP: {
                        base: 0.1
                    }
                },
                resourceCost: {
                    water: {
                        base: 50,
                        rate: 1.25
                    },
                    wheat: {
                        base: 15,
                        rate: 1.25
                    }
                },
                effect: function () { achieve("achHungry"); },
                locked: true
            },
            silversmith: {
                name: "Silversmith",
                label: "Silversmith",
                description: function () { return "Specialized worker who excels in the art of getting <b>Silver</b> from mines. Each Silversmith will supply <b>" + this.resourceGain.silverP.base + " Silver Progress per second</b>, but cost <b>" + Math.abs(this.resourceGain.stone.base) + " Stone per second</b> and <b>" + Math.abs(this.resourceGain.wheat.base) + " Wheat per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    stone: {
                        base: -0.2
                    },
                    wheat: {
                        base: -0.2
                    },
                    silverP: {
                        base: 1
                    }
                },
                resourceCost: {
                    water: {
                        base: 150,
                        rate: 1.25
                    },
                    iron: {
                        base: 20,
                        rate: 1.25
                    },
                    wheat: {
                        base: 100,
                        rate: 1.25
                    }
                },
                locked: true
            },
            miller: {
                name: "Miller",
                label: "Miller",
                description: function () { return "Somewhat of a jack-of-all-trades, millers are crafty workers providing their own aspecy of the economy. Each Miller provides you with <b>" + this.resourceGain.waterP.base + " Water Progress per second</b> and <b>" + this.resourceGain.wheatP.base + " Wheat Progress per second</b>, but cost <b>" + Math.abs(this.resourceGain.woodP.base) + " Wood Progress per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    waterP: {
                        base: 0.4
                    },
                    woodP: {
                        base: -0.2
                    },
                    wheatP: {
                        base: 0.2
                    }
                },
                resourceCost: {
                    wheat: {
                        base: 40,
                        rate: 1.25
                    }
                },
                locked: true
            },
            forrester: {
                name: "Forrester",
                label: "Forrester",
                description: function () { return "Both a recluse and a nature lover, forresters repopulate forests through their care and patience. Each Forrester provides you with <b>" + this.resourceGain.woodP.base + " Wood Progress per second</b> and <b>" + this.resourceGain.stoneP.base + " Stone Progress per second</b>, but cost <b>" + Math.abs(this.resourceGain.wheatP.base) + " Wheat Progress per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    woodP: {
                        base: 0.2
                    },
                    stoneP: {
                        base: 0.1
                    },
                    wheatP: {
                        base: -0.3
                    }
                },
                resourceCost: {
                    wheat: {
                        base: 40,
                        rate: 1.25
                    }
                },
                locked: true
            },
            farmHand: {
                name: "FarmHand",
                label: "Farm Hand",
                description: function () { return "A less useful and wimpier-looking version of a farmer. Has its uses. Each Farm Hand provides you with <b>" + this.resourceGain.wheatP.base + " Wheat Progress per second</b> at the cost of <b>" + Math.abs(this.resourceGain.waterP.base) + " Water Progress per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    waterP: {
                        base: -0.2
                    },
                    wheatP: {
                        base: 0.1
                    }
                },
                resourceCost: {
                    wheat: {
                        base: 50,
                        rate: 1.25
                    }
                },
                locked: true
            },
            jeweler: {
                name: "Jeweler",
                label: "Jeweler",
                description: function () { return "In more peaceful and prosperous times, the strangest of professions arise. Every Jeweler provides you with <b>" + this.resourceGain.silverP.base + " Silver Progress per second</b> at the cost of <b>" + Math.abs(this.resourceGain.stoneP.base) + " Stone Progress per second</b> and <b>" + Math.abs(this.resourceGain.ironP.base) + " Iron Progress per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    stoneP: {
                        base: -0.2
                    },
                    ironP: {
                        base: -1
                    },
                    silverP: {
                        base: 0.2
                    }
                },
                resourceCost: {
                    wheat: {
                        base: 2500,
                        rate: 1.25
                    }
                },
                locked: true
            },
            monk: {
                name: "monk",
                label: "Monk",
                description: function () { return "As devoted as they are faithful, monks will toil to each gather <b>Stone Progress</b> at a rate of <b>" + this.resourceGain.stoneP.base + " per second</b> as well as provide <b>" + this.resourceGain.water.base + " Water per second</b>."; },
                current: 0,
                free: 0,
                top: 0,
                resourceGain: {
                    water: {
                        base: 0.1
                    },
                    stoneP: {
                        base: 2
                    }
                },
                resourceCost: {
                    wheat: {
                        base: 100,
                        rate: 1.25
                    }
                },
                effect: function () {
                    if (this.current == 25) {
                        upgradeBuildingCost(-0.02);
                        achieve("achMonk");
                    }
                    else if (this.current == 50) {
                        upgradeWorkerCostRate("church", "water", -0.01);
                        upgradeWorkerCostRate("church", "wood", -0.01);
                    }
                },
                locked: true
            }
        },
        buildings: {
            waterMill: {
                name: "WaterMill",
                label: "Water Mill",
                description: function () {
                    if (!this.resourceGain.wood) return "A structure that processes water your way. This will grant you a rate of <b>" + this.resourceGain.water.base + " Water per second</b>.";
                    return "A well-engineered structure that processes water your way. This will grant you a rate of <b>" + this.resourceGain.water.base + " Water per second</b> but costs <b>" + Math.abs(this.resourceGain.wood.base) + " Wood per second</b> to operate.";
                },
                current: 0,
                free: 0,
                resourceGain: {
                    water: {
                        base: 0.3
                    }
                },
                resourceCost: {
                    water: {
                        base: 50,
                        rate: 1.25
                    },
                    wood: {
                        base: 35,
                        rate: 1.35
                    },
                    stone: {
                        base: 5,
                        rate: 1.5
                    }
                },
                locked: true
            },
            sawmill: {
                name: "Sawmill",
                label: "Sawmill",
                description: function () {
                    return "A structure for your workers to labor away in. Each <b>Sawmill</b> will increase production of <b>Wood</b> by <b>"
                        + this.resourceGain.wood.base + " per second</b>, but costs <b>" + Math.abs(this.resourceGain.water.base) + " Water per second</b> to operate it.";
                },
                current: 0,
                free: 0,
                resourceGain: {
                    water: {
                        base: -0.2
                    },
                    wood: {
                        base: 0.3
                    }
                },
                resourceCost: {
                    water: {
                        base: 150,
                        rate: 1.25
                    },
                    wood: {
                        base: 100,
                        rate: 1.25
                    },
                    stone: {
                        base: 20,
                        rate: 1.25
                    }
                },
                locked: true
            },
            stoneQuarry: {
                name: "StoneQuarry",
                label: "Stone Quarry",
                description: function () {
                    return "A site that extracts <b>Stone</b> directly. Each <b>Stone Quarry</b> will increase production of <b>Stone</b> by <b>" + this.resourceGain.stone.base + " per second</b>, but costs <b>"
                        + Math.abs(this.resourceGain.water.base) + " Water per second</b> and <b>" + Math.abs(this.resourceGain.wood.base) + " Wood per second</b> to operate it.";
                },
                current: 0,
                free: 0,
                resourceGain: {
                    water: {
                        base: -0.5
                    },
                    wood: {
                        base: -0.2
                    },
                    stone: {
                        base: 0.3
                    }
                },
                resourceCost: {
                    water: {
                        base: 250,
                        rate: 1.25
                    },
                    wood: {
                        base: 175,
                        rate: 1.25
                    },
                    stone: {
                        base: 40,
                        rate: 1.25
                    }
                },
                effect: function () { if (this.current >= 15) achieve("achForeman"); },
                locked: true
            },
            foundry: {
                name: "Foundry",
                label: "Foundry",
                description: function () {
                    if (this.resourceGain.stone.base < 0)
                        return "A refinery to produce <b>Iron</b> with minimum effort. Each <b>Foundry</b> will increase production of <b>Iron</b> by <b>" + this.resourceGain.iron.base + " per second</b>, but costs <b>" + Math.abs(this.resourceGain.stone.base)
                            + " Stone per second</b>";
                    else
                        return "A refinery to produce <b>Iron</b> with minimum effort. Each <b>Foundry</b> will increase production of <b>Iron</b> by <b>" + this.resourceGain.iron.base + " per second.</b>";
                },
                current: 0,
                free: 0,
                resourceGain: {
                    stone: {
                        base: -0.5
                    },
                    iron: {
                        base: 0.1
                    }
                },
                resourceCost: {
                    wood: {
                        base: 200,
                        rate: 1.25
                    },
                    stone: {
                        base: 80,
                        rate: 1.35
                    }
                },
                effect: function () { achieve("achMetalCaster"); },
                locked: true
            },
            grainMill: {
                name: "GrainMill",
                label: "Grain Mill",
                description: function () {
                    return "As useful as it is necessary for the heavy production of <b>Wheat</b>. Each <b>Grain Mill</b> will increase production of <b>Wheat</b> by <b>" + this.resourceGain.wheat.base + " per second</b>, but costs <b>" + Math.abs(this.resourceGain.wood.base)
                        + " Wood per second</b>.";
                },
                current: 0,
                free: 0,
                resourceGain: {
                    wood: {
                        base: -0.3
                    },
                    wheat: {
                        base: 0.4
                    }
                },
                resourceCost: {
                    wood: {
                        base: 350,
                        rate: 1.25
                    },
                    stone: {
                        base: 200,
                        rate: 1.35
                    },
                    iron: {
                        base: 30,
                        rate: 1.35
                    }
                },
                locked: true
            },
            jewelry: {
                name: "Jewelry",
                label: "Jewelry",
                description: function () {
                    return "Designed with the ambition to produce silver through less effort than manual extraction. Each <b>Jewelry</b> increases production of <b>Silver</b> by <b>" + this.resourceGain.silver.base + " per second</b>, at the cost of <b>" + Math.abs(this.resourceGain.iron.base)
                        + " Iron per second</b>.";
                },
                current: 0,
                free: 0,
                resourceGain: {
                    iron: {
                        base: -1
                    },
                    silver: {
                        base: 0.1
                    }
                },
                resourceCost: {
                    water: {
                        base: 1000,
                        rate: 1.20
                    },
                    wood: {
                        base: 1200,
                        rate: 1.25
                    },
                    stone: {
                        base: 1000,
                        rate: 1.25
                    },
                    iron: {
                        base: 500,
                        rate: 1.25
                    }
                },
                locked: true
            },
            extractor: {
                name: "Extractor",
                label: "Extractor",
                description: function () {
                    return "Seek out diamonds deep into the core of the earth. Each <b>Extractor</b> built increases <b>Diamond</b> production by <b>" + this.resourceGain.diamond.base + " per second</b>, at the cost of <b>" + Math.abs(this.resourceGain.iron.base) + " Iron per second</b> and <b>" + Math.abs(this.resourceGain.silver.base) + " Silver per second</b>.";
                },
                current: 0,
                free: 0,
                resourceGain: {
                    iron: {
                        base: -0.5
                    },
                    silver: {
                        base: -0.5
                    },
                    diamond: {
                        base: 0.1
                    }
                },
                resourceCost: {
                    stone: {
                        base: 8000,
                        rate: 1.25
                    },
                    iron: {
                        base: 2500,
                        rate: 1.25
                    },
                    silver: {
                        base: 500,
                        rate: 1.25
                    }
                },
                locked: true
            },
            church: {
                name: "Church",
                label: "Church",
                description: function () { return "Quintessential civilizational landmark. Will toll the Progress of your <b>Water</b>, <b>Wood</b>, <b>Stone</b> and <b>Wheat</b> at a rate of <b>" + Math.abs(this.resourceGain.waterP.base) + " per second</b> but will provide a gain to the raw resources at a rate of <b>" + this.resourceGain.water.base + " per second</b>."; },
                current: 0,
                free: 0,
                resourceGain: {
                    waterP: {
                        base: -0.3
                    },
                    water: {
                        base: 0.1
                    },
                    woodP: {
                        base: -0.3
                    },
                    wood: {
                        base: 0.1
                    },
                    stoneP: {
                        base: -0.3
                    },
                    stone: {
                        base: 0.1
                    },
                    wheatP: {
                        base: -0.3
                    },
                    wheat: {
                        base: 0.1
                    }
                },
                resourceCost: {
                    water: {
                        base: 500,
                        rate: 1.25
                    },
                    wood: {
                        base: 400,
                        rate: 1.25
                    },
                    stone: {
                        base: 500,
                        rate: 1.15
                    },
                    iron: {
                        base: 75,
                        rate: 1.25
                    }
                },
                locked: true
            }
        },
        trades: {
            trdWater2: {
                name: "trdWater2",
                label: "Wood to Water",
                description: function () { return "Trade <b>1000 Wood</b> in exchange for <b>100 Water</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    wood: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("water"), this.rate, true); },
                locked: true
            },
            trdWater: {
                name: "trdWater",
                label: "Wheat to Water",
                description: function () { return "Trade <b>1000 Wheat</b> in exchange for <b>100 Water</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    wheat: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("water"), this.rate, true); },
                locked: true
            },
            trdWood: {
                name: "trdWood",
                label: "Water to Wood",
                description: function () { return "Trade <b>1000 Water</b> in exchange for <b>100 Wood</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    water: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("wood"), this.rate, true); },
                locked: true
            },
            trdWood2: {
                name: "trdWood2",
                label: "Stone to Wood",
                description: function () { return "Trade <b>1000 Stone</b> in exchange for <b>100 Wood</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    stone: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("wood"), this.rate, true); },
                locked: true
            },
            trdStone2: {
                name: "trdStone2",
                label: "Water to Stone",
                description: function () { return "Trade <b>1000 Water</b> in exchange for <b>100 Stone</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    water: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("stone"), this.rate, true); },
                locked: true
            },
            trdStone: {
                name: "trdStone",
                label: "Wood to Stone",
                description: function () { return "Trade <b>1000 Wood</b> in exchange for <b>100 Stone</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    wood: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("stone"), this.rate, true); },
                locked: true
            },
            trdIron2: {
                name: "trdIron2",
                label: "Wood to Iron",
                description: function () { return "Trade <b>1000 Wood</b> in exchange for <b>100 Iron</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    wood: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("iron"), this.rate, true); },
                locked: true
            },
            trdIron: {
                name: "trdIron",
                label: "Stone to Iron",
                description: function () { return "Trade <b>1000 Stone</b> in exchange for <b>100 Iron</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    stone: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("iron"), this.rate, true); },
                locked: true
            },
            trdSilver: {
                name: "trdSilver",
                label: "Iron to Silver",
                description: function () { return "Trade <b>1000 Iron</b> in exchange for <b>100 Silver</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    iron: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("silver"), this.rate, true); },
                locked: true
            },
            trdWheat: {
                name: "trdWheat",
                label: "Water to Wheat",
                description: function () { return "Trade <b>1000 Water</b> in exchange for <b>100 Wheat</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    water: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("wheat"), this.rate, true); },
                locked: true
            },
            trdDiamond: {
                name: "trdDiamond",
                label: "Silver to Diamond",
                description: function () { return "Trade <b>1000 Silver</b> in exchange for <b>100 Diamond</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    silver: {
                        base: 1000
                    }
                },
                effect: function () { gainResource(getFromText("diamond"), this.rate, true); },
                locked: true
            },
            trdDiamond2: {
                name: "trdDiamond2",
                label: "Gold to Diamond",
                description: function () { return "Trade <b>1000 Gold</b> in exchange for <b>100 Diamond</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {},
                goldCost: 1000,
                effect: function () { gainResource(getFromText("diamond"), this.rate, true); },
                locked: true
            },
            trdGold: {
                name: "trdGold",
                label: "Silver to Gold",
                description: function () { return "Trade <b>1000 Silver</b> in exchange for <b>100 Gold</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    silver: {
                        base: 1000
                    }
                },
                effect: function () { gainGold(this.rate); },
                locked: true
            },
            trdGold2: {
                name: "trdGold2",
                label: "Diamond to Gold",
                description: function () { return "Trade <b>1000 Diamond</b> in exchange for <b>100 Gold</b>."; },
                current: 0,
                rate: 100,
                resourceCost: {
                    diamond: {
                        base: 1000
                    }
                },
                effect: function () { gainGold(this.rate); },
                locked: true
            },
            trdTax: {
                name: "trdTax",
                label: "Tax",
                description: function () {
                    return "Tax your population. Collect <b>" + this.rate + " Gold</b> for each <b>Worker</b> you have. However, doing so will incur an upkeep cost of <b>" + Math.abs(this.maxRate) + " Gold</b> per <b>Building</b>. The collected amount can never go below 0.<br />Currently you have:<br /><b>"
                        + getAmountWorkers() + " Workers giving " + (getAmountWorkers() * this.rate) + " Gold<br />" + getAmountBuildings() + " Buildings costing " + Math.abs(getAmountBuildings() * this.maxRate) + " Gold<br />" + (game.player.taxPassiveGold > 0 ? "Taxman skill giving " + game.player.taxPassiveGold + " Gold<br />" : "")
                        + "Tax Ceiling: " + game.player.maxTax + " Gold<br />Tax Total: " + tax(this.rate, this.maxRate, false) + " Gold";
                },
                rate: 1,
                maxRate: -10,
                current: 0,
                resourceCost: {
                    silver: {
                        base: 100
                    }
                },
                effect: function () { tax(this.rate, this.maxRate); },
                locked: true
            },
            trdPropertyTax: {
                name: "trdPropertyTax",
                label: "Property Tax",
                description: function () {
                    return "Tax your population via the properties. Collect <b>" + this.rate + " Gold</b> for each <b>Building</b> you have. However, doing so will incur a welfare cost of <b>" + Math.abs(this.maxRate) + " Gold</b> per <b>Worker</b>. The collected amount can never go below 0.<br />Currently you have:<br /><b>"
                        + getAmountBuildings() + " Buildings giving " + (getAmountBuildings() * this.rate) + " Gold<br />" + getAmountWorkers() + " Workers costing " + Math.abs(getAmountWorkers() * this.maxRate) + " Gold<br />" + (game.player.taxPassiveGold > 0 ? "Taxman skill giving " + game.player.taxPassiveGold + " Gold<br />" : "")
                        + "Tax Ceiling: " + game.player.maxTax + " Gold<br />Tax Total: " + tax(this.maxRate, this.rate, false) + " Gold";
                },
                rate: 5,
                maxRate: -2,
                current: 0,
                resourceCost: {
                    silver: {
                        base: 100
                    }
                },
                effect: function () { tax(this.maxRate, this.rate); },
                locked: true
            },
            trdAdvancementPoint: {
                name: "trdAdvancementPoint",
                label: "Advancement Point",
                description: function () {
                    return "Purchase an <b>Advancement Point</b>. Each point costs more <b>Gold</b> than the last.";
                },
                rate: 1,
                current: 0,
                goldBase: 10,
                goldRate: 10,
                resourceCost: {},
                effect: function () { addAdvancementPoints(this.rate); achieve("achGlitters"); },
                locked: true
            },
            trdAdvancementPoint2: {
                name: "trdAdvancementPoint2",
                label: "Advancement Point",
                fullLabel: "Advancement Point (II)",
                description: function () {
                    return "Purchase an <b>Advancement Point</b>. Each point costs more <b>Gold</b> than the last.";
                },
                rate: 1,
                current: 0,
                goldBase: 100,
                goldRate: 10,
                resourceCost: {},
                effect: function () { addAdvancementPoints(this.rate); achieve("achGlitters"); },
                locked: true
            }
        },
        leaders: {
            ldrGilgamesh: {
                name: "ldrGilgamesh",
                label: "Gilgamesh",
                fullLabel: "Gilgamesh of Sumeria",
                quote: "Only the gods dwell forever in sunlight. As for man, his days are numbered, whatever he may do, it is but wind.",
                description: function () { return "A man with aspirations to great exploits ought prepare himself for the road ahead. <b>Gilgamesh</b> will lend his remarkable strength to you, increasing your <b>Base Clicking Power</b> by <b>20%</b>."; },
                rate: 0.2,
                resourceCost: {
                    water: {
                        current: 5
                    }
                },
                effect: function () { upgradePlayerClickGain(this.rate); },
                personality: "wise",
                favored: ["advFire", "advWheel", "advGunpowder"],
                unfavored: ["advPrintingPress", "advMercantilism", "advMathematics"],
                locked: true,
                bought: false
            },
            ldrNebuchadnezzar: {
                name: "ldrNebuchadnezzar",
                label: "Nebuchadnezzar",
                fullLabel: "Nebuchadnezzar II, King of Babylon",
                quote: "May the house that I have built endure forever, may I be satiated with its splendor, attain old age therein, with abundant offspring, and receive therein tribute of the kings of all regions, from all mankind.",
                description: function () { return "Peace and prosperity shall come to men with the fortitude to harvest it from within. <b>Nebuchadnezzar</b>  can advise you in the ways to rule empires, so that your <b>Buildings</b> have their cost reduced by <b>5%</b>. He will also grant you a passive gain of <b>+1 Stone per second</b>."; },
                rate: -0.05,
                resourceCost: {
                    wood: {
                        current: 5
                    }
                },
                effect: function () { upgradeBuildingCost(this.rate); buyPassive(getFromText("psvNebuchadnezzar")); },
                canUnlock: function () { return game.player.colonies >= 3 },
                personality: "wise",
                favored: ["advEngineering", "advFervor", "advValor"],
                unfavored: ["advPiety", "advIronWill", "advBrotherhood"],
                locked: true,
                bought: false
            },
            ldrPythagoras: {
                name: "ldrPythagoras",
                label: "Pythagoras",
                fullLabel: "Pythagoras of Samos",
                quote: "Sobriety is the strength of the soul, for it preserves its reason unclouded by passion.",
                description: function () { return "In exchange for a minor toll, <b>Pythagoras</b> will develop a mathematical theorem for you, which will grant you <b>" + this.rate + " Advancement Point</b>."; },
                rate: 1,
                resourceCost: {
                    water: {
                        current: 15
                    },
                    wood: {
                        current: 1
                    }
                },
                effect: function () {
                    addAdvancementPoints(this.rate);
                    if (game.leaders.ldrPlato.bought) {
                        var adv = game.advancements.advMathematics;
                        buyAdvancement(adv, true);
                    }
                    achieve("achMathematician");
                },
                personality: "wise",
                favored: ["advMathematics", "advLogos", "advIndependence"],
                unfavored: ["advEquestrianism", "advSilverMastery", "advBanking"],
                locked: true,
                bought: false
            },
            ldrLeonidas: {
                name: "ldrLeonidas",
                label: "Leonidas",
                fullLabel: "Leonidas I",
                quote: "Come and take them.",
                description: function () { return "Through strength and great valor, <b>Leonidas</b> will provide a increase your <b>Base Click Power</b> by <b>35%</b>, thusly bolstering your might greatly."; },
                rate: 0.35,
                resourceCost: {
                    water: {
                        current: 80
                    },
                    wood: {
                        current: 30
                    }
                },
                effect: function () { upgradePlayerClickGain(this.rate); achieve("achSparta"); },
                personality: "stern",
                favored: ["advFire", "advSword", "advSpear", "advGunpowder"],
                unfavored: ["advFervor", "advPrintingPress", "advMercantilism"],
                locked: true,
                bought: false
            },
            ldrSocrates: {
                name: "ldrSocrates",
                label: "Socrates",
                quote: "Worthless men live that they may eat and drink, whereas men of worth eat and drink that they may live.",
                description: function () { return "With his insightful teachings, <b>Socrates</b>, once hired, will make the <b>Logos</b> advancement available for purchase regardless of your current age."; },
                resourceCost: {
                    stone: {
                        current: 2
                    }
                },
                effect: function () { unlock("advLogos", "ldrPlato"); },
                personality: "wise",
                favored: ["advLogos", "advTemperance", "advValor"],
                unfavored: ["advBanking", "advNavigation", "advMonasticism"],
                locked: true,
                bought: false
            },
            ldrPlato: {
                name: "ldrPlato",
                label: "Plato",
                quote: "The greatest penalty of evildoing is to grow into the likeness of bad men.",
                description: function () { return "When hired, <b>Plato</b> will push the boundaries of knowledge of your colony. The <b>Mathematics</b> advancement will be made available for purchase regardless of your current age. If you already have <b>Pythagoras</b> hired, he will also automatically acquire it for free."; },
                resourceCost: {
                    stone: {
                        current: 10
                    }
                },
                effect: function () {
                    unlock("advMathematics");
                    if (game.leaders.ldrPythagoras.bought) buyAdvancement(adv, true);
                    achieve("achRepublic");
                },
                personality: "wise",
                favored: ["advMathematics", "advTemperance", "advValor", "advLogos"],
                unfavored: ["advIronWill", "advNavigation", "advMonasticism"],
                locked: true,
                bought: false
            },
            ldrAlexander3: {
                name: "ldrAlexander3",
                label: "Alexander III",
                fullLabel: "Alexander III of Macedon",
                quote: "As for a limit to one’s labors, I, for one, do not recognize any for a high-minded man, except that the labors themselves should lead to noble accomplishments.",
                description: function () { return "Fearless conqueror without equal, <b>Alexander the Great</b> will doubtlessly help expand your empire. The <b>Equestrianism</b> and <b>Iron Will</b> advancements will automatically be acquired for free upon recruiting him."; },
                resourceCost: {
                    iron: {
                        current: 2
                    }
                },
                effect: function () {
                    var adv1 = game.advancements.advEquestrianism;
                    var adv2 = game.advancements.advIronWill;
                    unlock(adv1.name, adv2.name);
                    buyAdvancement(adv1, true);
                    buyAdvancement(adv2, true);
                    achieve("achGreatOne");
                },
                canUnlock: function () { return game.advancements.advTemperance.bought && game.advancements.advFire.bought && game.advancements.advWheel.bought },
                personality: "stern",
                favored: ["advWheel", "advFervor", "advSilverMastery"],
                unfavored: ["advMathematics", "advTemperance", "advPiety"],
                locked: true,
                bought: false
            },
            ldrCicero: {
                name: "ldrCicero",
                label: "Cicero",
                fullLabel: "Marcus Tullius Cicero",
                quote: "Knowledge which is divorced from justice, may be called cunning rather than wisdom.",
                description: function () { return "Should you choose to seek counsel with <b>Cicero</b>, he will offer his services to you, hereby appeasing your population even in stressing times. Your <b>Workers</b> and <b>Upgrades</b> will receive a cost reduction of <b>5%</b>."; },
                rate: -0.05,
                resourceCost: {
                    stone: {
                        current: 120
                    },
                    iron: {
                        current: 25
                    }
                },
                effect: function () { upgradeWorkerCost(this.rate); upgradeUpgradeCost(this.rate); },
                canUnlock: function () { return game.player.colonies >= 5; },
                favored: ["advTemperance", "advPiety", "advBrotherhood"],
                unfavored: ["advPrintingPress", "advNavigation", "advDominion"],
                locked: true,
                bought: false
            },
            ldrCharlemagne: {
                name: "ldrCharlemagne",
                label: "Charlemagne",
                fullLabel: "Charlemagne, Father of Europe",
                quote: "Right action is better than knowledge; but in order to do what is right, we must know what is right.",
                description: function () { return "Once hired, <b>Charlemagne</b> will propose reforms to your educational and clergical systems, by way of making <b>unique upgrades</b> available to you."; },
                resourceCost: {
                    iron: {
                        current: 50
                    }
                },
                effect: function () { unlock("upgEducation", "upgTheology2", "ldrGutenberg"); },
                favored: ["advTheology", "advEngineering", "advEcumenism"],
                unfavored: ["advPrintingPress", "advNavigation", "advDominion"],
                locked: true,
                bought: false
            },
            ldrDante: {
                name: "ldrDante",
                label: "Dante",
                fullLabel: "Dante Alighieri",
                quote: "O human race, born to fly upward, wherefore at a little wind dost thou so fall?",
                description: function () { return "After receiving a minor tribute, <b>Dante</b> will provide the <b>Temperance</b> and <b>Literacy</b> advancements to you at no cost, regardless of your current age."; },
                advCost: 2,
                resourceCost: {},
                effect: function () {
                    var adv1 = game.advancements.advTemperance;
                    var adv2 = game.advancements.advLiteracy;
                    unlock("advancements", adv1.name, adv2.name);
                    buyAdvancement(adv1, true);
                    buyAdvancement(adv2, true);
                },
                canUnlock: function () { return game.player.colonies >= 3; },
                personality: "stern",
                favored: ["advWheel", "advMathematics", "advValor"],
                unfavored: ["advPrintingPress", "advLogos", "advFire"],
                locked: true,
                bought: false
            },
            ldrGutenberg: {
                name: "ldrGutenberg",
                label: "Gutenberg",
                fullLabel: "Johannes Gutenberg",
                quote: "What is truth? Truth is something so noble that if God could turn aside from it, I would keep the truth and turn aside from God.",
                description: function () { return "Brilliant inventor <b>Gutenberg</b> will pave the way to major advancements in typography once hired. His work will allow the <b>Printing Press</b> to unlock additional <b>Advancements</b>."; },
                resourceCost: {
                    iron: {
                        current: 750
                    },
                    silver: {
                        current: 100
                    }
                },
                effect: function () { unlock("advEvangelism", "advArchitecture"); },
                canUnlock: function () { return game.leaders.ldrCharlemagne.bought && game.upgrades.upgRenaissance.bought; },
                personality: "pious",
                favored: ["advEvangelism", "advTheology", "advPrintingPress"],
                unfavored: ["advLogos", "advMercantilism", "advBrotherhood"],
                locked: true,
                bought: false
            },
            ldrMagellan: {
                name: "ldrMagellan",
                label: "Magellan",
                fullLabel: "Ferdinand Magellan",
                quote: "The sea is dangerous and its storms terrible, but these obstacles have never been sufficient reason to remain ashore.",
                description: function () { return "Acquiring the services of <b>Magellan</b> will grant him the opportunity to lend some of his knowledge to you upon departing for the new world. Gain <b>+" + this.rate + " Prestige Point</b> for your next colony."; },
                rate: 1,
                advCost: 3,
                goldCost: 10000,
                resourceCost: {},
                effect: function () { addPrestigePoints(this.rate); },
                favored: ["advNavigation", "advDominion", "advMercantilism"],
                unfavored: ["advEquestrianism", "advTheology", "advSilverMastery"],
                locked: true,
                bought: false
            },
            ldrGalileo: {
                name: "ldrGalileo",
                label: "Galileo",
                fullLabel: "Galileo Galilei",
                quote: "In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual.",
                description: function () { return "Once hired, <b>Galileo</b> will tirelessly work to provide you with <b>+" + this.rate + " Advancement Points</b> for you to spend at your own discretion. Additionally, he will reduce the cost of upgrades by <b>5%</b>."; },
                rate: 4,
                maxRate: -0.05,
                advCost: 2,
                resourceCost: {},
                effect: function () { addAdvancementPoints(this.rate); upgradeUpgradeCost(this.maxRate); },
                personality: "wise",
                favored: ["advTemperance", "advMathematics", "advIndependence"],
                unfavored: ["advTheology", "advEcumenism", "advMonasticism", "advEvangelism"],
                locked: true,
                bought: false
            },
            ldrKepler: {
                name: "ldrKepler",
                label: "Kepler",
                fullLabel: "Johannes Kepler",
                quote: "Nothing can be known completely except quantities or by quantities. And so it happens that the conclusions of mathematics are most certain and indubitable.",
                description: function () { return "Through innovative methods and calculations, <b>Johannes Kepler</b> will make the <b>Valor</b> advancement available for you regardless of your current age. Additionally, he will provide you with <b>" + this.rate + " Advancement Point</b>."; },
                rate: 1,
                resourceCost: {
                    silver: {
                        current: 25
                    }
                },
                effect: function () { addAdvancementPoints(this.rate); unlock("advValor"); },
                favored: ["advMathematics", "advValor", "advIndependence"],
                unfavored: ["advFire", "advGunpowder", "advIronWill"],
                locked: true,
                bought: false
            },
            ldrHancock: {
                name: "ldrHancock",
                label: "John Hancock",
                quote: "People who pay greater respect to a wealthy villain than to an honest, upright man in poverty, almost deserve to be enslaved; they plainly show that wealth, however it may be acquired, is, in their esteem, to be preferred to virtue.",
                description: function () { return "For a small fee, <b>John Hancock</b> will provide you with <b>" + this.rate + " Water Fetchers</b> to put to work at your leisure."; },
                rate: 50,
                goldCost: 1000,
                resourceCost: {},
                effect: function () { buyWorker(getFromText("waterFetcher"), this.rate, true); },
                personality: "stern",
                favored: ["advIndependence", "advBrotherhood", "advGunpowder"],
                unfavored: ["advTemperance", "advDominion", "advPiety", "advBanking"],
                locked: true,
                bought: false
            }
        },
        passives: {
            psvPumpingSystem: {
                name: "psvPumpingSystem",
                label: "Pumping System",
                resourceGain: {
                    water: {
                        base: 10
                    }
                },
                bought: false
            },
            psvNebuchadnezzar: {
                name: "psvNebuchadnezzar",
                label: "Nebuchadnezzar",
                resourceGain: {
                    stone: {
                        base: 1
                    }
                },
                bought: false
            },
            psvEcumenism: {
                name: "psvEcumenism",
                label: "Ecumenism",
                resourceGain: {
                    wheat: {
                        base: 5
                    }
                },
                bought: false
            },
            psvNavigation: {
                name: "psvNavigation",
                label: "Navigation",
                resourceGain: {
                    wood: {
                        base: 5
                    }
                },
                bought: false
            },
            psvIndependence: {
                name: "psvIndependence",
                label: "Independence",
                resourceGain: {
                    silver: {
                        base: 0.5
                    }
                },
                bought: false
            }
        },
        upgrades: {
            upgWater: {
                name: "upgWater",
                label: "Water",
                description: function () { return "You see a river from which you can carry water with your hands. It seems like it will take some work."; },
                type: "free",
                resourceCost: {},
                effect: function () {
                    unlock("water", "resources", "upgWaterFetching", "upgWoodcutting", "settings", "upgLeaders", "ldrNebuchadnezzar");
                    tutorialMessage("gather");
                },
                locked: false,
                bought: false
            },
            upgLeaders: {
                name: "upgLeaders",
                label: "Leaders",
                description: function () { return "You've learned from experience that colonies don't just run themselves. Set out to find the most talented members of your civilization. Allows you to recruit a <b>Leader</b> for every colony you build."; },
                type: "free",
                resourceCost: {},
                effect: function () { unlock("ldrGilgamesh", "ldrPythagoras"); tutorialMessage("leaders"); },
                canUnlock: function () { return game.player.colonies >= 2 },
                locked: true,
                bought: false
            },
            upgWaterFetching: {
                name: "upgWaterFetching",
                label: "Water Fetching",
                description: function () { return "Carrying water by yourself has become tiresome. Making others do it for you will help."; },
                resourceCost: {
                    water: {
                        base: 1
                    }
                },
                effect: function () {
                    unlock("waterFetcher");
                    tutorialMessage("workers");
                },
                locked: true,
                bought: false
            },
            upgWoodcutting: {
                name: "upgWoodcutting",
                label: "Woodcutting",
                description: function () { return "Discover the method of cutting trees down to keep natural resources for yourself. This might lead to a better future."; },
                resourceCost: {
                    water: {
                        base: 2
                    }
                },
                effect: function () { unlock("wood", "lumberjack"); tutorialMessage("resources"); },
                locked: true,
                bought: false
            },
            upgBucket: {
                name: "upgBucket",
                label: "Bucket",
                description: function () {
                    if (this.level == 1) return "Your lumberjack suggests making a bucket for you to carry more water. Everytime you complete the <b>Water Progress</b> bar, instead of <b>" + this.current + "</b> Water, you will gain <b>" + prettify(this.current + this.rate, 2) + "</b>";
                    else return "Wow that bucket is useful! You should make a better one. Instead of <b>" + this.current + "</b> Water, every time you complete the <b>Water Progress</b> bar you will now carry <b>" + prettify(this.current + this.rate, 2) + "</b> Water.";
                },
                current: 1,
                rate: 0.25,
                level: 1,
                maxLevel: 4,
                resourceCost: {
                    wood: {
                        base: 2,
                        rate: 1.25
                    }
                },
                effect: function () {
                    this.current = prettify(this.current + this.rate, 2);
                    upgradeParentGain("waterP", this.rate);
                },
                locked: true,
                bought: false
            },
            upgBarrels: {
                name: "upgBarrels",
                label: "Barrels",
                description: function () { return "Putting your woodworking skills to the task would allow you to build a container for all that water you're accumulating. Your maximum <b>Water</b> capacity increases by <b>+" + this.rate + "</b> with every level of this upgrade." },
                rate: 10,
                level: 1,
                maxLevel: 4,
                resourceCost: {
                    water: {
                        base: 10,
                        rate: 1.45
                    },
                    wood: {
                        base: 5,
                        rate: 1.10
                    }
                },
                effect: function () { upgradeMaxValue("water", this.rate); unlock("upgStoneAge", "upgWaterTap"); },
                locked: true,
                bought: false
            },
            upgWaterTap: {
                name: "upgWaterTap",
                label: "Water Tap",
                description: function () { return "Unlock your untapped potential. You can now gain <b>+" + this.current + "</b> more <b>Water Progress</b> per click!"; },
                current: 1,
                resourceCost: {
                    water: {
                        base: 20
                    }
                },
                effect: function () { upgradeClickGain("waterP", this.current); unlock("upgWoodTap", "upgWaterTap2"); },
                locked: true,
                bought: false
            },
            upgWaterTap2: {
                name: "upgWaterTap2",
                label: "Water Tap II",
                description: function () { return "They will be talking about you in history books now. You can now gain <b>+" + this.current + "</b> more <b>Water Progress</b> per click!"; },
                current: 3,
                resourceCost: {
                    water: {
                        base: 500
                    }
                },
                effect: function () { upgradeClickGain("waterP", this.current); unlock("upgWaterTap3"); },
                canUnlock: function () { return game.upgrades.upgFeudalAge.bought && game.upgrades.upgWaterTap.bought; },
                locked: true,
                bought: false
            },
            upgWaterTap3: {
                name: "upgWaterTap3",
                label: "Water Tap III",
                description: function () { return "Your potential is finally being achieved. You can now gain <b>+" + this.current + "</b> more <b>Water Progress</b> per click!"; },
                current: 15,
                resourceCost: {
                    water: {
                        base: 2000
                    }
                },
                effect: function () { upgradeClickGain("waterP", this.current); },
                canUnlock: function () { return game.upgrades.upgWaterTap2.bought && game.upgrades.upgDarkAge.bought; },
                locked: true,
                bought: false
            },
            upgWoodTap: {
                name: "upgWoodTap",
                label: "Wood Tap",
                description: function () { return "Further unlocks your untapped potential. You can now gain <b>+" + this.current + "</b> more <b>Wood Progress</b> per click!"; },
                current: 1,
                resourceCost: {
                    wood: {
                        base: 10
                    }
                },
                effect: function () { upgradeClickGain("woodP", this.current); unlock("upgWoodTap2"); },
                locked: true,
                bought: false
            },
            upgWoodTap2: {
                name: "upgWoodTap2",
                label: "Wood Tap II",
                description: function () { return "They will be talking about you in history books now. You can now gain <b>+" + this.current + "</b> more <b>Wood Progress</b> per click!"; },
                current: 4,
                resourceCost: {
                    wood: {
                        base: 325
                    }
                },
                effect: function () { upgradeClickGain("woodP", this.current); },
                canUnlock: function () { return game.upgrades.upgWoodTap.bought && game.upgrades.upgFeudalAge.bought; },
                locked: true,
                bought: false
            },
            upgWoodTap3: {
                name: "upgWoodTap3",
                label: "Wood Tap III",
                description: function () { return "Reach levels of productivity previously thought impossible. You can now gain <b>+" + this.current + "</b> more <b>Wood Progress</b> per click!"; },
                current: 32,
                resourceCost: {
                    wood: {
                        base: 1000
                    }
                },
                effect: function () { upgradeClickGain("woodP", this.current); unlock("upgWoodTap3"); },
                canUnlock: function () { return game.upgrades.upgWoodTap2.bought && game.upgrades.upgSlopeMining.bought; },
                locked: true,
                bought: false
            },
            upgStoneTap: {
                name: "upgStoneTap",
                label: "Stone Tap",
                description: function () { return "Discover new ways to extract Stone by yourself. You can now gain <b>+" + this.current + "</b> more <b>Stone Progress</b> per click!"; },
                current: 3,
                resourceCost: {
                    stone: {
                        base: 35
                    }
                },
                effect: function () { upgradeClickGain("stoneP", this.current); unlock("upgStoneTap2") },
                locked: true,
                bought: false
            },
            upgStoneTap2: {
                name: "upgStoneTap2",
                label: "Stone Tap II",
                description: function () { return "They will be talking about you in history books now. You can now gain <b>+" + this.current + "</b> more <b>Stone Progress</b> per click!"; },
                current: 4,
                resourceCost: {
                    stone: {
                        base: 80
                    }
                },
                effect: function () { upgradeClickGain("stoneP", this.current); unlock("upgStoneTap3"); },
                locked: true,
                bought: false
            },
            upgStoneTap3: {
                name: "upgStoneTap3",
                label: "Stone Tap III",
                description: function () { return "Reach levels of productivity previously thought impossible. You can now gain <b>+" + this.current + "</b> more <b>Stone Progress</b> per click!"; },
                current: 27,
                resourceCost: {
                    stone: {
                        base: 850
                    }
                },
                effect: function () { upgradeClickGain("stoneP", this.current); },
                canUnlock: function () { return game.upgrades.upgStoneTap2.bought && game.upgrades.upgSlopeMining.bought; },
                locked: true,
                bought: false
            },
            upgIronTap: {
                name: "upgIronTap",
                label: "Iron Tap",
                description: function () { return "Breakthrough in technology allows you to extract much more Iron. You can now gain <b>+" + this.current + "</b> more <b>Iron Progress</b> per click!"; },
                current: 74,
                resourceCost: {
                    iron: {
                        base: 175
                    }
                },
                effect: function () { upgradeClickGain("ironP", this.current); },
                locked: true,
                bought: false
            },
            upgWheatTap: {
                name: "upgWheatTap",
                label: "Wheat Tap",
                description: function () { return "Find your green thumb. You can now gain <b>+" + this.current + "</b> more <b>Wheat Progress</b> per click!"; },
                current: 2,
                resourceCost: {
                    wheat: {
                        base: 1500
                    }
                },
                effect: function () { upgradeClickGain("wheatP", this.current); unlock("upgWheatTap2"); },
                locked: true,
                bought: false
            },
            upgWheatTap2: {
                name: "upgWheatTap2",
                label: "Wheat Tap II",
                description: function () { return "Become the ultimate harvester. You can now gain <b>+" + this.current + "</b> more <b>Wheat Progress</b> per click!"; },
                current: 7,
                resourceCost: {
                    wheat: {
                        base: 2000
                    }
                },
                effect: function () { upgradeClickGain("wheatP", this.current); },
                locked: true,
                bought: false
            },
            upgSilverTap: {
                name: "upgSilverTap",
                label: "Silver Tap",
                description: function () { return "Breakthrough in technology allows you to extract much more Silver. You can now gain <b>+" + this.current + "</b> more <b>Silver Progress</b> per click!"; },
                current: 99,
                resourceCost: {
                    silver: {
                        base: 300
                    }
                },
                effect: function () { upgradeClickGain("silverP", this.current); },
                locked: true,
                bought: false
            },
            upgShed: {
                name: "upgShed",
                label: "Shed",
                description: function () { return "It's getting harder to store all that wood, you'll need to do something about it. Each shed will increase your maximum capacity for wood by <b>+" + this.rate + "</b>"; },
                rate: 10,
                level: 1,
                maxLevel: 4,
                resourceCost: {
                    water: {
                        base: 30,
                        rate: 1.10
                    },
                    wood: {
                        base: 10,
                        rate: 1.25
                    }
                },
                effect: function () { if (this.level == 1) unlock("upgSharperAxes"); upgradeMaxValue("wood", this.rate); },
                locked: true,
                bought: false
            },
            upgSharperAxes: {
                name: "upgSharperAxes",
                label: "Sharper Axes",
                description: function () { return "Equip your lumberjacks with better axes. This will boost their current gathering rate by <b>+" + this.rate + " Wood Progress</b> per second."; },
                rate: 0.1,
                resourceCost: {
                    wood: {
                        base: 20
                    }
                },
                effect: function () { upgradeWorkerRate("lumberjack", this.rate); },
                locked: true,
                bought: false
            },
            upgMining: {
                name: "upgMining",
                label: "Mining",
                description: function () { return "One of your lumberjacks noticed a cave in the forest. By clearing the area, you will have access to start mining from it. This also grants you <b>+" + this.rate + "</b> storage capabilities for <b>Water</b> and <b>Wood</b>."; },
                rate: 30,
                resourceCost: {
                    water: {
                        base: 40
                    },
                    wood: {
                        base: 25
                    }
                },
                effect: function () {
                    unlock("stone", "miner", "upgStoneBucket", "upgStoneAxe", "upgStonePickaxe", "ldrSocrates");
                    upgradeMaxValue("water", this.rate);
                    upgradeMaxValue("wood", this.rate);
                    tutorialMessage("highprogress");
                    tutorialMessage("workers2");
                },
                locked: true,
                bought: false
            },
            upgWoodCart: {
                name: "upgWoodCart",
                label: "Wood Cart",
                description: function () { return "By using a solid cart, you can carry more wood back to your storage. Each time you complete the <b>Wood Progress</b> bar, instead of <b>" + this.current + " Wood</b>, you will gain " + "<b>" + prettify(this.current + this.rate, 2) + " Wood</b>."; },
                current: 1,
                rate: 0.25,
                level: 1,
                maxLevel: 4,
                resourceCost: {
                    water: {
                        base: 10,
                        rate: 1.75
                    },
                    wood: {
                        base: 20,
                        rate: 1.45
                    }
                },
                effect: function () {
                    this.current = prettify(this.current + this.rate, 2);
                    upgradeParentGain("woodP", this.rate);
                },
                locked: true,
                bought: false
            },
            upgStoneBucket: {
                name: "upgStoneBucket",
                label: "Stone Bucket",
                description: function () { return "A heavier bucket. Increases the amount of <b>Water Progress</b> it takes to gather <b>Water</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Water</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 2,
                rate: 1,
                resourceCost: {
                    wood: {
                        base: 10
                    },
                    stone: {
                        base: 1
                    }
                },
                effect: function () { upgradeMaxValue("waterP", this.maxRate); upgradeParentGain("waterP", this.rate); },
                locked: true,
                bought: false
            },
            upgStoneAxe: {
                name: "upgStoneAxe",
                label: "Stone Axe",
                description: function () { return "A heavier axe. Increases the amount of <b>Wood Progress</b> it takes to gather <b>Wood</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Wood</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 5,
                rate: 1,
                resourceCost: {
                    wood: {
                        base: 25
                    },
                    stone: {
                        base: 1
                    }
                },
                effect: function () { upgradeMaxValue("woodP", this.maxRate); upgradeParentGain("woodP", this.rate); },
                locked: true,
                bought: false
            },
            upgStonePickaxe: {
                name: "upgStonePickaxe",
                label: "Stone Pickaxe",
                description: function () { return "A stone pickaxe. Your technology is increasing at a tremendous rate. Increases the amount of <b>Stone Progress</b> it takes to gather <b>Stone</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Stone</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 10,
                rate: 1,
                resourceCost: {
                    wood: {
                        base: 50
                    },
                    stone: {
                        base: 2
                    }
                },
                effect: function () { upgradeMaxValue("stoneP", this.maxRate); upgradeParentGain("stoneP", this.rate); },
                locked: true,
                bought: false
            },
            upgMasonry: {
                name: "upgMasonry",
                label: "Masonry",
                type: "free",
                description: function () { return "Researching this will allow you to make buildings. It seems like something worth looking into..."; },
                resourceCost: {},
                effect: function () {
                    unlock("waterMill", "upgMasonry2", "upgFeudalAge");
                    tutorialMessage("buildings");
                    if (game.player.colonies >= 8) unlock("upgWaterMill");
                    achieve("achMasonry");
                },
                locked: true,
                bought: false
            },
            upgMasonry2: {
                name: "upgMasonry2",
                label: "Masonry II",
                description: function () { return "Your advanced understanding of building allows you to save on construction costs. By purchasing this upgrade, <b>All Buildings</b> will cost <b>2.5% less</b>."; },
                rate: -0.025,
                resourceCost: {
                    stone: {
                        base: 700
                    },
                    iron: {
                        base: 100
                    }
                },
                effect: function () { upgradeBuildingCost(this.rate); unlock("upgMasonry3"); },
                canUnlock: function () { return game.upgrades.upgMasonry.bought && game.upgrades.upgVassalism.bought; },
                locked: true,
                bought: false
            },
            upgMasonry3: {
                name: "upgMasonry3",
                label: "Masonry III",
                description: function () { return "Your understanding of architecture increases further, allowing you to save on construction costs. By purchasing this upgrade, <b>All Buildings</b> will cost <b>2.5% less</b>."; },
                rate: -0.025,
                resourceCost: {
                    stone: {
                        base: 800
                    },
                    iron: {
                        base: 125
                    }
                },
                effect: function () { upgradeBuildingCost(this.rate); unlock("upgMasonry4"); },
                canUnlock: function () { return game.upgrades.upgMasonry2.bought && game.upgrades.upgDarkAge.bought; },
                locked: true,
                bought: false
            },
            upgMasonry4: {
                name: "upgMasonry4",
                label: "Masonry IV",
                description: function () { return "Advanced architectural studies drastically renew your ability to mitigate construction costs. By purchasing this upgrade, <b>All Buildings</b> will cost <b>2.5% less</b>."; },
                rate: -0.025,
                resourceCost: {
                    iron: {
                        base: 10000
                    },
                    silver: {
                        base: 550
                    },
                    diamond: {
                        base: 75
                    }
                },
                effect: function () { upgradeBuildingCost(this.rate); },
                canUnlock: function () { return game.upgrades.upgMasonry3.bought && game.upgrades.upgDiamondTrade.bought; },
                locked: true,
                bought: false
            },
            upgWaterMill: {
                name: "upgWaterMill",
                label: "Water Mill",
                type: "free",
                description: function () { return "Through sheer habit, you take the time to instill within your workers the necessary knowledge to start building. Instantly gain a <b>Water Mill</b> at not cost."; },
                effect: function () { buyBuilding(getFromText("waterMill"), 1, true); },
                locked: true,
                bought: false
            },
            upgMineCart: {
                name: "upgMineCart",
                label: "Mine Cart",
                description: function () { return "Allows your miners to drag the stone out of the mine at a quicker pace. With this, your miners will gather <b>Stone Progress</b> at an additional rate of <b>+" + this.rate + " per second</b>. Also increases your maximum <b>Stone</b> capacity by <b>+" + this.maxRate + "</b>."; },
                rate: 0.1,
                maxRate: 1,
                level: 1,
                maxLevel: 5,
                resourceCost: {
                    wood: {
                        base: 20,
                        rate: 1.25
                    },
                    stone: {
                        base: 3,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeWorkerRate("miner", this.rate); upgradeMaxValue("stone", this.maxRate); if (this.level >= this.maxLevel) unlock("upgWoodenStorage"); },
                locked: true,
                bought: false
            },
            upgWaterDam: {
                name: "upgWaterDam",
                label: "Water Dam",
                description: function () { return "Start digging a dam to contain <b>Water</b> in. Every level of your dam will give you <b>+" + this.rate + "</b> on your maximum capacity for <b>Water</b>."; },
                rate: 20,
                level: 1,
                maxLevel: 6,
                resourceCost: {
                    water: {
                        base: 75,
                        rate: 1.15
                    },
                    stone: {
                        base: 5,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeMaxValue("water", this.rate); },
                locked: true,
                bought: false
            },
            upgWoodenStorage: {
                name: "upgWoodenStorage",
                label: "Wooden Storage",
                description: function () { return "A small enclosure for the sole purpose of storing resources. This will increase your maximum capacity for <b>Wood</b> by <b>+" + this.woodMax + "</b> and for <b>Stone</b> by <b>+" + this.stoneMax + "</b>."; },
                woodMax: 20,
                stoneMax: 15,
                resourceCost: {
                    water: {
                        base: 125
                    },
                    wood: {
                        base: 50
                    },
                    stone: {
                        base: 10
                    }
                },
                effect: function () { upgradeMaxValue("wood", this.woodMax); upgradeMaxValue("stone", this.stoneMax); unlock("upgWoodenBasin"); unlock("upgFeudalAge"); },
                locked: true,
                bought: false
            },
            upgWoodenBasin: {
                name: "upgWoodenBasin",
                label: "Wooden Basin",
                description: function () { return "With some experimentation, you manage to craft what looks like bigger versions of water buckets. Your <b>Water Fetchers</b> will gather by <b>+" + this.rate + " per second</b>."; },
                rate: 0.1,
                resourceCost: {
                    wood: {
                        base: 100
                    }
                },
                effect: function () { upgradeWorkerRate("waterFetcher", this.rate); },
                locked: true,
                bought: false
            },
            upgIronBucket: {
                name: "upgIronBucket",
                label: "Iron Bucket",
                description: function () { return "An even heavier bucket. Increases the amount of <b>Water Progress</b> it takes to gather <b>Water</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Water</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 13,
                rate: 4,
                resourceCost: {
                    water: {
                        base: 550
                    },
                    stone: {
                        base: 50
                    },
                    iron: {
                        base: 5
                    }
                },
                effect: function () { upgradeMaxValue("waterP", this.maxRate); upgradeParentGain("waterP", this.rate); },
                locked: true,
                bought: false
            },
            upgIronAxe: {
                name: "upgIronAxe",
                label: "Iron Axe",
                description: function () { return "An even heavier axe. Increases the amount of <b>Wood Progress</b> it takes to gather <b>Wood</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Wood</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 20,
                rate: 3,
                resourceCost: {
                    wood: {
                        base: 400
                    },
                    stone: {
                        base: 60
                    },
                    iron: {
                        base: 8
                    }
                },
                effect: function () { upgradeMaxValue("woodP", this.maxRate); upgradeParentGain("woodP", this.rate); },
                locked: true,
                bought: false
            },
            upgIronPickaxe: {
                name: "upgIronPickaxe",
                label: "Iron Pickaxe",
                description: function () { return "An even heavier pickaxe. Increases the amount of <b>Stone Progress</b> it takes to gather <b>Stone</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Stone</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 80,
                rate: 4,
                resourceCost: {
                    stone: {
                        base: 130
                    },
                    iron: {
                        base: 15
                    }
                },
                effect: function () { upgradeMaxValue("stoneP", this.maxRate); upgradeParentGain("stoneP", this.rate); },
                locked: true,
                bought: false
            },
            upgIronSickle: {
                name: "upgIronSickle",
                label: "Iron Sickle",
                description: function () { return "A heavy sickle to greatly improve your farming. Increases the amount of <b>Wheat</b> you get by <b>+" + this.rate + "</b> every time you the <b>Wheat Progress</b> bar is completed."; },
                level: 1,
                maxLevel: 8,
                rate: 0.5,
                resourceCost: {
                    wood: {
                        base: 500,
                        rate: 1.15
                    },
                    iron: {
                        base: 15,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeParentGain("wheatP", this.rate); },
                locked: true,
                bought: false
            },
            upgCasingWater: {
                name: "upgCasingWater",
                label: "Casing (Water)",
                description: function () { return "Advances in storage technologies allows you to increase your storage of <b>Water</b> by <b>+" + this.rate + "</b> per level."; },
                rate: 260,
                level: 1,
                maxLevel: 5,
                resourceCost: {
                    water: {
                        base: 650,
                        rate: 1.25
                    },
                    iron: {
                        base: 2,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeMaxValue("water", this.rate); },
                locked: true,
                bought: false
            },
            upgCasingWood: {
                name: "upgCasingWood",
                label: "Casing (Wood)",
                description: function () { return "Advances in storage technologies allows you to increase your storage of <b>Wood</b> by <b>+" + this.rate + "</b> per level."; },
                rate: 190,
                level: 1,
                maxLevel: 5,
                resourceCost: {
                    wood: {
                        base: 400,
                        rate: 1.25
                    },
                    iron: {
                        base: 2,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeMaxValue("wood", this.rate); },
                locked: true,
                bought: false
            },
            upgCasingStone: {
                name: "upgCasingStone",
                label: "Casing (Stone)",
                description: function () { return "Advances in storage technologies allows you to increase your storage of <b>Stone</b> by <b>+" + this.rate + "</b> per level."; },
                rate: 95,
                level: 1,
                maxLevel: 5,
                resourceCost: {
                    stone: {
                        base: 120,
                        rate: 1.25
                    },
                    iron: {
                        base: 2,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeMaxValue("stone", this.rate); },
                locked: true,
                bought: false
            },
            upgCasingIron: {
                name: "upgCasingIron",
                label: "Casing (Iron)",
                description: function () { return "Advances in storage technologies allows you to increase your storage of <b>Iron</b> by <b>+" + this.rate + "</b> per level."; },
                rate: 5,
                level: 1,
                maxLevel: 5,
                resourceCost: {
                    iron: {
                        base: 3,
                        rate: 1.55
                    }
                },
                effect: function () { upgradeMaxValue("iron", this.rate); },
                locked: true,
                bought: false
            },
            upgDeepDigging: {
                name: "upgDeepDigging",
                label: "Deep Digging",
                description: function () { return "Your newer tools allow you to dig deeper into the earth to extract more water. Grants each <b>Water Fetcher</b> an additional rate of <b>+" + this.rate + " Water Progress per second</b> and each <b>Water Mill</b> by <b>+" + this.rate + " Water per second</b>."; },
                level: 1,
                maxLevel: 3,
                rate: 0.1,
                resourceCost: {
                    iron: {
                        base: 3,
                        rate: 2
                    }
                },
                effect: function () { upgradeWorkerRate("waterFetcher", this.rate); upgradeWorkerRate("waterMill", this.rate); unlock("upgForestry"); },
                locked: true,
                bought: false
            },
            upgForestry: {
                name: "upgForestry",
                label: "Forestry",
                description: function () { return "You learn to care for the forest to get more from its resources in the long run. Grants each <b>Lumberjack</b> an additional rate of <b>+" + this.rate + " Wood Progress per second</b> and each <b>Sawmill</b> by <b>+" + this.rate + " Wood per second</b>."; },
                level: 1,
                maxLevel: 3,
                rate: 0.1,
                resourceCost: {
                    stone: {
                        base: 50,
                        rate: 1.25
                    },
                    iron: {
                        base: 5,
                        rate: 2
                    }
                },
                effect: function () { upgradeWorkerRate("lumberjack", this.rate); upgradeWorkerRate("sawmill", this.rate); unlock("upgStonework"); },
                locked: true,
                bought: false
            },
            upgStonework: {
                name: "upgStonework",
                label: "Stonework",
                description: function () { return "Expertly curating and milling stones allows you to keep more of them. Grants each <b>Miner</b> an additional rate of <b>+" + this.rate + " Stone Progress per second</b> and each <b>Stone Quarry</b> by <b>+" + this.rate + " Stone per second</b>."; },
                level: 1,
                maxLevel: 3,
                rate: 0.1,
                resourceCost: {
                    stone: {
                        base: 100,
                        rate: 1.25
                    },
                    iron: {
                        base: 7,
                        rate: 2
                    }
                },
                effect: function () { upgradeWorkerRate("miner", this.rate); upgradeWorkerRate("stoneQuarry", this.rate); unlock("upgStonework2"); },
                locked: true,
                bought: false
            },
            upgStonework2: {
                name: "upgStonework2",
                label: "Stonework II",
                description: function () { return "Expertly curating and milling stones allows you to keep even more of them than you previously thought possible. Grants each <b>Miner</b> an additional rate of <b>+" + this.rate + " Stone Progress per second</b>."; },
                level: 1,
                maxLevel: 3,
                rate: 0.1,
                resourceCost: {
                    stone: {
                        base: 250,
                        rate: 1.25
                    },
                    iron: {
                        base: 25,
                        rate: 2
                    }
                },
                effect: function () { upgradeWorkerRate("miner", this.rate); upgradeWorkerRate("stoneQuarry", this.rate); },
                canUnlock: function () { return game.upgrades.upgStonework.bought && game.upgrades.upgDarkAge.bought; },
                locked: true,
                bought: false
            },
            upgMonarchy: {
                name: "upgMonarchy",
                label: "Monarchy",
                description: function () { return "Establish law and order through your wise kingship. Enables you to hire <b>Ironsmiths</b>, as well as collect dues from Farmers through <b>Agriculture</b>. Your <b>Miners</b> will produce an additional <b>" + this.rate + " Stone Progress per second</b>."; },
                rate: 0.5,
                resourceCost: {
                    water: {
                        base: 1200
                    },
                    wood: {
                        base: 700
                    },
                    stone: {
                        base: 400
                    },
                    iron: {
                        base: 25
                    }
                },
                effect: function () {
                    unlock("upgAgriculture", "ironsmith", "upgFoundations", "upgTenacity", "ldrCharlemagne");
                    upgradeWorkerRate("miner", this.rate);
                },
                locked: true,
                bought: false
            },
            upgVassalism: {
                name: "upgVassalism",
                label: "Vassalism",
                description: function () { return "Delegate your resource management to trusty vassals. As a result of their loyalty, your economy grows at an accelerated pace, allowing you to buy workers for cheaper. Reduces the cost of <b>All Workers</b> by <b>5%</b>."; },
                rate: -0.05,
                resourceCost: {
                    stone: {
                        base: 500
                    },
                    iron: {
                        base: 50
                    }
                },
                effect: function () { upgradeWorkerCost(this.rate); unlock("upgMasonry2"); },
                locked: true,
                bought: false
            },
            upgTheology2: {
                name: "upgTheology2",
                label: "Theology II",
                description: function () { return "Expand the scope of the churches within your civilization. Greatly increases the effectiveness of the clergy by increasing the production of each <b>Church</b> by <b>+" + this.rate + " Resources per second</b>, at the cost of an additional <b>" + Math.abs(this.maxRate) + " Resource Progress per second</b>."; },
                rate: 0.1,
                maxRate: -0.1,
                resourceCost: {
                    stone: {
                        base: 500
                    },
                    iron: {
                        base: 100
                    },
                    wheat: {
                        base: 100
                    }
                },
                effect: function () { upgradeWorkerRate("church", this.rate); downgradeWorkerRate("farmer", this.maxRate); },
                canUnlock: function () { return game.leaders.ldrCharlemagne.bought && game.advancements.advTheology.bought; },
                locked: true,
                bought: false
            },
            upgAgriculture: {
                name: "upgAgriculture",
                label: "Agriculture",
                description: function () { return "The scale and scope of your economy is visibly growing by the day. Allows you to collect <b>Wheat</b> in your keep. This will help you prosper."; },
                type: "free",
                resourceCost: {},
                effect: function () { unlock("wheat", "farmer", "upgIronSickle"); tutorialMessage("workers2"); },
                locked: true,
                bought: false
            },
            upgTenacity: {
                name: "upgTenacity",
                label: "Tenacity",
                description: function () { return "Your cumulated experience through trial and error over the past colonies has given you a keen sense of perseverance. Your <b>Miners</b> gain an increase in production by <b>+" + this.rate + " Stone Progress per second</b> and your <b>Sawmills<b> produce an additional <b>+" + this.maxRate + " Wood per second</b>."; },
                type: "free",
                rate: 1,
                maxRate: 0.1,
                resourceCost: {},
                effect: function () { upgradeWorkerRate("miner", this.rate, "stoneP"); upgradeWorkerRate("sawmill", this.maxRate); },
                canUnlock: function () { return game.player.colonies >= 3; },
                locked: true,
                bought: false
            },
            upgFoundations: {
                name: "upgFoundations",
                label: "Foundations",
                description: function () { return "Entrench your castle with solid foundations. Mostly it just looks nice, but it will also allow you to store:<b><br />+" + this.woodMax + " Maximum Wood<br />+" + this.stoneMax + " Maximum Stone<br />+" + this.ironMax + " Maximum Iron<br /></b>"; },
                woodMax: 350,
                stoneMax: 130,
                ironMax: 60,
                resourceCost: {
                    water: {
                        base: 1500
                    },
                    wood: {
                        base: 1000
                    },
                    stone: {
                        base: 500
                    },
                    iron: {
                        base: 35
                    }
                },
                effect: function () { upgradeMaxValue("wood", this.woodMax); upgradeMaxValue("stone", this.stoneMax); upgradeMaxValue("iron", this.ironMax); },
                locked: true,
                bought: false
            },
            upgNourishment: {
                name: "upgNourishment",
                label: "Nourishment",
                description: function () { return "Mitigate the necessity to provide Water to your Farmers. This upgrade will reduce the <b>Water</b> cost of each <b>Farmer</b> by <b>" + Math.abs(this.rate) + " Water per second</b>."; },
                rate: -0.1,
                resourceCost: {
                    water: {
                        base: 1800
                    },
                    stone: {
                        base: 550
                    },
                    wheat: {
                        base: 50
                    }
                },
                effect: function () { upgradeWorkerRate("farmer", this.rate); unlock("upgNourishment2"); },
                locked: true,
                bought: false
            },
            upgNourishment2: {
                name: "upgNourishment2",
                label: "Nourishment II",
                description: function () { return "Further mitigate the necessity to provide Water to your Farmers. This upgrade will reduce the <b>Water</b> cost of each <b>Farmer</b> by <b>" + Math.abs(this.rate) + " Water per second</b>."; },
                rate: -0.1,
                resourceCost: {
                    water: {
                        base: 2000
                    },
                    stone: {
                        base: 500
                    },
                    wheat: {
                        base: 500
                    }
                },
                effect: function () { upgradeWorkerRate("farmer", this.rate); },
                canUnlock: function () { return game.player.colonies >= 3 && game.upgrades.upgNourishment.bought && game.upgrades.upgIrrigation.bought; },
                locked: true,
                bought: false
            },
            upgIrrigation: {
                name: "upgIrrigation",
                label: "Irrigation",
                description: function () { return "The process of digging channels to help water flow through your fields turns your labor into more plentiful crops. Increases the production rate of <b>Farmer</b> by <b>+" + this.rate + " Wheat per second</b>. However, it will increase their cost by <b>" + Math.abs(this.waterMax) + " Water per second</b>. Will also add <b>+" + this.wheatMax + "</b> to your Wheat maximum storage capacity."; },
                rate: 0.4,
                waterMax: -0.2,
                wheatMax: 1000,
                resourceCost: {
                    water: {
                        base: 1500
                    },
                    wood: {
                        base: 800
                    },
                    wheat: {
                        base: 75
                    }
                },
                effect: function () { upgradeMaxValue("wheat", this.wheatMax); downgradeWorkerRate("farmer", this.waterMax); upgradeWorkerRate("farmer", this.rate); unlock("upgNourishment2"); },
                locked: true,
                bought: false
            },
            upgEducation: {
                name: "upgEducation",
                label: "Education",
                description: function () { return "Dispense the necessary formal knowledge for your population to work effectively. With this upgrade, each <b>Farmer</b> gains an increase in production of <b>+" + this.rate + " Wheat Progress per second</b>."; },
                rate: 0.1,
                level: 1,
                maxLevel: 3,
                resourceCost: {
                    wood: {
                        base: 750,
                        rate: 1.25
                    },
                    iron: {
                        base: 50,
                        rate: 1.25
                    },
                    wheat: {
                        base: 100,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeWorkerRate("farmer", this.rate); },
                canUnlock: function () { return game.leaders.ldrCharlemagne.bought && game.upgrades.upgAgriculture.bought; },
                locked: true,
                bought: false
            },
            upgApprenticeship: {
                name: "upgApprenticeship",
                label: "Apprenticeship",
                description: function () { return "Through refining the arts of the trade, your more experienced workers can watch over apprentices for various benefits. Provides you with <b>More Worker Types</b> to purchase. Will also increase your maximum capacity for <b>Iron</b> by <b>" + this.ironMax + "</b>."; },
                ironMax: 50,
                resourceCost: {
                    stone: {
                        base: 500
                    },
                    iron: {
                        base: 80
                    },
                    wheat: {
                        base: 500
                    }
                },
                effect: function () { unlock("miller", "forrester", "upgDarkAge"); upgradeMaxValue("iron", this.ironMax); },
                locked: true,
                bought: false
            },
            upgCommerce: {
                name: "upgCommerce",
                label: "Commerce",
                type: "free",
                description: function () { return "Through the development of commerce, you find out the use of bartering for good, allowing you to perform <b>Trades</b>; even better, you can now collect <b>Gold</b>, which is useful for buying various things. Everything is about to change..."; },
                resourceCost: {},
                effect: function () { unlock("trdWater", "trdWood", "trdStone", "trdIron", "upgSlopeMining"); tutorialMessage("trades"); },
                locked: true,
                bought: false
            },
            upgScarcity: {
                name: "upgScarcity",
                label: "Scarcity",
                description: function () { return "The lack of available resources forces you to improvise. Reduce the cumulative cost increase rate of <b>Water</b> for each <b>Water Fetcher</b> purchased by <b>20%</b>. This makes water fetchers significantly cheaper."; },
                rate: -0.05,
                resourceCost: {
                    wood: {
                        base: 500
                    },
                    iron: {
                        base: 50
                    }
                },
                effect: function () {
                    upgradeWorkerCostRate("waterFetcher", "water", this.rate);
                    unlock("upgScarcity2", "ldrDante");
                },
                locked: true,
                bought: false
            },
            upgScarcity2: {
                name: "upgScarcity2",
                label: "Scarcity II",
                description: function () { return "The lack of available resources forces you to improvise further. Reduce the cumulative cost increase rate of <b>Stone</b> for each <b>Water Mill</b> purchased by <b>10%</b>. This makes water mills significantly cheaper."; },
                rate: -0.05,
                resourceCost: {
                    wood: {
                        base: 750
                    },
                    iron: {
                        base: 60
                    }
                },
                effect: function () { upgradeWorkerCostRate("waterMill", "stone", this.rate); unlock("upgScarcity3"); },
                locked: true,
                bought: false
            },
            upgScarcity3: {
                name: "upgScarcity3",
                label: "Scarcity III",
                description: function () { return "The lack of available resources forces you to improvise ever more. Reduce the cumulative cost increase rate of <b>Water</b> for each <b>Lumberjack</b> purchased by <b>15%</b>. This makes lumberjacks significantly cheaper."; },
                rate: -0.05,
                resourceCost: {
                    wood: {
                        base: 2000
                    },
                    iron: {
                        base: 500
                    }
                },
                effect: function () { upgradeWorkerCostRate("lumberjack", "water", this.rate); },
                canUnlock: function () { return game.upgrades.upgScarcity2.bought && game.upgrades.upgEconomics.bought; },
                locked: true,
                bought: false
            },
            upgMetalwork: {
                name: "upgMetalwork",
                label: "Metalwork",
                description: function () { return "A growing expertise in the art of processing iron allows you to make the process more efficient. Grants each <b>Ironsmith</b> an additional rate of <b>+" + this.rate + " Iron Progress per second</b> and each <b>Foundry</b> by <b>+" + this.ironMax + " Iron per second</b>."; },
                level: 1,
                maxLevel: 2,
                rate: 1,
                ironMax: 0.1,
                resourceCost: {
                    water: {
                        base: 2000,
                        rate: 1.15
                    },
                    stone: {
                        base: 500,
                        rate: 2
                    },
                    iron: {
                        base: 75,
                        rate: 2
                    }
                },
                effect: function () { upgradeWorkerRate("ironsmith", this.rate); upgradeWorkerRate("foundry", this.ironMax); },
                locked: true,
                bought: false
            },
            upgSlopeMining: {
                name: "upgSlopeMining",
                label: "Slope Mining",
                description: function () {
                    if (this.level <= 1) return "This new excavation technique will allow you to reach for <b>Silver</b>, as well as facilitate your existing mining projects. Reduce the total <b>Stone Progress</b> required to gather <b>Stone</b> by " + Math.abs(this.rate) + ".";
                    else return "Further facilitates your existing mining projects. Reduce the total <b>Stone Progress</b> required to gather <b>Stone</b> by " + Math.abs(this.rate) + ".";
                },
                level: 1,
                maxLevel: 5,
                rate: -50,
                resourceCost: {
                    wood: {
                        base: 1000,
                        rate: 1.1
                    },
                    iron: {
                        base: 90,
                        rate: 1.25
                    },
                    wheat: {
                        base: 500,
                        rate: 1.35
                    }
                },
                effect: function () {
                    unlock("silver", "upgSilversmith", "upgSilverBucket", "upgSilverAxe", "upgSilverPickaxe", "upgSilverSickle", "upgWoodTap3", "upgStoneTap3");
                    upgradeMaxValue("stoneP", this.rate);
                    if (this.level == this.maxLevel) unlock("upgIronTap");
                },
                locked: true,
                bought: false
            },
            upgSilversmith: {
                name: "upgSilversmith",
                label: "Silversmith",
                description: function () { return "Allows you to hire <b>Silversmiths</b>, who will build up <b>Silver Progress</b> for you. Time to harness this new resource."; },
                resourceCost: {
                    iron: {
                        base: 300
                    }
                },
                effect: function () { unlock("silversmith", "trdSilver", "upgEconomics"); },
                locked: true,
                bought: false
            },
            upgMotivation: {
                name: "upgMotivation",
                label: "Motivation",
                description: function () { return "Persuade some of your people to work harder for you. Grants each <b>Water Fetcher</b> an additional rate of <b>+" + this.rate + " Water Progress per second</b> and each <b>Miner</b> an additional rate of <b>+" + this.rate + " Stone Progress per second</b>."; },
                level: 1,
                maxLevel: 4,
                rate: 0.1,
                resourceCost: {
                    water: {
                        base: 1000,
                        rate: 1.25
                    },
                    wood: {
                        base: 500,
                        rate: 1.25
                    },
                    wheat: {
                        base: 500,
                        rate: 1.25
                    }
                },
                effect: function () {
                    upgradeWorkerRate("waterFetcher", this.rate, "waterP");
                    upgradeWorkerRate("miner", this.rate, "stoneP");
                    if (game.player.colonies >= 6 && this.level == this.maxLevel) unlock("upgMotivation2");
                },
                locked: true,
                bought: false
            },
            upgMotivation2: {
                name: "upgMotivation2",
                label: "Motivation II",
                description: function () { return "Persuade some more of your people to work harder for you. Grants each <b>Lumberjack</b> an additional rate of <b>+" + this.rate + " Wood Progress per second</b> and each <b>Ironsmith</b> an additional rate of <b>+" + this.rate + " Iron Progress per second</b>."; },
                level: 1,
                maxLevel: 5,
                rate: 0.1,
                resourceCost: {
                    water: {
                        base: 1000,
                        rate: 1.3
                    },
                    wood: {
                        base: 1000,
                        rate: 1.25
                    },
                    wheat: {
                        base: 650,
                        rate: 1.4
                    }
                },
                effect: function () { upgradeWorkerRate("lumberjack", this.rate, "woodP"); upgradeWorkerRate("ironsmith", this.rate, "ironP"); },
                locked: true,
                bought: false
            },
            upgStoneStorage: {
                name: "upgStoneStorage",
                label: "Stone Storage",
                description: function () { return "A large stone enclosure for the sole purpose of storing resources. This will increase your maximum capacity for <b>Water</b> by <b>+" + this.waterMax + "</b>, your <b>Wood</b> by <b>+" + this.woodMax + "</b> and for <b>Stone</b> by <b>+" + this.stoneMax + "</b>."; },
                waterMax: 1750,
                woodMax: 1000,
                stoneMax: 1000,
                resourceCost: {
                    wood: {
                        base: 1500
                    },
                    stone: {
                        base: 1000
                    }
                },
                effect: function () { upgradeMaxValue("water", this.waterMax); upgradeMaxValue("wood", this.woodMax); upgradeMaxValue("stone", this.stoneMax); },
                locked: true,
                bought: false
            },
            upgFarmhouses: {
                name: "upgFarmhouses",
                label: "Farmhouses",
                description: function () { return "Start building farmhouses to help your <b>Farmers</b> rest after a long day at work. This will greatly help with their overall productivity. Increases the production rate of each <b>Farmer</b> by <b>+" + this.rate + " Wheat Progress per second</b>."; },
                rate: 0.1,
                level: 1,
                maxLevel: 5,
                resourceCost: {
                    wood: {
                        base: 100,
                        rate: 1.25
                    },
                    stone: {
                        base: 100,
                        rate: 1.35
                    }
                },
                effect: function () { upgradeWorkerRate("farmer", this.rate); },
                locked: true,
                bought: false
            },
            upgHarvest: {
                name: "upgHarvest",
                label: "Harvest",
                description: function () { return "Organize a large harvest distribution to boost the morale of your workers. Increases the production rate of each <b>Ironsmith</b> by <b>+" + this.rate + " Iron Progress per second</b>."; },
                rate: 0.5,
                level: 1,
                maxLevel: 10,
                resourceCost: {
                    wheat: {
                        base: 1000,
                        rate: 1.15
                    }
                },
                effect: function () { upgradeWorkerRate("ironsmith", this.rate); if (this.level == this.maxLevel) unlock("upgBetterQuarries"); },
                locked: true,
                bought: false
            },
            upgIronBasket: {
                name: "upgIronBasket",
                label: "Iron Basket",
                description: function () { return "Construct small iron baskets to hold resources in. Adds an additional <b>+" + (this.level == this.maxLevel ? 250 : this.rate) + "</b> to the maximum capacity of <b>Wheat</b>."; },
                rate: 150,
                level: 1,
                maxLevel: 11,
                resourceCost: {
                    iron: {
                        base: 100,
                        rate: 1.15
                    }
                },
                effect: function () {
                    upgradeMaxValue("wheat", (this.level == this.maxLevel ? 250 : this.rate));
                    if (this.level == this.maxLevel) unlock("upgRenaissance");
                },
                locked: true,
                bought: false
            },
            upgLanterns: {
                name: "upgLanterns",
                label: "Lanterns",
                description: function () { return "Allow your miners to carry light with them for long expeditions in the dark. This makes them feel better. Reduces the resource upkeep of <b>Stone Quarries</b> by <b>" + Math.abs(this.rate) + " Water per second</b> and <b>" + Math.abs(this.rate) + " Wood per second</b>."; },
                rate: -0.1,
                resourceCost: {
                    water: {
                        base: 500
                    },
                    wheat: {
                        base: 500
                    }
                },
                effect: function () { upgradeWorkerRate("stoneQuarry", this.rate); },
                locked: true,
                bought: false
            },
            upgSilverBucket: {
                name: "upgSilverBucket",
                label: "Silver Bucket",
                description: function () { return "A shiny bucket. Increases the amount of <b>Water Progress</b> it takes to gather <b>Water</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Water</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 15,
                rate: 2,
                resourceCost: {
                    wood: {
                        base: 400
                    },
                    silver: {
                        base: 4
                    }
                },
                effect: function () { upgradeMaxValue("waterP", this.maxRate); upgradeParentGain("waterP", this.rate); },
                locked: true,
                bought: false
            },
            upgSilverAxe: {
                name: "upgSilverAxe",
                label: "Silver Axe",
                description: function () { return "A shiny axe. Increases the amount of <b>Wood Progress</b> it takes to gather <b>Wood</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Wood</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 25,
                rate: 1,
                resourceCost: {
                    wood: {
                        base: 500
                    },
                    silver: {
                        base: 5
                    }
                },
                effect: function () { upgradeMaxValue("woodP", this.maxRate); upgradeParentGain("woodP", this.rate); },
                locked: true,
                bought: false
            },
            upgSilverPickaxe: {
                name: "upgSilverPickaxe",
                label: "Silver Pickaxe",
                description: function () { return "A shiny pickaxe. Increases the amount of <b>Stone Progress</b> it takes to gather <b>Stone</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Stone</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 60,
                rate: 2,
                resourceCost: {
                    wood: {
                        base: 600
                    },
                    silver: {
                        base: 6
                    }
                },
                effect: function () { upgradeMaxValue("stoneP", this.maxRate); upgradeParentGain("stoneP", this.rate); unlock("upgSilverPickaxe2"); },
                locked: true,
                bought: false
            },
            upgSilverPickaxe2: {
                name: "upgSilverPickaxe2",
                label: "Silver Pickaxe II",
                description: function () { return "Another shiny pickaxe. Increases the amount of <b>Iron Progress</b> it takes to gather <b>Iron</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Iron</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 200,
                rate: 3,
                resourceCost: {
                    wood: {
                        base: 700
                    },
                    silver: {
                        base: 7
                    }
                },
                effect: function () { upgradeMaxValue("ironP", this.maxRate); upgradeParentGain("ironP", this.rate); unlock("upgSilverPickaxe3"); },
                locked: true,
                bought: false
            },
            upgSilverPickaxe3: {
                name: "upgSilverPickaxe3",
                label: "Silver Pickaxe III",
                description: function () { return "One more shiny pickaxe. Increases the amount of <b>Silver Progress</b> it takes to gather <b>Silver</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Silver</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 500,
                rate: 5,
                resourceCost: {
                    wood: {
                        base: 900
                    },
                    silver: {
                        base: 9
                    }
                },
                effect: function () { upgradeMaxValue("silverP", this.maxRate); upgradeParentGain("silverP", this.rate); },
                locked: true,
                bought: false
            },
            upgSilverSickle: {
                name: "upgSilverSickle",
                label: "Silver Sickle",
                description: function () { return "A shiny sickle. Increases the amount of <b>Wheat Progress</b> it takes to gather <b>Wheat</b> by <b>" + this.maxRate + "</b>, but increases the amount of <b>Wheat</b> you get by <b>" + this.rate + "</b>! Will also allow you to hire <b>Farm Hands</b>."; },
                maxRate: 5,
                rate: 2,
                resourceCost: {
                    wood: {
                        base: 800
                    },
                    silver: {
                        base: 8
                    }
                },
                effect: function () { upgradeMaxValue("wheatP", this.maxRate); upgradeParentGain("wheatP", this.rate); unlock("farmHand"); },
                locked: true,
                bought: false
            },
            upgEconomics: {
                name: "upgEconomics",
                label: "Economics",
                description: function () { return "Gain access to more advanced <b>Trades</b> to help your economy withstand the hardships of the times. Your advisors came up with brilliant strategies to do so."; },
                resourceCost: {
                    silver: {
                        base: 15
                    }
                },
                effect: function () { unlock("trdGold", "trdTax", "trdPropertyTax", "trdAdvancementPoint", "upgGloves", "upgBoots", "upgWaterStock", "upgWoodStock", "upgStoneStock", "upgIronStock", "upgWheatStock", "upgScarcity3"); tutorialMessage("tax"); achieve("achTrader"); },
                locked: true,
                bought: false
            },
            upgBetterQuarries: {
                name: "upgBetterQuarries",
                label: "Better Quarries",
                description: function () { return "Reinforce the foundations of your quarries. Reduces the resource upkeep of <b>Stone Quarries</b> by <b>" + Math.abs(this.rate) + " Water per second."; },
                level: 1,
                maxLevel: 2,
                rate: -0.1,
                resourceCost: {
                    iron: {
                        base: 400,
                        rate: 2
                    }
                },
                effect: function () { upgradeWorkerRate("stoneQuarry", this.rate, "water"); },
                locked: true,
                bought: false
            },
            upgGloves: {
                name: "upgGloves",
                label: "Gloves",
                description: function () { return "Provide Gloves for your workers to ease their burden. Reduces resource upkeep of <b>Millers</b> by <b>" + Math.abs(this.rate) + " Wood Progress per second</b>."; },
                rate: -0.1,
                resourceCost: {
                    water: {
                        base: 1200
                    },
                    stone: {
                        base: 750
                    },
                    silver: {
                        base: 8
                    }
                },
                effect: function () { upgradeWorkerRate("miller", this.rate); },
                locked: true,
                bought: false
            },
            upgBoots: {
                name: "upgBoots",
                label: "Boots",
                description: function () { return "Provide Boots for your workers to ease their burden. Reduces resource upkeep of <b>Forresters</b> by <b>" + Math.abs(this.rate) + " Wheat Progress per second</b>."; },
                rate: -0.1,
                resourceCost: {
                    wood: {
                        base: 800
                    },
                    wheat: {
                        base: 1000
                    },
                    silver: {
                        base: 8
                    }
                },
                effect: function () { upgradeWorkerRate("forrester", this.rate); },
                locked: true,
                bought: false
            },
            upgWaterStock: {
                name: "upgWaterStock",
                label: "Water Stock",
                description: function () { return "Start massively stocking up on resources. Increases the maximum capacity of <b>Water</b> by <b>+" + prettify(this.rate * this.level, 0, true) + "</b>."; },
                level: 1,
                maxLevel: 50,
                rate: 1000,
                resourceCost: {
                    water: {
                        base: 2500,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeMaxValue("water", (this.rate * this.level)); },
                locked: true,
                bought: false
            },
            upgWoodStock: {
                name: "upgWoodStock",
                label: "Wood Stock",
                description: function () { return "Start massively stocking up on resources. Increases the maximum capacity of <b>Wood</b> by <b>+" + prettify(this.rate * this.level, 0, true) + "</b>."; },
                level: 1,
                maxLevel: 50,
                rate: 1000,
                resourceCost: {
                    wood: {
                        base: 1750,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeMaxValue("wood", (this.rate * this.level)); },
                locked: true,
                bought: false
            },
            upgStoneStock: {
                name: "upgStoneStock",
                label: "Stone Stock",
                description: function () { return "Start massively stocking up on resources. Increases the maximum capacity of <b>Stone</b> by <b>+" + prettify(this.rate * this.level, 0, true) + "</b>."; },
                level: 1,
                maxLevel: 50,
                rate: 500,
                resourceCost: {
                    stone: {
                        base: 1000,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeMaxValue("stone", (this.rate * this.level)); },
                locked: true,
                bought: false
            },
            upgIronStock: {
                name: "upgIronStock",
                label: "Iron Stock",
                description: function () { return "Start massively stocking up on resources. Increases the maximum capacity of <b>Iron</b> by <b>+" + prettify(this.rate * this.level, 0, true) + "</b>."; },
                level: 1,
                maxLevel: 50,
                rate: 100,
                resourceCost: {
                    iron: {
                        base: 250,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeMaxValue("iron", (this.rate * this.level)); },
                locked: true,
                bought: false
            },
            upgWheatStock: {
                name: "upgWheatStock",
                label: "Wheat Stock",
                description: function () { return "Start massively stocking up on resources. Increases the maximum capacity of <b>Wheat</b> by <b>+" + prettify(this.rate * this.level, 0, true) + "</b>."; },
                level: 1,
                maxLevel: 50,
                rate: 1000,
                resourceCost: {
                    wheat: {
                        base: 2500,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeMaxValue("wheat", (this.rate * this.level)); },
                locked: true,
                bought: false
            },
            upgPrestigePoint: {
                name: "upgPrestigePoint",
                label: "Prestige Point",
                description: function () { return "You feel invigorated by the prospect of settling into a colony, away from the complexity of your now powerful empire. By researching this upgrade, you gain <b>1 Prestige Point</b> for your next colony."; },
                type: "free",
                resourceCost: {},
                effect: function () { addPrestigePoints(1); },
                locked: true,
                bought: false
            },
            upgAqueducts: {
                name: "upgAqueducts",
                label: "Aqueducts",
                description: function () { return "Invest in recreating technology from the past to perfect your current water systems. Increases the production of each <b>Water Mill</b> by a rate of <b>" + this.rate + " Water per second</b>."; },
                rate: 0.1,
                resourceCost: {
                    stone: {
                        base: 2500
                    },
                    silver: {
                        base: 50
                    }
                },
                effect: function () { upgradeWorkerRate("waterMill", this.rate); },
                locked: true,
                bought: false
            },
            upgFineLumber: {
                name: "upgFineLumber",
                label: "Fine Lumber",
                description: function () { return "Send your <b>Lumberjacks</b> deeper in the forest to reach finer timber that grants additional resources. This increases their production by <b>+" + this.rate + " Wood Progress per second</b> for each level purchased."; },
                rate: 0.3,
                level: 1,
                maxLevel: 7,
                resourceCost: {
                    water: {
                        base: 2500,
                        rate: 1.25
                    },
                    iron: {
                        base: 1000,
                        rate: 1.25
                    },
                    wheat: {
                        base: 3000,
                        rate: 1.15
                    }
                },
                effect: function () { upgradeWorkerRate("lumberjack", this.rate); },
                locked: true,
                bought: false
            },
            upgHeavyMining: {
                name: "upgHeavyMining",
                label: "Heavy Mining",
                description: function () { return "Innovative mining techniques allow your <b>Silversmiths</b> to work at an increased efficiency. Increase their work rate by <b>+" + this.rate + " Silver Progress per second</b> and increase the max capacity of <b>Silver</b> by <b>" + this.maxRate + "</b>."; },
                rate: 0.5,
                maxRate: 100,
                level: 1,
                maxLevel: 8,
                resourceCost: {
                    water: {
                        base: 7000,
                        rate: 1.25
                    },
                    wood: {
                        base: 3000,
                        rate: 1.25
                    },
                    wheat: {
                        base: 10000,
                        rate: 1.15
                    },
                    silver: {
                        base: 120,
                        rate: 1.25
                    }
                },
                effect: function () { upgradeWorkerRate("silversmith", this.rate); upgradeMaxValue("silver", this.maxRate); },
                locked: true,
                bought: false
            },
            upgBetterFoundries: {
                name: "upgBetterFoundries",
                label: "Better Foundries",
                description: function () { return "Have a second look at the design of your foundries to spot any improvements that could be made. Grants each <b>Foundry</b> with an additional gain of <b>+" + this.rate + " Iron per second</b>."; },
                rate: 0.1,
                resourceCost: {
                    stone: {
                        base: 10000
                    },
                    silver: {
                        base: 250
                    }
                },
                effect: function () { upgradeWorkerRate("foundry", this.rate); unlock("upgBetterMills"); },
                locked: true,
                bought: false
            },
            upgBetterMills: {
                name: "upgBetterMills",
                label: "Better Mills",
                description: function () { return "Have a second look at the design of your mills to spot any improvements that could be made. Grants each <b>Water Mill</b> with an additional gain of <b>+" + this.rate + " Water per second</b> and each <b>Grain Mill</b> with an additional gain of <b>+" + this.rate + " Wheat per second</b>."; },
                rate: 0.1,
                resourceCost: {
                    stone: {
                        base: 13000
                    },
                    iron: {
                        base: 5000
                    },
                    silver: {
                        base: 250
                    }
                },
                effect: function () { upgradeWorkerRate("waterMill", this.rate); upgradeWorkerRate("grainMill", this.rate); },
                locked: true,
                bought: false
            },
            upgRestraint: {
                name: "upgRestraint",
                label: "Restraint",
                description: function () { return "Proper management of water usage on farms lowers the amount of wasted water every harvest season. Reduces the upkeep of each <b>Farmer</b> and <b>Farm Hand</b> by a rate of <b>" + Math.abs(this.rate) + " Water per second</b>."; },
                rate: -0.1,
                resourceCost: {
                    water: {
                        base: 15000
                    },
                    wheat: {
                        base: 12500
                    }
                },
                effect: function () { upgradeWorkerRate("farmer", this.rate); unlock("upgRegiment"); },
                locked: true,
                bought: false
            },
            upgTreeCare: {
                name: "upgTreeCare",
                label: "Tree Care",
                description: function () { return "Better care for the forest yields an increased productivity in the long run. Every <b>Forrester</b> gains an increase in productivity of <b>+" + this.rate + " Wood Progress and Stone Progress per second</b>."; },
                level: 1,
                maxLevel: 2,
                rate: 0.1,
                resourceCost: {
                    wood: {
                        base: 10000
                    },
                    stone: {
                        base: 8000
                    }
                },
                effect: function () { upgradeWorkerRate("forrester", this.rate); },
                locked: true,
                bought: false
            },
            upgFarmWork: {
                name: "upgFarmWork",
                label: "Farm Work",
                description: function () { return "Turn your farms into vastly superior investments. Each <b>Farmer</b> gains an increase in productivity of <b>+" + this.maxRate + " Wheat Progress per second</b>." + (this.level >= this.maxLevel ? " Each <b>Farm Hand</b> also gains an increase of <b>+" + this.rate + " Wheat Progress per second</b>." : ""); },
                level: 1,
                maxLevel: 5,
                maxRate: 0.2,
                rate: 0.1,
                resourceCost: {
                    iron: {
                        base: 500
                    },
                    wheat: {
                        base: 9500
                    }
                },
                effect: function () { upgradeWorkerRate("farmer", this.maxRate); if (this.level >= this.maxLevel) upgradeWorkerRate("farmHand", this.rate); },
                locked: true,
                bought: false
            },
            upgJewelers: {
                name: "upgJewelers",
                label: "Jewelers",
                description: function () { return "Allows you to hire <b>Jewelers</b>: these workers will generate a smaller amount of <b>Silver Progress</b> than <b>Silversmiths</b> but at a lesser cost."; },
                resourceCost: {
                    diamond: {
                        base: 10
                    }
                },
                effect: function () { unlock("jeweler", "upgSilverwork"); },
                locked: true,
                bought: false
            },
            upgDiamondTrade: {
                name: "upgDiamondTrade",
                label: "Diamond Trade",
                description: function () { return "Open new trade routes to get value from diamonds. Allows you to trade <b>Gold for Diamond</b>, as well as <b>Diamond for Gold</b>."; },
                resourceCost: {
                    diamond: {
                        base: 25
                    }
                },
                effect: function () { unlock("trdDiamond2", "trdGold2", "upgClarity", "upgMasonry4"); },
                locked: true,
                bought: false
            },
            upgDiamondBucket: {
                name: "upgDiamondBucket",
                label: "Diamond Bucket",
                description: function () { return "The shiniest of all buckets. Increases the amount of <b>Water Progress</b> it takes to gather <b>Water</b> by <b>" + this.maxRate + "</b> and increases the amount of <b>Water</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 60,
                rate: 10,
                resourceCost: {
                    silver: {
                        base: 100
                    },
                    diamond: {
                        base: 35
                    }
                },
                effect: function () { upgradeMaxValue("waterP", this.maxRate); upgradeParentGain("waterP", this.rate); },
                locked: true,
                bought: false
            },
            upgDiamondAxe: {
                name: "upgDiamondAxe",
                label: "Diamond Axe",
                description: function () { return "The shiniest of all axes. Increases the amount of <b>Wood Progress</b> it takes to gather <b>Wood</b> by <b>" + this.maxRate + "</b> and increases the amount of <b>Wood</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 80,
                rate: 8,
                resourceCost: {
                    silver: {
                        base: 150
                    },
                    diamond: {
                        base: 55
                    }
                },
                effect: function () { upgradeMaxValue("woodP", this.maxRate); upgradeParentGain("woodP", this.rate); },
                locked: true,
                bought: false
            },
            upgDiamondPickaxe: {
                name: "upgDiamondPickaxe",
                label: "Diamond Pick.",
                fullLabel: "Diamond Pickaxe",
                description: function () { return "The shiniest of all pickaxes. Increases the amount of <b>Stone Progress</b> it takes to gather <b>Stone</b> by <b>" + this.maxRate + "</b> and increases the amount of <b>Stone</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 100,
                rate: 6,
                resourceCost: {
                    silver: {
                        base: 250
                    },
                    diamond: {
                        base: 80
                    }
                },
                effect: function () { upgradeMaxValue("stoneP", this.maxRate); upgradeParentGain("stoneP", this.rate); unlock("upgDiamondPickaxe2"); },
                locked: true,
                bought: false
            },
            upgDiamondPickaxe2: {
                name: "upgDiamondPickaxe2",
                label: "Diamond Pick. II",
                fullLabel: "Diamond Pickaxe II",
                description: function () { return "The shiniest of all shiny pickaxes. Increases the amount of <b>Iron Progress</b> it takes to gather <b>Iron</b> by <b>" + this.maxRate + "</b> and increases the amount of <b>Iron</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 350,
                rate: 9,
                resourceCost: {
                    silver: {
                        base: 300
                    },
                    diamond: {
                        base: 95
                    }
                },
                effect: function () { upgradeMaxValue("ironP", this.maxRate); upgradeParentGain("ironP", this.rate); unlock("upgDiamondPickaxe3"); },
                locked: true,
                bought: false
            },
            upgDiamondPickaxe3: {
                name: "upgDiamondPickaxe3",
                label: "Diamond Pick. III",
                fullLabel: "Diamond Pickaxe III",
                description: function () { return "The shiniest of all shiniest pickaxes. Increases the amount of <b>Silver Progress</b> it takes to gather <b>Silver</b> by <b>" + this.maxRate + "</b> and increases the amount of <b>Silver</b> you get by <b>" + this.rate + "</b>, as well as the amount of <b>Stone</b> you get by <b>" + this.stoneMax + "</b>!"; },
                maxRate: 1000,
                rate: 10,
                stoneMax: 100,
                resourceCost: {
                    silver: {
                        base: 400
                    },
                    diamond: {
                        base: 105
                    }
                },
                effect: function () { upgradeMaxValue("silverP", this.maxRate); upgradeParentGain("silverP", this.rate, "silver"); upgradeParentGain("silverP", this.stoneMax, "stone"); unlock("upgDiamondPickaxe4"); },
                locked: true,
                bought: false
            },
            upgDiamondPickaxe4: {
                name: "upgDiamondPickaxe4",
                label: "Diamond Pick. IV",
                fullLabel: "Diamond Pickaxe IV",
                description: function () { return "The ultimate shiny pickaxe. Increases the amount of <b>Diamond Progress</b> it takes to gather <b>Diamond</b> by <b>" + this.maxRate + "</b> and increases the amount of <b>Diamond</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 5000,
                rate: 100,
                resourceCost: {
                    silver: {
                        base: 500
                    },
                    diamond: {
                        base: 120
                    }
                },
                effect: function () { upgradeMaxValue("diamondP", this.maxRate); upgradeParentGain("diamondP", this.rate); unlock("upgPrestigePoint2"); },
                locked: true,
                bought: false
            },
            upgDiamondSickle: {
                name: "upgDiamondSickle",
                label: "Diamond Sickle",
                description: function () { return "The shiniest of all sickles. Increases the amount of <b>Wheat Progress</b> it takes to gather <b>Wheat</b> by <b>" + this.maxRate + "</b> and increases the amount of <b>Wheat</b> you get by <b>" + this.rate + "</b>!"; },
                maxRate: 5,
                rate: 4,
                resourceCost: {
                    silver: {
                        base: 200
                    },
                    diamond: {
                        base: 95
                    }
                },
                effect: function () { upgradeMaxValue("wheatP", this.maxRate); upgradeParentGain("wheatP", this.rate); },
                locked: true,
                bought: false
            },
            upgRegiment: {
                name: "upgRegiment",
                label: "Regiment",
                description: function () { return "Exercise greater control over resource gathering. Reduces the amount of <b>Iron Progress</b> required to gather <b>Iron</b> by <b>" + Math.abs(this.rate) + "</b> and the amount of <b>Silver Progress</b> required to gather <b>Silver</b> by <b>" + Math.abs(this.maxRate) + "</b>."; },
                maxRate: -100,
                rate: -30,
                level: 1,
                maxLevel: 5,
                resourceCost: {
                    wheat: {
                        base: 20000,
                        rate: 1.25
                    },
                    diamond: {
                        base: 20,
                        rate: 1.5
                    }
                },
                effect: function () { upgradeMaxValue("ironP", this.rate); upgradeMaxValue("silverP", this.maxRate); },
                locked: true,
                bought: false
            },
            upgSilverwork: {
                name: "upgSilverwork",
                label: "Silverwork",
                description: function () {
                    var desc = "Your increasing knowledge towards and expert handiwork out of silver veins prove useful. Each <b>Silversmith</b> increases their production by <b>" + this.rate + " Silver Progress per second</b>.";
                    if (this.level == this.maxLevel) desc += " Each <b>Jewelry</b> also gains an additional <b>" + this.maxRate + " Silver per second</b>.";
                    return desc;
                },
                rate: 1,
                maxRate: 0.1,
                level: 1,
                maxLevel: 5,
                resourceCost: {
                    wood: {
                        base: 12000,
                        rate: 1.25
                    },
                    stone: {
                        base: 15000,
                        rate: 1.25
                    },
                    iron: {
                        base: 6000,
                        rate: 1.25
                    },
                    diamond: {
                        base: 15,
                        rate: 1.25
                    }
                },
                effect: function () {
                    upgradeWorkerRate("silversmith", this.rate);
                    if (this.level == this.maxLevel) {
                        upgradeWorkerRate("jewelry", this.maxRate);
                        if (game.upgrades.upgDiamondStorage2.level > 1) unlock("upgRevolutionAge");
                    }
                },
                locked: true,
                bought: false
            },
            upgClarity: {
                name: "upgClarity",
                label: "Clarity",
                description: function () { return "Your wisdom grows with each passing moment. Increases your resources gathered when completing a <b>Progress Bar</b> by <b>5%</b>. Also allows you to start building <b>Extractors</b> to pull <b>Diamonds</b> from the earth."; },
                rate: 0.05,
                resourceCost: {
                    water: {
                        base: 50000
                    },
                    diamond: {
                        base: 500
                    }
                },
                effect: function () { upgradePlayerParentGain(this.rate); unlock("extractor", "upgMining2", "upgDiamondStorage"); },
                locked: true,
                bought: false
            },
            upgMining2: {
                name: "upgMining2",
                label: "Mining II",
                description: function () { return "Your mining technology now allows your <b>Miners</b> to gather <b>Diamond</b>! Each miner will start digging for <b>" + this.rate + " Diamond Progress per second</b>."; },
                rate: 1.5,
                resourceCost: {
                    wood: {
                        base: 50000
                    },
                    silver: {
                        base: 800
                    },
                    diamond: {
                        base: 250
                    }
                },
                effect: function () { addWorkerRate("miner", "diamondP", this.rate); },
                locked: true,
                bought: false
            },
            upgDiamondStorage: {
                name: "upgDiamondStorage",
                label: "Diamond Storage",
                description: function () { return "The peak of storage technology. Upgrades the maximum capacity of <b>Silver</b> by <b>+" + this.maxRate + "</b> and <b>Diamond</b> by <b>+" + this.rate + "</b>."; },
                rate: 250,
                maxRate: 1500,
                level: 1,
                maxLevel: 6,
                resourceCost: {
                    diamond: {
                        base: 125,
                        rate: 1.25
                    }
                },
                effect: function () {
                    upgradeMaxValue("silver", this.maxRate);
                    upgradeMaxValue("diamond", this.rate);
                    unlock("upgBetterTaxes");
                    if (this.level >= this.maxLevel) unlock("upgDiamondStorage2");
                },
                locked: true,
                bought: false
            },
            upgDiamondStorage2: {
                name: "upgDiamondStorage2",
                label: "Diamond Stor. II",
                fullLabel: "Diamond Storage II",
                description: function () { return "Extend the peak of storage technology to other resources. Upgrades the maximum capacity of <b>Water</b> by <b>+" + prettify(this.waterMax, 0, true) + "</b>, <b>Wood</b> by <b>+" + prettify(this.woodMax, 0, true) + "</b> and <b>Wheat</b> by <b>+" + prettify(this.wheatMax, 0, true) + "</b>."; },
                waterMax: 50000,
                woodMax: 10000,
                wheatMax: 25000,
                level: 1,
                maxLevel: 4,
                resourceCost: {
                    silver: {
                        base: 1000,
                        rate: 1.3
                    },
                    diamond: {
                        base: 250,
                        rate: 1.5
                    }
                },
                effect: function () {
                    upgradeMaxValue("water", this.waterMax);
                    upgradeMaxValue("wood", this.woodMax);
                    upgradeMaxValue("wheat", this.wheatMax);
                    if (game.upgrades.upgSilverwork.bought) unlock("upgRevolutionAge");
                },
                locked: true,
                bought: false
            },
            upgPrestigePoint2: {
                name: "upgPrestigePoint2",
                label: "Prestige Point",
                description: function () { return "Through cunning trade and craftmanship, you reap the rewards of your past hard work. This upgrade grants you <b>1 Prestige Point</b> for your next colony."; },
                resourceCost: {
                    diamond: {
                        base: 1500
                    }
                },
                goldCostBase: 5000,
                effect: function () { addPrestigePoints(1); },
                locked: true,
                bought: false
            },
            upgBetterTaxes: {
                name: "upgBetterTaxes",
                label: "Better Taxes",
                description: function () { return "Lower the upkeep of your buildings when collecting taxes from your population. Your <b>Tax</b> trade cost per building is reduced by <b>" + this.rate + " Gold</b>."; },
                rate: 1,
                level: 1,
                maxLevel: 2,
                resourceCost: {
                    iron: {
                        base: 10000,
                        rate: 1.5
                    },
                    silver: {
                        base: 2000,
                        rate: 1.5
                    }
                },
                effect: function () { upgradeTradeRate("trdTax", this.rate, true); },
                locked: true,
                bought: false
            },
            upgStoneAge: {
                name: "upgStoneAge",
                label: "Stone Age",
                description: function () {
                    return "Enter the <b>" + this.label + "</b>! Each Age gives you one <b>Age Advancement Point</b> which allows you to research special upgrades. Advancing to a new age also unlocks Major Upgrades and other bonuses that drastically improve your life. The <b>Stone Age</b> will lead to these changes:<b><br />" +
                        "1 Advancement Point<br />New Research: Mining<br />+" + this.rate + " Wood Progress per second for each Lumberjack</b>";
                },
                type: "age",
                rate: 0.1,
                effect: function () {
                    advanceAge(this, 1);
                    upgradeWorkerRate("lumberjack", this.rate);
                    unlock("upgMining", "upgWoodCart", "advancements");
                    tutorialMessage("advancements");
                    tutorialMessage("ages");
                    achieve("achCaveman");
                },
                locked: true,
                bought: false
            },
            upgFeudalAge: {
                name: "upgFeudalAge",
                label: "Feudal Age",
                description: function () {
                    return "Enter the <b>" + this.label + "</b>! Your workers now form a caste of self-ruling organizations which you oversee. This represents a major leap in innovation and will lead to several changes such as:<b>1 Advancement Point<br /><br />New Resource: Iron<br />3 Additional Buildings<br />+"
                        + this.waterRate + " Water Progress per second for each Water Fetcher<br />+" + this.woodRate + " Wood Progress per second for each Lumberjack<br />+" + this.stoneRate + " Stone Progress per second for each Miner<br />+" + this.waterMax + " Water Storage Capacity<br />+" + this.woodMax + " Wood Storage Capacity<br />+" + this.stoneMax + " Stone Storage Capacity</b>";
                },
                type: "age",
                waterRate: 0.5,
                woodRate: 0.4,
                stoneRate: 0.5,
                waterMax: 500,
                woodMax: 350,
                stoneMax: 120,
                resourceCost: {
                    water: {
                        base: 200
                    },
                    wood: {
                        base: 100
                    },
                    stone: {
                        base: 25
                    }
                },
                effect: function () {
                    advanceAge(this, 1);
                    unlock("iron", "sawmill", "stoneQuarry", "foundry", "upgStoneTap", "upgCasingWater", "upgCasingWood", "upgCasingStone", "upgCasingIron", "upgDeepDigging", "upgMonarchy", "upgVassalism", "upgWaterTap2", "upgWoodTap2", "advMonasticism", "ldrCicero");
                    upgradeWorkerRate("waterFetcher", this.waterRate);
                    upgradeWorkerRate("lumberjack", this.woodRate);
                    upgradeWorkerRate("miner", this.stoneRate);
                    upgradeMaxValue("water", this.waterMax);
                    upgradeMaxValue("wood", this.woodMax);
                    upgradeMaxValue("stone", this.stoneMax);
                    tutorialMessage("upgrades");
                    achieve("achLord");
                },
                canUnlock: function () { return game.upgrades.upgMasonry.bought && game.upgrades.upgWoodenStorage.bought; },
                locked: true,
                bought: false
            },
            upgDarkAge: {
                name: "upgDarkAge",
                label: "Dark Age",
                description: function () {
                    return "Enter the <b>" + this.label + "</b>! Your population is struck with disease due to overall lack of hygiene. This causes the first economic crisis which you must go through in order to survive. The effects of advancing to this age are negative but lead to better days. The <b>Dark Age</b> will lead to these changes:<b><br />" +
                        "0 Advancement Point<br />New Building: Grain Mill<br />Major Research: Commerce<br />+" + this.waterMax + "  Maximum Water Progress<br />+" + this.woodMax + " Maximum Wood Progress<br />+" + this.stoneMax + " Maximum Stone Progress<br />+" + this.ironMax + " Maximum Iron Progress<br />+" + this.wheatMax + " Maximum Wheat Progress<br />+" + this.rate + " Maximum Capacity on All Resources</b>";
                },
                type: "age",
                waterMax: 70,
                woodMax: 175,
                stoneMax: 400,
                ironMax: 800,
                wheatMax: 15,
                rate: 250,
                resourceCost: {
                    water: {
                        base: 1900
                    },
                    wood: {
                        base: 1700
                    },
                    stone: {
                        base: 700
                    },
                    iron: {
                        base: 150
                    },
                    wheat: {
                        base: 2750
                    }
                },
                effect: function () {
                    advanceAge(this, 0);
                    unlock("grainMill", "upgWheatTap", "upgCommerce", "upgScarcity", "upgMetalwork", "upgMotivation", "upgStoneStorage", "upgFarmhouses", "upgHarvest", "upgIronBasket", "upgLanterns", "upgWaterTap3", "upgMasonry3", "upgStonework2", "advEcumenism");
                    upgradeMaxValue("waterP", this.waterMax);
                    upgradeMaxValue("woodP", this.woodMax);
                    upgradeMaxValue("stoneP", this.stoneMax);
                    upgradeMaxValue("ironP", this.ironMax);
                    upgradeMaxValue("wheatP", this.wheatMax);
                    upgradeMaxValue("water", this.rate);
                    upgradeMaxValue("wood", this.rate);
                    upgradeMaxValue("stone", this.rate);
                    upgradeMaxValue("iron", this.rate);
                    upgradeMaxValue("wheat", this.rate);
                    tutorialMessage("selling");
                    achieve("achDarkTimes");
                },
                locked: true,
                bought: false
            },
            upgRenaissance: {
                name: "upgRenaissance",
                label: "Renaissance",
                description: function () {
                    return "Enter the <b>Age of " + this.label + "</b>! With the endured hardships, your people develop deeper understanding of the world around them, leading to a revolution in their thinking. The <b>Renaissance</b> will lead to these changes:<b><br />" +
                        "2 Advancement Points<br />Colonies<br />New Resource: Diamond<br />New Building: Jewelry<br />" + this.waterMax + "  Maximum Water Progress<br />" + this.woodMax + " Maximum Wood Progress<br />" + this.stoneMax + " Maximum Stone Progress<br />" + this.ironMax + " Maximum Iron Progress<br />" + this.wheatMax + " Maximum Wheat Progress<br />" + this.silverMax + " Maximum Silver Progress</b>";
                },
                type: "age",
                waterMax: -20,
                woodMax: -100,
                stoneMax: -50,
                ironMax: -400,
                wheatMax: -10,
                silverMax: -500,
                resourceCost: {
                    water: {
                        base: 5000
                    },
                    wood: {
                        base: 3500
                    },
                    stone: {
                        base: 2500
                    },
                    iron: {
                        base: 1000
                    },
                    wheat: {
                        base: 5000
                    },
                    silver: {
                        base: 150
                    }
                },
                effect: function () {
                    advanceAge(this, 2);
                    unlock("reset", "prestige", "diamond", "trdDiamond", "jewelry", "upgSilverTap", "upgPrestigePoint", "upgAqueducts", "upgFineLumber", "upgHeavyMining", "upgBetterFoundries", "upgRestraint", "upgTreeCare", "upgFarmWork", "ldrGutenberg");
                    upgradeMaxValue("waterP", this.waterMax);
                    upgradeMaxValue("woodP", this.woodMax);
                    upgradeMaxValue("stoneP", this.stoneMax);
                    upgradeMaxValue("ironP", this.ironMax);
                    upgradeMaxValue("wheatP", this.wheatMax);
                    upgradeMaxValue("silverP", this.silverMax);
                    tutorialMessage("prestige");
                    finishTutorial();
                    achieve("achScholar");
                },
                locked: true,
                bought: false
            },
            upgRevolutionAge: {
                name: "upgRevolutionAge",
                label: "Age of Revolution",
                description: function () {
                    return "Enter the <b>" + this.label + "</b>! Unrest grows in your population and the people yearn for change. This will come at a cost, but perhaps you can make the endeavour worthwile with some patience. The <b>Age of Revolution</b> will lead to these changes:<b><br />" +
                        "1 Advancement Point<br />Pumping System passive bonus (+10 Water/sec)<br />10% Worker Cost Increase<br />15% Building Cost Increase<br />Increased Silver Cost of Taxes<br />+" + prettify(this.diamondMax, 0, true) + "  Maximum Diamond Progress</b>";
                },
                type: "age",
                colonies: 1,
                diamondMax: 10000,
                taxIncrease: 900,
                workerIncrease: 0.1,
                buildingIncrease: 0.15,
                resourceCost: {
                    water: {
                        base: 250000
                    },
                    wood: {
                        base: 100000
                    },
                    stone: {
                        base: 50000
                    },
                    wheat: {
                        base: 100000
                    },
                    silver: {
                        base: 10000
                    },
                    diamond: {
                        base: 1500
                    }
                },
                effect: function () {
                    advanceAge(this, 1);
                    unlock("trdAdvancementPoint2");
                    achieve("achRebel");
                    buyPassive(getFromText("psvPumpingSystem"));
                    upgradeWorkerCost(this.workerIncrease);
                    upgradeBuildingCost(this.buildingIncrease);
                    upgradeMaxValue("diamondP", this.diamondMax);
                    upgradeTradeCost("trdTax", this.taxIncrease, "silver");
                    upgradeTradeCost("trdPropertyTax", this.taxIncrease, "silver");
                },
                locked: true,
                bought: false
            }
        },
        advancements: {
            advTemperance: {
                name: "advTemperance",
                label: "Temperance",
                parent: "upgStoneAge",
                description: function () {
                    return "Exercising restraint will pay off in the long run. Applies a <b>15%</b> cost reduction on all upgrades. This does not apply to <b>Age Upgrades</b>.";
                },
                advCost: 1,
                rate: -0.15,
                effect: function () { upgradeUpgradeCost(this.rate); unlock("ldrAlexander3"); },
                locked: true,
                bought: false
            },
            advFire: {
                name: "advFire",
                label: "Fire",
                parent: "upgStoneAge",
                description: function () { return "Major civilizational breakthrough that will grant <b>" + prettify(this.clickRate * 100, 2, true) + "% more resource progress</b> when <b>clicking to gather resources</b>. This effect compounds with other clicking-related upgrades."; },
                advCost: 1,
                clickRate: 0.3,
                effect: function () { upgradePlayerClickGain(this.clickRate); unlock("ldrAlexander3"); achieve("achLight"); },
                locked: true,
                bought: false
            },
            advWheel: {
                name: "advWheel",
                label: "Wheel",
                parent: "upgStoneAge",
                description: function () { return "This wonderful invention will allow you to gather <b>7.5%</b> more resources when completing a <b>Progress Bar</b>. This effect compounds with other upgrades."; },
                advCost: 1,
                rate: 0.075,
                effect: function () { upgradePlayerParentGain(this.rate); unlock("ldrAlexander3");; },
                locked: true,
                bought: false
            },
            advSpear: {
                name: "advSpear",
                label: "Spear",
                parent: "upgStoneAge",
                description: function () { return "Through trial and error, you discover a deadly combination of sculpted wood and sharpened stone. Gain <b>" + prettify(this.clickRate * 100, 2, true) + "% more resource progress</b> when <b>clicking to gather resources</b>."; },
                advCost: 1,
                clickRate: 0.15,
                effect: function () { upgradePlayerClickGain(this.clickRate); unlock("advSword", "ldrLeonidas"); },
                locked: true,
                bought: false,
                secret: true
            },
            advSling: {
                name: "advSling",
                label: "Sling",
                parent: "upgStoneAge",
                description: function () { return "Discover a strange device that incentivizes your population in gathering stone. Gain <b>" + prettify(this.clickRate * 100, 2, true) + "% more resource progress</b> when <b>clicking to gather resources</b>. Your miner will also gather <b>+" + this.rate + " Stone Progress per second</b>."; },
                advCost: 1,
                rate: 0.5,
                clickRate: 0.1,
                effect: function () { upgradePlayerClickGain(this.clickRate); upgradeWorkerRate("miner", this.rate); },
                locked: true,
                bought: false,
                secret: true
            },
            advPiety: {
                name: "advPiety",
                label: "Piety",
                parent: "upgFeudalAge",
                description: function () { return "Lead the way for your faithful and be rewarded with their devotion. Gain a <b>8%</b> cost reduction to <b>Workers</b>. This effect stacks with other worker cost reductions."; },
                advCost: 1,
                rate: -0.08,
                effect: function () { upgradeWorkerCost(this.rate); },
                locked: true,
                bought: false
            },
            advEquestrianism: {
                name: "advEquestrianism",
                label: "Equestrianism",
                parent: "upgFeudalAge",
                description: function () { return "Your unparalleled ability to tame nature around you leads to increased benefits. Reduce the amount of <b>Progress</b> required for resources as follows:<b><br />Water: " + this.waterMax + "<br />Wood: " + this.woodMax + "<br />Stone: " + this.stoneMax + "<br />Iron: " + this.ironMax + "</b>"; },
                advCost: 1,
                waterMax: -5,
                woodMax: -10,
                stoneMax: -25,
                ironMax: -100,
                effect: function () {
                    upgradeMaxValue("waterP", this.waterMax);
                    upgradeMaxValue("woodP", this.woodMax);
                    upgradeMaxValue("stoneP", this.stoneMax);
                    upgradeMaxValue("ironP", this.ironMax);
                },
                locked: true,
                bought: false
            },
            advPrintingPress: {
                name: "advPrintingPress",
                label: "Printing Press",
                parent: "upgFeudalAge",
                description: function () { return "This unique invention will not provide immediate benefits to you, but it will pave the way to the future. Unlocks <b>Additional Advancements</b> in the <b>Next Age</b>!"; },
                advCost: 1,
                effect: function () { unlock("advLiteracy", "advEngineering", "advEvangelism", "advArchitecture"); },
                locked: true,
                bought: false
            },
            advMonasticism: {
                name: "advMonasticism",
                label: "Monasticism",
                parent: "upgFeudalAge",
                description: function () {
                    var desc = "Allow your workers to devote themselves to the pursuit of truth in exchange for various good works. Adds a <b>Monk</b> worker which will provide unique bonuses to your civilization the more you hire.";
                    if (!this.bought) return desc;
                    desc += "<br />Your Monks currently provide:<b>";
                    if (game.workers.monk.current < 25) desc += "<br />No Bonus.";
                    else desc += "<br />2% Cost Reduction to Buildings.";
                    if (game.workers.monk.current >= 50) desc += "<br />6% Cumulative Cost Reduction to Churches for Water and Wood.";
                    desc += "</b>";
                    return desc;
                },
                advCost: 1,
                effect: function () { unlock("monk"); },
                canUnlock: function () { return game.player.colonies >= 5 && game.upgrades.upgFeudalAge.bought; },
                locked: true,
                bought: false,
                secret: true
            },
            advSword: {
                name: "advSword",
                label: "Sword",
                parent: "upgFeudalAge",
                description: function () { return "As metalwork becomes common practice among your population, your propensity for advanced weapons grows. Grants <b>" + prettify(this.clickRate * 100, 2, true) + "% more resource progress</b> when <b>clicking to gather resources</b>."; },
                advCost: 1,
                clickRate: 0.2,
                effect: function () { upgradePlayerClickGain(this.clickRate); },
                locked: true,
                bought: false,
                secret: true
            },
            advFervor: {
                name: "advFervor",
                label: "Fervor",
                parent: "upgDarkAge",
                description: function () { return "A steadfast attitude and unwavering resolve can help you brave any storm. Applies a <b>" + prettify(-this.rate * 100, 2) + "%</b> cost reduction to <b>Buildings</b>. This effect stacks with other building cost reductions."; },
                advCost: 1,
                rate: -0.1,
                effect: function () { upgradeBuildingCost(this.rate); },
                locked: true,
                bought: false
            },
            advIronWill: {
                name: "advIronWill",
                label: "Iron Will",
                parent: "upgDarkAge",
                description: function () { return "Demonstrate your willingness to go on. Your <b>Foundries</b> no longer cost any <b>Stone</b> to operate. This does not affect their current production rate."; },
                advCost: 1,
                rate: -0.5,
                effect: function () { upgradeWorkerRate("foundry", this.rate); },
                locked: true,
                bought: false
            },
            advTheology: {
                name: "advTheology",
                label: "Theology",
                parent: "upgDarkAge",
                description: function () { return "Propagate your ideals to your population swiftly by appointing chosen preachers to guide the masses. Adds a <b>Church</b> building which will toll your workers but provide resources in exchange."; },
                advCost: 1,
                effect: function () { unlock("church"); achieve("achTheologian"); },
                locked: true,
                bought: false
            },
            advEcumenism: {
                name: "advEcumenism",
                label: "Ecumenism",
                parent: "upgDarkAge",
                description: function () { return "Unite your population in faith through reformations of your doctrines. Provides a passive, permanent gain of <b>+5 Wheat per second</b>."; },
                advCost: 1,
                effect: function () { buyPassive(getFromText("psvEcumenism")); },
                canUnlock: function () { return game.player.colonies >= 8 && game.upgrades.upgDarkAge.bought; },
                locked: true,
                bought: false,
                secret: true
            },
            advLiteracy: {
                name: "advLiteracy",
                label: "Literacy",
                parent: "upgDarkAge",
                description: function () { return "Increased literacy rates among your workers allows them to develop more advanced techniques. Gain <b>10%</b> more resources when completing a <b>Progress Bar</b>. This effect stacks with the <b>Wheel</b> advancement."; },
                advCost: 1,
                rate: 0.1,
                effect: function () { upgradePlayerParentGain(this.rate); },
                locked: true,
                bought: false,
                secret: true
            },
            advEngineering: {
                name: "advEngineering",
                label: "Engineering",
                parent: "upgDarkAge",
                description: function () { return "After much research, your workers come up with ways to improve your resource generation. Fundamentally redesign your <b>Water Mills</b> to add a cost of <b>" + Math.abs(this.woodMax) + " Wood per second</b> in exchange for a benefit of <b>+" + this.rate + " Water per second</b> each."; },
                advCost: 1,
                rate: 0.3,
                woodMax: -0.1,
                effect: function () { upgradeWorkerRate("waterMill", this.rate); addWorkerRate("waterMill", "wood", this.woodMax); },
                locked: true,
                bought: false,
                secret: true
            },
            advLogos: {
                name: "advLogos",
                label: "Logos",
                parent: "upgRenaissance",
                description: function () { return "Your use of reason grows through practice of the mind. After shedding their earthly needs, your <b>Miners</b> no longer cost any <b>Water</b> to work at their current rate."; },
                advCost: 2,
                rate: -0.1,
                effect: function () { upgradeWorkerRate("miner", this.rate); },
                locked: true,
                bought: false
            },
            advGunpowder: {
                name: "advGunpowder",
                label: "Gunpowder",
                parent: "upgRenaissance",
                description: function () { return "A fine black powder that reacts strongly when ignited. Thanks to this technological wonder, <b>50% more resource progress</b> will be granted when <b>clicking to gather a resource</b>. This effect stacks with the <b>Fire</b> advancement."; },
                advCost: 2,
                rate: 0.5,
                effect: function () { upgradePlayerClickGain(this.rate); },
                locked: true,
                bought: false
            },
            advSilverMastery: {
                name: "advSilverMastery",
                label: "Silver Mastery",
                parent: "upgRenaissance",
                description: function () { return "Total mastery over the art of silverwork allows you to significantly speed up the production of the shiny metal. Decreases the <b>Silver Progress</b> required to extract <b>Silver</b> by <b>" + Math.abs(this.rate) + "!</b>"; },
                advCost: 2,
                rate: -1000,
                effect: function () { upgradeMaxValue("silverP", this.rate); },
                locked: true,
                bought: false
            },
            advMathematics: {
                name: "advMathematics",
                label: "Mathematics",
                parent: "upgRenaissance",
                description: function () { return "Advanced understanding of mathematical principles begin to arise in your population, paving the way to future improvements.  Applies a <b>20%</b> cost reduction on all upgrades. This does not apply to <b>Age Upgrades</b>."; },
                advCost: 2,
                rate: -0.2,
                effect: function () {
                    upgradeUpgradeCost(this.rate);
                    if (game.player.colonies >= 7) unlock("ldrKepler");
                    else if (game.player.colonies >= 4) unlock("ldrGalileo");
                },
                locked: true,
                bought: false
            },
            advMercantilism: {
                name: "advMercantilism",
                label: "Mercantilism",
                parent: "upgRenaissance",
                description: function () { return "Major development in commerce allows you to perform <b>Additional Trades</b> to manipulate the market to your advantage."; },
                advCost: 2,
                effect: function () {
                    unlock("trdWater2", "trdWood2", "trdStone2", "trdIron2", "trdWheat");
                    if (game.player.colonies >= 4) unlock("ldrMagellan");
                },
                locked: true,
                bought: false
            },
            advEvangelism: {
                name: "advEvangelism",
                label: "Evangelism",
                parent: "upgRenaissance",
                description: function () { return "The mass production and distribution of religious texts allows your population to spread their faith greatly, rallying even great figures to your cause. Allows you to hire <b>one additional leader</b>."; },
                advCost: 2,
                rate: 1,
                effect: function () { upgradeMaxLeaders(this.rate); },
                canUnlock: function () { return game.leaders.ldrGutenberg.bought && game.advancements.advPrintingPress.bought; },
                locked: true,
                bought: false,
                secret: true
            },
            advArchitecture: {
                name: "advArchitecture",
                label: "Architecture",
                parent: "upgRenaissance",
                description: function () { return "Research the lost art of the past to give it a new purpose. Your <b>Sawmills</b> will no longer cost any <b>Water</b> to operate."; },
                advCost: 2,
                rate: -0.2,
                effect: function () { upgradeWorkerRate("sawmill", this.rate); },
                canUnlock: function () { return game.leaders.ldrGutenberg.bought && game.advancements.advPrintingPress.bought; },
                locked: true,
                bought: false,
                secret: true
            },
            advValor: {
                name: "advValor",
                label: "Valor",
                parent: "upgRevolutionAge",
                description: function () { return "Instill your people with the will and fortitude to fight for what is right. Reduces the cost of all <b>Workers</b>, <b>Buildings</b> and <b>Upgrades</b> by <b>5%</b>."; },
                advCost: 3,
                rate: -0.05,
                effect: function () { upgradeUpgradeCost(this.rate); upgradeWorkerCost(this.rate); upgradeBuildingCost(this.rate); },
                locked: true,
                bought: false
            },
            advNavigation: {
                name: "advNavigation",
                label: "Navigation",
                parent: "upgRevolutionAge",
                description: function () { return "Heavily invest in research navigational utilities to aid your bravest of explorers in going further than ever before. Unlocks <b>Additional Advancements</b> at the cost of a passive drain of <b>5 Wood per second</b>."; },
                advCost: 3,
                effect: function () { buyPassive(getFromText("psvNavigation")); unlock("advDominion", "advSteamEngine"); },
                locked: true,
                bought: false
            },
            advBanking: {
                name: "advBanking",
                label: "Banking",
                parent: "upgRevolutionAge",
                description: function () { return "Install a gold-backed monetary system to support the exchange of goods between your population. You will be granted a one-time payment of <b>" + prettify(this.rate, 0, true) + " Gold</b> upon acquiring this advancement."; },
                advCost: 3,
                rate: 100000,
                effect: function () { gainGold(this.rate); achieve("achBanker"); },
                locked: true,
                bought: false
            },
            advIndependence: {
                name: "advIndependence",
                label: "Independence",
                parent: "upgRevolutionAge",
                description: function () { return "Declare yourself your own sovereign state. Your self-governance will passively grant you <b>" + this.rate + " Silver per second</b>. Additionally, you will gain <b>+" + this.maxRate + " Advancement Points</b> upon starting your next colony."; },
                advCost: 3,
                rate: 0.5,
                maxRate: 2,
                effect: function () { buyPassive(getFromText("psvIndependence")); game.player.nextAdvancementPoints += this.maxRate; unlock("ldrHancock"); },
                locked: true,
                bought: false
            },
            advBrotherhood: {
                name: "advBrotherhood",
                label: "Brotherhood",
                parent: "upgRevolutionAge",
                description: function () { return "Drive recruitment campaigns to bolster your number of workers. Immediately acquire <b>" + this.rate + " Ironsmiths</b> and <b>Millers</b> at no cost."; },
                advCost: 3,
                rate: 20,
                effect: function () { buyWorker(getFromText("ironsmith"), this.rate, true); buyWorker(getFromText("miller"), this.rate, true); },
                locked: true,
                bought: false
            },
            advDominion: {
                name: "advDominion",
                label: "Dominion",
                parent: "upgRevolutionAge",
                description: function () { return "Fortify the stronghold of your empire in your colonies via various doctrines and guiding principles. Grants you <b>+" + this.rate + " Prestige Point</b> in your next colony."; },
                rate: 1,
                advCost: 3,
                effect: function () { addPrestigePoints(this.rate); },
                locked: true,
                bought: false,
                secret: true
            },
            advSteamEngine: {
                name: "advSteamEngine",
                label: "Steam Engine",
                parent: "upgRevolutionAge",
                description: function () {
                    return "This revolutionary piece of versatile machinery will surely help drive your mining industry. Who knows what others uses it could find later on. Increases the resource progress gathering rate of your <b>Miners</b> by <b>+ "
                        + this.stoneMax + " Stone Progress per second</b>, your <b>Ironsmiths</b> by <b>+" + this.ironMax + " Iron Progress per second</b> and your <b>Silversmiths</b> by <b>+" + this.stoneMax + " Silver Progress per second</b>.";
                },
                stoneMax: 5,
                ironMax: 10,
                advCost: 3,
                effect: function () { upgradeWorkerRate("miner", this.stoneMax, "stoneP"); upgradeWorkerRate("ironsmith", this.ironMax, "ironP"); upgradeWorkerRate("silversmith", this.stoneMax, "silverP"); },
                locked: true,
                bought: false,
                secret: true
            }
        },
        prestiges: {
            ptgSoftTap: {
                name: "ptgSoftTap",
                label: "Soft Tap",
                type: "active",
                description: function () { return "Step by step, you get stronger and manage to carry more resources yourself. Your base clicking power increases by an additional <b>10%</b> for each level."; },
                rate: 0.1,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                effect: function () { upgradePlayerClickGain(this.rate); },
                bought: false
            },
            ptgWaterDancer: {
                name: "ptgWaterDancer",
                label: "Water Dancer",
                type: "active",
                description: function () { return "Focus on your mastery of water for increased specialized gains. You get <b>+" + this.rate + " more Water Progress per click</b> per level."; },
                rate: 0.5,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                effect: function () { upgradeClickGain("waterP", this.rate); },
                bought: false
            },
            ptgMechanicalClicker: {
                name: "ptgMechanicalClicker",
                label: "Mechanical Clicker",
                type: "active",
                description: function () {
                    var desc = "This technological wonder will allow you to greatly facilitate resource gathering. Unlocks the ability to <b>Hold the mouse button down</b> in order to <b>Automatically gather</b> any resource.";
                    if (this.level == 0) desc += " Auto-clicking will occur every <b>400ms</b>.";
                    else if (this.level == 1) desc += " Auto-clicking rate will increase from every <b>400ms</b> to every <b>300ms</b>.";
                    else if (this.level == 2) desc += " Auto-clicking rate will increase from every <b>300ms</b> to every <b>200ms</b>.";
                    else desc += " Auto-clicking occurs every <b>200ms</b>."
                    return desc;
                },
                ptgCost: 1,
                level: 0,
                maxLevel: 3,
                requirements: {
                    ptgSoftTap: 2
                },
                effect: function (level) {
                    if (level > 1) game.player.autoClick = 200;
                    else if (level > 0) game.player.autoClick = 300;
                    else game.player.autoClick = 400;
                },
                bought: false
            },
            ptgDruidry: {
                name: "ptgDruidry",
                label: "Druidry",
                type: "active",
                description: function () { return "Focus on your mastery of the forest for increased specialized gains. You get <b>+" + this.rate + " more Wood Progress per click</b> per level."; },
                rate: 1,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgSoftTap: 5
                },
                effect: function () { upgradeClickGain("woodP", this.rate); },
                bought: false
            },
            ptgHeadStart: {
                name: "ptgHeadStart",
                label: "Head Start",
                type: "active",
                description: function () { return "Carry some resources over to your new colonies to drastically speed up the early stage of rebuilding. Provides <b>+" + this.rate + " Water, Wood and Stone</b> for each purchased level."; },
                rate: 1,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgSoftTap: 5,
                    ptgWaterDancer: 1
                },
                effect: function () { gainResource(getFromText("water"), this.rate); gainResource(getFromText("wood"), this.rate); gainResource(getFromText("stone"), this.rate); },
                bought: false
            },
            ptgFireDancer: {
                name: "ptgFireDancer",
                label: "Fire Dancer",
                type: "active",
                description: function () {
                    var desc = "Attain mastery in the manipulation of fire. Automatically acquires the <b>Fire Advancement</b> for free.";
                    if (this.level > 0) desc += " Additionally, cumulatively increases the base clicking power upgrade provided by <b>5%</b> for each level.";
                    return desc;
                },
                rate: 0.05,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgWaterDancer: 5
                },
                effect: function (level) {
                    var adv = game.advancements.advFire;
                    if (adv.bought && level > 0) {
                        upgradePlayerClickGain(this.rate);
                        adv.clickRate += this.rate;
                    } else {
                        unlock("advancements", adv.name);
                        buyAdvancement(adv, true);
                    }
                },
                bought: false
            },
            ptgLoopClicking: {
                name: "ptgLoopClicking",
                label: "Loop Clicking",
                type: "active",
                description: function () { return "Revolution in resource progress tracking. When filling a <b>Resource Progress Bar</b>, instead of being reset to zero, the value past the maximum is <b>carried over</b>. If the bar would be filled more than once by the added value, resources are gathered more than once."; },
                ptgCost: 2,
                level: 0,
                maxLevel: 1,
                requirements: {
                    ptgMechanicalClicker: 3
                },
                effect: function () { },
                bought: false
            },
            ptgHarvester: {
                name: "ptgHarvester",
                label: "Harvester",
                type: "active",
                description: function () { return "Delve into the forbidden knowledge of agriculture. You get <b>+" + this.rate + " more Wheat Progress per click</b>  per level."; },
                rate: 0.5,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgWaterDancer: 1,
                    ptgDruidry: 3
                },
                effect: function () { upgradeClickGain("wheatP", this.rate); },
                bought: false
            },
            ptgSmartTap: {
                name: "ptgSmartTap",
                label: "Smart Tap",
                type: "active",
                description: function () { return "The essence of inner strength resides in the wider variety of areas you can improve upon through perseverance. Each level grants you an additional <b>2% Base Click Power</b> as well as <b>1% Progress Completion Multiplier</b>."; },
                rate: 0.02,
                maxRate: 0.01,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                requirements: {
                    ptgSoftTap: 7,
                    ptgHeadStart: 3
                },
                effect: function () { upgradePlayerClickGain(this.rate); upgradePlayerParentGain(this.maxRate); },
                bought: false
            },
            ptgWeaponMaster: {
                name: "ptgWeaponMaster",
                label: "Weapon Master",
                type: "active",
                description: function () { return "The art of weaponry unfolds itself to you, allowing you greater clicking powers than previously thought possible. Each level unlocks an <b>additional Advancement</b> that affect your <b>Base Click Power</b>."; },
                ptgCost: 2,
                level: 0,
                maxLevel: 2,
                requirements: {
                    ptgSoftTap: 3,
                    ptgFireDancer: 2
                },
                effect: function (level) {
                    if (level <= 0) unlock("advSling");
                    else unlock("advSpear");
                },
                bought: false
            },
            ptgDoubleClicking: {
                name: "ptgDoubleClicking",
                label: "Double Clicking",
                type: "active",
                description: function () {
                    var rates = [50, 40, 30, 25, 20, 15, 10, 5];
                    var desc = "This mysterious artifact will occasionally boost your resource gathering. Will sometimes <b>double</b> the resource progress gathered when you click.";
                    if (this.level == 0) desc += " Double Clicking will occur every <b>" + rates[0] + " clicks</b>.";
                    else if (this.level < 8) desc += " Double Clicking rate will increase from every <b>" + rates[this.level - 1] + " clicks</b> to every <b>" + rates[this.level] + " clicks</b>.";
                    else desc += " Double Clicking rate will occur every <b>" + rates[7] + " clicks</b>.";
                    return desc;
                },
                ptgCost: 1,
                level: 0,
                maxLevel: 8,
                requirements: {
                    ptgSoftTap: 4,
                    ptgMechanicalClicker: 2
                },
                effect: function () {
                    var rates = [50, 40, 30, 25, 20, 15, 10, 5];
                    game.player.doubleClick = rates[this.level];
                },
                oneTime: true,
                bought: false
            },
            ptgMason: {
                name: "ptgMason",
                label: "Mason",
                type: "active",
                description: function () { return "Focus on your mastery of the earth for increased specialized gains. You get <b>+" + this.rate + " more Stone Progress per click</b> per level."; },
                rate: 2,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                requirements: {
                    ptgWaterDancer: 2,
                    ptgHarvester: 2
                },
                effect: function () { upgradeClickGain("stoneP", this.rate); },
                bought: false
            },
            ptgLeader: {
                name: "ptgLeader",
                label: "Leader",
                type: "passive",
                description: function () { return "Become a mighty leader of men through sheer charisma. Reduces the cost of all <b>Workers</b> by <b>1%</b> (cumulative) for each level purchased."; },
                rate: -0.01,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                effect: function () { upgradeWorkerCost(this.rate); },
                bought: false
            },
            ptgBuilder: {
                name: "ptgBuilder",
                label: "Builder",
                type: "passive",
                description: function () { return "Masonry and architecture come naturally to you. Reduces the cost of all <b>Buildings</b> by <b>1%</b> (cumulative) for each level purchased."; },
                rate: -0.01,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                effect: function () { upgradeBuildingCost(this.rate); },
                bought: false
            },
            ptgTaxman: {
                name: "ptgTaxman",
                label: "Taxman",
                type: "passive",
                description: function () { return "Each tax exerted on your population passively grants an additional <b>+" + this.rate + " Gold</b> for each level. The gain is added after calculating the final tax amount."; },
                rate: 5,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                effect: function () { upgradeTaxPassiveGold(this.rate); },
                bought: false
            },
            ptgResearch: {
                name: "ptgResearch",
                label: "Research",
                type: "passive",
                description: function () {
                    var desc = "Massively invest in heavy research to prop up every future colony with a significant starting advantage. Reveals and makes available for purchase the basic <b>Advancements</b> tied to the following ages:<b><br />Stone Age";
                    if (this.level > 0) desc += "<br />Feudal Age";
                    if (this.level > 1) desc += "<br />Dark Age";
                    desc += "</b>";
                    return desc;
                },
                ptgCost: 1,
                level: 0,
                maxLevel: 3,
                requirements: {
                    ptgLeader: 5,
                    ptgBuilder: 5
                },
                effect: function (level) {
                    unlock("advancements", "advTemperance", "advFire", "advWheel");
                    if (level > 0) unlock("advPiety", "advEquestrianism", "advPrintingPress");
                    if (level > 1) unlock("advFervor", "advIronWill", "advTheology");
                },
                bought: false
            },
            ptgFetching: {
                name: "ptgFetching",
                label: "Fetching",
                type: "passive",
                description: function () { return "Inspire even the lowest of workers to devote themselves to the common good. Each <b>Water Fetcher</b> provides an additional <b>+" + this.rate + " Water Progress per second</b> for each level."; },
                rate: 0.1,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgLeader: 10
                },
                effect: function () { upgradeWorkerRate("waterFetcher", this.rate); },
                bought: false
            },
            ptgMilling: {
                name: "ptgMilling",
                label: "Milling",
                type: "passive",
                description: function () { return "Sharpen your understanding of overall structures for long-term benefits. Reduces the cumulative cost increase rate of <b>Wood</b> for each <b>Water Mill</b> purchased by <b>3%</b> per level."; },
                rate: -0.01,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgBuilder: 10
                },
                effect: function () { upgradeWorkerCostRate("waterMill", "wood", this.rate); },
                bought: false
            },
            ptgEconomist: {
                name: "ptgEconomist",
                label: "Economist",
                type: "passive",
                description: function () { return "Your long-standing experience of civilization building grants you knowledge of how to maximize revenue. For each level, gain <b>1%</b> more resources every time you complete a <b>Progress Bar</b>."; },
                rate: 0.01,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                requirements: {
                    ptgLeader: 3,
                    ptgBuilder: 3,
                    ptgTaxman: 5
                },
                effect: function () { upgradePlayerParentGain(this.rate); },
                bought: false
            },
            ptgHeroism: {
                name: "ptgHeroism",
                label: "Heroism",
                type: "passive",
                description: function () { return "Your greatness of spirit grows and draws the attention of more important people. Each level invested allows you to hire <b>an additional Leader</b> per colony."; },
                rate: 1,
                ptgCost: 2,
                level: 0,
                maxLevel: 2,
                requirements: {
                    ptgLeader: 8,
                    ptgBuilder: 8,
                    ptgResearch: 2
                },
                effect: function () { upgradeMaxLeaders(this.rate); },
                bought: false
            },
            ptgLumberer: {
                name: "ptgLumberer",
                label: "Lumberer",
                type: "passive",
                description: function () { return "Your connections with the people reach far out wide, even to the outskirts of the forest. Each level provides <b>+" + this.rate + " Free Lumberjack</b> to you."; },
                rate: 1,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgFetching: 3
                },
                effect: function () { buyWorker("lumberjack", this.rate, true); },
                bought: false
            },
            ptgEngineer: {
                name: "ptgEngineer",
                label: "Engineer",
                type: "passive",
                description: function () {
                    var desc = "Your growing experience with construction techniques start to reap benefits. The following advancements are made available at the start of each colony:<b><br />Engineering";
                    if (this.level > 0) desc += "<br />Iron Will";
                    if (this.level > 1) desc += "<br />Fervor";
                    if (this.level > 2) desc += " (+2% Effectiveness)";
                    desc += "</b>";
                    return desc;
                },
                rate: 1,
                maxRate: -0.02,
                ptgCost: 1,
                level: 0,
                maxLevel: 4,
                requirements: {
                    ptgMilling: 3
                },
                effect: function (level) {
                    unlock("advancements", "advEngineering");
                    if (level > 0) unlock("advIronWill");
                    if (level > 1) unlock("advFervor");
                    if (level > 2) {
                        var adv = game.advancements.advFervor;
                        adv.rate += this.maxRate;
                        if (adv.bought) upgradeBuildingCost(this.maxRate);
                    }
                },
                bought: false
            },
            ptgMerchant: {
                name: "ptgMerchant",
                label: "Merchant",
                type: "passive",
                description: function () {
                    var desc = "Your ability to turn a profit from thin air is most impressive. Start each colony with the ability to make the following trades:<b><br />Advancement Point";
                    if (this.level > 0) desc += "<br />Advancement Point II";
                    desc += "</b>"
                    return desc;
                },
                rate: 1,
                ptgCost: 2,
                level: 0,
                maxLevel: 2,
                requirements: {
                    ptgTaxman: 10,
                    ptgEconomist: 1
                },
                effect: function (level) {
                    if (level <= 0) unlock("trdAdvancementPoint");
                    else unlock("trdAdvancementPoint", "trdAdvancementPoint2");
                },
                bought: false
            },
            ptgResolve: {
                name: "ptgResolve",
                label: "Resolve",
                type: "passive",
                description: function () {
                    return "Nerves of steel are meant to withstand the storm. For each level, gain an additional <b>2.5%</b> each time a resource progress is completed, at the cost of <b>5%</b> of your base click power. Your current <b>Resolve</b> provides you:<b><br />"
                        + prettify(this.maxRate * this.level * 100, 2) + "% Progress Completion Multiplier<br />" + prettify(this.rate * this.level * 100, 2) + "% Base Click Power</b>";
                },
                rate: -0.05,
                maxRate: 0.025,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                requirements: {
                    ptgResearch: 3
                },
                effect: function () { upgradePlayerClickGain(this.rate); upgradePlayerParentGain(this.maxRate); },
                bought: false
            },
            ptgWoodMinimalism: {
                name: "ptgWoodMinimalism",
                label: "Wood Minimalism",
                type: "other",
                description: function () { return "Reduces the workload of wood gathering through unconventional methods. Each level increases the minimum threshold of <b>Wood Progress</b> by <b>+" + this.rate + "</b>."; },
                rate: 1,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                effect: function () { upgradeMinValue("woodP", this.rate); },
                bought: false
            },
            ptgOpportunist: {
                name: "ptgOpportunist",
                label: "Opportunist",
                type: "other",
                description: function () { return "A bit of creativity goes a long way. Increases the cost of <b>Workers</b> and <b>Buildings</b> by <b>1%</b> in exchange for <b>2%</b> more resources when completing a progress bar. Cumulates every level."; },
                rate: 0.01,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                effect: function () { upgradeWorkerCost(this.rate); upgradeBuildingCost(this.rate); upgradePlayerParentGain(this.rate * 2); },
                bought: false
            },
            ptgInvestment: {
                name: "ptgInvestment",
                label: "Investment",
                type: "other",
                description: function () { return "Temporary setbacks can sometimes result in future profits. Does nothing now, but provides you with <b>+" + this.rate + " Prestige Points</b> in your next colony every level. This effect only applies once."; },
                rate: 2,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                effect: function () { addPrestigePoints(this.rate); },
                oneTime: true,
                bought: false
            },
            ptgAdvanced: {
                name: "ptgAdvanced",
                label: "Advanced",
                type: "other",
                description: function () { return "Learn from new experiences to grow stronger every time you settle a new colony. Gain <b>" + this.rate + " Advancement Points</b> now and everytime you start a new colony."; },
                rate: 1,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgInvestment: 3
                },
                effect: function () { addAdvancementPoints(this.rate); },
                bought: false
            },
            ptgStoneMinimalism: {
                name: "ptgStoneMinimalism",
                label: "Stone Minimalism",
                type: "other",
                description: function () { return "Reduces the workload of stone gathering through unconventional methods. Each level increases the minimum threshold of <b>Stone Progress</b> by <b>+" + this.rate + "</b>."; },
                rate: 2,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                requirements: {
                    ptgWoodMinimalism: 1
                },
                effect: function () { upgradeMinValue("stoneP", this.rate); },
                bought: false
            },
            ptgMaverick: {
                name: "ptgMaverick",
                label: "Maverick",
                type: "other",
                description: function () { return "Reckless actions can lead to a good outcome with proper insight. Decreases the resources gained when completing a progress bar by <b>1%</b> in exchange of a <b>5%</b> increase in base click power. Cumulates every level."; },
                rate: 0.01,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                effect: function () { upgradePlayerParentGain(-this.rate); upgradePlayerClickGain(this.rate * 5); },
                bought: false
            },
            ptgHasty: {
                name: "ptgHasty",
                label: "Hasty",
                type: "other",
                description: function () {
                    var desc = "No time to waste. For every colony, converts a <b>Prestige Point per level</b> from a future one to a present one. If you have no pending prestige points, the bonus is applied as soon as you acquire one.";
                    if (this.level > 0) desc += "<br />You currently have <b>" + game.player.convertPrestiges + " Hasty Points</b> unused this colony.";
                    return desc;
                },
                rate: 1,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgInvestment: 1
                },
                effect: function () {
                    if (game.player.nextPrestigePoints >= 1) {
                        addPrestigePoints(-this.rate);
                        addPrestigePoints(this.rate, true);
                    } else {
                        game.player.convertPrestiges += this.rate;
                    }
                },
                bought: false
            },
            ptgHoarding: {
                name: "ptgHoarding",
                label: "Hoarding",
                type: "other",
                description: function () { return "Some are simply unable to let go of their hard-earned riches. When creating a new colony, keep <b>" + prettify(this.rate * (this.level < this.maxLevel ? this.level + 1 : this.level) * 100, 0, true) + "%</b> of your current amount of <b>Gold</b>." },
                rate: 0.1,
                ptgCost: 1,
                level: 0,
                maxLevel: 5,
                requirements: {
                    ptgAdvanced: 2
                },
                effect: function () { upgradePlayerGoldPrestige(this.rate); },
                bought: false
            },
            ptgIronMinimalism: {
                name: "ptgIronMinimalism",
                label: "Iron Minimalism",
                type: "other",
                description: function () { return "Reduces the workload of iron gathering through unconventional methods. Each level increases the minimum threshold of <b>Iron Progress</b> by <b>+" + this.rate + "</b>."; },
                rate: 30,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                requirements: {
                    ptgWoodMinimalism: 4,
                    ptgStoneMinimalism: 2
                },
                effect: function () { upgradeMinValue("ironP", this.rate); },
                bought: false
            },
            ptgHaggler: {
                name: "ptgHaggler",
                label: "Haggler",
                type: "other",
                description: function () { return "You become proficient at arguing your way to victory. Reduces the overall cost of <b>Workers</b>, <b>Buildings</b> AND <b>Upgrades</b> by <b>1%</b> at the cost of <b>5%</b> of your base click power. This cumulates every level."; },
                rate: -0.01,
                maxRate: -0.05,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                requirements: {
                    ptgOpportunist: 5
                },
                effect: function () { upgradeWorkerCost(this.rate); upgradeBuildingCost(this.rate); upgradeUpgradeCost(this.rate); upgradePlayerClickGain(this.maxRate); },
                bought: false
            },
            ptgWisdom: {
                name: "ptgWisdom",
                label: "Wisdom",
                type: "other",
                description: function () { return "Your incredibly resilient mind unravels the mysteries of time better than anyone else by now. Cumulatively decreases the cost of <b>Age Upgrades</b> by <b>2%</b> for every level acquired."; },
                rate: -0.02,
                ptgCost: 1,
                level: 0,
                maxLevel: 10,
                requirements: {
                    ptgHasty: 5
                },
                effect: function () { upgradeUpgradeCost(this.rate, true); },
                bought: false
            },
            ptgColonist: {
                name: "ptgColonist",
                label: "Colonist",
                type: "other",
                description: function () { return "Excel in the art of precipitating the development of your colonies. Makes the <b>Dominion</b> advancement available for purchase now and at the start of every colony."; },
                ptgCost: 2,
                level: 0,
                maxLevel: 1,
                requirements: {
                    ptgMaverick: 5,
                    ptgHoarding: 4
                },
                effect: function () { unlock("advancements", "advDominion"); },
                bought: false
            }
        },
        achievements: {
            achColonist: {
                name: "achColonist",
                label: "Colonist",
                description: function () { return "You ventured and built your first the <b>Colony</b>."; },
                points: 2,
                hidden: true,
                achieved: false
            },
            achPioneer: {
                name: "achPioneer",
                label: "Pioneer",
                description: function () { return "Your influence and power knows no bounds. You built <b>5 Colonies</b> without breaking a sweat."; },
                points: 2,
                hidden: true,
                achieved: false
            },
            achLuminary: {
                name: "achLuminary",
                label: "Luminary",
                description: function () { return "All men shall bow to you. You extended the might of your empire to a total of <b>10 Colonies</b>."; },
                points: 3,
                hidden: true,
                achieved: false
            },
            achPatrician: {
                name: "achPatrician",
                label: "Patrician",
                description: function () { return "The breadth and reach of your influence is immeasurable. Your empire now spawns a sprawling total of <b>30 Colonies</b>."; },
                points: 3,
                hidden: true,
                achieved: false
            },
            achCaveman: {
                name: "achCaveman",
                label: "Caveman",
                description: function () { return "You reached the <b>Stone Age</b> after banging some stones together. Very impressive."; },
                points: 0,
                hidden: true,
                achieved: false
            },
            achLord: {
                name: "achLord",
                label: "Lord",
                description: function () { return "You reached the <b>Feudal Age</b>. Mercy mild upon your kingdom."; },
                points: 1,
                hidden: true,
                achieved: false
            },
            achDarkTimes: {
                name: "achDarkTimes",
                label: "Dark Times",
                fullLabel: "Dark Times Ahead...",
                description: function () { return "Oh brave one, you have reached the <b>Dark Age</b>. Best of luck in this upcoming trial."; },
                points: 1,
                hidden: true,
                achieved: false
            },
            achScholar: {
                name: "achScholar",
                label: "Scholar",
                description: function () { return "You lead your realm to the age of the <b>Renaissance</b>. You should be proud."; },
                points: 1,
                hidden: true,
                achieved: false
            },
            achRebel: {
                name: "achRebel",
                label: "Rebel",
                description: function () { return "You reached the <b>Age of Revolution</b>. Go forth and forge your own destiny."; },
                points: 1,
                hidden: true,
                achieved: false
            },
            achBeginner: {
                name: "achBeginner",
                label: "Beginner",
                description: function () { return "The only way to craft your empire, click by click. Reach <b>100 Clicks</b>."; },
                progress: function () { return "Clicks: " + prettify(Math.min(game.player.totalClicks, 100), 0, true) + "/100"; },
                points: 0,
                hidden: false,
                achieved: false
            },
            achApprentice: {
                name: "achApprentice",
                label: "Apprentice",
                description: function () { return "Are you getting somewhere yet? Reach <b>1000 Clicks</b>."; },
                progress: function () { return "Clicks: " + prettify(Math.min(game.player.totalClicks, 1000), 0, true) + "/1000"; },
                points: 0,
                hidden: false,
                achieved: false
            },
            achJourneyman: {
                name: "achJourneyman",
                label: "Journeyman",
                description: function () { return "The real clicker is the friends we make along the way. Reach <b>10 000 Clicks</b>."; },
                progress: function () { return "Clicks: " + prettify(Math.min(game.player.totalClicks, 10000), 0, true) + "/10K"; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achExpert: {
                name: "achExpert",
                label: "Expert",
                description: function () { return "No amount of prestige points can cure your carpal tunnel syndrome. Reach <b>100 000 Clicks</b>."; },
                progress: function () { return "Clicks: " + prettify(Math.min(game.player.totalClicks, 100000), 0, true) + "/100K"; },
                points: 2,
                hidden: false,
                achieved: false
            },
            achPowerful: {
                name: "achPowerful",
                label: "Powerful",
                description: function () { return "You reached a <b>Base Click Power</b> of <b>200%</b>. Each one of your clicks is a mighty force to be reckoned with."; },
                points: 1,
                hidden: true,
                achieved: false
            },
            achThirsty: {
                name: "achThirsty",
                label: "Thirsty",
                description: function () { return "Acquire your first <b>Water Fetcher</b>."; },
                points: 0,
                hidden: false,
                achieved: false
            },
            achHungry: {
                name: "achHungry",
                label: "Hungry",
                description: function () { return "Hire your first <b>Farmer</b>."; },
                points: 0,
                hidden: false,
                achieved: false
            },
            achCraven: {
                name: "achCraven",
                label: "Craven",
                description: function () { return "Hire your first <b>Miner</b> without ever having a single <b>Water Fetcher</b> or <b>Lumberjack</b> under your employ. Why would you do this?"; },
                progress: function () { return (game.workers.waterFetcher.top - game.workers.waterFetcher.free) > 0 || (game.workers.lumberjack.top - game.workers.lumberjack.free) > 0 ? "You hired a water fetcher and/or a lumberjack." : "Miners: " + Math.min(game.workers.miner.current, 1) + "/1"; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achSmithy: {
                name: "achSmithy",
                label: "Smithy",
                fullLabel: "Back to the Smithy with you",
                description: function () { return "Hire a total of <b>25 Ironsmiths</b>. Wait a minute, are you even paying these people?"; },
                progress: function () { return "Ironsmiths: " + Math.min(game.workers.ironsmith.current, 25) + "/25"; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achMonk: {
                name: "achMonk",
                label: "Monk",
                description: function () { return "Hire a total of <b>25 Monks</b> and receive the first passive bonus granted by their pious fervor."; },
                progress: function () { return "Monks: " + Math.min(game.workers.monk.current, 25) + "/25"; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achLight: {
                name: "achLight",
                label: "Light",
                fullLabel: "Let There Be Light",
                description: function () { return "Discover <b>Fire</b>."; },
                points: 0,
                hidden: false,
                achieved: false
            },
            achTheologian: {
                name: "achTheologian",
                label: "Theologian",
                fullLabel: "Theologian",
                description: function () { return "Research the <b>Theology</b> advancement."; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achBanker: {
                name: "achBanker",
                label: "Banker",
                description: function () { return "Discover the benefits of <b>Banking</b>."; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achMasonry: {
                name: "achMasonry",
                label: "Going Somewhere",
                description: function () { return "Research <b>Masonry</b>. Time to get serious."; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achTrader: {
                name: "achTrader",
                label: "Trader",
                description: function () { return "Research <b>Economics</b>. What are these shiny metals for anyway?"; },
                points: 0,
                hidden: false,
                achieved: false
            },
            achPureGreed: {
                name: "achPureGreed",
                label: "Pure Greed",
                description: function () { return "You conducted a <b>Tax</b> for a profit of <b>0 Gold</b> (before passive increases). Stop this madness."; },
                points: 1,
                hidden: true,
                achieved: false
            },
            achGlitters: {
                name: "achGlitters",
                label: "Glitters",
                fullLabel: "All that glitters is not gold...",
                description: function () { return "You traded <b>Gold</b> for an <b>Achievement Point</b>. What else is money good for, really?"; },
                points: 0,
                hidden: true,
                achieved: false
            },
            achPolymath: {
                name: "achPolymath",
                label: "Polymath",
                description: function () { return "Perform a total of <b>100 Trades</b> and purchase a total of <b>100 Upgrades</b> in a single colony. Embody the art of micromanagement."; },
                progress: function () { return "Trades: " + Math.min(getAmountTrades(), 100) + "/100<br />Upgrades: " + Math.min(getAmountUpgrades(), 100) + "/100"; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achMetalCaster: {
                name: "achMetalCaster",
                label: "Metal Caster",
                description: function () { return "Build your first <b>Foundry</b>. Do you see where this is heading?"; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achForeman: {
                name: "achForeman",
                label: "Foreman",
                description: function () { return "Build an impressive total of <b>15 Stone Quarries</b>."; },
                progress: function () { return "Stone Quarries: " + Math.min(game.buildings.stoneQuarry.current, 15) + "/15"; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achWillOfThePeople: {
                name: "achWillOfThePeople",
                label: "Will of the People",
                description: function () { return "Build <b>20 Water Mills</b> and <b>20 Grain Mills</b> without having to resort to using any of the <b>Trades</b>."; },
                progress: function () { return getAmountTrades() > 0 ? "One or more Trades were made this colony." : "Water Mills: " + Math.min(game.buildings.waterMill.current, 20) + "/20<br />Grain Mills: " + Math.min(game.buildings.grainMill.current, 20) + "/20"; },
                points: 1,
                hidden: false,
                achieved: false
            },
            achSleeper: {
                name: "achSleeper",
                label: "The Sleeper",
                description: function () { return "My power of thought calls you, sleeper. Acquire your first <b>Passive Bonus</b>."; },
                points: 0,
                hidden: false,
                achieved: false
            },
            achInformed: {
                name: "achInformed",
                label: "Informed",
                description: function () { return "Recruit your first <b>Leader</b>. May you heed their advice."; },
                points: 0,
                hidden: false,
                achieved: false
            },
            achMathematician: {
                name: "achMathematician",
                label: "The Mathematician",
                description: function () { return "You have acquired <b>Pythagoras of Samos</b> as one of your counselors. A most impressive acquisition."; },
                points: 1,
                hidden: true,
                achieved: false
            },
            achGreatOne: {
                name: "achGreatOne",
                label: "The Great One",
                description: function () { return "You have acquired <b>Alexander The Great</b> as one of your counselors. Your enemies should be afraid."; },
                points: 1,
                hidden: true,
                achieved: false
            },
            achRepublic: {
                name: "achRepublic",
                label: "Republic",
                description: function () { return "You have acquired <b>Plato</b> as one of your counselors. Go forth and build a prosperous city."; },
                points: 1,
                hidden: true,
                achieved: false
            },
            achSparta: {
                name: "achSparta",
                label: "Sparta",
                fullLabel: "This is Sparta",
                description: function () { return "You have acquired <b>Leonidas</b> as one of your counselors. That should kick your base click power up a notch."; },
                points: 1,
                hidden: true,
                achieved: false
            }
        }
    };
    return initData;
}

var game = newGame();