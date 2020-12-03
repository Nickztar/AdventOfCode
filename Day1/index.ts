import { readFile } from 'fs';
readFile("./input.txt", 'utf8', function(err, inputStr) {
    if (err) throw err;
    const input = inputStr.split("\n").map(x => parseInt(x));

    const Get2SumOf2020 = (arr: number[]) => {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            for (let j = 0; j < arr.length; j++) {
                const elementJ = arr[j];
                    if (element + elementJ == 2020){
                        return element * elementJ;
                    }  
            }
        }
        return 0;
    }
    const Get3SumOf2020 = (arr: number[]) => {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            for (let j = 0; j < arr.length; j++) {
                const elementJ = arr[j];
                for (let k = 0; k < arr.length; k++) {
                    const elementK = arr[k];
                    if (element + elementJ + elementK == 2020){
                        return element * elementJ * elementK;
                    }  
                }
                      
            }
        }
        return 0;
    }
    console.time("Part1")
    console.log("Part1:", Get2SumOf2020(input));
    console.timeEnd("Part1")
    console.time("Part2")
    console.log("Part2:", Get3SumOf2020(input));
    console.timeEnd("Part2")
});
