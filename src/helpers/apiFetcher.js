import axios from 'axios'

const url = 'https://tiki-minesweeper.herokuapp.com/getMines'

export const getBeginnerMines = () => axios.get(`${url}?size=9&mines=10`)

export const getAdvancedMines = () => axios.get(`${url}?size=16&mines=40`)
