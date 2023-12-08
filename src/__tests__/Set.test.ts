import Game from "../entities/Game";
import Player from "../entities/Player";
import Set from "../entities/Set";

describe("Set", () => {
    it("can be created", () => {
        const player1 = new Player("Player A");
        const player2 = new Player("Player B");
        const set = new Set(player1, player2);

        expect(set.player1).toBe(player1);
        expect(set.player2).toBe(player2);
    });

    it("is in progress when created", () => {
        const set = new Set(new Player("Player A"), new Player("Player B"));

        expect(set.inProgress()).toBeTruthy();
    });

    it("can have a new game", () => {
        const set = new Set( new Player("Player A"), new Player("Player B"));

        expect(set.newGame()).toBeInstanceOf(Game);
    });

    test("player can win", () => {
        const player1 = new Player("Player A");
        const player2 = new Player("Player B");
        const set = new Set( player1, player2);

        expect(set.getWinner()).toBeNull();

        for (let gameNum = 1; gameNum <= 6; gameNum++) {
            const game = set.newGame();

            game.player1Scores(); // 15 - 0
            game.player2Scores(); // 15 - 15
            game.player1Scores(); // 30 - 15
            game.player1Scores(); // 40 - 15
            game.player1Scores(); // Game
        }

        expect(set.getWinner()).toBe(player1);
        expect(set.inProgress()).toBeFalsy();
    });

    it("cannot have more than 11 games", () => {
        const set = new Set( new Player("Player A"), new Player("Player B"));

        for (let gameNum = 0; gameNum < 11; gameNum++) {
            set.newGame();
        }

        expect(() => set.newGame()).toThrow("There can only be a maximum of 11 games in a set");
    });
});