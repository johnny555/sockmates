import Phaser from "phaser";
import {WashScene} from "./washScene";
import {TitleScene} from "./titleScene";
import {SeperatedScene} from "./seperatedScene";
import {CreditScene} from "./creditsScene";



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
  /*
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-example',
    width: '100%',
    height: '100%'
  },*/
  scene: [TitleScene, SeperatedScene, WashScene, CreditScene]
};

const game = new Phaser.Game(config);