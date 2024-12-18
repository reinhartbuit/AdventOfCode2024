import fs from "fs";

const csvContent = fs.readFileSync('Day15.txt', 'utf8');
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
let min
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

const start = [startX,startY]
const end = [endX,endY]
findAllPaths(map, start, end)

function findAllPaths(maze, start, end) {
    const rows = maze.length;
    const cols = maze[0].length;
  
    const directions = [
      [0, 1],   // Right
      [1, 0],   // Down
      [0, -1],  // Left
      [-1, 0],  // Up
    ];
  
    const queue = [];
    const allPaths = []; // Store all valid paths
  
    // Start BFS with the initial position and path
    queue.push({ position: '>', path: ['>'] });
  
    while (queue.length > 0) {
      const current = queue.shift();
      const [x, y] = current.position;
  
      // If we reach the end, store the path
      if (x === end[0] && y === end[1]) {
        allPaths.push(current.path);
        console.log(current.path)
        continue; // Continue to explore other paths
      }
  
      // Explore all possible directions
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
  
        if (
          newX >= 0 && newX < rows &&      // Within bounds (rows)
          newY >= 0 && newY < cols &&      // Within bounds (columns)
          maze[newX][newY] !== '#'           // Valid path (no walls)
        ) {
          if (!current.path.some(pos => pos[0] === newX && pos[1] === newY)) {
            queue.push({
              position: [newX, newY],
              path: [...current.path, [newX, newY]],
            });
          }
        }
      }
    }
  
    if (allPaths.length > 0) {
      console.log(`All possible paths (${allPaths.length}):`);
      allPaths.forEach((path, index) => {
        console.log(`Path ${index + 1}:`, path);
      });
    } else {
      console.log("No paths found.");
    }
  
    return allPaths;
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
        if(p[i] === '>' && p[i+1] === '<'){
            total+=2001
        }
        if(p[i] === '>' && p[i+1] === 'v'){
            total+=1001
        }

        if(p[i] === '<' && p[i+1] === '>'){
            total+=2001
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
        if(p[i] === 'v' && p[i+1] === '^'){
            total+=2001
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
        if(p[i] === '^' && p[i+1] === 'v'){
            total+=2001
        }

    }
    return total
}
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



