import fs from "fs";

const rulesCSV = fs.readFileSync('Day5/Day6.csv', 'utf8');
const updatesCSV = fs.readFileSync('Day5/updates.csv', 'utf8');
const rulesRow = rulesCSV.trim().split('\n');
const updatesRow = updatesCSV.trim().split('\n');

let rules = [];
let total = 0
for(let i = 0; i < rulesRow.length; i++) {
    const rule = rulesRow[i].split('|')
    rules.push(rule)
}


for(let j = 0; j < updatesRow.length; j++) {
    const update = updatesRow[j].split(',')
    let beforeFound = [];
    let afterFound = [];
    for(let i = 0; i < update.length; i++) {
        //console.log('Number: ', update[i]);
        if(i===0){
            beforeFound = rules.filter(v => v[0] === update[i]);
            beforeFound = beforeFound.filter(function(e) {
                return update.indexOf(e[1]) > -1;
            });
            //console.log(beforeFound);
            if(beforeFound.length===0){
                break
            }
            continue
        }
        afterFound = beforeFound.filter(v => v[1] === update[i]);
        beforeFound = rules.filter(v => v[0] === update[i]);
        beforeFound = beforeFound.filter(function(e) {
            return update.indexOf(e[1]) > -1;
        });
        if(i===update.length-1 && afterFound.length===1){
            console.log('PASS',update[Math.round((update.length - 1) / 2)] )
            total += Number(update[Math.round((update.length - 1) / 2)]);
            break
        }
        if(afterFound.length===0 || beforeFound.length===0){
            console.log("FAIL")
            break
        }
    }

}
console.log(total);

function getPermutations(array) {
    if (array.length === 0) return [[]];

    const result = [];
    array.forEach((current, index) => {
        const remaining = array.slice(0, index).concat(array.slice(index + 1));
        getPermutations(remaining).forEach((perm) => {
            result.push([current].concat(perm));
        });
    });

    return result;
}

const arr = [
        '47', '14', '27', '24',
        '77', '19', '76', '34',
        '72', '57', '36', '74',
        '97', '99', '93', '82',
        '52', '68', '87', '64',
        '25'
    ]
;
console.log(getPermutations(arr));
console.log(`Total permutations: ${getPermutations(arr).length}`);


