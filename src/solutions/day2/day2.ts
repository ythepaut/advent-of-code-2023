import { Solution, SolutionScript } from "../../main";

const day2: SolutionScript = {
    day: 2,
    run: getSolution,
};

interface Game {
    gameNo: number;
    red: number;
    green: number;
    blue: number;
}

function getSolution(rawInput: string): Solution {
    const games: Game[] = rawInput
        .split(/\n/)
        .filter((line) => line !== "")
        .map((line) => getGame(line));
    return { part1: part1(games), part2: part2(games) };
}

function getGame(input: string): Game {
    const [_, gameNo, sets] = /Game (\d+): (.*)/.exec(input)!;
    const game: Game = { gameNo: +gameNo, red: 0, green: 0, blue: 0 };

    sets.split(";").forEach((set) => {
        const red = +(/(\d+) red/.exec(set) ?? [0, 0])[1];
        const green = +(/(\d+) green/.exec(set) ?? [0, 0])[1];
        const blue = +(/(\d+) blue/.exec(set) ?? [0, 0])[1];
        game.red = game.red >= red ? game.red : red;
        game.green = game.green >= green ? game.green : green;
        game.blue = game.blue >= blue ? game.blue : blue;
    });
    return game;
}

function part1(games: Game[]): number {
    const maxRed = 12;
    const maxGreen = 13;
    const maxBlue = 14;
    return games
        .filter((game) => game.red <= maxRed && game.green <= maxGreen && game.blue <= maxBlue)
        .map((game) => game.gameNo)
        .reduce((a, b) => a + b, 0);
}

function part2(games: Game[]): number {
    return games.map((game) => game.red * game.green * game.blue).reduce((a, b) => a + b, 0);
}

export default day2;
