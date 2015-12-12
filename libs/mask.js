var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update : update });

function preload() {
    game.load.image('trsi', 'assets/pics/trsipic1_lazur.jpg');
}

var pic;
var cropRect;
var container;
function create() {

    pic = game.add.image(0, 0, 'trsi');
    container = game.add.group();
    container.x = 50;
    container.y = 50;
    pic.anchor.setTo(0, 0);
    var maskGraphics = game.add.graphics(0,0);
maskGraphics.beginFill(0xffffff);
maskGraphics.drawRect(100 , 100, 500, 500); 
    
    container.add(pic);
    container.mask = maskGraphics;
    console.log(container.width, container.height);

}

function update () {

}