import {
  example, anotherExample, getBooks, getCharacters,
  searchCharacterByName, getSpells, searchSpellsByLetter, charactersOrder
} from '../src/data.js';
import data from '../src/data/harrypotter/data.js';

describe('example', () => {
  it('is a function', () => {
    expect(typeof example).toBe('function');
  });

  it('returns `example`', () => {
    expect(example()).toBe('example');
  });
});

describe('anotherExample', () => {
  it('is a function', () => {
    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
});

describe('getbooks', () => {
  it('is a function', () => {
    expect(typeof getBooks).toBe('function');
  });

  it('returns harry potter books', () => {
    const books = getBooks(data);
    expect(books).toBe(data.books)
  });
});

describe('getcharacters', () => {
  it('is a function', () => {
    expect(typeof getCharacters).toBe('function');
  });

  it('returns harry potter characters', () => {
    const characters = getCharacters(data);
    expect(characters).toBe(data.characters)
  });
});

describe('searchCharacterByName', () => {
  it('is a function', () => {
    expect(typeof searchCharacterByName).toBe('function');
  });

  it('returns empty array if not a name there', () => {
    const characters = searchCharacterByName('', data.characters);
    expect(characters.length).toBe(0);
  });

  it('returns the characters name', () => {
    const characters = searchCharacterByName("Stewart Ackerley", data.characters);
    expect(characters[0].name).toBe("Stewart Ackerley");
  });
});

describe('getSpells', () => {
  it('is a function', () => {
    expect(typeof getSpells).toBe('function');
  });

  it('returns harry potter spells', () => {
    const spells = getSpells(data);
    expect(spells).toBe(data.spells);
  });
});

describe('searchSpellsByLetter', () => {
  const dummyData = [{
    "id": 1,
    "name": "Waddiwasi",
    "pronunciation": "wah-deh-WAH-see",
    "description": "test description",
  }];

  it('is a function', () => {
    expect(typeof searchSpellsByLetter).toBe('function');
  });

  it('returns the spells by letter', () => {
    const spells = searchSpellsByLetter("w", dummyData);
    expect(spells[0].name).toBe("Waddiwasi");
  });

  it('returns empty array if not spells found', () => {
    const spells = searchSpellsByLetter("b", dummyData);
    expect(spells.length).toBe(0);
  });
});

describe('charactersOrder', () => {
  const dummyData = [{
    "id": 1,
    "name": "Abraxas Malfoy"
  }, {
    "id": 2,
    "name": "Zacharias Smith"
  }];

  it('is a function', () => {
    expect(typeof charactersOrder).toBe('function');
  });

  it('returns characters from A to Z', () => {
    const characters = charactersOrder(dummyData, "A-Z");
    expect(characters).toBe(dummyData);
  });

  it('returns character from Z to A', () => {
    const characters = charactersOrder(dummyData, "Z-A");
    expect(characters).toBe(dummyData.reverse());
  });
});
