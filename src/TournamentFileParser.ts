import { promises } from "fs";
import Match from "./entities/Match";
import Player from "./entities/Player";

export type ParsedMatch = {
    id: number,
    player1Name?: string,
    player2Name?: string,
    scores: number[]
}

export default class TournamentFileParser {
    protected _parsedMatches: ParsedMatch[] = [];

    public constructor(
        protected _filePath: string
    ){}

    public get parsedMatches(): ParsedMatch[] {
        return this._parsedMatches;
    }

    public async parse(): Promise<void> {
        const data = await promises.readFile(this._filePath);

        this.parseFile(data.toString());
    }

    protected parseFile(data: string): void {
        data.split("\n")
            .forEach(line => {
                this.parseLine(line);
            })
        ;
    }

    protected parseLine(line: string): void {
        const foundHeader = line.match(/^match: ([0-9]+)$/i);

        if (foundHeader) {
            this._parsedMatches.push({
                id: parseInt(foundHeader[1]),
                scores: [],
            });

            return;
        }

        const lastParsedMatch = this._parsedMatches[this._parsedMatches.length - 1];

        if (lastParsedMatch) {

            const foundPlayers = line.match(/^([a-z ]+) vs ([a-z ]+)$/i);

            if (foundPlayers) {
                lastParsedMatch.player1Name = foundPlayers[1];
                lastParsedMatch.player2Name = foundPlayers[2];

                return;
            }

            if ([0, 1].includes(parseInt(line))) {
                lastParsedMatch.scores.push(parseInt(line));

                return;
            }
        }
    }

    /**
     * Convert parsed matches to real Match objects.
     */
    public toMatches(): Match[] {
        const matches: Match[] = [];

        // Keep the same player object references.
        const players: {
            [name: string]: Player;
        } = {};

        for (const parsedMatch of this._parsedMatches) {
            const player1Name = parsedMatch.player1Name as string;
            const player2Name = parsedMatch.player2Name as string;

            if (!players[player1Name]) {
                players[player1Name] = new Player(player1Name);
            }

            if (!players[player2Name]) {
                players[player2Name] = new Player(player2Name);
            }

            const match = new Match(
                parsedMatch.id,
                players[player1Name],
                players[player2Name]
            );

            // Start a new game in a new set.
            let set = match.newSet();
            let game = set.newGame();

            for (let score of parsedMatch.scores) {
                // Start a new set when the previous one has a winner.
                if (!set.inProgress()) {
                    set = match.newSet();
                }

                // Start a new game when the previous one has a winner.
                if (!game.inProgress()) {
                    game = set.newGame();
                }

                if (score === 0) {
                    game.player1Scores();
                }
                else if (score === 1) {
                    game.player2Scores();
                }
            }

            matches.push(match);
        }

        return matches;
    }
}