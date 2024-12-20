import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";


// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const csvContent = fs.readFileSync(path.join(__dirname, "Day19.txt"), "utf8");
const rows = csvContent.split('\n');
let options = []
let patterns = []

options = rows[0].split(', ')
console.log(options)
const memo = memoize(find)
for(let i = 2; i < rows.length; i++){
    patterns.push(rows[i])
}
console.log(patterns)
let counter = 0
for(let pat of patterns){
    counter += find(pat, 0, pat.length)
}
console.log(counter)

function find(substr, size){
    if(substr === ''){
        return 1
    }
    let found = 0
    for(let option of options){
        if (substr.slice(0, option.length) === option) {
            let newSubstr = substr.slice(option.length)
            found += memo(newSubstr, size)
        }
    }
    return found
}

function memoize(func) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = func.apply(this, args);
        cache[key] = result;
        return result;
    };
}

