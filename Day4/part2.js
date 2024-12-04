import fs from "fs";

const csvContent = fs.readFileSync('Day4/Day4.csv', 'utf8');
const rows = csvContent.trim().split('\n');
let count = 0;
for(let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        let starting = rows[i][j]
        let currentAround = checkAround(rows, i, j)
        if(starting !== 'A') {
            continue;
        }

            if(currentAround.diaLeftUp.value === 'M' && currentAround.diaRightDown.value === 'S' && currentAround.diaRightUp.value === 'M' && currentAround.diaLeftDown.value === 'S'){
                count++;
            }
            if(currentAround.diaLeftUp.value === 'S' && currentAround.diaRightDown.value === 'M' && currentAround.diaRightUp.value === 'S' && currentAround.diaLeftDown.value === 'M'){
                count++;
            }
            if(currentAround.diaLeftUp.value === 'M' && currentAround.diaRightDown.value === 'S' && currentAround.diaRightUp.value === 'S' && currentAround.diaLeftDown.value === 'M'){
                count++;
            }
            if(currentAround.diaLeftUp.value === 'S' && currentAround.diaRightDown.value === 'M' && currentAround.diaRightUp.value === 'M' && currentAround.diaLeftDown.value === 'S'){
                count++;
            }
    }
}
console.log(count)

function checkAround(rows, i, j){
    return {
        left: {x: i, y: j-1,
               value: rows[i]?.[j - 1] ?? undefined
        },
        right: {x: i, y: j+1,value: rows[i]?.[j + 1] ?? undefined},
        bottom: {x: i+1, y: j,value:rows[i + 1]?.[j] ?? undefined},
        up: {x: i-1, y: j,value:rows[i - 1]?.[j] ?? undefined},
        diaLeftUp: {x: i-1, y: j-1,value:rows[i - 1]?.[j - 1] ?? undefined},
        diaLeftDown: {x: i+1, y: j-1,value:rows[i + 1]?.[j - 1] ?? undefined},
        diaRightUp: {x: i-1, y: j+1,value:rows[i - 1]?.[j + 1] ?? undefined},
        diaRightDown: {x: i+1, y: j+1,value: rows[i + 1]?.[j + 1] ?? undefined},
    };
}