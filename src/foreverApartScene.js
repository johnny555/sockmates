import Phaser from "phaser";
import alone from "./assets/cutscenes/alone.png";


export default class ForeverApartScene extends Phaser.Scene {

    constructor() {
        super('ForeverApartScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("alone", alone);
    }

    create () {
        this.add.image(600,600, 'alone');
        
        this.time.addEvent({ delay: 5000, callback: () => { 
            if (!this.continued) {
            this.scene.start('CreditScene'); 
            this.continued = true;
        }

        }, 
            callbackScope: this, loop: false });


    };

    update () {

        if (!this.continued && this.input.activePointer.isDown)
        {
            this.scene.start('CreditScene');
            this.continued = true;
        }
    }

}

export {ForeverApartScene};