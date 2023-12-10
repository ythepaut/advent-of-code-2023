import { describe } from "node:test";
import { Solution } from "../../main";
import day3 from "./day3";

describe("Day 3", () => {
    const exampleInput: string =
        "467..114..\n" +
        "...*......\n" +
        "..35..633.\n" +
        "......#...\n" +
        "617*......\n" +
        ".....+.58.\n" +
        "..592.....\n" +
        "......755.\n" +
        "...$.*....\n" +
        ".664.598..";
    const solution: Solution = day3.run(exampleInput);

    it("should return the correct answer for part 1", () => {
        expect(solution.part1).toEqual(4361);
    });

    it("should return the correct answer for part 2", () => {
        expect(solution.part2).toEqual(467835);
    });
});
