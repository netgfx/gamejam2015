var utils = utils || {};


utils = {
    animateNumber: function (num, fn, step, speed, endFn) {
        var _step = step || 10;
        var _speed = speed || 10; // in seconds because this is total
        var repeats = Math.ceil(num / _step);
        var animSpeed = (_speed / repeats) * 1000; // in ms

        window.console.log("repeats: " + repeats + " animSpeed: " + animSpeed);
        var _endFn = endFn || function () {
            game.time.events.remove(this);
        };
        var _timer = game.time.create(true);
        _timer.start();
        _timer.onComplete.add(_endFn);
        _timer.repeat(animSpeed, repeats, fn, this, [_step]);

    },
    changeCameraView: function(pos, item) {
        //game.camera.y = pos.y;
        game.camera.follow(null);
        var tweenObj = tweenProperty(game.camera, "y", {y:item.y-game.height/2}, 600, 0, Phaser.Easing.Quartic.Out);
        tweenObj.onComplete.add(function(){
            game.camera.follow(item);
        },this);
    },
    getRandomQuote: function() {
        var index = game.rnd.integerInRange(0, reg.quotes.length-1);
        var quote = reg.quotes[index];

        return quote;
    },
    getName: function() {
        var name = game.rnd.integerInRange(10000, 99999);

        return "#"+String(name);
    },
    garbageCollect: function () {


    }
};