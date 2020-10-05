import Phaser from "phaser";
import together from "./assets/cutscenes/together.png";

import credits from "./assets/buttons/credits.png";
import playagain from "./assets/buttons/playagain.png";



export default class TogetherScene extends Phaser.Scene {

    constructor() {
        super('TogetherScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("together", together);
        this.load.image("creditsButton", credits);
        this.load.image("playagain", playagain);

    }

    create () {
        this.add.image(600,600, 'together');
        
        this.time.addEvent({ delay: 5000, callback: () => { 
            if (!this.continued) {
            this.scene.start('CreditScene'); 
            this.continued = true;
        }

        }, 
            callbackScope: this, loop: false });

        this.playAgain = this.add.image(1050, 300, 'playagain').setScale(0.5)
        .setInteractive().on('pointerup', 
            (pointer, localX, localY, event) => { 
                this.continued = true;
                this.scene.start('WashScene');
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

export {TogetherScene};