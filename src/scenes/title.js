var Title = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Title ()
  {
      Phaser.Scene.call(this, { key: 'title' });
  },

  preload: function ()
  {
      this.load.image('title', 'assets/cutscenes/title.png');
  },

  create: function ()
  {
      this.add.sprite(1200, 900, 'title');

      this.input.once('pointerdown', function () {

          console.log('From Title to Main');

          this.scene.start('main');

      }, this);
  }

});