import { readFileSync } from "fs";

const inputStr = readFileSync("./input.txt", "utf-8");
const preLines = inputStr.replace(/\r/g, '').split("\n");
const requiredInfo = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const allowedEyecolor = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
let currrentIndex = 0;
const passports: string[] = [];
preLines.forEach((str) => {
    if (str != "") {
        let line = passports[currrentIndex];
        if (line && line.endsWith(" ")) {
            passports[currrentIndex] = line + str;
        } else if (line) {
            passports[currrentIndex] = line + " " + str;
        } else {
            passports[currrentIndex] = str;
        }
    } else {
        currrentIndex++;
    }
});

const getP1 = () => {
    let count = 0;
    passports.forEach((pp) => {
        const infoFields = pp.split(" ");
        const infoArr = infoFields.map((field) => {
            const info = field.split(":");
            return info[0];
        });
        let missedWords = 0;
        requiredInfo.forEach((req) => {
            if (!infoArr.includes(req)) {
                missedWords++;
            }
        });
        if (missedWords == 0) {
            count++;
        }
    });
    return count;
};
const getP2 = () => {
    const validPassports: string[] = [];
    passports.forEach((pp) => {
        const infoFields = pp.split(" ");
        const infoArr = infoFields.map((field) => {
            const info = field.split(":");
            return info[0];
        });
        let missedWords = 0;
        requiredInfo.forEach((req) => {
            if (!infoArr.includes(req)) {
                missedWords++;
            }
        });
        if (missedWords == 0) {
            validPassports.push(pp);
        }
    });
    let count = 0;
    console.log(validPassports)
    validPassports.forEach(pp => {
        const infoFields = pp.split(" ");
        const infoArr = infoFields.map((field) => {
            const info = field.split(":");
            return {
                key: info[0],
                value: info[1]
            };
        });
        let invalidFields = 0;
        infoArr.forEach(info => {
            switch (info.key){
                case "byr":
                    if (parseInt(info.value) < 1920 || parseInt(info.value) > 2002 || info.value.length != 4) invalidFields++;
                    break;
                case "iyr":
                    if (parseInt(info.value) < 2010 || parseInt(info.value) > 2020 || info.value.length != 4) invalidFields++;
                    break;
                case "eyr":
                    if (parseInt(info.value) < 2020 || parseInt(info.value) > 2030 || info.value.length != 4) invalidFields++;
                    break;
                case "hgt":
                    if (info.value.includes("cm")){
                        let val = info.value.substr(0, info.value.length - 2);
                        if (parseInt(val) < 150 || parseInt(val) > 193) invalidFields++;
                    }
                    else if (info.value.includes("in")){
                        let val = info.value.substr(0, info.value.length - 2);
                        if (parseInt(val) < 59 || parseInt(val) > 76) invalidFields++;
                    }
                    else{
                        invalidFields++;
                    }
                    break;
                case "hcl":
                    if (info.value.includes("#")){
                        let val = info.value.substr(1, info.value.length);
                        if (val.length != 6){
                            invalidFields++;
                        } 
                        if (val.match("^[\w\d]+$")){
                            invalidFields++;
                        }
                    }
                    else{
                        invalidFields++;
                    }
                    break;
                case "ecl":
                    if (!allowedEyecolor.includes(info.value)) invalidFields++;
                    break;
                case "pid":
                    if (isNaN(parseInt(info.value)) || info.value.length != 9) invalidFields++;
                    break;
                default:
                    break;
            }
        })
        if (invalidFields == 0) count++;
    })
    return count;
};
console.log(getP1());
console.log(getP2());
