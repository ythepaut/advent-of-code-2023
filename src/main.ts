#!/usr/bin/env node
"use strict";

/**
 * Advent of code 2023 - https://adventofcode.com/2023
 * Yohann THEPAUT (ythepaut) <contact@ythepaut.com>
 */

import { ArgumentParser } from "argparse";
import fs from "fs";

interface ProgramArgs {
    day: number;
    inputFilePath: string;
}

export interface SolutionScript {
    day: number;
    run: (input: string) => Solution;
}

export interface Solution {
    part1: any;
    part2: any;
}

function getFilesRecursive(folderPath: string): string[] {
    let fileNames: string[] = [];
    const files: string[] = fs.readdirSync(folderPath);

    files.forEach((file: string) => {
        const fullPath = `${folderPath}/${file}`;
        const stat: fs.Stats = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            fileNames = fileNames.concat(getFilesRecursive(fullPath));
        } else {
            fileNames.push(fullPath);
        }
    });

    return fileNames;
}

async function getSolutionScripts(): Promise<SolutionScript[]> {
    const solutionPaths: string[] = getFilesRecursive(`${__dirname}/solutions`).filter((path: string) => !path.includes(".spec.ts"));
    return (await Promise.all(solutionPaths.map(async (solutionPath: string) => (await import(solutionPath)).default))) as SolutionScript[];
}

function getSolutionDay(solutions: SolutionScript[], day: number): SolutionScript | null {
    return solutions.find((solution: SolutionScript) => solution.day === day) ?? null;
}

function createArgumentParser(): ArgumentParser {
    const parser: ArgumentParser = new ArgumentParser();
    parser.add_argument("day", { type: "int" });
    parser.add_argument("inputFilePath", { type: String });
    return parser;
}

async function main(): Promise<void> {
    const args: ProgramArgs = createArgumentParser().parse_args();

    if (!fs.existsSync(args.inputFilePath)) {
        console.error(`Could not find input file "${args.inputFilePath}".`);
        process.exit(1);
    }
    const input: Buffer = fs.readFileSync(args.inputFilePath);

    const solutionScript = getSolutionDay(await getSolutionScripts(), args.day);
    if (solutionScript === null) {
        console.error(`Solution for day ${args.day} does not exist.`);
        process.exit(1);
    }
    const solution: Solution = solutionScript.run(input.toString());

    console.log(`Day ${args.day} solutions :\n - Part 1 : ${solution.part1}\n - Part 2 : ${solution.part2}`);
}

main().then();
