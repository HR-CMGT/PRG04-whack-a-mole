import '../css/style.css';
import {Actor, Engine, Font, Label, Vector} from "excalibur";
import {ResourceLoader, Resources} from './resources.js';

export class Game extends Engine {

    score = 0;
    scoreLabel;
    isMole;

    constructor() {
        super({
            width: 1024,
            height: 720,
        });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    onInitialize(engine) {
        console.log("initializing game");

        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(this.drawWidth / 2, 25),
            font: new Font({ size: 30 }),
        });
        this.add(this.scoreLabel);
    }

    startGame() {
        console.log("start de game!");
        this.clock.schedule(() => this.spawnPile(), 500);
    }

    spawnPile() {
        const pile = new Actor();
        this.add(pile);
        pile.on('pointerdown', (event) => this.handlePointerDown(event));
        
        this.isMole = Math.random() > 0.5;
        switch (this.isMole) {
            case true:
                pile.graphics.use(Resources.Mole.toSprite());
                break;
            case false:
                pile.graphics.use(Resources.DirtPile.toSprite());
                break;
        }

        pile.pos.x = Math.random() * this.drawWidth;
        pile.pos.y = Math.random() * this.drawHeight;
    }

    handlePointerDown(event) {
        console.log('pointer down!');
        if (this.isMole) {
            this.score++;
        } else {
            this.score--;
        }
        this.scoreLabel.text = `Score: ${this.score}`;
    }
}

new Game();
