import Player from "../entities/Player";

describe("Player", () => {
    it("can be created", () => {
        const name = "Player Z";
        const player = new Player("Player Z");

        expect(player.name).toBe(name);
    });
});