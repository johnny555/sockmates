import Phaser from "phaser";
import credits from "./assets/cutscenes/credits.png";


import playagain from "./assets/buttons/playagain.png";


export default class CreditScene extends Phaser.Scene {

    constructor() {
        super('CreditScene');
    }

    preload() {
        this.load.image("credits", credits);

        this.load.image("playagain", playagain);

    }

    create () {
        var im = this.add.image(600,600, 'credits');
        //im.displayHeight=1200;
        //im.displayWidth=1200;

        this.playAgain = this.add.image(1100, 950, 'playagain').setScale(0.5)
        .setInteractive().on('pointerup', 
            (pointer, localX, localY, event) => { 
                this.continued = true;
                this.scene.start('WashScene');
            } );
    };

    update () {


    }

}

export {CreditScene};