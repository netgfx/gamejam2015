GAME.Scores = function (game) {};

GAME.Scores.prototype = {
    create: function () {
        this.add.image(0, 0, 'levelsBG');

        checkTotalScore();
        checkTotalAchievements();

        var gameScoreLabel = this.game.add.text(
            0 , 80, 'Best Scores per Level: ', {
                font: '46px FingerPaint-Regular',
                fill: '#ffffff',
                fontWeight: 'bold',
                align:'center'
            });

        gameScoreLabel.update();
        gameScoreLabel.x = (game.width / 2) - (gameScoreLabel.width / 2);


        this.menuButton = this.add.button((game.width/2) - 53, game.height - 150, 'menuBack', this.startMenu, this);

        ///////////////////////////


        },
        hide: function () {

        },
        startMenu: function () {
            game.state.start('MainMenu');
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