var Separated = new Phaser.Class({

    Extends: Phaser.Scene,
  
    initialize:
  
    function Separated ()
    {
        Phaser.Scene.call(this, { key: 'separated' });
    },
  
    preload: function ()
    {
        this.load.image('separated', 'assets/cutscenes/separated.png');
    },
  
    create: function ()
    {
        this.add.sprite(1200, 900, 'separated');
  
        this.input.once('pointerdown', function () {
  
            this.scene.start('main');
  
        }, this);
    }
  
  });