GAME.Main = function(game) {};

var blast = false;
var gameStop = false;
var enemiesDestroyed = 0;

// Setup the example
GAME.Main.prototype = {
    create: function() {

        // Set stage background color
        game.stage.backgroundColor = 0x121212;
        reg.strip = game.add.image(0, 0, "bg_" + reg.currentLevel);

        if (!this.game.device.desktop) {

        }

        utils.garbageCollect();
        reg.itemsWithShift = [];
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

        createElements();
        createConsole();
        //createStrip();
        createHero();
        // create HUD

        // Create a white rectangle that we'll use to represent the flash
        this.flash = this.game.add.graphics(0, 0);
        this.flash.beginFill(0xffffff, 1);
        this.flash.drawRect(0, 0, this.game.width, this.game.height);
        this.flash.endFill();
        this.flash.alpha = 0;
        reg.flash = this.flash;

        //// ENABLE KEYBOARD KEYS FOR ONE-OFF
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        if (reg.levelEditor[reg.currentLevel].mechanic === "deconstruct") {
            spaceKey.onDown.add(toggleDeconstruct, this);
            createDeconstructBar();
        } else if (reg.levelEditor[reg.currentLevel].mechanic === "shift") {

            upKey.onDown.add(applyGravity, this, 0, "top");
            downKey.onDown.add(applyGravity, this, 0, "down");
            leftKey.onDown.add(applyGravity, this, 0, "left");
            rightKey.onDown.add(applyGravity, this, 0, "right");
            spaceKey.onDown.add(toggleShift, this);
            createShiftBar();

            reg.itemsWithShift.push(reg.strip);
            reg.itemsWithShift.push(reg.timebarFill);
        } else {
            upKey.onDown.add(applyGravity, this, 0, "top");
            downKey.onDown.add(applyGravity, this, 0, "down");
            leftKey.onDown.add(applyGravity, this, 0, "left");
            rightKey.onDown.add(applyGravity, this, 0, "right");
        }
        // TODO: add event listener args

        // INIT MAIN TRACK //
        if(reg.menusong){
            reg.menusong.stop();
        }

        reg.song.play();
        openConsole(reg.currentLevel);
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
        var back = game.add.button(0, 0, 'back_button', backToMenu, this);
        back.x = (game.width-back.width)-20;
        back.y = 10;

    },
    update: function() {
        if (this.game.time.fps !== 0) {
            //this.fpsText.setText(this.game.time.fps + ' FPS');
        }

        // UPDATE SOMETHING EACH FRAME
        // if (reg.player.locked === false) {
        //     if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        //         applyGravity("top");
        //     } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        //         applyGravity("down");
        //     } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        //         applyGravity("left");
        //     } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        //         applyGravity("right");
        //     }
        //     if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        //         // TODO: Check for game mode
        //         //toggleDeconstruct();
        //     } else {
        //         if (reg.levelEditor[reg.currentLevel].mechanic === "gravity") {

        //         } else {
        //             applyGravity("none");
        //         }
        //     }
        // }

        ////////// COLLISION DETECTION /////////////

        if (reg.sectionElements) {
            game.physics.arcade.overlap(reg.sectionElements, reg.player, onHeroCollide);
        }

        if (reg.blocks) {
            game.physics.arcade.overlap(reg.blocks, reg.player, onHeroCollide);
        }

        if (reg.portals) {
            game.physics.arcade.overlap(reg.portals, reg.player, enterPortal);
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

function backToMenu() {
    game.state.start("MainMenu");
}

///////////////////// CREATORS //////////////////////////////////

function createBackground() {
    var strip = game.add.sprite(0, game.height - 122, "bg");
    reg.strip = strip;
    //reg.strip.autoScroll(0, 200);
}

function createHero() {
    var player = game.add.sprite(100, 0, "hero");
    if (reg.levelEditor[reg.currentLevel].mechanic === "gravity") {
        player.y = game.height / 2 - player.height / 2;
        player.x = game.width / 2 - player.width / 2;
    } else if (reg.levelEditor[reg.currentLevel].mechanic === "deconstruct") {
        player.y = game.height / 2 - player.height / 2;
        player.x = 100;
    } else if (reg.levelEditor[reg.currentLevel].mechanic === "polarity") {
        player.y = game.height / 2 - player.height / 2;
        player.x = 100;
    } else if (reg.levelEditor[reg.currentLevel].mechanic === "shift") {
        player.y = game.height / 2 - player.height / 2;
        player.x = 100;
    }
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
    player.shifted = false;
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

function createTimeBar() {
    reg.timebarBG = game.add.image(0, 0, "timebarBG");
    reg.timebarBG.x = game.width / 2 - reg.timebarBG.width / 2;
    reg.timebarBG.y = 5;
    //
    reg.timebarFill = game.add.image(0, 0, "timebarFill");
    reg.timebarFill.x = reg.timebarBG + 5;
    reg.timebarFill.y = reg.timebarBG + 5;
    reg.timebarFill.initialWidth = reg.timebarFill.width;
}

function createDeconstructBar() {
    //window.console.log("init deconstruction bar");
    reg.timebarBG = game.add.image(0, 0, "deconstructbarBG");
    reg.timebarBG.x = game.width / 2 - reg.timebarBG.width / 2;
    reg.timebarBG.y = 60;
    ///
    reg.timebarFill = game.add.sprite(0, 0, "deconstructbarFill");
    reg.timebarFill.x = reg.timebarBG.x + 1;
    reg.timebarFill.y = reg.timebarBG.y;
    reg.timebarFill.initialWidth = reg.timebarFill.width;
    //window.console.log(reg.timebarFill.x);
}

function createShiftBar() {

    ///
    reg.timebarFill = game.add.sprite(0, 0, "shiftbarFill");
    reg.timebarBG = game.add.image(0, 0, "shiftbarBG");
    reg.timebarBG.x = game.width / 2 - reg.timebarBG.width / 2;
    reg.timebarBG.y = 60;
    reg.timebarFill.x = reg.timebarBG.x + 2;
    reg.timebarFill.y = reg.timebarBG.y;
    reg.timebarFill.initialWidth = reg.timebarFill.width;

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

// Win condition
function enterPortal(portal, player) {
    reg.success.play();
    reg.player.animations.play("idle");
    if(portal !== undefined){
        reg.player.x = portal.x + portal.width / 2 - player.width / 2;
        reg.player.y = portal.y + portal.height / 2 - player.height / 2;
    }
    reg.player.body.gravity.x = 0;
    reg.player.body.velocity.x = 0;
    reg.player.body.gravity.y = 0;
    reg.player.body.velocity.y = 0;
    reg.player.body.gravity.x = 0;
   // window.console.log(" >>>>>> ", reg.currentLevel);
    if (reg.currentLevel === "gravity") {
        reg.currentLevel = "shift";
        reg.player.body.enable = false;
        var tweenObj = tweenProperty(reg.blocks, "alpha", {
            alpha: 0
        }, 500, 0.2);
        tweenObj.onComplete.add(function() {
            game.state.start("Game");
        }, this);
    } else if (reg.currentLevel === "shift") {
        reg.currentLevel = "deconstruct";
        reg.player.body.enable = false;
        var tweenObj = tweenProperty(reg.blocks, "alpha", {
            alpha: 0
        }, 500, 0.2);
        tweenObj.onComplete.add(function() {
            game.state.start("Game");
        }, this);
    } else if (reg.currentLevel === "deconstruct") {
        //reg.player.animations.currentAnim.onComplete = null;
        reg.player.animations.play("idle");
        reg.win = true;
        var tweenObj = tweenProperty(reg.player, "xy", {
            "x": game.width/2 - reg.player.width/2,
            "y": (game.height/2 - reg.player.height/2) + 100
        }, 12000, 0.5);
        tweenObj.onComplete.add(function() {
            game.state.start("EndFrame");
        }, this);
        openConsole("win");
    }
}

function createElements() {
    var type = reg.levelEditor[reg.currentLevel].mechanic;
    reg.sectionElements = game.add.group();
    reg.sectionElements.enablePhysics = true;
    reg.sectionElements.physicsBodyType = Phaser.Physics.ARCADE;
   // window.console.log("Current Mechanic: ", type);
    if (type === "gravity") {
        var wallR = game.add.sprite(0, 0, "border-right");
        wallR.x = game.width - wallR.width;
        wallR.y = 0;
        game.physics.enable(wallR, Phaser.Physics.ARCADE);
        wallR.body.collideWorldBounds = false;
        wallR.body.allowGravity = false;
        wallR.body.immovable = true;
        wallR.active = true;
        wallR.body.enable = true;
        ////////
        var wallL = game.add.sprite(0, 0, "border-left");
        wallL.x = 0;
        wallL.y = 0;
        game.physics.enable(wallL, Phaser.Physics.ARCADE);
        wallL.body.collideWorldBounds = false;
        wallL.body.allowGravity = false;
        wallL.body.immovable = true;
        wallL.active = true;
        wallL.body.enable = true;
        ////////
        var wallT = game.add.sprite(0, 0, "border-top");
        wallT.x = 0;
        wallT.y = 0;
        game.physics.enable(wallT, Phaser.Physics.ARCADE);
        wallT.body.collideWorldBounds = false;
        wallT.body.allowGravity = false;
        wallT.body.immovable = true;
        wallT.active = true;
        wallT.body.enable = true;
        ////////
        var wallD = game.add.sprite(0, 0, "border-bottom");
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
        addPortals("gravity");
        addIcons("gravity");
    } else if (type === "shift") {
        createObstacles("shift");
        addIcons("shift");
        addPortals("shift");
    } else if (type === "polarity") {
        createObstacles("polarity");
    } else if (type === "deconstruct") {
        createObstacles("deconstruct");
        addIcons("deconstruction");
        addPortals("deconstruct");
    } else if (type === "tutorial") {
        createObstacles("tutorial");
    }
}

function addIcons(type) {

    var icon1;
    if (type === "gravity") {
        icon1 = game.add.image(0, 0, "icon_gravity_selected");
    } else {
        icon1 = game.add.image(0, 0, "icon_gravity");
    }
    icon1.x = game.width / 2 - icon1.width * 2;
    icon1.y = 6;

    var icon2;
    if (type === "shift") {
        icon2 = game.add.image(0, 0, "icon_shift_selected");
    } else {
        icon2 = game.add.image(0, 0, "icon_shift");
    }

    icon2.x = icon1.x + icon1.width + 20;
    icon2.y = 6;

    var icon3;
    if (type === "deconstruction") {
        icon3 = game.add.image(0, 0, "icon_deconstruction_selected");
    } else {
        icon3 = game.add.image(0, 0, "icon_deconstruction");
    }

    icon3.x = icon2.x + icon2.width + 20;
    icon3.y = 6;

}

function addPortals(type) {
    var portals = game.add.group();
    portals.enablePhysics = true;
    portals.physicsBodyType = Phaser.Physics.ARCADE;
    if (type === "gravity") {
        var portal1 = game.add.sprite(-20, 40, "portals", "portalLandscape_01");
        game.physics.enable(portal1, Phaser.Physics.ARCADE);
        portal1.body.collideWorldBounds = false;
        portal1.body.allowGravity = false;
        portal1.body.immovable = true;
        portal1.active = true;
        portal1.body.enable = true;
        portal1.animations.add("open", Phaser.Animation.generateFrameNames('portalLandscape_0', 2, 5, '', 0), 4, true);
        portal1.animations.play("open");

        var portal2 = game.add.sprite(game.width - 130, 0, "portals", "portalPortrait_01");
        portal2.y = game.height - portal2.height;
        game.physics.enable(portal2, Phaser.Physics.ARCADE);
        portal2.body.collideWorldBounds = false;
        portal2.body.allowGravity = false;
        portal2.body.immovable = true;
        portal2.active = true;
        portal2.body.enable = true;
        portal2.animations.add("open", Phaser.Animation.generateFrameNames('portalPortrait_0', 2, 5, '', 0), 4, true);
        portal2.animations.play("open");


        portals.add(portal1);
        portals.add(portal2);
    } else if (type === "shift") {
        var portal1 = game.add.sprite(0, 120, "portals", "portalLandscape_01");
        portal1.x = game.width - portal1.width + 25;
        game.physics.enable(portal1, Phaser.Physics.ARCADE);
        portal1.body.collideWorldBounds = false;
        portal1.body.allowGravity = false;
        portal1.body.immovable = true;
        portal1.active = true;
        portal1.body.enable = true;
        portal1.animations.add("open", Phaser.Animation.generateFrameNames('portalLandscape_0', 2, 5, '', 0), 4, true);
        portal1.animations.play("open");

        portals.add(portal1);
    } else if (type === "deconstruct") {

    }

    reg.portals = portals;
}

function createObstacles(type) {
    if (type === "gravity") {
        createSectorGravity();
    } else if (type === "shift") {
        createSectorShift();
    } else if (type === "polarity") {
        createSectorPolarity();
    } else if (type === "deconstruct") {
        createSectorDeconstruct();
    } else if (type === "tutorial") {
        createSectorTutorial();
    }
}

/**
    #gravity
**/
function applyGravity(e, type) {

    if (reg.player.locked === true) {
        return false;
    }

    //window.console.log(arguments, type);
    var gravityVolume = 1500;
    if (type === "none") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.x = 0;
        reg.player.animations.play("idle");
        reg.morph.play();
    }
    if (type === "left") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.x = -gravityVolume;
        reg.player.animations.play("triangleLeft");
        reg.morph.play();
    }
    if (type === "right") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.x = gravityVolume;
        reg.player.animations.play("triangleRight");
        reg.morph.play();
    }
    if (type === "top") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.y = -gravityVolume;
        reg.player.animations.play("triangleUp");
        reg.morph.play();
    }
    if (type === "down") {
        reg.player.body.gravity.x = 0;
        reg.player.body.velocity.x = 0;
        reg.player.body.gravity.y = 0;
        reg.player.body.velocity.y = 0;
        reg.player.body.gravity.y = gravityVolume;
        reg.player.animations.play("triangleDown");
        reg.morph.play();
    }
}



//////// MECHANICS ///////////////////////

function toggleShift() {
    if (reg.player.shifted === true) {
        removeShift();
    } else {
        applyShift();
    }
}

function applyShift() {
    if (reg.timebarFill <= 20) {
        return false;
    }
    if (reg.player.locked === true) {
        return false;
    }
    for (var i = 0; i < reg.itemsWithShift.length; i++) {
      //  window.console.log(reg.itemsWithShift[i]);
        reg.strip.loadTexture("bg_shift_invert");
    }

    reg.blocks.alpha = 1;
    reg.portals.alpha = 1;

    initShiftTimer(decreaseShiftBar);
    reg.player.body.velocity.x = 0;
    reg.player.body.velocity.y = 0;
    reg.player.body.gravity.x = 0;
    reg.player.body.gravity.y = 0;
    reg.player.locked = true;
    reg.player.animations.play("idle");
    reg.player.shifted = true;
}

function removeShift() {

    if (reg.player.locked === true && reg.player.shifted === false) {
        return false;
    }

    reg.strip.loadTexture("bg_shift");

    reg.blocks.alpha = 0;
    reg.portals.alpha = 0;

    stopShiftDecrease();
    reg.player.locked = false;
    reg.player.animations.play("idle");
    reg.player.shifted = false;
    // reg.player.velocity.x = 0;//reg.levelEditor[reg.currentLevel].velocity;
    // reg.player.velocity.y = 0;
    // reg.player.gravity.x = 0;
    // reg.player.gravity.y = 0;
}


function toggleDeconstruct() {
    if (reg.player.body.enable === true) {
        enableDeconstruct();
    } else {
        disableDeconstruct();
    }
}

function enableDeconstruct() {
    if (reg.timebarFill <= 10) {
        return false;
    }
   // window.console.log("deconstruct now");
    reg.player.body.enable = false;
    reg.player.animations.play("deconstruct");
    reg.deconstruction.play();
    initDeconstructTimer(decreaseDeconstructionBar);
}

function disableDeconstruct() {
  //  window.console.log("construct back");
    reg.player.animations.play("construct");
    reg.construction.play();
    reg.player.animations.currentAnim.onComplete.add(function () {
        reg.player.body.enable = true;
    });
    initDeconstructTimer(increaseDeconstructionBar);
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

  //  window.console.log("ouch!");
    shockAndAwe();
    reg.player.body.velocity.x = 0;
    reg.player.body.velocity.y = 0;
    reg.player.body.gravity.x = 0;
    reg.player.body.gravity.y = 0;
    reg.player.animations.play("idle");
    if (reg.currentLevel === "gravity") {
        reg.player.reset(game.width / 2 - reg.player.width / 2, game.height / 2 - reg.player.height / 2);
    } else if (reg.currentLevel === "shift") {
        reg.player.reset(100, game.height / 2 - reg.player.height / 2);
        reg.timebarFill.width = 200;
    } else if (reg.currentLevel === "deconstruct") {
        reg.player.reset(100, game.height / 2 - reg.player.height / 2);
        reg.timebarFill.width = 200;
        resetBlocks();
    }
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

function createConsole() {
    reg._console = game.add.sprite(0, 0, "console");
    reg._console.x = game.width / 2 - 100;
    reg._console.y = game.height - 20;
    reg._console.alpha = 0;
}

function openConsole(name) {
    reg._console.note = name;
    var consoleTween = tweenProperty(reg._console, "y", {
        y: reg._console.y - 200
    }, 500, 1, Phaser.Easing.Cubic.InOut);

    if (name) {
        consoleTween.onComplete.add(function(note, tween, name) {
           // window.console.log(arguments[2], name);
            enableTypingSpecificMessage(arguments[2]);

        }, this, null, name);
    } else {
        consoleTween.onComplete.add(enableTypingMessage);
    }

}

function enableTypingSpecificMessage(name) {
    var quote = utils.getSpecificQuote(name);
    reg.pickedQuote = quote;
    if(name === "win"){
        reg.typedText = game.add.bitmapText(game.width - 330, 60, "blackFont", "", 28);
    }
    else{
        reg.typedText = game.add.bitmapText(game.width - 330, 60, "blackFont", "", 20);
    }
    reg.pensil.play();
    reg.player.locked = true;
    if(name === "win") {
        reg.typedText.x = game.width/2 - 300,
        reg.typedText.y = 240;
    }
    if (reg.currentLevel === "shift") {
        reg.typedText.x = 20;
        reg.typedText.y = game.height - 230;
    }
    if (reg.currentLevel === "deconstruct") {
        countdown(typeWriter, quote.length, removeCustomTimer);
    } else {
        countdown(typeWriter, quote.length);
    }
    
}

function enableTypingMessage() {
    var quote = utils.getRandomQuote();
    reg.pickedQuote = quote;
    reg.typedText = game.add.bitmapText(0, 0, "blackFont", "", 22);
    if (reg.currentLevel === "deconstruct") {
        countdown(typeWriter, quote.length, removeCustomTimer);
    } else {
        countdown(typeWriter, quote.length);
    }
    reg.pensil.play();
}

function typeWriter(text) {
    if (reg.pensil.isPlaying === false) {
        reg.pensil.play();
    }
    var length = reg.typedText.text.length;
    reg.typedText.text += reg.pickedQuote.charAt(length);

    if (reg.currentLevel === "shift") {
        if (length === 20) {
            var blocksTween = tweenProperty(reg.blocks, "alpha", {
                "alpha": 0
            }, 400, 0, Phaser.Easing.Cubic.Out);
            var blocksTween = tweenProperty(reg.portals, "alpha", {
                "alpha": 0
            }, 400, 0, Phaser.Easing.Cubic.Out);
        }
    }
}

function removeCustomTimer(_timer) {

   // window.console.log(this, arguments);
    game.time.events.remove(_timer);
   // window.console.log("custom timer removed");
    reg.pensil.stop();
    reg.player.locked = false;
    startBlocks();

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
game.state.add('EndFrame', GAME.EndFrame);
game.state.add('Story', GAME.Story);
game.state.add('Credits', GAME.Credits);
game.state.add('Game', GAME.Main);

game.state.start('Boot');