GAME.Story = function(game) {};

GAME.Story.prototype = {
    create: function() {
        var storyBG = this.add.image(0, 0, 'storyBG');
        storyBG.x = game.width / 2 - storyBG.width / 2;
        storyBG.y = 50;

        //this.menuButton = this.add.button((game.width/2) - 53, game.height - 150, 'menuBack', this.startMenu, this);
        this.playButton = this.add.button((game.width / 2) - (226 / 2), game.height - 300, 'menuStart', this.startGame, this);
        this.playButton.x = this.playButton.x + 350;
        this.playButton.y = this.playButton.y + 80;

        ///////////////////////////

        createHeroStory();
    },
    hide: function() {

    },
    startMenu: function() {
        game.state.start('MainMenu');
    },
    startGame: function() {
        game.state.start("Game");
    }
};

function checkStatus(value) {
    if (value.status === "closed") {
        return '#a0a0a0';
    } else {
        return '#D70000';
    }
}

function createHeroStory() {
    var player = game.add.sprite(100, 0, "hero");

    
    player.x = (game.width / 2 - player.width / 2) - 240;
    player.y = (game.height / 2 - player.height / 2) - 40;
    player.alpha = 0.7;
    player.anchor.setTo(0.5, 0.5);
    player.side = "left";
    player.id = "player";
    player.name = utils.getName();
    player.animations.add('idle', Phaser.Animation.generateFrameNames('character_normal_0', 1, 9, '', 0), 10, true);


    // player.animations.currentAnim.onComplete.add(function() {
    //     this.animations.play('idle', 18, true);
    // }, player);

    player.animations.play("idle");

    reg.player = player;
}