import Phaser from "phaser";
import together from "./assets/cutscenes/together.png";


export default class TogetherScene extends Phaser.Scene {

    constructor() {
        super('TogetherScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("together", together);
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

       

    };

    update () {

        if (!this.continued && this.input.activePointer.isDown)
        {
            this.scene.start('CreditScene');
            this.continued = true;
        }
    }

}

export {TogetherScene};