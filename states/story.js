GAME.Story = function (game) {};

GAME.Story.prototype = {
    create: function () {
        var storyBG = this.add.image(0, 0, 'storyBG');
        storyBG.x = game.width/2- storyBG.width/2;
        storyBG.y = 50;
        
        //this.menuButton = this.add.button((game.width/2) - 53, game.height - 150, 'menuBack', this.startMenu, this);
        this.playButton = this.add.button((game.width/2) - (226/2), game.height - 300, 'menuStart', this.startGame, this);
        this.playButton.x = this.playButton.x + 350;
        this.playButton.y = this.playButton.y + 80;

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