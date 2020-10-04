import Phaser from "phaser";

import interior from "./assets/sprites/washinginterior.png";
import foreground from "./assets/sprites/washingforeground.png";
import frame from "./assets/sprites/washingframe.png";
import sock from "./assets/sprites/sock.png";
import bra from "./assets/sprites/bra.png";
import glasses from "./assets/sprites/glasses.png";
import gloves from "./assets/sprites/gloves.png";
import invoice from "./assets/sprites/invoice.png";
import jacket from "./assets/sprites/jacket.png";
import jeans from "./assets/sprites/jeans.png";
import keys from "./assets/sprites/keys.png";
import papers from "./assets/sprites/papers.png";
import phone from "./assets/sprites/phone.png";
import scarf from "./assets/sprites/scarf.png";
import shirt from "./assets/sprites/shirt.png";
import skirt from "./assets/sprites/skirt.png";
import underwear from "./assets/sprites/underwear.png";
import usb from "./assets/sprites/usb.png";


var player;
var stuff;
var boundary;
var cursors;
var score = 10;
var timedEvent;
var timerText;
var washCycleOver = false;
var gameOver = false;
var scoreText;
var goal;
var goal_destroyed = false;
var sockmate;
var bg;
var fg;
var nextSceneTimerStarted = false;


// Helper functions


function create_stuff(stuff) {

    var global_scaling = 0.35;
    var bounce_factor = 0.7;
  
    // name of item and a relative scaling factor.
    var stuff_list =  [
      ['bra', 1],
      ['glasses', 0.5],
      ['gloves',1],
      ['invoice',0.5],
      ['jacket', 1],
      ['jeans', 1],
      ['keys', 0.5],
      ['papers', 0.5],
      ['phone',1],
      ['scarf',2],
      ['shirt',1.5],
      ['skirt',2],
      ['underwear',1],
      ['usb', 1]];
  
    stuff_list.forEach((deets) => {
      var x_pos = Phaser.Math.Between(200,900);
      var y_pos = Phaser.Math.Between(200,900);
      stuff.create(x_pos, y_pos, deets[0]).setScale(global_scaling * deets[1])
          .setBounce(bounce_factor, bounce_factor);
    });
  
    return stuff;
}
  
function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}


function add_score(player, goal) {
    score -= 0.02;
    scoreText.setText('hold on for : ' + (Math.ceil(score)) + ' seconds!');
    goal.rotation-=0.01;
  
  }
  
  function timerTick ()
  {
    if (!washCycleOver) {
      this.initialTime -= 1; // One second
      timerText.setText('Wash ends: '  + formatTime(this.initialTime));
  
      if (this.initialTime <= 0) {
        washCycleOver = true;
      }
    }
  }
  
  function apply_current(obj) {
    var slow_accel = 100;
    var high_accel = 500;
    
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
  


export default class WashScene extends Phaser.Scene {

    constructor () {
        
        super("WashScene");
    }

    preload ()
    {
        this.load.image("interior", interior);
        this.load.image("frame", frame);
        this.load.image("foreground", foreground);
        
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

    create () 
    {
        //  Create the background with frame overlay

        bg = this.add.image(600,600, 'interior');
        bg.displayWidth=1000;
        bg.displayHeight=1000;
        fg = this.add.image(600, 600, 'foreground');
        fg.displayWidth=1100;
        fg.displayHeight=1100;
        this.initialTime = 60;

        this.add.image(600,600, 'frame');

        scoreText = this.add.text(50,50, 'Hold onto your sockmate!', 
                { fontSize: '32px', fill: '#FFF' });

        timerText = this.add.text(800, 50, 
        'Wash ends: ' + formatTime(this.initialTime), 
                    { fontSize: '32px', fill: '#F00' });

        goal = this.physics.add.staticImage(600,600, 'sock').setScale(0.3).refreshBody();
        sockmate = this.physics.add.sprite(200, 200, 'sock')
                        .setScale(0.3)
                        .setBounce(0.7)
                        .disableBody(true, true);


        // Build the boundary
        boundary = create_boundary(this.physics.add.staticGroup());


        // Build the other stuff
        stuff = create_stuff(this.physics.add.group());


        // add player
        var x_pos = Phaser.Math.Between(200,900);
        var y_pos = Phaser.Math.Between(800,900);
        player = this.physics.add.sprite(x_pos, y_pos, 'sock').setScale(0.3).setBounce(0.7);

        cursors = this.input.keyboard.createCursorKeys();

        // colliders
        this.physics.add.collider(player, boundary);
        this.physics.add.collider(stuff, boundary);

        this.physics.add.collider(player, stuff);
        this.physics.add.collider(stuff, stuff);


        this.physics.add.collider(sockmate, stuff);
        this.physics.add.collider(sockmate, player);
        this.physics.add.collider(sockmate, boundary);

        timedEvent = this.time.addEvent({ delay: 1000, callback: timerTick, callbackScope: this, loop: true });

        // logic

        this.physics.add.overlap(player, goal, add_score, null, this);

        //this.physics.add.overlap(stuff, goal, minus_score, null, this);


    }

    update () {

        if (washCycleOver) {
            gameOver = true;
          }
        
          if (score <= 0) {
          
            scoreText.setText('You freed your sock mate! You WIN!');
            if (!goal_destroyed) {      
              goal.destroy();
              goal_destroyed=true;
              sockmate.enableBody(false, 600,600,true, true);    
              sockmate.setPosition(600,600);
            }
            if (! nextSceneTimerStarted) {
                this.time.addEvent({ delay: 5000, callback: () => { this.scene.start('CreditScene'); }, 
              
                callbackScope: this, loop: false });
                nextSceneTimerStarted = true;
            }
          }
        
          if (gameOver)
          { 
            if (score > 0) {
              scoreText.setText('Your sock mate is forever trapped, \n You Lose!!');
            }
            if (! nextSceneTimerStarted) {
                this.time.addEvent({ delay: 3000, callback: () => { this.scene.start('CreditScene'); }, 
              
                callbackScope: this, loop: false });
                nextSceneTimerStarted = true;
            }
            return;
          }
        
          stuff.children.entries.forEach( apply_current);
        
          apply_current(player);
          bg.rotation += 0.01;
          
          if (this.input.activePointer.isDown)
          {
            if (this.input.activePointer.position.x <= 600)
            {
                player.setVelocityX(-160);
                player.flipX = false;
            } else 
            {
              player.setVelocityX(160);
              player.flipX = true;
            }
          }

        
        /* if (cursors.up.isDown && player.body.touching.down)
          {
              player.setVelocityY(-330*2);
          } */
        
        
    }


}

export  {WashScene} ;