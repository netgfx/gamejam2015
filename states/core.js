GAME.Main = function(game) {};

var blast = false;
var gameStop = false;
var enemiesDestroyed = 0;

// Setup the example
GAME.Main.prototype = {
    create: function() {
        // Set stage background color
        game.stage.backgroundColor = 0x121212;
        game.add.image(0, 0, "bg");

        if (!this.game.device.desktop) {

        }

        // Simulate a pointer click/tap input at the center of the stage
        // when the example begins running.
        game.input.activePointer.x = this.game.width / 2;
        game.input.activePointer.y = this.game.height / 2;

        if (!this.game.device.desktop) {

        }

        this.game.world.setBounds(-10, -10, this.game.width + 20, this.game.height + 20);

        /////////////////////
        reg.mainScore = 0;
        gameStop = false;

        reg.currentLevel = "gravity";
        createElements();

        //createStrip();
        createHero();
        // create HUD
        //createHUD();

        //// ENABLE KEYBOARD KEYS FOR ONE-OFF
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(toggleDeconstruct, this);

        // create modals
        // createModal("game-over");
        //createModal("level");
        // Show FPS
        game.time.advancedTiming = true;
        this.fpsText = this.game.add.text(
            20, 20, '', {
                font: '16px Arial',
                fill: '#ffffff'
            }
        );
    },
    update: function() {
        if (this.game.time.fps !== 0) {
            this.fpsText.setText(this.game.time.fps + ' FPS');
        }

        // UPDATE SOMETHING EACH FRAME
        if (reg.player.locked === false) {
            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                applyGravity("top");
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                applyGravity("down");
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                applyGravity("left");
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                applyGravity("right");
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                // TODO: Check for game mode
                //toggleDeconstruct();
            } else {
                if (reg.levelEditor[reg.currentLevel].mechanic === "gravity") {

                } else {
                    applyGravity("none");
                }
            }
        }

        ////////// COLLISION DETECTION /////////////

        if (reg.sectionElements) {
            game.physics.arcade.overlap(reg.sectionElements, reg.player, onHeroCollide);
        }

    },
    sampleFunction: function(blast) {

        if (gameStop === true) {
            return false;
        }

    },
    render: function() {
        if (reg.player) {
            //game.debug.body(reg.player);
            //game.debug.body(reg.sectionElements.children[0]);
        }
    }
};

///////////////////// CREATORS //////////////////////////////////

function createBackground() {
    var strip = game.add.sprite(0, game.height - 122, "bg");
    reg.strip = strip;
    //reg.strip.autoScroll(0, 200);
}

function createHero() {
    var player = game.add.sprite(100, 0, "hero");
    player.y = game.height / 2 - player.height / 2;
    player.x = game.width / 2 - player.width / 2;
    player.anchor.setTo(0.5, 0.5);
    player.side = "left";
    player.id = "player";
    player.name = utils.getName();
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.allowGravity = true;
    player.body.checkWorldBounds();
    player.body.gravity.y = 0;
    player.body.gravity.x = 0;
    player.body.drag = 0;
    player.body.acceleration.x = 0;
    player.body.acceleration.y = 0;
    player.locked = false;
    player.animations.add('idle', Phaser.Animation.generateFrameNames('character_normal_0', 1, 9, '', 0), 10, true);
    ////// GRAVITY /////
    player.animations.add('triangleUp', Phaser.Animation.generateFrameNames('character_triangle_up_0', 1, 4, '', 0), 12, false);
    player.animations.add('triangleDown', Phaser.Animation.generateFrameNames('character_triangle_down_0', 1, 4, '', 0), 12, false);
    player.animations.add('triangleLeft', Phaser.Animation.generateFrameNames('character_triangle_left_0', 1, 4, '', 0), 12, false);
    player.animations.add('triangleRight', Phaser.Animation.generateFrameNames('character_triangle_right_0', 1, 4, '', 0), 12, false);

    ///// SHIFT /////

    ///// POLARITY //////
    player.animations.add('minus', Phaser.Animation.generateFrameNames('character_minus_0', 1, 4, '', 0), 12, false);
    player.animations.add('plus', Phaser.Animation.generateFrameNames('character_plus_0', 1, 4, '', 0), 12, false);
    player.animations.add('plus2minus', Phaser.Animation.generateFrameNames('character_plus_minus_0', 1, 4, '', 0), 12, false);
    player.animations.add('minus2plus', Phaser.Animation.generateFrameNames('character_plus_minus_0', 4, 7, '', 0), 12, false);

    ///// DECONSTRUCT /////
    player.animations.add('deconstruct', Phaser.Animation.generateFrameNames('character_deconstruct_0', 1, 6, '', 0), 24, false);
    player.animations.add('construct', Phaser.Animation.generateFrameNames('character_construct_0', 1, 6, '', 0), 24, false);

    // player.animations.currentAnim.onComplete.add(function() {
    //     this.animations.play('idle', 18, true);
    // }, player);

    player.animations.play("idle");

    reg.player = player;
}

