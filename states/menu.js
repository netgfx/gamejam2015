GAME.Menu = function(game) {

};

GAME.Menu.prototype = {
    create: function() {
        game.stage.backgroundColor = 0x000000;
        this.add.image(game.width/2 - 420/2, 50, 'menuBG');

        this.startButton = this.add.button((game.width/2) - 226/2 + 20, 230, 'menuPlay', this.startGame, this);

        this.soundButton = this.add.button(this.startButton.x, this.startButton.y + 90, 'menuSoundOn', this.toggleSound, this);
        this.nosoundButton = this.add.button(this.startButton.x, this.startButton.y + 90, 'menuSoundOff', this.toggleSound, this);
        this.nosoundButton.alpha = 0;

        this.fb = this.add.button(this.startButton.x, this.soundButton.y + 90, 'menuFB', this.shareFacebook, this);
        this.tw = this.add.button(this.startButton.x, this.fb.y + 90, 'menuTwitter', this.shareTwitter, this);

        // sound manager
        if(reg.song === undefined){
            reg.song = game.add.audio('song');
            reg.song.repeat = true;
            reg.song.volume = 0.4;
        }

        if(reg.menusong === undefined) {
            reg.menusong = game.add.audio('menusong');
            reg.menusong.repeat = true;
            reg.menusong.volume = 0.4;
            reg.menusong.play();
        }

        if(reg.morph === undefined){
            reg.morph = game.add.audio('morph');
            reg.morph.volume = 0.1;
        }

        if(reg.deconstruction === undefined) {
            reg.deconstruction = game.add.audio("deconstruction");
            reg.deconstruction.volume = 0.1;
        }

        if(reg.construction === undefined) {
            reg.construction = game.add.audio("construction");
            reg.construction.volume = 0.1;
        }

        if(reg.keyboardtyping === undefined) {
            reg.keyboardtyping = game.add.audio("keyboardtyping");
            reg.keyboardtyping.volume = 0.5;
        }

        if(reg.success === undefined) {
            reg.success = game.add.audio("success");
            reg.success.volume = 0.5;
        }

        if(reg.pensil === undefined) {
            reg.pensil = game.add.audio("pencilsketching");
            reg.pensil.repeat = true;
            reg.pensil.volume = 0.5;
        }

        var sheath;
        if(sheath === undefined) {
            sheath = game.add.audio("sheath");
            sheath.volume = 0.5;
        }

        // CHANGE THIS TO CHANGE CURRENT SECTOR
        reg.currentLevel = "deconstruct";

        // if (reg.sound === true && reg.song.isPlaying === false) {
        //     reg.song.play();
        // }

        // if(reg.sound === false) {
        //     this.soundButton.alpha = 0;
        //     this.nosoundButton.alpha = 1;
        // }

        // TODO: ENABLE BACK BEFORE RELEASE
/*
        this.logoGroup = game.add.group();

        this.logoBackground = this.add.image(0, 0, "logoBG");
        this.logoBackground.width = game.width;

        this.swordLeft = this.add.image(0, 0, "sword_left");
        this.swordLeft.x = -this.swordLeft.width;
        this.swordLeft.y = -this.swordLeft.height;

        this.swordRight = this.add.image(0, 0, "sword_right");
        this.swordRight.x = game.width + this.swordLeft.width;
        this.swordRight.y = -this.swordLeft.height;

        this.logoShield = this.add.image(0, 0, "logo_shield");
        this.logoShield.x = game.width / 2 - this.logoShield.width / 2;
        this.logoShield.y = -600; //game.height/2 - this.logoShield.height/2;
        tweenProperty(this.logoShield, "y", {
            "y": game.height / 2 - this.logoShield.height / 2
        }, 500, 1500, Phaser.Easing.Cubic.Out);

        this.logoText = this.add.image(0, 0, "logo_text");
        this.logoText.x = game.width / 2 - this.logoText.width / 2;
        this.logoText.y = -200
        tweenProperty(this.logoText, "y", {
            "y": (game.height / 2 - this.logoText.height / 2) - 20
        }, 400, 2000, Phaser.Easing.Cubic.Out);

        // sword one
        tweenProperty(this.swordLeft, "xy", {
            "x": (game.width / 2 - this.swordLeft.width / 2) - 40,
            "y": (game.height / 2 - this.swordLeft.height / 2) - 40
        }, 600, 2400, Phaser.Easing.Cubic.InOut);

        //sword two
        tweenProperty(this.swordRight, "xy", {
            "x": (game.width / 2 - this.swordRight.width / 2) + 40,
            "y": (game.height / 2 - this.swordRight.height / 2) - 40
        }, 600, 2400, Phaser.Easing.Cubic.InOut);

        this.logoGroup.add(this.logoBackground);
        this.logoGroup.add(this.swordLeft);
        this.logoGroup.add(this.swordRight);
        this.logoGroup.add(this.logoShield);
        this.logoGroup.add(this.logoText);

        var logoTween = tweenProperty(this.logoGroup, "alpha", {
            alpha: 0
        }, 400, 3400, Phaser.Easing.Cubic.InOut);
        logoTween.onComplete.add(function(e) {
            window.console.log(this);
            this.destroy();
            game.state.start("Game");
        }, this.logoGroup);

    */

    //game.state.start("Game");

    },
    startGame: function() {
        game.state.start('Story');
    },
    startScores: function() {
        game.state.start('Scores');
    },
    toggleSound: function() {
        reg.sound = (reg.sound === true) ? false : true;

        if (reg.sound === false) {
            this.soundButton.alpha = 0;
            this.nosoundButton.alpha = 1;
            reg.menusong.stop();
        } else {
            this.nosoundButton.alpha = 0;
            this.soundButton.alpha = 1;
            reg.menusong.play();
        }
    },
    startScores: function() {
        game.state.start('Scores');
    },
    startCredits: function() {
        game.state.start("Credits");
    },
    shareTwitter: function() {
        var sharerURL = "http://twitter.com/intent/tweet?text=" + encodeURIComponent("Can you solve the Enigma of my design? #gamejam2015");
        window.open(
            sharerURL,
            'Twitter',
            'width=626,height=436');
    },
    shareFacebook: function() {

        FB.ui({
            display: 'dialog',
            method: "feed",
            link: "http://www.netgfx.com/gamejam2015",
            /*caption: title,*/
            description: "Can you solve the Enigma of my design? #gamjam2015",
            picture: "http://www.netgfx.com/gamejam2015/assets/bg.png",
            size: {
                width: 640,
                height: 480
            },
            width: 640,
            height: 480
        }, function(response) {

        });
    }
};