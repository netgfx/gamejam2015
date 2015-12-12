// Missile constructor
var Atom = function(game, x, y, type) {
    Phaser.Sprite.call(this, game, x, y, type);

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Enable physics on the missile
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    
    if(type === "plus"){
        this.polarityType = "plus";
    }
    else if(type === "minus") {
        this.polarityType = "minus";
    }

    // Define constants that affect motion
    this.SPEED = 250; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    this.WOBBLE_LIMIT = 0; // degrees
    this.WOBBLE_SPEED = 0; // milliseconds
    this.SMOKE_LIFETIME = 3000; // milliseconds
    this.AVOID_DISTANCE = 30; // pixels

    // Create a variable called wobble that tweens back and forth between
    // -this.WOBBLE_LIMIT and +this.WOBBLE_LIMIT forever
    this.wobble = this.WOBBLE_LIMIT;
    this.game.add.tween(this)
        .to(
            { wobble: -this.WOBBLE_LIMIT },
            this.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
            Number.POSITIVE_INFINITY, true
        );

    // Add a smoke emitter with 100 particles positioned relative to the
    // bottom center of this missile
    this.smokeEmitter = this.game.add.emitter(0, 0, 100);

    // Set motion parameters for the emitted particles
    this.smokeEmitter.gravity = 0;
    this.smokeEmitter.setXSpeed(0, 0);
    this.smokeEmitter.setYSpeed(-80, -50); // make smoke drift upwards

    // Make particles fade out after 1000ms
    this.smokeEmitter.setAlpha(1, 0, this.SMOKE_LIFETIME,
        Phaser.Easing.Linear.InOut);

    // Create the actual particles
    this.smokeEmitter.makeParticles('smoke');

    // Start emitting smoke particles one at a time (explode=false) with a
    // lifespan of this.SMOKE_LIFETIME at 50ms intervals
    this.smokeEmitter.start(false, this.SMOKE_LIFETIME, 50);
};

// Missiles are a type of Phaser.Sprite
Atom.prototype = Object.create(Phaser.Sprite.prototype);
Atom.prototype.constructor = Atom;

Atom.prototype.update = function() {

    if(reg.hero.polarityType === this.polarityType){

    }
    else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        return false;
    }

    // If this missile is dead, don't do any of these calculations
    // Also, turn off the smoke emitter
    if (!this.alive) {
        this.smokeEmitter.on = false;
        return;
    } else {
        this.smokeEmitter.on = true;
    }

    // Position the smoke emitter at the center of the missile
    this.smokeEmitter.x = this.x;
    this.smokeEmitter.y = this.y;

    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        reg.hero.x, reg.hero.y
    );

    // Add our "wobble" factor to the targetAngle to make the missile wobble
    // Remember that this.wobble is tweening (above)
    targetAngle += this.game.math.degToRad(this.wobble);


    // Make each missile steer away from other missiles.
    // Each missile knows the group that it belongs to (missileGroup).
    // It can calculate its distance from all other missiles in the group and
    // steer away from any that are too close. This avoidance behavior prevents
    // all of the missiles from bunching up too tightly and following the
    // same track.
    var avoidAngle = 0;
    this.parent.forEachAlive(function(m) {
        // Don't calculate anything if the other missile is me
        if (this == m) return;

        // Already found an avoidAngle so skip the rest
        if (avoidAngle !== 0) return;

        // Calculate the distance between me and the other missile
        var distance = this.game.math.distance(this.x, this.y, m.x, m.y);

        // If the missile is too close...
        if (distance < this.AVOID_DISTANCE) {
            // Chose an avoidance angle of 90 or -90 (in radians)
            avoidAngle = Math.PI/2; // zig
            if (this.game.math.chanceRoll(50)) avoidAngle *= -1; // zag
        }
    }, this);

    // Add the avoidance angle to steer clear of other missiles
    targetAngle += avoidAngle;

    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (this.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - this.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            this.angle += this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            this.angle -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
};

function createAtoms() {
    var atom;
    var positionX = 0;
    var positionY = 0;
    // create positive ones
    for(var i=0;i<reg.MAX_ATOM_PLUS;i++) {
        positionX = game.rnd.integerInRange(64, game.width-128);
        positionY = game.rnd.integerInRange(128, game.height-128);

        atom = new Atom(game, positionX, positionY, "plus");
        reg.atomGroupPlus.add(atom);
    }

    for(var i=0;i<reg.MAX_ATOM_MINUS;i++) {
        positionX = game.rnd.integerInRange(64, game.width-128);
        positionY = game.rnd.integerInRange(128, game.height-128);

        atom = new Atom(game, positionX, positionY, "minus");
        reg.atomGroupPlus.add(atom);
    }
}

// Try to get a missile from the missileGroup
// If a missile isn't available, create a new one and add it to the group.
function launchAtom(x, y, type) {
    // // Get the first dead missile from the missileGroup
    var atom = reg.atomGroupPlus.getFirstDead();

    // If there aren't any available, create a new one
    if (atom === null) {
        atom = new atom(this.game);
        this.atom.add(atom);
    }

    // Revive the missile (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    atom.revive();

    // Move the missile to the given coordinates
    atom.x = x;
    atom.y = y;

    return atom;
};
