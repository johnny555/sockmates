import Phaser from "phaser";
import credits from "./assets/cutscenes/credits.png";



export default class CreditScene extends Phaser.Scene {

    constructor() {
        super('CreditScene');
    }

    preload() {
        this.load.image("credits", credits);
    }

    create () {
        var im = this.add.image(600,600, 'credits');
        //im.displayHeight=1200;
        //im.displayWidth=1200;

    };

    update () {

    }

}

export {CreditScene};