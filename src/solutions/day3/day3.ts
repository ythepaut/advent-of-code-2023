import { Solution, SolutionScript } from "../../main";

const day3: SolutionScript = {
    day: 3,
    run: getSolution,
};

interface NumberPosition {
    value: number;
    positions: number[][];
}

interface Neighbour {
    character: string;
    coords: number[];
}

interface GearRatioParts {
    [coords: string]: number[];
}

function getSolution(rawInput: string): Solution {
    const inputs: string[] = rawInput.split(/\n/).filter((line) => line !== "");
    return { part1: part1(inputs), part2: part2(inputs) };
}

function getLineNumbersAndPositions(line: string, lineNo: number): NumberPosition[] {
    return line
        .concat(".")
        .split("")
        .reduce(
            (accumulator: any, char: string, i: number) => {
                let { currentNumber, currentPositions } = accumulator;
                const { numberPositions } = accumulator;

                if (/\d/.test(char)) {
                    currentNumber = currentNumber === null ? +char : +(currentNumber + char);
                    currentPositions.push([lineNo, i]);
                } else if (currentNumber) {
                    numberPositions.push({ value: currentNumber, positions: currentPositions });
                    currentNumber = null;
                    currentPositions = [];
                }

                return { numberPositions, currentNumber, currentPositions };
            },
            { numberPositions: [], currentNumber: null, currentPositions: [] }
        ).numberPositions;
}

function getNeighbours(grid: string[], coords: number[]): Neighbour[] {
    const neighbours: Neighbour[] = [];
    for (let row = coords[0] - 1; row < coords[0] + 2; ++row) {
        for (let col = coords[1] - 1; col < coords[1] + 2; ++col) {
            if (row < 0 || row >= grid.length) continue;
            if (col < 0 || col >= grid[0].length) continue;
            neighbours.push({ character: grid[row][col], coords: [row, col] });
        }
    }
    return neighbours;
}

function numberPositionHasSpecialNeighbour(grid: string[], numberPosition: NumberPosition): boolean {
    return !!numberPosition.positions
        .map((coords) => getNeighbours(grid, coords))
        .find((neighbours) => /[^.\d]/.test(neighbours.map((n) => n.character).join("")));
}

function part1(inputs: string[]): number {
    return inputs
        .map((line, i) => getLineNumbersAndPositions(line, i))
        .flatMap((np) => np)
        .filter((numberPosition) => numberPositionHasSpecialNeighbour(inputs, numberPosition))
        .reduce((sum, np) => sum + np.value, 0);
}

function part2(inputs: string[]): number {
    const numberPositions: NumberPosition[] = inputs.map((line, i) => getLineNumbersAndPositions(line, i)).flatMap((np) => np);

    const gearRatioParts: GearRatioParts = {};

    for (const numberPosition of numberPositions) {
        const neighbour: Neighbour | null =
            numberPosition.positions
                .map((coords) => getNeighbours(inputs, coords))
                .flatMap((neighbour) => neighbour)
                .filter((neighbour, index, array) => array.indexOf(neighbour) === index)
                .find((neighbour) => neighbour.character === "*") ?? null;

        if (!neighbour) continue;

        if (gearRatioParts[neighbour.coords.toString()]) {
            gearRatioParts[neighbour.coords.toString()].push(numberPosition.value);
        } else {
            gearRatioParts[neighbour.coords.toString()] = [numberPosition.value];
        }
    }

    return Object.values(gearRatioParts)
        .filter((values) => values.length === 2)
        .reduce((sum, values) => sum + values[0] * values[1], 0);
}

export default day3;
