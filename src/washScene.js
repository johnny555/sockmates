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

import bubbles from "./assets/sprites/bubbles.png";

import arrow from "./assets/buttons/arrow.png";


import washingloop from "./assets/audio/washingloop.mp3";




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
        this.audio_list = {};
        this.player;
        this.stuff;
        this.boundary;
        this.timerText;
        this.scoreText;
        this.goal;
        this.sockmate;
        this.bg;
        this.fg;
        this.nextSceneTimerStarted = false;
        this.goal_destroyed = false;
        this.washCycleOver = false;
        this.gameOver = false;
        this.score = 10;

        this.bubblesGroup;
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

        this.load.image("bubbles", bubbles);

        this.load.image("arrow", arrow);


        this.load.audio('washingloop', washingloop);
        this.sound.decodeAudio('key', washingloop);
    }

    create () 
    {

        this.nextSceneTimerStarted = false;
        this.goal_destroyed = false;
        this.washCycleOver = false;
        this.gameOver = false;
        this.score = 10;

        //  Create the background with frame overlay
        this.audio_list.washingloop = this.sound.add('washingloop', {loop: true});
        this.audio_list.washingloop.play();

        this.cameras.main.setBackgroundColor('rgba(220, 220, 220, 1)');

        this.bg = this.add.image(600,600, 'interior');
        this.bg.displayWidth=1000;
        this.bg.displayHeight=1000;
        this.fg = this.add.image(600, 600, 'foreground');
        this.fg.displayWidth=1100;
        this.fg.displayHeight=1100;

        this.initialTime = 60;


        this.scoreText = this.add.text(50,50, 'Unwind your sockmate!', 
                { fontSize: '32px', fill: '#000' });

        this.timerText = this.add.text(800, 50, 
        'Wash ends: ' + formatTime(this.initialTime), 
                    { fontSize: '32px', fill: '#f00' });

        this.goal = this.physics.add.staticImage(600,600, 'sock').setScale(0.3).refreshBody();
        this.sockmate = this.physics.add.sprite(200, 200, 'sock')
                        .setScale(0.3)
                        .setBounce(0.7)
                        .disableBody(true, true);


        // Build the boundary
        this.boundary = create_boundary(this.physics.add.staticGroup());

        // Add some bubbles

        this.bubblesGroup = this.physics.add.group();

        [1,2,3,4,5,6].forEach((deets) => {
            var x_pos = Phaser.Math.Between(200,900);
            var y_pos = Phaser.Math.Between(200,900);
            this.bubblesGroup.create(x_pos, y_pos, 'bubbles').setScale(0.3)
                .setBounce(0.3, 0.3);
          });
        

        // Build the other stuff
        this.stuff = create_stuff(this.physics.add.group());


        // add player
        var x_pos = Phaser.Math.Between(200,900);
        var y_pos = Phaser.Math.Between(800,900);
        this.player = this.physics.add.sprite(x_pos, y_pos, 'sock').setScale(0.3).setBounce(0.7);


        // Frame ontop
        this.add.image(600,600, 'frame');


        // left and right arrows.

        this.left = this.add.image(150,1050, 'arrow').setScale(0.5);
        
        this.right = this.add.image(1050,1050, 'arrow').setScale(0.5);
        this.right.flipX = true;

        // colliders
        this.physics.add.collider(this.player, this.boundary);
        this.physics.add.collider(this.stuff, this.boundary);

        this.physics.add.collider(this.player, this.stuff);
        this.physics.add.collider(this.stuff, this.stuff);


        this.physics.add.collider(this.sockmate, this.stuff);
        this.physics.add.collider(this.sockmate, this.player);
        this.physics.add.collider(this.sockmate, this.boundary);

        this.physics.add.collider(this.bubblesGroup, this.boundary);
        this.physics.add.collider(this.bubblesGroup, this.bubblesGroup);
        

        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.timerTick, callbackScope: this, loop: true });

        // logic

        this.physics.add.overlap(this.player, this.goal, this.add_score, null, this);



    }

    update () {

        if (this.washCycleOver) {
            this.gameOver = true;
          }
        
          if (this.score <= 0) {
          
            this.scoreText.setText('You freed your sock mate!');
            if (!this.goal_destroyed) {      
              this.goal.destroy();
              this.goal_destroyed=true;
              this.sockmate.enableBody(false, 600,600,true, true);    
              this.sockmate.setPosition(600,600);
            }
            if (! this.nextSceneTimerStarted) {
                this.time.addEvent({ delay: 5000, callback: () => { 
                    this.audio_list.washingloop.stop();
                    this.scene.start('TogetherScene'); }, 
              
                callbackScope: this, loop: false });
                this.nextSceneTimerStarted = true;
            }
          }
        
          if (this.gameOver)
          { 
            if (this.score > 0) {
              this.scoreText.setText('Oh no! Wash cycle is over!');
              this.audio_list.washingloop.stop();
            }
            if (! this.nextSceneTimerStarted) {
                this.time.addEvent({ delay: 3000, callback: () => { this.scene.start('ForeverApartScene'); }, 
              
                callbackScope: this, loop: false });
                this.nextSceneTimerStarted = true;
            }
            return;
          }
        
          this.stuff.children.entries.forEach( apply_current);
          this.bubblesGroup.children.entries.forEach( apply_current);
        
          apply_current(this.player);
          

          this.bg.rotation += 0.01;
          this.fg.rotation += 0.01;
          
          if (this.input.activePointer.isDown)
          {
            if (this.input.activePointer.position.x <= 600)
            {
                this.player.setVelocityX(-160);
                this.player.flipX = false;
            } else 
            {
              this.player.setVelocityX(160);
              this.player.flipX = true;
            }
          }
        
    }

    add_score(player, goal) {
        this.score -= 0.02;
        this.scoreText.setText('Hover to unwind for: \n' + (Math.ceil(this.score)) + ' seconds!');
        this.goal.rotation-=0.01;
      
      }
    
    timerTick ()
    {
    if (!this.washCycleOver) {
      this.initialTime -= 1; // One second
      this.timerText.setText('Wash ends: '  + formatTime(this.initialTime));
  
      if (this.initialTime <= 0) {
        this.washCycleOver = true;
      }
    }
  }

}

export  {WashScene} ;