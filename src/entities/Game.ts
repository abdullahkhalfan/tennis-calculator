import Player from "./Player";

export default class Game {
    protected _player1Score: number = 0;
    protected _player2Score: number = 0;

    public constructor(
        public readonly player1: Player,
        public readonly player2: Player
    ){}

    get player1Score(): number {
        return this._player1Score;
    }

    get player2Score(): number {
        return this._player2Score;
    }

    public player1Scores(): void {
        if (this.inProgress()) {
            this._player1Score++;
        }
    }

    public player2Scores(): void {
        if (this.inProgress()) {
            this._player2Score++;
        }
    }

    /**
     * The winner of a game would have at least 4 points and win by 2.
     */
    public getWinner(): null | Player {
        if (this._player1Score >=4 && this._player1Score >= this._player2Score + 2) {
            return this.player1;
        }
        else if (this._player2Score >=4 && this._player2Score >= this._player1Score + 2) {
            return this.player2;
        }

        return null;
    }

    /**
     * Whether the game is in progress (no winner yet) or not
     */
    public inProgress(): boolean {
        return !this.getWinner();
    }
}