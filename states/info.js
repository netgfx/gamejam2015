GAME.Info = function (game) {};
GAME.Info.prototype = {

    create: function () {
        //this.add.image(0, 0, 'levelsBG');
        //this.add.image(0, 0, 'info_panel');

        /*var gameScoreLabel = this.game.add.text(
            80, 120, '', {
                font: '30px audiowideregular',
                fill: '#ffffff',
                lineSpacing: 24,
                fontWeight: 'normal',
                align: 'left',
                width: game.width - 50,
                wordWrapWidth: game.width - 170,

                wordWrap: true
            });*/

        //this.menuButton = this.add.button((game.width / 2) - 53, game.height - 100, 'menuBack', this.startMenu, this, 1, 0, 2);


    },
    startMenu: function () {
        game.state.start('MainMenu');
    }
};