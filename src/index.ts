import readline from "readline";
import TournamentFileParser from "./TournamentFileParser";
import Match from "./entities/Match";
import Player from "./entities/Player";

let rl = readline.createInterface(
    process.stdin,
    process.stdout
);

let queriesNum = 0;

function askForFile() {
    rl.question("Enter the tournament file: ", async (filePath) => {
        try {
            const tournamentFileParser = new TournamentFileParser(filePath);

            await tournamentFileParser.parse();

            askForQuery(tournamentFileParser.toMatches());
        } catch (error) {
            console.error(error);

            // We'll give the user another chance.
            askForFile();
        }
    });
}

function askForQuery(matches: Match[]) {
    // Educate on the first go.
    if (queriesNum === 0) {
        console.log(`You can query me. Examples are:\nScore Match <id>\nGames Player <Player Name>`);
    }

    queriesNum++;

    rl.question("Enter your query: ", (query) => {

        const foundScoreMatchQuery = query.match(/^score match ([0-9]+)$/i);
        const foundGamesPlayerQuery = query.match(/^games player ([a-z ]+)$/i);

        if (foundScoreMatchQuery) {
            showMatchResult(matches.find(match => match.id === parseInt(foundScoreMatchQuery[1])));
        }
        else if (foundGamesPlayerQuery) {
            showPlayerGames(
                findPlayer(foundGamesPlayerQuery[1], matches),
                matches
            );
        }

        askForQuery(matches);
    });
}

/**
 * Show the result of a single match.
 */
function showMatchResult(match: Match | undefined) {
    if (!match) {
        return console.error("Invalid match id");
    }

    const matchWinner = match.getWinner();

    if (matchWinner) {
        console.log(
            `${matchWinner.name} defeated ${match.getLoser()?.name}`
        );

        const setsWon = match.sets.reduce((accumulator, set) => {
            if (set.getWinner() === matchWinner) {
                return ++accumulator;
            }

            return accumulator;
        }, 0);

        const setsLost = match.sets.length - setsWon;

        console.log(`${setsWon} sets to ${setsLost}`);
    }
}

/**
 * Show all the number of games won and lost for a player
 * throughout the tournament.
 */
function showPlayerGames(player: Player | null, matches: Match[]) {
    if (!player) {
        return console.error("Invalid player name");
    }

    const playerMatches = getPlayerMatches(player, matches);

    let gamesWon = 0;
    let gamesLost = 0;

    playerMatches.forEach(match => {
        match.sets.forEach(set => {
            set.games.forEach(game => {
                if (game.getWinner() === player) {
                    gamesWon++;
                }
                else {
                    gamesLost++;
                }
            });
        });
    });

    console.log(`${gamesWon} ${gamesLost}`);
}

/**
 * Find a player throughout the tournament.
 */
function findPlayer(name: string, matches: Match[]): Player | null {
    for (const match of matches) {
        if (match.player1.name.toLowerCase() === name.toLowerCase()) {
            return match.player1;
        }
        else if (match.player2.name.toLowerCase() === name.toLowerCase()) {
            return match.player2;
        }
    }

    return null;
}

/**
 * Get all the matches of a player throughout the tournament.
 */
function getPlayerMatches(player: Player, matches: Match[]): Match[] {
    return matches.filter(match => {
        return (
            match.player1 === player ||
            match.player2 === player
        );
    });
}

// We start off by asking for a file.
askForFile();