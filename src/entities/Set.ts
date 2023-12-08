import Game from "./Game";
import Player from "./Player";

export default class Set {
    /**
     * There can only be a maximum of 11 games in a set.
     */
    protected _games: Game[] = [];

    public constructor(
        public readonly player1: Player,
        public readonly player2: Player
    ){}

    get games(): Game[] {
        return this._games;
    }

    public newGame(): Game {
        if (this._games.length >= 11) {
            throw new Error("There can only be a maximum of 11 games in a set");
        }

        const game = new Game(this.player1, this.player2);

        this._games.push(game);

        return game;
    }

    /**
     * The winner of the set would be the first player to win 6 games.
     */
    public getWinner(): null | Player {

        let player1GamesWon = 0;
        let player2GamesWon = 0;

        for (const game of this._games) {
            const winner = game.getWinner();

            // If any of the games doesn't have a winner yet,
            // we know we don't have a winner yet for the set.
            if (!winner) {
                return null;
            }

            if (winner === this.player1) {
                player1GamesWon++;
            }
            else if (winner === this.player2) {
                player2GamesWon++;
            }
        }

        if (player1GamesWon >= 6) {
            return this.player1;
        }

        if (player2GamesWon >= 6) {
            return this.player2;
        }

        return null;
    }

    /**
     * Whether the set is in progress (no winner yet) or not
     */
    public inProgress(): boolean {
        return !this.getWinner();
    }
}