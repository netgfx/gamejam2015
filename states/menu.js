GAME.Menu = function(game) {

};

GAME.Menu.prototype = {
    create: function() {
        //this.add.image(0, 0, 'menuBG');

        /*this.startButton = this.add.button((game.width/2) - 216, 300, 'menuPlay', this.startGame, this, 1, 0, 2);
        this.infoButton = this.add.button((game.width/2) - 170, this.startButton.y + 110, 'menuScores', this.startScores, this, 1, 0, 2);
        this.soundButton = this.add.button((game.width/2) - 127, this.infoButton.y + 110, 'menuSoundOn', this.toggleSound, this, 1, 0, 2);

        this.scoresButton = this.add.button((game.width/2) - 184, this.soundButton.y + 110, 'menuInfo', this.startInfo, this, 1, 0, 2);*/

        // sound manager
        if(reg.song === undefined){
            reg.song = game.add.audio('song');
            reg.song.repeat = true;
            reg.song.volume = 0.3;
        }

        if(reg.morph === undefined){
            reg.morph = game.add.audio('morph');
            reg.morph.volume = 0.5;
        }

        if(reg.keyboardtyping === undefined) {
            reg.keyboardtyping = game.add.audio("keyboardtyping");
            reg.keyboardtyping.volume = 0.5;
        }

        if(reg.success === undefined) {
            reg.success = game.add.audio("success");
            reg.success.volume = 0.5;
        }

        // if (reg.sound === true && reg.song.isPlaying === false) {
        //     reg.song.play();
        // }

        // if(reg.sound === false) {
        //     this.soundButton.alpha = 0;
        //     this.nosoundButton.alpha = 1;
        // }

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



    },
    startGame: function() {
        game.state.start('Game');
    },
    startScores: function() {
        game.state.start('Scores');
    },
    toggleSound: function() {
        reg.sound = (reg.sound === true) ? false : true;

        if (reg.sound === false) {
            this.soundButton.alpha = 0;
            this.nosoundButton.alpha = 1;
            reg.song.stop();
        } else {
            this.nosoundButton.alpha = 0;
            this.soundButton.alpha = 1;
            reg.song.play();
        }
    },
    startScores: function() {
        game.state.start('Scores');
    },
    startCredits: function() {
        game.state.start("Credits");
    },
    shareTwitter: function() {
        var sharerURL = "http://twitter.com/intent/tweet?text=" + encodeURIComponent("I captured " + reg.mainScore + " presents on Present...ing! can you beat my score? http://xmas2015.7linternational.com");
        window.open(
            sharerURL,
            'Twitter',
            'width=626,height=436');
    },
    shareFacebook: function() {

        FB.ui({
            display: 'dialog',
            method: "feed",
            link: "http://xmas2015.7linternational.com",
            /*caption: title,*/
            description: "I captured " + reg.mainScore + " presents on Present...ing! can you beat my score? http://xmas2015.7linternational.com",
            picture: "http://xmas2015.7linternational.com/assets/promo.png",
            size: {
                width: 640,
                height: 480
            },
            width: 640,
            height: 480
            /*caption: "I captured " + reg.mainScore + " presents on Present...ing! can you beat my score? http://presenting.surge.sh/",*/
        }, function(response) {

        });
    }
};