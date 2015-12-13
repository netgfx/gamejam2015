GAME.Story = function (game) {};

GAME.Story.prototype = {
    create: function () {
        this.add.image(0, 0, 'bg');

        


        //this.menuButton = this.add.button((game.width/2) - 53, game.height - 150, 'menuBack', this.startMenu, this);
        this.playButton = this.add.button((game.width/2) - (226/2), game.height - 300, 'menuPlay', this.startGame, this);

        ///////////////////////////


        },
        hide: function () {

        },
        startMenu: function () {
            game.state.start('MainMenu');
        },
        startGame: function() {
            game.state.start("Game");
        }
    };

    function checkStatus(value) {
        if(value.status === "closed") {
            return '#a0a0a0';
        }
        else {
            return '#D70000';
        }
    }

    function checkTotalScore() {

    }

    function checkTotalAchievements() {


    }