import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";
import util from "util"



// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const csvContent = fs.readFileSync(path.join(__dirname, "Day18.txt"), "utf8");
const rows = csvContent.split('\n');

let matrix = []
for(let i = 0; i<= 70;i++){
    let inner = []
    for(let i = 0; i<= 70;i++){
        inner.push('.')
    }
    matrix.push(inner)

}
//console.table(matrix);

for(let i = 0; i < 1024; i++){
    let values = rows[i].split(',')
    matrix[values[1]][values[0]] = '#'
    
}
console.log(shortestPathInMaze(matrix, [0,0], [70,70]))
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
    visited[start[0]][start[1]] = true;

    while (queue.length) {
        const [currentRow, currentCol, distance] = queue.shift();

        // If we reach the end, return the distance
        if (currentRow === end[0] && currentCol === end[1]) {
            return distance;
        }

        for (const [dRow, dCol] of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;

            // Check if the new position is valid
            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                maze[newRow][newCol] === '.' &&
                !visited[newRow][newCol]
            ) {
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol, distance + 1]);
            }
        }
    }

    return -1; // If no path is found
}

