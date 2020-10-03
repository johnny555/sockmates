import Phaser from "phaser";
import interior from "./assets/sprites/washinginterior.png";
import frame from "./assets/sprites/washingframe.png";
import sock from "./assets/sprites/sock.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 1200,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

var player;
var stars;
var bombs;
var boundary;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;


function preload() {
  this.load.image("interior", interior);
  this.load.image("frame", frame);
  this.load.image("sock", sock);

}

function create() {
    //  Create the background with frame overlay

    var bg = this.add.image(600,600, 'interior');
    bg.displayWidth=1000;
    bg.displayHeight=1000;

    this.add.image(600,600, 'frame');
    

    // Build the boundary
    boundary = create_boundary(this.physics.add.staticGroup());
    
 
    // add player
    player = this.physics.add.sprite(600, 600, 'sock').setScale(0.5);

    cursors = this.input.keyboard.createCursorKeys();


    // colliders
    this.physics.add.collider(player, boundary);

}

function update ()
{

  
  if (cursors.left.isDown)
  {
      player.setVelocityX(-160);

      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(160);

      player.anims.play('right', true);
  }
  else
  {
      player.setVelocityX(0);

      player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
      player.setVelocityY(-330);
  }
}




function create_boundary(boundary){ 

  boundary.alpha=0;

  var positions = [
    [120,600], // 90 deg
    [120,500],
    [150,400],
    [200,300],
    [250,200],
    [350,150],
    [450,120],
    [500,110],
    [600, 100], // 0 deg
    [700, 120],
    [800,150],
    [900,200],
    [1000, 250],
    [1000,350],
    [1050,450],
    [1100, 500],
    [1100, 600], // 90
    [1080, 700],
    [1050, 800],
    [1000, 900],
    [950, 1000],
    [850, 1050],
    [750, 1080],
    [700, 1100],
    [600, 1100], // 180 deg
    [500, 1100],
    [400, 1050],
    [300, 1000],
    [200, 950],
    [150,850],
    [120, 750],
    [100, 700]

]

  positions.forEach( (element, i) => {
    boundary.create(element[0], element[1], null, null, false).setScale(3.1).refreshBody();
  });
 
  return boundary;
}