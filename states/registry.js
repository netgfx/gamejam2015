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
        "Hey come on... do it already!",
        "I wonder who is testing who...",
        "Deadlines, deadlines everywhere..."
    ],
    specificQuotes:{
        "shift":{
            "quote":"Ok here goes nothing.\nI gotta be juuuuust right with this one.\n[SPACE] seems like a good button\nfor this.",
        },
        "gravity":{
            "quote": "What draws me near, pushes me away.\nLet's test some movement!\n[UP], [DOWN], [LEFT], [RIGHT]\nSeems about right!"
        },
        "deconstruct": {
            "quote": "In order to be, I have to die.\nMy hero has to avoid the obstacles\nLet's see how he fairs.\n[SPACE] will help!"
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