import Phaser from "phaser";
import interior from "./assets/sprites/washinginterior.png";
import frame from "./assets/sprites/washingframe.png";
import sock from "./assets/sprites/sock.png";


import bra from "./assets/sprites/bra.png";
import glasses from "./assets/sprites/glasses.png";
import gloves from "./assets/sprites/gloves.png";
import invoice from "./assets/sprites/invoice.png";
import jacket from "./assets/sprites/jacket.png";
import keys from "./assets/sprites/keys.png";
import papers from "./assets/sprites/papers.png";

import phone from "./assets/sprites/phone.png";
import scarf from "./assets/sprites/scarf.png";
import shirt from "./assets/sprites/shirt.png";
import skirt from "./assets/sprites/skirt.png";
import underwear from "./assets/sprites/underwear.png";
import usb from "./assets/sprites/usb.png";




import jeans from "./assets/sprites/jeans.png";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 1200,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 100 },
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
var stuff;
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

  this.load.image("bra", bra);
  this.load.image("glasses", glasses);
  this.load.image("gloves", gloves);
  this.load.image("invoice", invoice);
  this.load.image("jacket", jacket);
  this.load.image("keys", keys);
  this.load.image("papers", papers);
  this.load.image("phone", phone);
  this.load.image("scarf", scarf);
  this.load.image("shirt", shirt);
  this.load.image("skirt", skirt);
  this.load.image("underwear", underwear);
  this.load.image("usb", usb);

  this.load.image("jeans", jeans);
}

function create_stuff(stuff) {

  /*stuff.create(400,200,"jeans").setScale(0.5);
    
  stuff.create(700,600,"bra").setScale(0.5);
  stuff.create(400,800,"skirt").setScale(1);
  stuff.create(800, 300,"underwear").setScale(0.5);
  stuff.create(900,800,"usb").setScale(0.5);
  stuff.create(700,100,"phone").setScale(0.5);
  */

  var stuff_list = ['bra','glasses','gloves','invoice','jacket',
                    'keys','papers','phone','scarf','shirt','skirt','underwear',
                  'usb'];
  stuff_list.forEach((name) => {
    var x_pos = Phaser.Math.Between(200,900);
    var y_pos = Phaser.Math.Between(200,900);
    stuff.create(x_pos, y_pos, name).setScale(0.5);
  });

  return stuff;
}

function create() {
    //  Create the background with frame overlay

    var bg = this.add.image(600,600, 'interior');
    bg.displayWidth=1000;
    bg.displayHeight=1000;

    this.add.image(600,600, 'frame');
    

    // Build the boundary
    boundary = create_boundary(this.physics.add.staticGroup());
    

    // Build the other stuff
    stuff = create_stuff(this.physics.add.group());

 
    // add player
    player = this.physics.add.sprite(600, 600, 'sock').setScale(0.5);

    cursors = this.input.keyboard.createCursorKeys();


    // colliders
    this.physics.add.collider(player, boundary);
    this.physics.add.collider(stuff, boundary);

    this.physics.add.collider(player, stuff);
    this.physics.add.collider(stuff, stuff);
    
    // logic

    this.physics.add.overlap(player, boundary, bounce, null, this);
    this.physics.add.overlap(stuff, boundary, bounce, null, this);
    //this.physics.add.overlap(stuff, player, bounce, null, this);

    //this.physics.add.overlap(player, stuff, bounce, null, this);
    

}


function bounce(obj1, obj2) {
  spin(obj1, 1);
  //spin(obj2);


}

// spin the object. 
function spin(obj, multi=1) {
  var slow_speed= multi* 160;
  var high_speed= multi*320;

  //bottom left
  if (obj.x <= 600 && obj.y >= 600) {
    obj.setVelocityX(-slow_speed);
    obj.setVelocityY(-high_speed);
  };

//bottom right
if (obj.x >= 600 && obj.y >= 600) {
  obj.setVelocityX(-slow_speed);
  obj.setVelocityY(-slow_speed);
};

//top left
if (obj.x <= 600 && obj.y <= 600) {
  obj.setVelocityX(high_speed);
  obj.setVelocityY(slow_speed);
};
//top right
if (obj.x >= 600 && obj.y <= 600) {
  obj.setVelocityX(slow_speed);
  obj.setVelocityY(high_speed);
};

}

function apply_current(obj) {
  var slow_accel = 100;
  var high_accel = 1000;
  
  //bottom left
  if (obj.x <= 600 && obj.y >= 600) {
    obj.setAccelerationX(-slow_accel);
    obj.setAccelerationY(-high_accel);
  };

  //bottom right
  if (obj.x >= 600 && obj.y >= 600) {
    obj.setAccelerationX(-slow_accel);
    obj.setAccelerationY(-slow_accel);
  };

  //top left
  if (obj.x <= 600 && obj.y <= 600) {
    obj.setAccelerationX(high_accel);
    obj.setAccelerationY(slow_accel);
  };
  //top right
  if (obj.x >= 600 && obj.y <= 600) {
    obj.setAccelerationX(slow_accel);
    obj.setAccelerationY(high_accel);
  };


}

function update ()
{

  stuff.children.entries.forEach( apply_current);

  apply_current(player);

  
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
      player.setVelocityY(-330*2);
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