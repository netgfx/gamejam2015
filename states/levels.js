GAME.Levels = function (game) {

};

GAME.Levels.prototype = {
    create: function () {

        //getLocalSave();
        /*this.add.image(0, 0, 'levelsBG');
        this.menuButton = this.add.button((game.width / 2) - 53, game.height - 120, 'menuBack', this.startMenu, this, 1, 0, 2);*/



    },
    startMenu: function () {
        game.state.start('MainMenu');
    }
};

