import { describe } from "node:test";
import { Solution } from "../../main";
import day2 from "./day2";

describe("Day 2", () => {
    const exampleInput: string =
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green\n";

    it("should return the correct answer for part 1", () => {
        const solution: Solution = day2.run(exampleInput);
        expect(solution.part1).toEqual(8);
    });

    it("should return the correct answer for part 2", () => {
        const solution: Solution = day2.run(exampleInput);
        expect(solution.part2).toEqual(2286);
    });
});
