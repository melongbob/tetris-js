document.addEventListener('DOMContentLoaded', () => {
  const rowNum = 20
  const colNum = 10
  const cellNum = rowNum * colNum

  let htmlElements = ''
  for (let i = 0; i < cellNum; i++) {
    htmlElements += '<div></div>'
  }
  for (let i = 0; i< colNum; i++) {
    htmlElements += '<div class="taken"></div>'
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
  let random = Math.floor(Math.random() * tetrominoes.length)
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

  draw()
  let timerId = setInterval(moveDown, 1000)

  //assign functions to keycodes

  function moveDown () {
    undraw()
    currentPosition += colNum
    draw()
    freeze()
  }

  function freeze () {
    if (current.some(index => cells[currentPosition + index + colNum].classList.contains('taken'))) {
      current.forEach(index => cells[currentPosition + index].classList.add('taken'))

      // start a new tetromino
      random = Math.floor(Math.random() * tetrominoes.length)
      currentPosition = 4
      currentRotation = 0
      current = tetrominoes[random][currentRotation]
      draw()
    }
  }

  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % colNum === 0)

    if (!isAtLeftEdge)
      currentPosition -= 1

    if (current.some(index => cells[currentPosition + index].classList.contains('taken')))
      currentPosition += 1

    draw()
  }

})
