document.addEventListener('DOMContentLoaded', () =>  {
    const grid = document.querySelector('.grid');
    const score = document.getElementById('score-num');
    const message = document.getElementById('message');
    const width = 4;
    let tiles = [];
    let count = 0;
  
    function generate() {
        rand = Math.floor(Math.random() * tiles.length);
        if (tiles[rand].innerHTML == 0) {
          // Generate 3 or 9 instead of 2
          tiles[rand].innerHTML = Math.random() < 0.5 ? 3 : 9;
          isLose();
        } else {
          generate();
        }
      }
      
    function init() {
      for (let i = 0; i < width*width; i++) {
        tile = document.createElement('div');
        tile.innerHTML = 0;
        grid.appendChild(tile);
        tiles.push(tile);
      }
      generate();
      generate();
    }
    init()
    
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
          if (i % 4 === 0) {
            let totalOne = tiles[i].innerHTML;
            let totalTwo = tiles[i+1].innerHTML;
            let totalThree = tiles[i+2].innerHTML;
            let totalFour = tiles[i+3].innerHTML;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
    
            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let numTiles = Array(missing).fill(0);
            let newRow = filteredRow.concat(numTiles);
    
            tiles[i].innerHTML = newRow[0];
            tiles[i+1].innerHTML = newRow[1];
            tiles[i+2].innerHTML = newRow[2];
            tiles[i+3].innerHTML = newRow[3];
          }
        }
      }
  
    function moveRight() {
      for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = tiles[i].innerHTML;
          let totalTwo = tiles[i+1].innerHTML;
          let totalThree = tiles[i+2].innerHTML;
          let totalFour = tiles[i+3].innerHTML;
          let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
  
          let filteredRow = row.filter(num => num);
          let missing = 4 - filteredRow.length;
          let numTiles = Array(missing).fill(0);
          let newRow = numTiles.concat(filteredRow);
  
          tiles[i].innerHTML = newRow[0];
          tiles[i+1].innerHTML = newRow[1];
          tiles[i+2].innerHTML = newRow[2];
          tiles[i+3].innerHTML = newRow[3];
        }
      }
    }  
  
    function moveUp() {
      for (let i = 0; i < 4; i++) {
        let totalOne = tiles[i].innerHTML;
        let totalTwo = tiles[i+width].innerHTML;
        let totalThree = tiles[i+(width*2)].innerHTML;
        let totalFour = tiles[i+(width*3)].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
  
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let numTiles = Array(missing).fill(0);
        let newColumn = filteredColumn.concat(numTiles);
  
        tiles[i].innerHTML = newColumn[0];
        tiles[i+width].innerHTML = newColumn[1];
        tiles[i+(width*2)].innerHTML = newColumn[2];
        tiles[i+(width*3)].innerHTML = newColumn[3];
      }
    }
  
    function moveDown() {
      for (let i = 0; i < 4; i++) {
        let totalOne = tiles[i].innerHTML;
        let totalTwo = tiles[i+width].innerHTML;
        let totalThree = tiles[i+(width*2)].innerHTML;
        let totalFour = tiles[i+(width*3)].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
  
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let numTiles = Array(missing).fill(0);
        let newColumn = numTiles.concat(filteredColumn);
  
        tiles[i].innerHTML = newColumn[0];
        tiles[i+width].innerHTML = newColumn[1];
        tiles[i+(width*2)].innerHTML = newColumn[2];
        tiles[i+(width*3)].innerHTML = newColumn[3];
      }
    }
  
    function collapseRow() {
        for (let i = 0; i < 15; i++) {
          if (tiles[i].innerHTML === tiles[i + 1].innerHTML) {
            let combinedTotal = 3 * parseInt(tiles[i].innerHTML);
            tiles[i].innerHTML = combinedTotal;
            tiles[i + 1].innerHTML = 0;
            count += combinedTotal;
            score.innerHTML = count;
          }
        }
        isWin();
      }
    
      function collapseColumn() {
        for (let i = 0; i < 12; i++) {
          if (tiles[i].innerHTML === tiles[i + width].innerHTML) {
            let combinedTotal = 3 * parseInt(tiles[i].innerHTML);
            tiles[i].innerHTML = combinedTotal;
            tiles[i + width].innerHTML = 0;
            count += combinedTotal;
            score.innerHTML = count;
          }
        }
        isWin();
      }
    
      function isWin() {
        for (let i = 0; i < tiles.length; i++) {
          if (tiles[i].innerHTML == 6561) {
            message.innerHTML = 'You got 6561!';
            document.removeEventListener('keyup', control);
            setTimeout(() => clear(), 3000);
          }
        }
      }
      
    function control(input) {
      if(input.keyCode === 37) {
        keyLeft();
      } else if (input.keyCode === 38) {
        keyUp();
      } else if (input.keyCode === 39) {
        keyRight();
      } else if (input.keyCode === 40) {
        keyDown();
      }
    }
    document.addEventListener('keyup', control)
  
    function keyLeft() {
        moveLeft();
        collapseRow();
        moveLeft();
        generate();
    }
  
    function keyRight() {
        moveRight();
        collapseRow();
        moveRight();
        generate();
    }
  
    function keyUp() {
        moveUp();
        collapseColumn();
        moveUp();
        generate();
    }
  
    function keyDown() {
        moveDown();
        collapseColumn();
        moveDown();
        generate();
    }
  
    /* Fix: If all directions cause no change then it's fail */
    function isLose() {
      let numTiles = 0;
      for (let i=0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == 0) {
            numTiles++;
        }
      }
      if (numTiles === 0) {
        /* Add turn red? 
        message.innerHTML = 'GAME OVER';
        document.removeEventListener('keyup', control);
        setTimeout(() => clear(), 3000); */
      }
    }
  
    function clear() {
      clearInterval(myTimer);
    }
  
    function giveHex() {
      for (let i=0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == 0) tiles[i].style.backgroundColor = '#BDCCB3';
        else if (tiles[i].innerHTML == 3) tiles[i].style.backgroundColor = '#ECEEDA';
        else if (tiles[i].innerHTML == 9) tiles[i].style.backgroundColor = '#E0EDC8';
        else if (tiles[i].innerHTML == 27) tiles[i].style.backgroundColor = '#CFF293';
        else if (tiles[i].innerHTML == 81) tiles[i].style.backgroundColor = '#065D09';
        else if (tiles[i].innerHTML == 243) tiles[i].style.backgroundColor = '#9CD539';
        else if (tiles[i].innerHTML == 729) tiles[i].style.backgroundColor = '#25A072';
        else if (tiles[i].innerHTML == 2187) tiles[i].style.backgroundColor = '#0CB5A5';
        else if (tiles[i].innerHTML == 6561) tiles[i].style.backgroundColor = '#056856';
        else if (tiles[i].innerHTML == 19683) tiles[i].style.backgroundColor = '#032D25';
      }
  }

  giveHex()
  
  var myTimer = setInterval(giveHex, 50)
  
  })