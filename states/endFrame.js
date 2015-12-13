GAME.EndFrame = function(game) {

};

GAME.EndFrame.prototype = {
    create: function() {
        game.stage.backgroundColor = 0x000000;

        this.video = game.add.video('end');

        this.video.onPlay.addOnce(this.start, this);

        this.sprite = this.video.addToWorld(0, 0, 0, 0);

        this.video.play();
    },
    start: function() {
        game.time.events.add(14200, this.changeState, this);
    },
    changeState: function() {
        this.video.stop();

        var tweenObj = tweenProperty(this.sprite, "alpha", {alpha:0}, 800, 0.2);
        tweenObj.onComplete.add(this.change, this);

    },
    change: function() {
        game.state.start("Credits");
    }
};