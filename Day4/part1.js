import fs from "fs";

const csvContent = fs.readFileSync('Day4/Day6.csv', 'utf8');
const rows = csvContent.trim().split('\n');
let count = 0;
for(let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        let starting = rows[i][j]
        let currentAround = checkAround(rows, i, j)
        if(starting !== 'X') {
            continue;
        }
        for(let key in currentAround){
                if(currentAround[key].value === 'M') {
                    let MAround = checkAround(rows, currentAround[key].x, currentAround[key].y);
                    let newValue = MAround[key].value;
                    if (newValue === 'A') {
                        let AAround = checkAround(rows, MAround[key].x, MAround[key].y);
                        let newValue = AAround[key].value;
                        if (newValue === 'S') {
                            count++
                        }
                    }
                }
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