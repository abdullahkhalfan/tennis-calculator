import Player from "./Player";
import Set from "./Set";

export default class Match {
    /**
     * There can only be a maximum of 3 sets in a match.
     */
    protected _sets: Set[] = [];

    constructor(
        public readonly id: number,
        public readonly player1: Player,
        public readonly player2: Player
    ) {}

    get sets(): Set[] {
        return this._sets;
    }

    public newSet(): Set {
        if (this._sets.length >= 3) {
            throw new Error("There can only be a maximum of 3 sets in a match");
        }

        const set = new Set(this.player1, this.player2);

        this._sets.push(set);

        return set;
    }

    /**
     * The winner of the match would be the first player to win 2 sets.
     */
    public getWinner(): null | Player {

        let player1SetsWon = 0;
        let player2SetsWon = 0;

        for (const set of this._sets) {
            const winner = set.getWinner();

            // If any of the sets doesn't have a winner yet,
            // we know we don't have a winner yet for the match.
            if (!winner) {
                return null;
            }

            if (winner === this.player1) {
                player1SetsWon++;
            }
            else if (winner === this.player2) {
                player2SetsWon++;
            }
        }

        if (player1SetsWon >= 2) {
            return this.player1;
        }

        if (player2SetsWon >= 2) {
            return this.player2;
        }

        return null;
    }

    public getLoser(): null | Player {
        const winner = this.getWinner();

        if (winner === this.player1) {
            return this.player2;
        }
        else if (winner === this.player2) {
            return this.player1;
        }

        return null;
    }

    /**
     * Whether the match is in progress (no winner yet) or not
     */
    public inProgress(): boolean {
        return !this.getWinner();
    }
}