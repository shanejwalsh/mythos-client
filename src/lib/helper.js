import { BASE_COLOR, GRID_SIZE } from '../config/config'
//---- HELPER FUNCTIONS ----//

//Capitalize a word
export const capitalize = word => word[0].toUpperCase() + word.substring(1)

//Title case a sentence
export const titleCase = sentence =>
  sentence
    .split(' ')
    .map(capitalize)
    .join(' ')

//Takes an Avatar Array of colors and builds a CSS Sprite for that
// avatar with the provided Pixel size (default 10).
// Default is to return a normal CSS string but optionally
// can return a React Style Object
export const generateCSS = ({
  cellColors = [],
  pixelSize = 10,
  cssFormat = true
}) => {
  let generatedBoxShadow = ''

  cellColors.forEach((color, i) => {
    if (color === BASE_COLOR) return // make default cells transparent (ignore them)
    const cellRow = Math.ceil((i + 1) / GRID_SIZE) * pixelSize
    let cellColumn = ((i + 1) % GRID_SIZE) * pixelSize
    if (cellColumn === 0) cellColumn = GRID_SIZE * pixelSize
    generatedBoxShadow += `${cellColumn}px ${cellRow}px 0 0 ${color}, `
  })
  generatedBoxShadow = generatedBoxShadow.slice(0, -2) // remove trailing ', '
  //return CSS in a standard format
  if (cssFormat === true) {
    return `.my-avatar {
        height: ${pixelSize}px;
        width: ${pixelSize}px;
        box-shadow: ${generatedBoxShadow} ;
      }`
  }
  //return CSS as react obejct
  return {
    boxShadow: generatedBoxShadow,
    height: `${pixelSize}px`,
    width: `${pixelSize}px`
  }
}
