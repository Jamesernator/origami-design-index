import fs from 'fs/promises';
import yaml from 'js-yaml';

function by(toValue) {
    return function(a, b) {
        const valA = toValue(a);
        const valB = toValue(b);
        if (valA < valB) {
            return -1;
        } else if (valA === valB) {
            return 0;
        } else {
            return 1;
        }
    }
}

const FILE = new URL('./origami-design-index.yaml', import.meta.url);

const contents = await fs.readFile(FILE, 'utf8');
const items = yaml.load(contents);
items.sort(by(i => i.title));
const sortedContents = yaml.dump(items);
await fs.writeFile(FILE, sortedContents);
