/**
	OBSTACLE CREATIONS FOR ALL SECTORS 
**/

function createSectorGravity() {
	var num = 9;
	var blocks = game.add.group();
	var block;
		var offset1=39;
		var coords = [{
		x: 200,
		y: 0+offset1,
		type: "wallV",
		index: "#1"
	}, 
	{
		x: 200,
		y: 230+offset1,
		type: "wallV",
		index: "#2"
	},

	{
		x: 200,
		y: 460+offset1,
		type: "wallH",
		index: "#4"
	},
	{
		x: 450,
		y: 180,
		type: "wallH",
		index: "#5"
	},
	{
		x: game.width/2 +150,
		y: game.height/2 - 160,
		type: "wallH",
		index: "#6"
	},
		{
		x: 30,
		y: game.height-105 ,
		type: "wallH",
		index: "#7"
	},

	{
		x: game.width/2 +55 ,
		y: game.height/2 - 90,
		type: "wallV",
		index: "#8"
	},

	{
		x: game.width/2 +55,
		y: game.height - 280,
		type: "wallV",
		index: "#10"
	},
	{
		x: game.width - 230,
		y: game.height/2 + 127,
		type: "wallH",
		index: "#11"
	}

	];
	for (var i = 0; i < num; i++) {
		var pos = coords[i];
		block = game.add.sprite(0, 0, pos.type);
		block.x = pos.x;
		block.y = pos.y;
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
            })
		blocks.add(block);
	}

	reg.blocks = blocks;
}