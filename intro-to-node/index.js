/*Learning about Node.js */

//import node native module
const fs = require('node:fs');
//this is the fileSystem module we are importing from node

//we want to create a copy of our file using the fileSystem copyFileSync()  method
fs.copyFileSync("file1.txt", "file2.txt");
//now run the index.js file using "node index.js" to see the content of file1.txt copied into file2.txt


//NOTE - Tony, the superheroes package in npm has been updated, check it
//import external node module
var superheroes = require('superheroes');

var mySuperheroName  = superheroes.random();

console.log(mySuperheroName);
//run node index.js inside cmd to debug using REPL


