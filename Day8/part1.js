import fs from "fs";

const csv = fs.readFileSync('Day8.csv', 'utf8');
const rows = csv.split('\n');

let array = []
for(let i = 0; i < rows.length; i++) {
    const items = rows[i].split('');
    let newArray = [];
    items.forEach(item => {
        newArray.push(item)
    })
    array.push(newArray);
}
let nodeLocations = []
let grandTotal = 0

// while (moreNodes) {
//     moreNodes = false
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let currentPos = array[i][j]
            if (currentPos === '.' || currentPos === '#') {
                continue;
            }
            for (let k = 0; k < array.length; k++) {
                for (let l = 0; l < array[k].length; l++) {
                    if (i === k && j === l) {
                        continue;
                    }
                    let nextPos = array[k][l];
                    if (nextPos === currentPos) {
                        let moreNodes = true
                            let xDist = ((k - i) * (2)) + i
                            let yDist = ((l - j) * (2)) + j
                            if (!array[xDist] || !array[xDist][yDist]){
                                moreNodes = false
                                continue
                            }
                            if (array[xDist] && array[xDist][yDist] && array[xDist][yDist] === '.') {
                                array[xDist][yDist] = '#';
                                nodeLocations.push({char: currentPos,x: xDist, y: yDist});
                                moreNodes = true
                                grandTotal++
                            } else if (array[xDist] && array[xDist][yDist] && array[xDist][yDist] !== '#') {
                                let check = nodeLocations.find(item => item.x === xDist && item.y === yDist)
                                if (!check) {
                                    nodeLocations.push({char: currentPos,x: xDist, y: yDist});
                                    moreNodes = true
                                    grandTotal++
                                }
                            }

                    }

                }
            }
        }
    }
//}


console.log(array);
console.log(grandTotal);

