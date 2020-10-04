import Phaser from "phaser";
import title from "./assets/cutscenes/title.png";



export default class TitleScene extends Phaser.Scene {

    constructor() {
        super('TitleScene');
    }

    preload() {
        this.load.image("title", title);
    }

    create () {
        this.add.image(600,600, 'title');
        
        this.time.addEvent({ delay: 2000, callback: () => { this.scene.start('SeperatedScene'); }, 
            callbackScope: this, loop: false });

    };

    update () {

    }

}

export {TitleScene};