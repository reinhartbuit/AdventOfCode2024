import fs from "fs";

const rulesCSV = fs.readFileSync('rules.csv', 'utf8');
const updatesCSV = fs.readFileSync('updates.csv', 'utf8');
const rulesRow = rulesCSV.trim().split('\n');
const updatesRow = updatesCSV.trim().split('\n');

let rules = [];
for(let i = 0; i < rulesRow.length; i++) {
    const rule = rulesRow[i].split('|')
    rules.push(rule)
}


const finalList = {}

for(let rule of rules){
    if(!finalList[rule[0]]){
        finalList[rule[0]] = {before: [], after: []}
    }
    finalList[rule[0]].after.push(rule[1])

    if(!finalList[rule[1]]){
        finalList[rule[1]] = {before: [], after: []}
    }
    finalList[rule[1]].before.push(rule[0])

}


console.log(finalList);

const validList = []
const invalidList = []
let updates = []
for(let j = 0; j < updatesRow.length; j++) {
    updates = updatesRow[j].split(',')
    console.log(updates)
    if(checkValid(updates)){
        validList.push(updates)
    } else {
        invalidList.push(updates)
    }
}

function checkValid(updates){
    for(let j = 0; j < updates.length; j++) {
        const beforeList = finalList[updates[j]].before
        const afterList = finalList[updates[j]].after
        for(let k = j+1; k < updates.length; k++) {
            if(!afterList.find(item => item === updates[k])){
                return false
            }
        }
        for(let l = j-1; l > 0; l--) {
            if(!beforeList.find(item => item === updates[l])){
                return false
            }
        }
    }
    return true
}
let validTotal = 0
for(let v of validList){
    validTotal += Number(v[Math.round((v.length - 1) / 2)])
}
console.log(validTotal)

let fixedInvalid = []
for(let invalid of invalidList){
    let remainder = invalid
    let root
    let orderedArray = []
    while(remainder.length > 0){
        root = findRoot(remainder);
        orderedArray.push(root);
        remainder = remainder.filter(item => item !== root)
    }
    fixedInvalid.push(orderedArray)
}

let inValidTotal = 0
for(let v of fixedInvalid){
    inValidTotal += Number(v[Math.round((v.length - 1) / 2)])
}
console.log(inValidTotal)

function findRoot(array){
    let root = array[0]
    for(let j = 1; j < array.length; j++) {
        const afterList = finalList[array[j]].after
        if(afterList.find(item => item === root)){
            root = array[j]
        }

    }
    return root
}











