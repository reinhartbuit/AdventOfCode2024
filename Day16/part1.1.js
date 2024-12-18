import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";
import util from "util"



// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const csvContent = fs.readFileSync(path.join(__dirname, "Day15.txt"), "utf8");
const rows = csvContent.split('\n');

Object.defineProperty(process.stdout, 'columns', { value: 200 });

let map = []
let c = 0
let row
let startX = 0
let startY = 0
let endX = 0
let endY = 0
let countDot = 0
let score = 0
let min;
do{
    row = rows[c].split('')
    map.push(row)
    for(let i = 0; i < row.length; i++){
        if(row[i] === 'S'){
            startX = i
            startY = c
        }
        if(row[i] === 'E'){
            endX = i
            endY = c
        }
        if(row[i] === '.'){
            countDot++
        }
    }
    c++
} while (c < rows.length && row.length !== 0);

let paths = []

check({x: startX, y: startY}, [] ,'S')



function check(currLoc, path, direction){
    const copyPath = [...path]

    if(currLoc.x === endX && currLoc.y === endY){
        score = getScore(path)
        if(!min){
            min = score
        } else if(score < min){
            min = score
        }
        console.log(paths.length, score, min)
        paths.push(copyPath)
        writeMultidimensionalArrayToFile(map, 'output.txt', JSON.stringify(score))
        return true
    }
    if(map[currLoc.y][currLoc.x] !== '.' && map[currLoc.y][currLoc.x] !== 'S'){
        copyPath.pop()
        return 
    }
    score = getScore(path)
    if(score >= min){
        copyPath.pop();
        return 
    }

    copyPath.push(direction)
    map[currLoc.y][currLoc.x] = direction
    if(direction !== 'v'){
        check({x: currLoc.x, y: currLoc.y-1}, copyPath, '^');
    }
    if(direction !== '<'){
        check({x: currLoc.x+1, y: currLoc.y}, copyPath, '>');
    }
    if(direction !== '>'){
        check({x: currLoc.x-1, y: currLoc.y}, copyPath, '<');
    }
    if(direction !== '^'){
        check({x: currLoc.x, y: currLoc.y+1}, copyPath, 'v');
    }
    map[currLoc.y][currLoc.x] = '.'

}

function getScore(p){
    let total = 1
    for(let i = 0; i < p.length - 1; i++){
        if(p[i] === 'S'){
            p[i] = '>'
        }
        if(p[i] === '>' && p[i+1] === '>'){
            total++
        }
        if(p[i] === '>' && p[i+1] === '^'){
            total+=1001
        }
        if(p[i] === '>' && p[i+1] === 'v'){
            total+=1001
        }
        if(p[i] === '<' && p[i+1] === '^'){
            total+=1001
        }
        if(p[i] === '<' && p[i+1] === '<'){
            total++
        }
        if(p[i] === '<' && p[i+1] === 'v'){
            total+=1001
        }

        if(p[i] === 'v' && p[i+1] === '>'){
            total+=1001
        }
        if(p[i] === 'v' && p[i+1] === '<'){
            total+=1001
        }
        if(p[i] === 'v' && p[i+1] === 'v'){
            total+=1
        }

        if(p[i] === '^' && p[i+1] === '>'){
            total+=1001
        }
        if(p[i] === '^' && p[i+1] === '^'){
            total+=1
        }
        if(p[i] === '^' && p[i+1] === '<'){
            total+=1001
        }

    }
    return total
}

// let min;
// for(let p of paths){
//     let total = 1
//     for(let i = 0; i < p.length - 1; i++){
//         if(p[i] === 'S'){
//             p[i] = '>'
//         }
//         if(p[i] === '>' && p[i+1] === '>'){
//             total++
//         }
//         if(p[i] === '>' && p[i+1] === '^'){
//             total+=1001
//         }
//         if(p[i] === '>' && p[i+1] === '<'){
//             total+=2001
//         }
//         if(p[i] === '>' && p[i+1] === 'v'){
//             total+=1001
//         }
//
//         if(p[i] === '<' && p[i+1] === '>'){
//             total+=2001
//         }
//         if(p[i] === '<' && p[i+1] === '^'){
//             total+=1001
//         }
//         if(p[i] === '<' && p[i+1] === '<'){
//             total++
//         }
//         if(p[i] === '<' && p[i+1] === 'v'){
//             total+=1001
//         }
//
//         if(p[i] === 'v' && p[i+1] === '>'){
//             total+=1001
//         }
//         if(p[i] === 'v' && p[i+1] === '^'){
//             total+=2001
//         }
//         if(p[i] === 'v' && p[i+1] === '<'){
//             total+=1001
//         }
//         if(p[i] === 'v' && p[i+1] === 'v'){
//             total+=1
//         }
//
//         if(p[i] === '^' && p[i+1] === '>'){
//             total+=1001
//         }
//         if(p[i] === '^' && p[i+1] === '^'){
//             total+=1
//         }
//         if(p[i] === '^' && p[i+1] === '<'){
//             total+=1001
//         }
//         if(p[i] === '^' && p[i+1] === 'v'){
//             total+=2001
//         }
//
//     }
//     if(!min){
//         min = total
//     }
//     if(total < min){
//         min = total;
//     }
// }
 console.log(min);


function writeMultidimensionalArrayToFile(array, filePath, pos) {
    try {
        // Convert the array into a string representation
        const content = array.map(row => Array.isArray(row) ? row.join('') : row).join('\n');

        fs.appendFileSync(filePath, `POS: ${pos} \n`, 'utf8');
        fs.appendFileSync(filePath, content, 'utf8');
        fs.appendFileSync(filePath, '\n', 'utf8');

        //console.log(`Array successfully written to ${filePath}`);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}



