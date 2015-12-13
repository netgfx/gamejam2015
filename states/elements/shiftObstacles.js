/**
	OBSTACLE CREATIONS FOR ALL SECTORS
**/

function createSectorShift() {
	var num = 8;
	var blocks = game.add.group();
	var block;
	var offset1 = 39;
	var coords = [{
		x: 200,
		y: 330 ,
		type: "wallV",
		index: "#1"
	},
	{
		x: 400,
		y: 530,
		type: "wallV",
		index: "#2"
	},
		{
		x: 550,
		y: 80,
		type: "wallV",
		index: "#3"
	},{
		x: 800,
		y: game.height - 120,
		type: "wallH",
		index: "#4"
	},{
		x: 600,
		y: 400,
		type: "wallV",
		index: "#5"
	},{
		x: 110,
		y: 100,
		type: "wallH",
		index: "#6"
	},{
		x: 710,
		y: 120,
		type: "wallH",
		index: "#7"
	},
		{
		x: game.width - 280,
		y: game.height/2 - 150,
		type: "wallV",
		index: "Ï„ÎµÎ»ÎµÏ…Ï„Î±Î¯Î¿"
	}

	];
	for (var i = 0; i < num; i++) {
		var pos = coords[i];
		block = game.add.sprite(0, 0, pos.type);
		block.x = pos.x;
		block.y = pos.y;
		block.alpha = 1;
		game.physics.enable(block, Phaser.Physics.ARCADE);
		block.body.collideWorldBounds = false;
		block.body.allowGravity = false;
		block.body.immovable = true;
		block.active = true;
		block.body.enable = true;
		// REMOVE WHEN DONE
		var text = game.add.text(pos.x, pos.y, pos.index, {
			font: '16px Arial',
			fill: '#ff0000'
		});
		blocks.add(block);
	}

	reg.blocks = blocks;
}

function initShiftTimer(fn) {
	removeShiftTimer();
	initShiftLoopedTimer(fn, 250);
}

function decreaseShiftBar() {
	var volume = 5;
	reg.timebarFill.width = Math.round(reg.timebarFill.width - volume);

	if(reg.timebarFill.width < 20) {
		reg.timebarFill.width = 20;
		removeShift();
	}
}

function stopShiftDecrease() {
	removeShiftTimer();
}
