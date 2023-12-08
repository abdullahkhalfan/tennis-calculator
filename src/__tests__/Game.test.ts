import Game from "../entities/Game";
import Player from "../entities/Player";

describe("Game", () => {
    it("can be created", () => {
        const player1 = new Player("Player A");
        const player2 = new Player("Player B");
        const game = new Game(player1, player2);

        expect(game.player1).toBe(player1);
        expect(game.player2).toBe(player2);
    });

    it("is in progress when created", () => {
        const game = new Game(new Player("Player A"), new Player("Player B"));

        expect(game.inProgress()).toBeTruthy();
    });

    test("players can score", () => {
        const game = new Game(new Player("Player A"), new Player("Player B"));

        game.player1Scores();
        game.player2Scores();

        expect(game.player1Score).toEqual(1);
        expect(game.player2Score).toEqual(1);
    });

    test("player can win", () => {
        const player1 = new Player("Player A");
        const player2 = new Player("Player B");
        const game = new Game(player1, player2);

        game.player1Scores(); // 15 - 0
        game.player2Scores(); // 15 - 15
        game.player1Scores(); // 30 - 15
        game.player1Scores(); // 40 - 15
        game.player1Scores(); // Game

        expect(game.getWinner()).toBe(player1);
        expect(game.inProgress()).toBeFalsy();
    });

    test("player must win by 2", () => {
        const player1 = new Player("Player A");
        const player2 = new Player("Player B");
        const game = new Game(player1, player2);

        game.player1Scores(); // 15 - 0
        game.player2Scores(); // 15 - 15
        game.player1Scores(); // 30 - 15
        game.player1Scores(); // 40 - 15
        game.player2Scores(); // 40 - 30
        game.player2Scores(); // Deuce

        expect(game.getWinner()).toBeNull();

        game.player1Scores(); // Advantage

        expect(game.getWinner()).toBeNull();

        game.player2Scores(); // Deuce
        game.player2Scores(); // Advantage
        game.player2Scores(); // Game

        expect(game.getWinner()).toBe(player2);
        expect(game.inProgress()).toBeFalsy();
    });
});