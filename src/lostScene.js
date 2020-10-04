import Phaser from "phaser";
import lost from "./assets/cutscenes/missing.png";


export default class LostScene extends Phaser.Scene {

    constructor() {
        super('LostScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("lost", lost);
    }

    create () {
        this.add.image(600,600, 'lost');
        
        this.time.addEvent({ delay: 5000, callback: () => { 
            if (!this.continued) {
            this.scene.start('WashScene'); 
            this.continued = true;
        }

        }, 
            callbackScope: this, loop: false });

    };

    update () {

        if (!this.continued && this.input.activePointer.isDown)
        {
            this.scene.start('WashScene');
            this.continued = true;
        }
    }

}

export {LostScene};