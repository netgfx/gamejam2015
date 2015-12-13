GAME.Credits = function(game) {};

GAME.Credits.prototype = {
    create: function() {
        game.stage.backgroundColor = 0x000000;

        ///////////////////////////
        var creditsTitle = this.add.image(0, 0, "credits_title");
        creditsTitle.x = game.width / 2 - creditsTitle.width / 2;
        creditsTitle.y = 100;

        var creditsText = this.add.image(0, 0, "credits_text");
        creditsText.x = (game.width / 2 - creditsText.width / 2) + 70;
        creditsText.y = creditsTitle.y + creditsTitle.height + 100;

        this.startButton = this.add.button((game.width/2) - 226/2, game.height-200, 'menuButton', this.startMenu, this);

    },
    hide: function() {

    },
    startMenu: function() {
        game.state.start('MainMenu');
    }
};