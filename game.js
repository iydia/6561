document.addEventListener('DOMContentLoaded', () =>  {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score-num');
    const message = document.getElementById('message');
    let tiles = [];
    const width = 4;
    let score = 0;
  
    function init() {
      for (let i = 0; i < width*width; i++) {
        tile = document.createElement('div');
        tile.innerHTML = 0;
        gridDisplay.appendChild(tile);
        tiles.push(tile);
      }
      generate();
      generate();
    }
    init()
  
    function generate() {
      randomNumber = Math.floor(Math.random() * tiles.length);
      if (tiles[randomNumber].innerHTML == 0) {
        tiles[randomNumber].innerHTML = 2
        checkForGameOver();
      } else 
      generate();
    }
  
    function moveRight() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = tiles[i].innerHTML;
          let totalTwo = tiles[i+1].innerHTML;
          let totalThree = tiles[i+2].innerHTML;
          let totalFour = tiles[i+3].innerHTML;
          let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
  
          let filteredRow = row.filter(num => num);
          let missing = 4 - filteredRow.length;
          let zeros = Array(missing).fill(0);
          let newRow = zeros.concat(filteredRow);
  
          tiles[i].innerHTML = newRow[0];
          tiles[i +1].innerHTML = newRow[1];
          tiles[i +2].innerHTML = newRow[2];
          tiles[i +3].innerHTML = newRow[3];
        }
      }
    }
  
    function moveLeft() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = tiles[i].innerHTML;
          let totalTwo = tiles[i+1].innerHTML;
          let totalThree = tiles[i+2].innerHTML;
          let totalFour = tiles[i+3].innerHTML;
          let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
  
          let filteredRow = row.filter(num => num);
          let missing = 4 - filteredRow.length;
          let zeros = Array(missing).fill(0);
          let newRow = filteredRow.concat(zeros);
  
          tiles[i].innerHTML = newRow[0];
          tiles[i +1].innerHTML = newRow[1];
          tiles[i +2].innerHTML = newRow[2];
          tiles[i +3].innerHTML = newRow[3];
        }
      }
    }
  
  
    function moveUp() {
      for (let i=0; i < 4; i++) {
        let totalOne = tiles[i].innerHTML;
        let totalTwo = tiles[i+width].innerHTML;
        let totalThree = tiles[i+(width*2)].innerHTML;
        let totalFour = tiles[i+(width*3)].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
  
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        let newColumn = filteredColumn.concat(zeros);
  
        tiles[i].innerHTML = newColumn[0];
        tiles[i+width].innerHTML = newColumn[1];
        tiles[i+(width*2)].innerHTML = newColumn[2];
        tiles[i+(width*3)].innerHTML = newColumn[3];
      }
    }
  
    function moveDown() {
      for (let i=0; i < 4; i++) {
        let totalOne = tiles[i].innerHTML;
        let totalTwo = tiles[i+width].innerHTML;
        let totalThree = tiles[i+(width*2)].innerHTML;
        let totalFour = tiles[i+(width*3)].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
  
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        let newColumn = zeros.concat(filteredColumn);
  
        tiles[i].innerHTML = newColumn[0];
        tiles[i +width].innerHTML = newColumn[1];
        tiles[i+(width*2)].innerHTML = newColumn[2];
        tiles[i+(width*3)].innerHTML = newColumn[3];
      }
    }
  
    function combineRow() {
      for (let i =0; i < 15; i++) {
        if (tiles[i].innerHTML === tiles[i +1].innerHTML) {
          let combinedTotal = parseInt(tiles[i].innerHTML) + parseInt(tiles[i +1].innerHTML);
          tiles[i].innerHTML = combinedTotal;
          tiles[i +1].innerHTML = 0;
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
        }
      }
      checkForWin()
    }
  
    function combineColumn() {
      for (let i =0; i < 12; i++) {
        if (tiles[i].innerHTML === tiles[i +width].innerHTML) {
          let combinedTotal = parseInt(tiles[i].innerHTML) + parseInt(tiles[i +width].innerHTML);
          tiles[i].innerHTML = combinedTotal;
          tiles[i +width].innerHTML = 0;
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
        }
      }
      checkForWin()
    }
  
    function control(e) {
      if(e.keyCode === 37) {
        keyLeft();
      } else if (e.keyCode === 38) {
        keyUp();
      } else if (e.keyCode === 39) {
        keyRight();
      } else if (e.keyCode === 40) {
        keyDown();
      }
    }
    document.addEventListener('keyup', control)
  
    function keyRight() {
      moveRight();
      combineRow();
      moveRight();
      generate();
    }
  
    function keyLeft() {
      moveLeft();
      combineRow();
      moveLeft();
      generate();
    }
  
    function keyUp() {
      moveUp();
      combineColumn();
      moveUp();
      generate();
    }
  
    function keyDown() {
      moveDown();
      combineColumn();
      moveDown();
      generate();
    }
  
    function checkForWin() {
      for (let i=0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == 2048) {
          message.innerHTML = 'WINNER!';
          document.removeEventListener('keyup', control);
          setTimeout(() => clear(), 3000);
        }
      }
    }
  
    //check if there are no zeros on the board to lose
    function checkForGameOver() {
      let zeros = 0;
      for (let i=0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == 0) {
          zeros++;
        }
      }
      if (zeros === 0) {
        message.innerHTML = 'GAME OVER';
        document.removeEventListener('keyup', control);
        setTimeout(() => clear(), 3000);
      }
    }
  
    function clear() {
      clearInterval(myTimer);
    }
  
    function giveHex() {
      for (let i=0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == 0) tiles[i].style.backgroundColor = '#BDCCB3';
        else if (tiles[i].innerHTML == 2) tiles[i].style.backgroundColor = '#ECEEDA';
        else if (tiles[i].innerHTML  == 4) tiles[i].style.backgroundColor = '#E0EDC8';
        else if (tiles[i].innerHTML  == 8) tiles[i].style.backgroundColor = '#CFF293';
        else if (tiles[i].innerHTML  == 16) tiles[i].style.backgroundColor = '#80ED65';
        else if (tiles[i].innerHTML  == 32) tiles[i].style.backgroundColor = '#3CC34F';
        else if (tiles[i].innerHTML == 64) tiles[i].style.backgroundColor = '#25A072';
        else if (tiles[i].innerHTML == 128) tiles[i].style.backgroundColor = '#0D6857';
        else if (tiles[i].innerHTML == 256) tiles[i].style.backgroundColor = '#084F42';
        else if (tiles[i].innerHTML == 512) tiles[i].style.backgroundColor = '#032D25';
        else if (tiles[i].innerHTML == 1024) tiles[i].style.backgroundColor = '#beeaa5';
        else if (tiles[i].innerHTML == 2048) tiles[i].style.backgroundColor = '#d7d4f0';
      }
  }

  giveHex()
  
  var myTimer = setInterval(giveHex, 50)
  
  })