import fs from "fs";

const csv = fs.readFileSync('Day9.csv', 'utf8');

let id = 0
let conStr = []

for(let i = 0; i < csv.length; i+=2) {
    //Create Block Space
    for(let j = 0; j < csv[i]; j++) {
        conStr.push(id)
    }
    for(let j = 0; j < csv[i+1]; j++) {
        conStr.push('.')
    }

    id++
}

for(let i = conStr.length-1; i >= 0; i--) {
    if(conStr[i] !== '.'){
        for(let j = 0; j < conStr.length; j++) {
            if(i <= j){
                break;
            }
            if(conStr[j] === '.'){
                //console.log(conStr[i])
                conStr[j] = conStr[i]
                conStr[i] = '.'
                break
            }
        }
    }
}
let grandTotal = 0
for(let j = 0; j < conStr.length; j++) {
    if(conStr[j] !== '.'){
        grandTotal += (j * conStr[j])
    }
}
console.log(grandTotal)