var GAME = {};
GAME.Boot = function (game) {};
GAME.Boot.prototype = {
    preload: function () {

        this.load.image("loading", "assets/loading_button.png");
        //this.load.image('monster2', "");

    },
    create: function () {

        // Set some game settings
        game.stage.backgroundColor = '#d7ccc8';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        if (this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            //this.game.scale.setScreenSize(true);
        } else {
            /*this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.forcePortrait = true;
            this.game.scale.forceOrientation(false, true, 'orientation');
            this.game.scale.setScreenSize(true);*/
            var w = window.innerWidth * window.devicePixelRatio,
                h = window.innerHeight * window.devicePixelRatio;

            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = w / 2;
            this.scale.minHeight = h / 2;
            this.scale.maxWidth = w; //2048; //You can change this to gameWidth*2.5 if needed
            this.scale.maxHeight = h; //1228; //Make sure these values are proportional to the gameWidth and gameHeight
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setExactFit();
            //this.scale.hasResized.add(this.gameResized, this);
            //this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            //this.scale.setScreenSize(true);

            var ow = parseInt(this.game.canvas.style.width, 10);
            var oh = parseInt(this.game.canvas.style.height, 10);
            var r = Math.max(window.innerWidth / ow, window.innerHeight / oh);
            var nw = ow * r;
            var nh = oh * r;
            this.game.canvas.style.width = nw + "px";
            this.game.canvas.style.height = nh + "px";
            this.game.canvas.style.marginLeft = (window.innerWidth / 2 - nw / 2) + "px";
            this.game.canvas.style.marginTop = (window.innerHeight / 2 - nh / 2) + "px";
            //document.getElementById("game").style.width = window.innerWidth + "px";
            //document.getElementById("game").style.height = window.innerHeight - 1 + "px"; //The css for body includes 1px top margin, I believe this is the cause for this -1
            //document.getElementById("game").style.overflow = "hidden";
        }

        // portrait
        this.game.world.setBounds(0, 0, 1100, 800);

        game.state.start('Preloader');
    }
};