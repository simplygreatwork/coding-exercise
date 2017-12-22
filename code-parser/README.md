
# Code Parser

- Obtain an abstract syntax tree for the source code header file.
- Walk the tree using a simple state machine stack to locate constant names, values, types, and comments.
- Look up the textual values for each located node from the original source text.
- For every constant found, create a new object, store the associated values, and retain a reference to each tree node as metadata.
- Add each new constant object to an array of results.
- After constants have been updated, update the source file text by walking the items in reverse.
- Update the source file text using the indice locations from each item's node metadata.
- Save the source text back to the original header file - optionally, make a backup first.
