import { Solution, SolutionScript } from "../../main";

const day1: SolutionScript = {
    day: 1,
    run: getSolution,
};

function getSolution(rawInput: string): Solution {
    const inputs = rawInput.split(/\n/);
    return { part1: part1(inputs), part2: part2(inputs) };
}

function part1(inputs: string[]): number {
    return inputs
        .map((line) => {
            if (line === "") return 0;
            const digitStr: string = line.replace(/\D/g, "");
            return +(digitStr[0] + digitStr[digitStr.length - 1]);
        })
        .reduce((a, b) => a + b, 0);
}

function replaceDigit(input: string): string {
    return input
        .replace(/zero/g, "ze0ro")
        .replace(/one/g, "o1ne")
        .replace(/two/g, "tw2o")
        .replace(/three/g, "thr3ee")
        .replace(/four/g, "fo4ur")
        .replace(/five/g, "fi5ve")
        .replace(/six/g, "si6x")
        .replace(/seven/g, "se7ven")
        .replace(/eight/g, "ei8ght")
        .replace(/nine/g, "ni9ne")
        .replace(/ten/g, "te10n")
        .replace(/eleven/g, "ele11ven")
        .replace(/twelve/g, "tw12elve")
        .replace(/thirteen/g, "th13irteen")
        .replace(/fourteen/g, "fo14urteen")
        .replace(/fifteen/g, "fi15fteen")
        .replace(/sixteen/g, "si16xteen")
        .replace(/seventeen/g, "se17venteen")
        .replace(/eighteen/g, "ei18ghteen")
        .replace(/nineteen/g, "ni19neteen")
        .replace(/twelve/g, "tw20elve");
}

function part2(inputs: string[]): number {
    return part1(inputs.map((line: string) => replaceDigit(line).replace(/\D/, "")));
}

export default day1;
