import Match from "../entities/Match";
import Player from "../entities/Player";
import Set from "../entities/Set";

describe('Match', () => {
    it("can be created", () => {
        const id = 1;
        const player1 = new Player("Player A");
        const player2 = new Player("Player B");
        const match = new Match(1, player1, player2);

        expect(match.id).toBe(id);
        expect(match.player1).toBe(player1);
        expect(match.player2).toBe(player2);
    });

    it("is in progress when created", () => {
        const match = new Match(1, new Player("Player A"), new Player("Player B"));

        expect(match.inProgress()).toBeTruthy();
    });

    it("can have a new set", () => {
        const match = new Match(1, new Player("Player A"), new Player("Player B"));

        expect(match.newSet()).toBeInstanceOf(Set);
    });

    test("player can win", () => {
        const player1 = new Player("Player A");
        const player2 = new Player("Player B");
        const match = new Match( 1, player1, player2);

        expect(match.getWinner()).toBeNull();
        expect(match.getLoser()).toBeNull();

        for (let setNum = 1; setNum <= 2; setNum++) {
            const set = match.newSet();

            for (let gameNum = 1; gameNum <= 6; gameNum++) {
                const game = set.newGame();

                game.player2Scores(); // 0 - 15
                game.player1Scores(); // 15 - 15
                game.player2Scores(); // 15 - 30
                game.player1Scores(); // 30 - 30
                game.player1Scores(); // 40 - 30
                game.player1Scores(); // Game
            }
        }

        expect(match.getWinner()).toBe(player1);
        expect(match.getLoser()).toBe(player2);
        expect(match.inProgress()).toBeFalsy();
    });

    it("cannot have more than 3 sets", () => {
        const match = new Match(1, new Player("Player A"), new Player("Player B"));

        match.newSet();
        match.newSet();
        match.newSet();

        expect(() => match.newSet()).toThrow("There can only be a maximum of 3 sets in a match");
    });
});
