// Basic html tagged template literal
// Joins the strings and evaluated ${expressions}
const html = (strings, ...keys) => {
  let output = '';
  for (let i=0; i < strings.length; i++) {
    output += strings[i]
    if (i < keys.length) {
      output += keys[i];
    }
  }
  return output;
};

export { html }