/**
    HERO MORPH STATES
**/
function morphHero(type) {
    if (type === "gravity-left") {

    } else if (type === "gravity-right") {

    } else if (type === "gravity-down") {

    } else if (type === "gravity-up") {

    } else if (type === "polarity+") {

    } else if (type === "polarity-") {

    } else if (type === "null") {

    } else if (type === "full") {

    } else if (type === "shifted") {

    } else if (type === "unshifted") {

    }
}

function createElements() {
    var type = reg.levelEditor[reg.currentLevel].bgType;
    reg.sectionElements = game.add.group();
    reg.sectionElements.enablePhysics = true;
    reg.sectionElements.physicsBodyType = Phaser.Physics.ARCADE;

    if (type === "gravity") {
        var wallR = game.add.sprite(0, 0, "wallV");
        wallR.x = game.width - wallR.width;
        wallR.y = 0;
        game.physics.enable(wallR, Phaser.Physics.ARCADE);
        wallR.body.collideWorldBounds = false;
        wallR.body.allowGravity = false;
        wallR.body.immovable = true;
        wallR.active = true;
        wallR.body.enable = true;
        ////////
        var wallL = game.add.sprite(0, 0, "wallV");
        wallL.x = 0;
        wallL.y = 0;
        game.physics.enable(wallL, Phaser.Physics.ARCADE);
        wallL.body.collideWorldBounds = false;
        wallL.body.allowGravity = false;
        wallL.body.immovable = true;
        wallL.active = true;
        wallL.body.enable = true;
        ////////
        var wallT = game.add.sprite(0, 0, "wallH");
        wallT.x = 0;
        wallT.y = 0;
        game.physics.enable(wallT, Phaser.Physics.ARCADE);
        wallT.body.collideWorldBounds = false;
        wallT.body.allowGravity = false;
        wallT.body.immovable = true;
        wallT.active = true;
        wallT.body.enable = true;
        ////////
        var wallD = game.add.sprite(0, 0, "wallH");
        wallD.x = 0;
        wallD.y = game.height - wallD.height;
        game.physics.enable(wallD, Phaser.Physics.ARCADE);
        wallD.body.collideWorldBounds = false;
        wallD.body.allowGravity = false;
        wallD.body.immovable = true;
        wallD.active = true;
        wallD.body.enable = true;

        reg.sectionElements.add(wallR);
        reg.sectionElements.add(wallL);
        reg.sectionElements.add(wallT);
        reg.sectionElements.add(wallD);

        createObstacles("gravity");
    }
}

/**
    #gravity
**/
function applyGravity(type) {
    var gravityVolume = 1500;
    if (type === "none") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.x = 0;
        reg.player.animations.play("idle");
    }
    if (type === "left") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.x = -gravityVolume;
        reg.player.animations.play("triangleLeft");
    }
    if (type === "right") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.x = gravityVolume;
        reg.player.animations.play("triangleRight");
    }
    if (type === "top") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.y = -gravityVolume;
        reg.player.animations.play("triangleUp");
    }
    if (type === "down") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.y = gravityVolume;
        reg.player.animations.play("triangleDown");
    }
}



//////// MECHANICS ///////////////////////

function applyShift() {
    for (var i = 0; i < reg.itemsWithShift.length; i++) {
        reg.itemsWithShift[i].blendMode = 14;
    }
    for (var i = 0; i < reg.itemsWithoutShift.length; i++) {
        reg.itemsWithoutShift[i].alpha = 1;
    }
    reg.player.velocity.x = 0;
    reg.player.velocity.y = 0;
    reg.player.gravity.x = 0;
    reg.player.gravity.y = 0;
    reg.player.locked = true;

}

function removeShift() {
    for (var i = 0; i < reg.itemsWithShift.length; i++) {
        reg.itemsWithShift[i].blendMode = PIXI.blendModes.NORMAL;
    }
    for (var i = 0; i < reg.itemsWithoutShift.length; i++) {
        reg.itemsWithoutShift[i].alpha = 0;
    }
    // reg.player.velocity.x = 0;//reg.levelEditor[reg.currentLevel].velocity;
    // reg.player.velocity.y = 0;
    // reg.player.gravity.x = 0;
    // reg.player.gravity.y = 0;
}

function bringBlocks() {
    var towerGroup = game.add.group();
    var itemAssets = ["box1", "box2", "box3", "box4"];
    var items = 40;
    var index;
    var y = game.height / 2 - 128 / 2;
    towerGroup.y = y;
    var x = game.width;
    var item;
    for (var i = 0; i < items; i++) {
        index = game.rnd.integerInRange(0, 3);
        x = x + 128 + game.rnd.integerInRange(90, 256);
        y = game.rnd.integerInRange(-10, 10);
        window.console.log(index);
        item = game.add.sprite(x, y, itemAssets[index]);
        item.inputEnabled = true;
        item.events.onInputDown.add(removeBox, item);
        towerGroup.add(item);
    }

    reg.towerGroup = towerGroup;
}

function startBlocks() {
    tweenProperty(reg.towerGroup, "x", {
        "x": -reg.towerGroup.width - game.width - (128 * 3)
    }, reg.towerGroup.width * 2 - 100, 0, Phaser.Easing.Linear.None);
}

