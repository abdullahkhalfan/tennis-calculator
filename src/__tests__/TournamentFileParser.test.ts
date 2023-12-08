import TournamentFileParser from "../TournamentFileParser";

describe("Tournament File Parser", () => {
    it("can parse match id", async () => {
        const tournamentFileParser = new TournamentFileParser("data/full_tournament.txt");

        await tournamentFileParser.parse();

        expect(tournamentFileParser.parsedMatches[0]?.id).toBe(1);
    });

    it("can parse match players", async () => {
        const tournamentFileParser = new TournamentFileParser("data/full_tournament.txt");

        await tournamentFileParser.parse();

        expect(tournamentFileParser.parsedMatches[0]?.player1Name).toBe("Person A");
        expect(tournamentFileParser.parsedMatches[0]?.player2Name).toBe("Person B");
    });

    it("can parse a score", async () => {
        const tournamentFileParser = new TournamentFileParser("data/full_tournament.txt");

        await tournamentFileParser.parse();

        expect(tournamentFileParser.parsedMatches[0]?.scores?.[0]).toBe(0);
    });

    it("can convert to real match objects", async () => {
        const tournamentFileParser = new TournamentFileParser("data/full_tournament.txt");

        await tournamentFileParser.parse();

        const matches = tournamentFileParser.toMatches();

        expect(matches[0].id).toBe(1);
        expect(matches[0].player1.name).toBe("Person A");
        expect(matches[0].player2.name).toBe("Person B");
        expect(matches[0].getWinner()).toBe(matches[0].player1);
        expect(matches[0].getLoser()).toBe(matches[0].player2);
    });
});