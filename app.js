document.addEventListener('DOMContentLoaded', () => {
  const rowNum = 20
  const colNum = 10
  const cellNum = rowNum * colNum

  let htmlElements = ''
  for (let i = 0; i < cellNum; i++) {
    htmlElements += '<div></div>'
  }

  const grid = document.querySelector('.grid')
  grid.innerHTML = htmlElements

  let cells = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.getElementById('score')
  const startButton = document.getElementById('start-button')

  const lTetromino = [
    [1, colNum + 1, colNum * 2 + 1, 2],
    [colNum, colNum + 1, colNum + 2, colNum * 2 + 2],
    [1, colNum + 1, colNum * 2 + 1, colNum * 2],
    [colNum, colNum * 2, colNum * 2 + 1, colNum * 2 + 2]
  ]

  const oTetromino = [
    [0, 1, colNum, colNum + 1],
    [0, 1, colNum, colNum + 1],
    [0, 1, colNum, colNum + 1],
    [0, 1, colNum, colNum + 1]
  ]

  const tTetromino = [
    [1, colNum, colNum + 1, colNum + 2],
    [1, colNum + 1, colNum * 2 + 1, colNum + 2],
    [colNum + 1, colNum + 2, colNum + 3, colNum * 2 + 1],
    [colNum + 1, 2, colNum + 2, colNum * 2 + 2]
  ]

  const iTetromino = [
    [1, colNum + 1, colNum * 2 + 1, colNum * 3 + 1],
    [colNum, colNum + 1, colNum + 2, colNum + 3],
    [1, colNum + 1, colNum * 2 + 1, colNum * 3 + 1],
    [colNum, colNum + 1, colNum + 2, colNum + 3]
  ]

  const zTetromino = [
    [1, 2, colNum, colNum + 1],
    [0, colNum, colNum + 1, colNum * 2 + 1],
    [1, 2, colNum, colNum + 1],
    [0, colNum, colNum + 1, colNum * 2 + 1]
  ]

  const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0
  let random = Math.floor(Math.random()*tetrominoes.length)
  let current = tetrominoes[random][currentRotation]

  // draw tetromino
  function draw () {
    current.forEach(index => {
      cells[currentPosition + index].classList.add('tetromino')
    })
  }

  function undraw () {
    current.forEach(index => {
      cells[currentPosition + index].classList.remove('tetromino')
    })
  }
})
