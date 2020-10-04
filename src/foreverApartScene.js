import Phaser from "phaser";
import alone from "./assets/cutscenes/alone.png";

import credits from "./assets/buttons/credits.png";
import playagain from "./assets/buttons/playagain.png";


export default class ForeverApartScene extends Phaser.Scene {

    constructor() {
        super('ForeverApartScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("alone", alone);
        this.load.image("creditsButton", credits);
        this.load.image("playagain", playagain);

    }

    create () {
        this.add.image(600,600, 'alone');


        this.playAgain = this.add.image(1050, 300, 'playagain').setScale(0.5)
        .setInteractive().on('pointerup', 
            (pointer, localX, localY, event) => { 
                this.continued = true;
                this.scene.start('TitleScene');
            } );
;

        this.creditsButton = this.add.image(1050,500, 'creditsButton').setScale(0.5)
                        .setInteractive().on('pointerup', 
                            (pointer, localX, localY, event) => { 
                                this.continued = true;
                                this.scene.start('CreditScene');
                            } );

 

    };

    update () {

    }

}

export {ForeverApartScene};