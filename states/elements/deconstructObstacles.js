
function createSectorDeconstruct() {
	bringBlocks();
	startBlocks();
}

function bringBlocks() {
    var towerGroup = game.add.group();
    var itemAssets = "wallV";
    var items = 40;
    var index;
    var y = game.height / 2 - 200 / 2;
    towerGroup.y = y;
    var x = game.width;
    var item;
    for (var i = 0; i < items; i++) {
        x = x + 55 + game.rnd.integerInRange(200, 800);
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

    reg.towerGroup = towerGroup;
}

function startBlocks() {
    tweenProperty(reg.towerGroup, "x", {
        "x": -reg.towerGroup.width - game.width - (55 * 5)
    }, reg.towerGroup.width * 2+200, 0, Phaser.Easing.Linear.None);
}