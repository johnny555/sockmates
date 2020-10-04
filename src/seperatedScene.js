import Phaser from "phaser";
import seperated from "./assets/cutscenes/separated.png";



export default class SeperatedScene extends Phaser.Scene {

    constructor() {
        super('SeperatedScene');
    }

    preload() {
        this.load.image("seperated", seperated);
    }

    create () {
        this.add.image(600,600, 'seperated');
        
        this.time.addEvent({ delay: 2000, callback: () => { this.scene.start('WashScene'); }, 
            callbackScope: this, loop: false });

    };

    update () {

    }

}

export {SeperatedScene};