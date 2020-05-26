document.addEventListener('DOMContentLoaded', () => {
  const rowNum = 20
  const colNum = 10
  const cellNum = rowNum * colNum

  let htmlElements = ''
  for (let i = 0; i < cellNum; i++) {
    htmlElements += '<div></div>'
  }
  for (let i = 0; i < colNum; i++) {
    htmlElements += '<div class="taken"></div>'
  }

  let miniGridHtml = ''
  for(let i = 0; i < 16; i++) {
    miniGridHtml += '<div></div>'
  }

  const grid = document.querySelector('.grid')
  grid.innerHTML = htmlElements

  const miniGrid = document.querySelector('.mini-grid')
  miniGrid.innerHTML = miniGridHtml

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
    [colNum, colNum + 1, colNum + 2, colNum * 2 + 1],
    [colNum, 1, colNum + 1, colNum * 2 + 1]
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
  let nextRandom = 0

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

  let timerId = setInterval(moveDown, 1000)

  // assign functions to keycodes
  function control (e) {
    if (e.keyCode === 37)
      moveLeft()
    else if (e.keyCode === 38)
      rotate()
    else if (e.keyCode === 39)
      moveRight()
    else if (e.keyCode === 40)
      moveDown()
  }

  document.addEventListener('keyup', control)

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
      random = nextRandom
      nextRandom = Math.floor(Math.random() * tetrominoes.length)
      currentPosition = 4
      currentRotation = 0
      current = tetrominoes[random][currentRotation]
      draw()
      displayShape()
    }
  }

  function rotate() {
    undraw()
    current = tetrominoes[random][(currentRotation++) % 4]
    draw()
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

  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % colNum === colNum - 1)

    if (!isAtRightEdge)
      currentPosition += 1

    if (current.some(index => cells[currentPosition + index].classList.contains('taken')))
      currentPosition -= 1

    draw()
  }

  // display next tetromino
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  const upNextTetrominoes = [
    tetrominoes[0][0],
    tetrominoes[1][0],
    tetrominoes[2][0],
    tetrominoes[3][0],
    tetrominoes[4][0]
  ]

  function displayShape() {
    displaySquares.forEach(cell => {
      cell.classList.remove('tetromino')
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }

  // add functionality to the button
})
