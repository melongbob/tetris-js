document.addEventListener('DOMContentLoaded', () => {
  const rowNum = 20
  const colNum = 10
  const cellNum = rowNum * colNum

  let htmlElements = ''
  for (let i = 0; i < cellNum; i++) {
    htmlElements += '<div></div>'
  }
  document.getElementsByClassName('grid')[0].innerHTML = htmlElements
})
