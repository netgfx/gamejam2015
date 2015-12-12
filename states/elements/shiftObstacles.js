/**
	OBSTACLE CREATIONS FOR ALL SECTORS 
**/

function createSectorShift() {
	var num = 11;
	var blocks = game.add.group();
	var block;
	var coords = [{
		x: 200,
		y: 0,
		type: "wallV",
		index: "#1"
	}
	];
	for (var i = 0; i < num; i++) {
		var pos = coords[i];
		block = game.add.sprite(0, 0, pos.type);
		block.x = pos.x;
		block.y = pos.y;
		block.alpha = 0;
		blocks.add(block);
	}
}