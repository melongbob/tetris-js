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
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'blue'
  ]

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

  const tetrominoes = [lTetromino, oTetromino, tTetromino, iTetromino, zTetromino]

  let currentPosition = 4
  let currentRotation = 0
  let random = Math.floor(Math.random() * tetrominoes.length)
  let current = tetrominoes[random][currentRotation]

  // draw tetromino
  function draw () {
    current.forEach(index => {
      cells[currentPosition + index].classList.add('tetromino')
      cells[currentPosition + index].style.backgroundColor = colors[random]
    })
  }

  function undraw () {
    current.forEach(index => {
      cells[currentPosition + index].classList.remove('tetromino')
      cells[currentPosition + index].style.backgroundColor = ''
    })
  }

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
      addScore()
      gameOver()
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
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    [1, 2, displayWidth, displayWidth + 1]
  ]

  function displayShape() {
    displaySquares.forEach(cell => {
      cell.classList.remove('tetromino')
      cell.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }

  // add functionality to the button
  startButton.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * tetrominoes.length)
      displayShape()
    }
  })

  function addScore() {
    for (let i = 0; i < cellNum; i += colNum) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if (row.every(index => cells[index].classList.contains('taken'))) {
        score += 10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          cells[index].classList.remove('taken')
          cells[index].classList.remove('tetromino')
          cells[index].style.backgroundColor = ''
        })
        const cellsRemoved = cells.splice(i, colNum)
        cells = cellsRemoved.concat(cells)
        cells.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  function gameOver() {
    if(current.some(index => cells[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'end'
      clearInterval(timerId)
    }
  }
})
