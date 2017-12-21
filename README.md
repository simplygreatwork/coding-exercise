# coding-exercise

## A code exercise for external editing of constants in C header files.

- The project is separated into modules.
- You have to install the code-parser project link to it.
- These are instructions of how to install and run.

### Install Node.js using Node Version Manager
nvm install 6.12.2
nvm use 6.12.2

### Install the code parser and make it linkable.
cd code-parser
npm install
npm link

### Install the Node.js server application and link to the code parser module.
cd application/server
npm install
npm link code-parser

### Install the libraries for the client using Node Package Manager.
cd application/client
npm install

### Start the server.
cd application/server
PORT=8080 npm start

In Chrome 62, open the following link: http://127.0.0.1:8080/

At this time this coding exercise has been tested in Chrome 62 only.

Relevant Links

https://vuejs.org/v2/guide/components.html
https://github.com/tree-sitter/tree-sitter
http://next.vuetifyjs.com
