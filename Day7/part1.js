import fs from "fs";

const csv = fs.readFileSync('Day7.csv', 'utf8');
const rows = csv.split('\n');

let grandTotal = 0
for(let row of rows){
    let total = row.split(':')[0]
    let values = row.split(':')[1].split(' ').slice(1);
    console.log(total);
    console.log(values);

    let startingCombo = []
    for(let i = 0; i < values.length - 1; i++){
        startingCombo.push(0)
    }
    let combinations = [startingCombo]
    let totalCombinations = (3 ** startingCombo.length)

    let index = 0
    while(combinations.length < totalCombinations){
        let comboLength = combinations.length
        for(let k = 0; k < comboLength; k++){
            let currentCombo = [...combinations[k]]
            currentCombo[index] = 1
            combinations.push(currentCombo)
        }
        for(let k = 0; k < comboLength; k++){
            let currentCombo = [...combinations[k]]
            currentCombo[index] = 2
            combinations.push(currentCombo)
        }
        index++
    }
    console.log(combinations);
    for(let combination of combinations){
        //console.log(combination);
        let ctotal = values[0]
        for(let i = 0; i < combination.length; i++){
            if(combination[i] === 0){
                ctotal = Number(ctotal) + Number(values[i+1])
            }else if (combination[i] === 1){
                ctotal = Number(ctotal) * Number(values[i+1])
            } else if(combination[i] === 2){
                ctotal += values[i+1]
            }
        }
        if(Number(ctotal) === Number(total)){
            grandTotal += Number(total)
            break
        }
    }


}
console.log(grandTotal)









