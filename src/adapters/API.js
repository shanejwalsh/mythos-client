const BASE_URL = window.location.href.includes('ngrok')
  ? 'https://a200359b.ngrok.io/api/v1'
  : 'http://localhost:3000/api/v1'
const CHAR_URL = BASE_URL + '/characters'

const getAllCharacters = () => fetch(CHAR_URL).then(resp => resp.json())

const getCharacterById = id =>
  fetch(`${CHAR_URL}/${id}`).then(resp => resp.json())

export default {
  getAllCharacters,
  getCharacterById
}
