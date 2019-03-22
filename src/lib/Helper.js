//---- HELPER FUNCTIONS ----//

//Capitalize a word
export const capitalize = word => word[0].toUpperCase() + word.substring(1)

//title case a sentence
export const titleCase = sentence =>
  sentence
    .split(' ')
    .map(capitalize)
    .join(' ')
