import Phaser from "phaser";
import title from "./assets/cutscenes/title.png";


export default class TitleScene extends Phaser.Scene {

    constructor() {
        super('TitleScene');
        this.continued = false;
    }

    preload() {
        this.continued = false;

        this.load.image("title", title);
    }

    create () {
        this.add.image(600,600, 'title');
        
        this.time.addEvent({ delay: 5000, callback: () => { 
            if (!this.continued) {
            this.scene.start('SeperatedScene'); 
            this.continued = true;
        }

        }, 
            callbackScope: this, loop: false });

    };

    update () {

        if (!this.continued && this.input.activePointer.isDown)
        {
            this.scene.start('SeperatedScene');
            this.continued = true;
        }
    }

}

export {TitleScene};