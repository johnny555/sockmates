import Phaser from "phaser";
import seperated from "./assets/cutscenes/separated.png";



export default class SeperatedScene extends Phaser.Scene {

    constructor() {
        super('SeperatedScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("seperated", seperated);
    }

    create () {
        this.add.image(600,600, 'seperated');
        
        this.time.addEvent({ delay: 5000, callback: () => { 
            if (!this.continued) {
                this.scene.start('LostScene'); 
            };
        
        }, 
            callbackScope: this, loop: false });

    };

    update () {

        if (!this.continued && this.input.activePointer.isDown)
        {
            this.scene.start('LostScene');
            this.continued = true;
        }
    }

}

export {SeperatedScene};