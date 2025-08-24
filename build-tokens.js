// convert-tokens.js
const fs = require('fs');
const path = require('path');

// Paths
const inputPath = path.join(__dirname, 'src/merged-tokens.json');
const outputPath = path.join(__dirname, 'public/built-tokens.css');

// Read JSON tokens
const tokens = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Recursive function to convert tokens to CSS with reference resolution
function tokensToCSS(obj, prefix = '') {
  let css = '';
  for (const key in obj) {
    const value = obj[key];
    const varName = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === 'object') {
      if ('$value' in value) {
        // Coerce value to string
        let tokenValue = String(value['$value']);

        // Replace references like {dimension.xxl} with var(--dimension-xxl)
        tokenValue = tokenValue.replace(/\{([a-zA-Z0-9_.-]+)\}/g, (_, ref) => {
          const cssVar = ref.replace(/\./g, '-');
          return `var(--${cssVar})`;
        });

        css += `  --${varName}: ${tokenValue};\n`;
      } else {
        // Nested object, recurse
        css += tokensToCSS(value, varName);
      }
    }
  }
  return css;
}

// Generate CSS content
const cssContent = `:root {\n${tokensToCSS(tokens)}}\n`;

// Write CSS file
fs.writeFileSync(outputPath, cssContent);

console.log(`CSS file generated: ${outputPath}`);
