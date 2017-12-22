# coding-exercise

## A coding exercise for external editing of constants inside C header files.

- The project is separated into modules.
- You have to install the code-parser project and link to it.
- These are instructions of how to install and run the project.

### Install Node.js using Node Version Manager
```
nvm install 6.12.2
nvm use 6.12.2
```

### Install the code parser and make it linkable
```
cd code-parser
npm install
npm link
```

### Install the Node.js server application and link to the code-parser module
```
cd application/server
npm install
npm link code-parser
```

### Install the libraries for the client using Node Package Manager
```
cd application/client
npm install
```

### Start the server
```
cd application/server
PORT=8080 npm start
```

### Run the code parser tests
```
cd code-parser
npm install --dev
npm test
```

- In Chrome 62, open the following link: http://127.0.0.1:8080/
- At this time this coding exercise has been tested in Chrome 62 only.

### Highlights

- This project is using Vue.js because it's simple, it supports bi-directional form data bindings, it provides components, and because Vuetify.js for Vue.js provides a slick library for Material Design.
- The list view and the editor view are defined as Vue.js components. I'm using a client-side component compiler for rapid development without a build phase. JavaScript is a dynamic language. Production releases will compile the components in a build phase.
- I'm using an abstract syntax tree for reading and updating the constants. I didn't want to use regular expressions because I believe that correctness is more important than simplicity in this case. I did quite a bit of scouring and research on working with language grammars in JavaScript but then I found this gem of a library "tree-sitter". 
- I'm using my simple notifications class, Broadcast.js, to send a notification that a list item was selected. When the editor form receives this notification, it presents the data for editing.
- The code parser module walks the generated abstract syntax tree and uses a simple state machine stack to identify the relevant values.
- I'm using Vuetify.js very simply in this project. I had been planning to use Vuetify.js for robust guided configurations (wizards).

### Considerations for Improvement

- When updating values in the source file, the most correct way to do it is to traverse each field in reverse by end index. I am already traversing in reverse but this aspect could be even more robust.
- When the UI is presented, the editor form is empty. The UI ought to at least select the first constant for editing or instead begin with a hidden or disabled editor panel.
- In the parser, I don't really like storing each node's metadata inside the constant value definition object as _metadata. But it was simpler for UI considerations.
- Use more native EcmaScript 6/7 features. But in an effort to keep things simple, I try to avoid polyfills such as Babel. Keep it simple. 
- Make a backup of the header file before rewriting.

### Relevant Links

- https://vuejs.org/v2/guide/components.html
- https://github.com/tree-sitter/tree-sitter
- http://next.vuetifyjs.com

