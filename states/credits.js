GAME.Credits = function (game) {};

GAME.Credits.prototype = {
    create: function () {
        this.add.image(0, 0, 'BG');

        ///////////////////////////
        

        },
        hide: function () {

        },
        startMenu: function () {
            game.state.start('MainMenu');
        }
    };