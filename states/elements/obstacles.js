/**
	OBSTACLE CREATIONS FOR ALL SECTORS 
**/

function createObstacles(type) {
	if (type === "gravity") {
		createSectorGravity();
	}
}

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
		blocks.add(block);
	}
}