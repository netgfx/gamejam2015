GAME.Preloader = function (game) {};
GAME.Preloader.prototype = {
    preload: function () {
        this.game.stage.backgroundColor = '#16181a';

        // Add the progress bar
        /*this.loadBase = this.add.image(game.width/2 - 281/2, game.world.centerY - (30 / 2), 'loadBar');
        this.preloadBar = this.add.sprite(this.loadBase.x+5, this.loadBase.y+5, 'loading');
        this.preloadBar.x = game.world.centerX - (186/2)-30;
        this.preloadBar.y = game.world.centerY - (30 / 2) + 18;
        game.load.setPreloadSprite(this.preloadBar, 0);*/

        // ADD PACK
        this.game.load.pack("general", "assets/files.json", null, this);
        this.game.load.pack("sounds", "assets/files.json", null, this);

        // FONTS
        /*this.game.load.bitmapFont('blackRedStroke', 'styles/fonts/font/blackRedStroke/blackRedStroke.png', 'styles/fonts/font/blackRedStroke/blackRedStroke.fnt');
        this.game.load.bitmapFont('fontYellowGlow','styles/fonts/font/yellowRedStroke/yellowRedStroke.png', 'styles/fonts/font/yellowRedStroke/yellowRedStroke.fnt');
        this.game.load.bitmapFont('yellowRedStroke-noglow','styles/fonts/font/yellowRedStroke-noglow/yellowRedStroke-noglow.png', 'styles/fonts/font/yellowRedStroke-noglow/yellowRedStroke-noglow.fnt');
        */
        this.game.load.bitmapFont('blackFont','styles/fonts/fontBlack.png', 'styles/fonts/fontBlack.fnt');
        this.game.load.video('end', 'assets/video/endFrame.mp4');
        // UI


        // EFFECTS
        //this.load.atlasJSONHash('explosion_anim', 'assets/explode/explosion_new.png', 'src/atlas/explosion_new.json');

        //Add a loading label on the screen
        //var loadingLabel = game.add.image(game.width/2 - 336/2, 200,"loading_text");

        // MENU //

        /*this.game.load.image("menuBG", "assets/backgrounds/mainBG.png");
        this.game.load.image("menuPlay","assets/menuPlay.png");
        this.game.load.image("menuInfo", "assets/menuInfo.png");
        this.game.load.image("menuShop", "assets/menuShop.png");
        this.game.load.image("menuSound", "assets/menuSound.png");
        this.game.load.image("menuNoSound", "assets/menuNoSound.png");*/

        // BACKGROUNDS


        // OBSTACLES


        //ENEMIES
        //this.game.load.atlasJSONHash('demon1', 'assets/enemies/demon1.png', 'src/atlas/demon1.json');
        //this.game.load.atlasJSONHash('demons', 'assets/enemies/demons.png', 'src/atlas/demons.json');


        /// init trap gallery
        //reg.trapSlider = new phaseSlider(game);


        //this.load.audio('track', ['assets/track.mp3']);
        /*
        this.load.audio('ding', ['assets/sounds/ding.mp3']);
        this.load.audio('song', ['assets/sounds/song.mp3']);
        this.load.audio('gameover', ['assets/sounds/gameover.mp3']);
        */
    },
    create: function () {
        getLocalSave();
        getLocalSaveScore();
        game.state.start('MainMenu');
    }
};

function getLocalSave() {

    var result = localStorage.getItem("template");

    if(result === null || result === undefined) {
        localStorage.setItem("template", JSON.stringify(reg.levelEditor));
    }
    else {
        //reg.levelEditor = JSON.parse(result);
    }
}

function getLocalSaveScore() {
    var result = localStorage.getItem("template_score");

    if(result === null || result === undefined) {
        localStorage.setItem("template_score", 0);
    }
    else {
        reg.mainScore = JSON.parse(result);
    }
}