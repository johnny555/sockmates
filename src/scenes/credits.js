var Credits = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Credits ()
  {
      Phaser.Scene.call(this, { key: 'credits' });
  },

  preload: function ()
  {
      this.load.image('credits', 'assets/cutscenes/credits.png');
  },

  create: function ()
  {
      this.add.sprite(1200, 900, 'credits');
  }

});