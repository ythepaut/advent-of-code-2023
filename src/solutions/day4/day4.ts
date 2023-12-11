import { Solution, SolutionScript } from "../../main";

const day4: SolutionScript = {
    day: 4,
    run: getSolution,
};

interface Card {
    winningNumbers: number[];
    givenNumbers: number[];
}

function parseCards(inputs: string[]): Card[] {
    return inputs.map((input) => {
        const [_, winning, given] = /^Card +\d+: ([\d ]*) \| ([\d ]*)$/.exec(input)!;
        return {
            winningNumbers: winning
                .split(" ")
                .filter((value) => !!value)
                .map((value) => +value),
            givenNumbers: given
                .split(" ")
                .filter((value) => !!value)
                .map((value) => +value),
        };
    });
}

function getSolution(rawInput: string): Solution {
    const inputs = rawInput.split(/\n/).filter((line) => line !== "");
    const cards: Card[] = parseCards(inputs);
    return { part1: part1(cards), part2: part2(cards) };
}

function getMatchingCountByCard(cards: Card[]): number[] {
    return cards.map((card) => {
        return card.givenNumbers.filter((given) => card.winningNumbers.includes(given)).length;
    });
}

function part1(cards: Card[]): number {
    return getMatchingCountByCard(cards)
        .filter((matchingCount) => matchingCount !== 0)
        .reduce((sum, matchingCount) => sum + 2 ** (matchingCount - 1), 0);
}

function part2(cards: Card[]): number {
    const matchingCounts: number[] = getMatchingCountByCard(cards);
    const cardCopies: number[] = Array(cards.length).fill(1);

    matchingCounts.forEach((matchingCount: number, cardNo: number) => {
        for (let offset = 1; offset <= matchingCount; ++offset) {
            cardCopies[cardNo + offset] += cardCopies[cardNo];
        }
    });

    return cardCopies.reduce((a, b) => a + b, 0);
}

export default day4;
