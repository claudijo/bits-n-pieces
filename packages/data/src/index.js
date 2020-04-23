// Add this line to be able to republish...

// Leave categories as json so it can be used for `mongoimport` when seeding db
import cat from './categories.json';

// Have to do this somewhat roundabout way to work around how the export is
// transpiled by babel
const categories = cat;

// eslint-disable-next-line import/prefer-default-export
export { categories };
