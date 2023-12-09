import { describe } from "node:test";
import { Solution } from "../../main";
import day1 from "./day1";

describe("Day 1", () => {
    it("should return the correct answer for part 1", () => {
        const exampleInput: string = "1abc2\n" + "pqr3stu8vwx\n" + "a1b2c3d4e5f\n" + "treb7uchet";

        const solution: Solution = day1.run(exampleInput);
        expect(solution.part1).toEqual(142);
    });

    it("should return the correct answer for part 2", () => {
        const exampleInput: string =
            "two1nine\n" +
            "eightwothree\n" +
            "abcone2threexyz\n" +
            "xtwone3four\n" +
            "4nineeightseven2\n" +
            "zoneight234\n" +
            "7pqrstsixteen";

        const solution: Solution = day1.run(exampleInput);
        expect(solution.part2).toEqual(281);
    });
});
