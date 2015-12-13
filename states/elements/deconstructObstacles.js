
function createSectorDeconstruct() {
	bringBlocks();
	
}

function bringBlocks() {
    var towerGroup = game.add.group();
    var itemAssets = "wallV";
    var items = 37;
    var index;
    var y = game.height / 2 - 200 / 2;
    towerGroup.y = y;
    var x = game.width;
	var gap=[2,0,3,2,3,0,0,3,3,0,1,0,3,0,0,3,2,0,1,0,2,2,2,0,1,3,0,1,3,4,0,0,1,0,5,0,1]
    var item;
    for (var i = 0; i < items; i++) {
        x = x + 255 + (200*gap[i]);
        y = game.rnd.integerInRange(-10, 10);
        item = game.add.sprite(x, y, itemAssets);        
        game.physics.enable(item, Phaser.Physics.ARCADE);
        item.body.collideWorldBounds = false;
        item.body.allowGravity = false;
        item.body.immovable = true;
        item.active = true;
        item.body.enable = true;
        towerGroup.add(item);
    }

    reg.blocks = towerGroup;
}

function startBlocks() {
    reg.deconstructTween = tweenProperty(reg.blocks, "x", {
        "x": -reg.blocks.width - game.width - (55 * 5)
    }, reg.blocks.width * 2+200, 0, Phaser.Easing.Linear.None);
}

function resetBlocks() {
    reg.blocks.x = game.width+200;
    reg.deconstructTween.stop();

    simpleTimer(1500, startBlocks);
}

function initDeconstructTimer(fn) {
	removeDeconstructTimer();
	initDeconstructLoopedTimer(fn, 250);
}

function decreaseDeconstructionBar() {
	var volume = 5;
	reg.timebarFill.width = Math.round(reg.timebarFill.width - volume);
	window.console.log(reg.timebarFill.width, volume);

	if(reg.timebarFill.width < 0) {
		reg.timebarFill.width = 0;
		disableDeconstruct();
		window.console.log("ended mojo");
	}
}

function increaseDeconstructionBar() {
	var volume = 6;
	reg.timebarFill.width = reg.timebarFill.width + volume;

	if(reg.timebarFill.width > reg.timebarFill.initialWidth) {
		reg.timebarFill.width = reg.timebarFill.initialWidth;
	}
}