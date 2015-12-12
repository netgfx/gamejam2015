
function createSectorDeconstruct() {
	bringBlocks();
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