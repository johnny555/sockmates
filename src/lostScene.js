import Phaser from "phaser";
import lost from "./assets/cutscenes/missing.png";
import touch from "./assets/buttons/touch.png";


export default class LostScene extends Phaser.Scene {

    constructor() {
        super('LostScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("lost", lost);
        this.load.image("touch", touch);

    }

    create () {
        this.add.image(600,600, 'lost');
        
        this.touchNext = this.add.image(1100,950, 'touch').setScale(0.3)
        .setInteractive().on('pointerup', 
            (pointer, localX, localY, event) => { 
                this.continued = true;
                this.scene.start('WashScene');
            } );

        this.time.addEvent({ delay: 5000, callback: () => { 
            if (!this.continued) {
            this.scene.start('WashScene'); 
            this.continued = true;
        }

        }, 
            callbackScope: this, loop: false });

    };

    update () {

 
    }

}

export {LostScene};