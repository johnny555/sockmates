import Phaser from "phaser";
import seperated from "./assets/cutscenes/separated.png";

import touch from "./assets/buttons/touch.png";


export default class SeperatedScene extends Phaser.Scene {

    constructor() {
        super('SeperatedScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("seperated", seperated);
        this.load.image("touch", touch);
   
    }

    create () {
        this.add.image(600,600, 'seperated');
        
        this.touchNext = this.add.image(1100,950, 'touch').setScale(0.3)
        .setInteractive().on('pointerup', 
            (pointer, localX, localY, event) => { 
                this.continued = true;
                this.scene.start('LostScene');
            } );


        this.time.addEvent({ delay: 7000, callback: () => { 
            if (!this.continued) {
                this.scene.start('LostScene'); 
            };
        
        }, 
            callbackScope: this, loop: false });

    };

    update () {

 
    }

}

export {SeperatedScene};