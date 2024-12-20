import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";
import util from "util"



// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const csvContent = fs.readFileSync(path.join(__dirname, "Day20.txt"), "utf8");
const rows = csvContent.split('\n');

let start = []
let end = []

let matrix = []
for(let i = 0; i< rows.length;i++){
    let inner = rows[i].split('')
    for(let j = 0; j < inner.length; j++){
        if(inner[j] === 'S'){
            start = [i,j]
        }
        if(inner[j] === 'E'){
            end = [i,j]
        }
    }
    matrix.push(inner)
}
const vis = shortestPathInMaze(matrix, start, end)


let max = 0
for(let i = 0; i<vis.length;i++){
    for(let j = 0; j < vis[i].length;j++){
        if(vis[i][j] >= max){
            max = vis[i][j]
        }
    }
}

let paths = []
for(let i = 0; i<=max;i++){
    paths.push({location: findLoc(i), index: i})
}
const directions = [
    [0, 1],  // Right
    [1, 0],  // Down
    [0, -1], // Left
    [-1, 0], // Up
];
let cheats = 0
for(let i = 0; i<paths.length;i++){
    for(let dir of directions){
        let newPos = paths[i].location
        let x = newPos[0] + (dir[0] * 2)
        let y = newPos[1] + (dir[1] * 2)
        for(let j = i; j<paths.length;j++){
            let pos = paths[j].location
            if(pos[0] === x && pos[1] === y){
                if((j-i-2) >= 100){
                    cheats++
                }

            }
        }

    }
}
console.log(cheats);

function findLoc (value){
    for(let i = 0; i<vis.length;i++){
        for(let j = 0; j < vis[i].length;j++){
            if(vis[i][j] !== false){
                if(Number(vis[i][j]) === value){
                    return [i,j]
                }
            }

        }
    }
}

function shortestPathInMaze(maze, start, end) {
    const rows = maze.length;
    const cols = maze[0].length;

    // Directions for moving up, down, left, and right
    const directions = [
        [0, 1],  // Right
        [1, 0],  // Down
        [0, -1], // Left
        [-1, 0], // Up
    ];

    const queue = [[start[0], start[1], 0]]; // [row, col, distance]
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[start[0]][start[1]] = '0';
    while (queue.length) {
        const [currentRow, currentCol, distance] = queue.shift();

        // If we reach the end, return the distance
        if (currentRow === end[0] && currentCol === end[1]) {
            return visited;
        }

        for (const [dRow, dCol] of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;

            // Check if the new position is valid
            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                maze[newRow][newCol] !== '#' &&
                !visited[newRow][newCol]
            ) {
                visited[newRow][newCol] = distance+1;
                queue.push([newRow, newCol, distance + 1]);
            }
        }
    }

    return -1; // If no path is found
}

