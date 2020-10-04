import Phaser from "phaser";
import title from "./assets/cutscenes/title.png";

import touch from "./assets/buttons/touch.png";


export default class TitleScene extends Phaser.Scene {

    constructor() {
        super('TitleScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("title", title);
        this.load.image("touch", touch);
        
    }

    create () {
        this.add.image(600,600, 'title');
        
        this.touchNext = this.add.image(1100,950, 'touch').setScale(0.3)
        .setInteractive().on('pointerup', 
            (pointer, localX, localY, event) => { 
                this.continued = true;
                this.scene.start('SeperatedScene');
            } );


        this.time.addEvent({ delay: 5000, callback: () => { 
            if (!this.continued) {
            this.scene.start('SeperatedScene'); 
            this.continued = true;
        }

        }, 
            callbackScope: this, loop: false });

    };

    update () {


    }

}

export {TitleScene};