/**
	OBSTACLE CREATIONS FOR ALL SECTORS 
**/

function createSectorGravity() {
	var num = 11;
	var blocks = game.add.group();
	var block;
	var coords = [{
		x: 200,
		y: 0,
		type: "wallV",
		index: "#1"
	}, 
	{
		x: 200,
		y: 200,
		type: "wallV",
		index: "#2"
	},
	{
		x: 200,
		y: 400,
		type: "wallV",
		index: "#3"
	},
	{
		x: 200,
		y: 600,
		type: "wallH",
		index: "#4"
	},
	{
		x: game.width/2 - 500,
		y: 250,
		type: "wallH",
		index: "#5"
	},
	{
		x: game.width/2 - 100,
		y: game.height/2 - 280,
		type: "wallH",
		index: "#6"
	},
	{
		x: game.width/2 - 100,
		y: game.height/2 + 280,
		type: "wallH",
		index: "#7"
	},
	{
		x: game.width/2 - 200,
		y: game.height/2 - 100,
		type: "wallV",
		index: "#8"
	},
	{
		x: game.width/2 + 200,
		y: game.height/2 - 100,
		type: "wallV",
		index: "#9"
	},
	{
		x: game.width/2 - 55,
		y: game.height - 250,
		type: "wallV",
		index: "#10"
	},
	{
		x: game.width - 280,
		y: game.height/2 - 27,
		type: "wallV",
		index: "#11"
	},
	{
		x: game.width - 200,
		y: game.height - 280,
		type: "wallH",
		index: "#12"	
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