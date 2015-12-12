reg = {
    score: (localStorage.getItem('template_score') === undefined) ? localStorage.getItem('template_score') : 0,
    mainScore: "",
    selectedLang: "en",
    sound: true,
    animationSpeed: 5000,
    creationSpeed: 1600,
    pointsRate: 10,
    MAX_ATOM_PLUS: 10,
    MAX_ATOM_MINUS: 10,
    modal : {

    },
    achievements: {

    },
    quotes: [
        "sample quote to be writen in the console"
    ],
    specificQuotes:{
        "shift":{
            "quote":"There is no room for '2' in the world of 1's and 0's, and no 'green with envy' in a black-and-white world.",
        },
        "gravity":{
            "quote": "What draws me near, pushes me away."
        },
        "deconstruct": {
            "quote": "In order to be, I have to die."
        },
        "polarity": {
            "quote": "We are one as long as we are apart."
        }
    },
    selectedPower: "none",
    easings: [
    Phaser.Easing.Cubic.InOut,
    Phaser.Easing.Sinusoidal.In,
    Phaser.Easing.Quadratic.InOut,
    Phaser.Easing.Quartic.Out,
    Phaser.Easing.Linear,
    Phaser.Easing.Cubic.In,
    Phaser.Easing.Quintic.Out,
    Phaser.Easing.Quintic.InOut
    ],
    mainEasing: Phaser.Easing.Cubic.InOut,
    currentLevel:"1",
    backgrounds: {
        "level1": "bg1",
        "level2": "bg2",
        "level3": "bg3",
        "level4": "bg4",
        "level5": "bg5",
    },
    levelEditor: {
        "initial": {
            "bgType":"initial"
        },
        "gravity": {
            "bgType":"gravity",
            "mechanic": "gravity"
        },
        "shift": {
            "bgType": "shift",
            "mechanic": "shift"
        },
        "deconstruct": {
            "bgType": "deconstruct",
            "mechanic": "deconstruct"
        },
        "polarity": {
            "bgType": "polarity",
            "mechanic": "polarity"
        },
        "final": {
            "bgType": "final",
            "mechanic": "?"
        }
    }
};