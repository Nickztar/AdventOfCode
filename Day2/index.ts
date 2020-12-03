import { readFileSync } from 'fs';
import { PasswordCritera } from '../types';


const inputString = readFileSync("./input.txt", "utf-8");
const lines = inputString.split('\n');
const passwordCriterias = lines.map((line) => {
    const data = line.split(' ');
    if (data[0] != ''){
        const password = data[2];
        const character = data[1].replace(':', '');
        const criteras = data[0].split('-');
        const passCritera : PasswordCritera = {
            password,
            character,
            min: parseInt(criteras[0]),
            max: parseInt(criteras[1])
        };
        return passCritera
    }
})

const correctPasswords1 = passwordCriterias.filter((criterias) => {
    let charCount = 0;
    if (criterias != undefined){
        criterias.password.split("").forEach((c) => {
            if (c == criterias.character){
                charCount++;
            }
        })
        if (charCount >= criterias.min && charCount <= criterias.max){
            return criterias.password;
        }
    }
})

const correctPasswords2 = passwordCriterias.filter((criteria) => {
    if (criteria != undefined){
        return (criteria.password[criteria.min - 1] === criteria.character && criteria.password[criteria.max -1] !== criteria.character) || (criteria.password[criteria.min - 1] !== criteria.character && criteria.password[criteria.max -1] === criteria.character)
    }
})

console.log("Part1: ", correctPasswords1.length);
console.log("Part2: ", correctPasswords2.length);
