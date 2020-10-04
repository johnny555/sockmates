import Phaser from "phaser";
import {WashScene} from "./washScene";
import {TitleScene} from "./titleScene";
import {SeperatedScene} from "./seperatedScene";
import {CreditScene} from "./creditsScene";
import {LostScene} from "./lostScene";
import {TogetherScene} from "./togetherScene";
import {ForeverApartScene} from "./foreverApartScene";



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
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    width: 1200,
    height: 1200
  },
  scene: [TitleScene, SeperatedScene, LostScene, WashScene, 
            TogetherScene, ForeverApartScene, CreditScene]
};

const game = new Phaser.Game(config);