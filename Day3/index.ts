import { readFileSync } from "fs";

const inputString = readFileSync("./input.txt", "utf-8");

const inputLines = inputString.replace("\r", "").split("\n");
const lineAmount = inputLines.length;
const lineLength = inputLines[0].length;
const memoEncounters = new Map();

const getP1Encounters = () => {
    let currentX = 0;
    let treesEncountered = 0;
    for (let i = 1; i < lineAmount; i++) {
        //Increment X
        if (currentX + 3 >= lineLength) {
            currentX = currentX - lineLength;
        }
        currentX += 3;
        if (inputLines[i][currentX] == "#") {
            treesEncountered++;
        }
    }
    memoEncounters.set("3,1", treesEncountered);
    return treesEncountered;
};

const calculateTreeEncounters = (right: number, down: number) => {
    if (!memoEncounters.has(`${right},${down}`)) {
        let currentX = 0;
        let treesEncountered = 0;
        for (let i = down; i < lineAmount; i += down) {
            //Increment X
            if (currentX + right >= lineLength) {
                currentX = currentX - lineLength;
            }
            currentX += right;
            if (inputLines[i][currentX] == "#") {
                treesEncountered++;
            }
        }
        memoEncounters.set(`${right},${down}`, treesEncountered);
    } //Check memoization
};
const slopeOptions = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];
slopeOptions.map((s) => {
    calculateTreeEncounters(s[0], s[1]);
});
let total = 1;
memoEncounters.forEach((memo, _) => {
    total = total * memo;
});
console.log(total);
console.log(getP1Encounters());
