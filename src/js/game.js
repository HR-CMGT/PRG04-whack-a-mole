import '../css/style.css';
import { Actor, Engine, Font, Label, Vector } from "excalibur";
import { ResourceLoader, Resources } from './resources.js';

export class Game extends Engine {

    score = 0;
    scoreLabel;

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

        for (let i = 0; i < 10; i++) {
            this.spawnPile();
        }
    }

    spawnPile() {
        const pile = new Actor();
        this.add(pile);
        const isMole = Math.random() > 0.5;

        if (isMole) {
            pile.graphics.use(Resources.Mole.toSprite());
        } else {
            pile.graphics.use(Resources.DirtPile.toSprite());
        }
        pile.pos.x = Math.random() * this.drawWidth;

        pile.pos.y = Math.random() * this.drawHeight;

        pile.on('pointerdown', () => {
            if (isMole) {
                this.score++;
            } else {
                this.score--;
            }
            this.scoreLabel.text = `Score: ${this.score}`;
        });
    }
}

new Game();