function toggleDeconstruct() {
    if (reg.player.body.enable === true) {
        enableDeconstruct();
    } else {
        disableDeconstruct();
    }
}

function enableDeconstruct() {
    window.console.log("deconstruct now");
    reg.player.body.enable = false;
    reg.player.animations.play("deconstruct");
}

function disableDeconstruct() {
    window.console.log("construct back");
    reg.player.body.enable = true;
    reg.player.animations.play("construct");
}


/////// COLLISION DETECTION //////////////

function onHeroCollide(item, player) {
    // sanity check
    if (item.id === "player") {
        var b = {
            temp: player
        };
        item = player;
        player = b.temp;
    }

    window.console.log("ouch!");
    return true;
}

function onItemCollide(item1, item2) {

}

/**
 * [shockAndAwe Shakes the camera and flashes the stage]
 * @return {[type]} [description]
 */
function shockAndAwe() {
    // Create the flash
    reg.flash.alpha = 1;
    game.add.tween(reg.flash)
        .to({
            alpha: 0
        }, 180, Phaser.Easing.Cubic.In)
        .start();

    // Shake the camera by moving it up and down 5 times really fast
    game.camera.y = 0;
    game.add.tween(game.camera)
        .to({
            y: -10
        }, 80, Phaser.Easing.Sinusoidal.InOut, false, 0, 5, true)
        .start();
}

function openConsole() {
    var console = game.add.sprite(0, 0, "console");
    console.x = 0;
    console.y = game.height;

    var consoleTween = tweenProperty(console, "y", {
        y: game.height - console.height
    }, 400, 0, Phaser.Easing.Cubic.InOut);

    consoleTween.onComplete.add(enableTypingMessage);
}

function enableTypingMessage() {
    var quote = utils.getRandomQuote();
    reg.pickedQuote = quote;
    reg.typedText = game.add.bitmapText(0, 0, "greenFont", "", 22);
    countdown(typeWriter, quote.length);
}

function typeWriter(text) {
    var length = reg.typedText.text.length;
    reg.typedText.text += reg.pickedQuote.charAt(length);
}

function createHUD() {

    var hudGroup = game.add.group();
    var posX = (game.width / 2) - (322 / 2);
    var posY = game.height - 117;


    reg.hudGroup = hudGroup;
}



/**
 * [getExplosion Create explosion]
 * @param  {[type]} x     [description]
 * @param  {[type]} y     [description]
 * @param  {[type]} scale [description]
 * @return {[type]}       [description]
 *
 * Search Tag: #explosion, #explode
 */
function getExplosion(x, y, scale) {
    // Try to get a used explosion from the explosionGroup.
    // If an explosion isn't available, create a new one and add it to the group.
    // Setup new explosions so that they animate and kill themselves when the
    // animation is complete.
    // Get the first dead explosion from the explosionGroup
    var explosion = reg.explosionGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (explosion === null) {
        explosion = game.add.sprite(0, 0, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);

        // Add an animation for the explosion that kills the sprite when the
        // animation is complete
        var animation = explosion.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], 40, false);

        animation.killOnComplete = true;

        // Add the explosion sprite to the group
        reg.explosionGroup.add(explosion);
    }

    // Revive the explosion (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    explosion.revive();

    // Move the explosion to the given coordinates
    explosion.x = x;
    explosion.y = y;
    explosion.scale.x = scale;
    explosion.scale.y = scale;

    // Set rotation of the explosion at random for a little variety
    explosion.angle = game.rnd.integerInRange(0, 360);

    // Play the animation
    explosion.animations.play('boom');

    // Return the explosion itself in case we want to do anything else with it
    return explosion;
}

/**
 * [showModal description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function showModal(type) {

}

/**
 * [hideModal description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function hideModal(type) {

}

/**
 * [saveScore description]
 * @return {[type]} [description]
 */
function saveScore() {
    localStorage.setItem("tempgame", JSON.stringify(reg.mainScore));
}

/**
 * [tweenProperty description]
 * @param  {[type]} item     [description]
 * @param  {[type]} property [description]
 * @param  {[type]} obj      [description]
 * @param  {[type]} duration [description]
 * @return {[type]}          [description]
 */
function tweenProperty(item, property, obj, duration, delay, easing) {

    delay = delay || {};
    easing = easing || Phaser.Easing.Linear.None;

    var tween = game.add.tween(item).to(obj, duration, easing, true, delay, 0, false);

    return tween;
}



/// EVENT LISTENERS


/**
 * [resetAchievements description]
 * @return {[type]} [description]
 */
function resetAchievements() {
    reg.levelEditor = JSON.parse('');
}

// Setup game
var game = new Phaser.Game(1100, 800, Phaser.CANVAS, 'game');
game.state.add('Boot', GAME.Boot);
game.state.add('Preloader', GAME.Preloader);
game.state.add('Scores', GAME.Scores);
game.state.add('Info', GAME.Info);
game.state.add('MainMenu', GAME.Menu);
game.state.add("Levels", GAME.Levels);
game.state.add('Game', GAME.Main);

game.state.start('Boot');