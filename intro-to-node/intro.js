

//  A]How to Run a File
/* 
Type this inside your index.js file. 
    console.log("Hello, World!");
Then run this command inside the command line: 
node index.js 
or 
node intro.js
It means use node to run this file index.js or intro.js
*/

//B] The Node REPL (Read Evaluation Print Loop)
/*
REPL works exactly just like our chrome console tab. We use it for debugging inside the command line/terminal when working with node.js
run this command: node
type this commands: 
a. console.log("Hey, there!");
b. 3+5
c. "Angela " + "Yu"

To exit the REPL:
type this command:
a. ctrl c ctrl c (2x)
b. .exit

To clear console:
type this command:
a. clear

*/

//C] Native Node Modules for Desktop Apps
/*
www.nodejs.org/api - list of all node modules that comes automatically bundled with node when installing it on your PC that you can use 

Use this syntax to use/require the module:
const moduleName = require('');

*/

//D] External Node Package Manager(NPM) 
/*
www.npmjs.com - npm is a package manager for external modules. It lists of all packages written by other programmers that you can use in your project.
NPM automatically gets bundled with node when you are installing node.js

//Initialize Npm to create a package.json file:
run npm init - to initialize npm

//install packages:
npm i superheroes
//Require the module in your index.js file:
var superheroes = require('superheroes');
superheroes.random();


*/

