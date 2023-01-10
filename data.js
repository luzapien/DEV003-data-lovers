
// estas funciones son de ejemplo
export const example = () => {
  return 'example';
};

export const anotherExample = () => {
  return 'OMG';
};

export const getBooks = (data) => {
  return data.books;
}

export const getCharacters = (data) => {
  return data.characters;
}

export const searchCharacterByName = (name, characters) => {
  if (name === '') return [];

  const charactersFound = characters.filter(function (character) {
    const characterName = character.name.toLowerCase();
    return characterName.includes(name.toLowerCase());
  });

  return charactersFound;
}

export const charactersOrder = (characters, order) => {
  const orderAZ = characters.sort(function (a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 }
    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1 }
  });

  if (order === 'A-Z') {
    return orderAZ;
  } else if (order === 'Z-A') {
    return orderAZ.reverse();
  }

  return orderAZ;
}

export const getSpells = (data) => {
  return data.spells;
}

export const searchSpellsByLetter = (letter, spells) => {
  const filteredSpells = spells.filter((spell) => spell.name.toLowerCase().startsWith(letter));
  return filteredSpells;
}
