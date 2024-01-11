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
    
  function move(dir) {
    if(dir == "left" || dir == "right") {
      for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
          let sum1 = tiles[i].innerHTML;
          let sum2 = tiles[i+1].innerHTML;
          let sum3 = tiles[i+2].innerHTML;
          let sum4 = tiles[i+3].innerHTML;
          let line = [sum1, sum2, sum3, sum4].map(num => +num);
  
          let filtered = line.filter(num => num);
          let remaining = 4 - filtered.length;
          let numTiles = Array(remaining).fill(0);

        if (dir == "left") {
          let newLine = filtered.concat(numTiles);
          for (let j = 0; j < 4; j++) {
            tiles[i + j].innerHTML = newLine[j];
          }  
        } else if (dir == "right") {
          let newLine = numTiles.concat(filtered);
          for (let j = 0; j < 4; j++) {
            tiles[i + j].innerHTML = newLine[j];
          }  
        }
      }
    }

  } else if(dir == "up" || dir == "down") {
      for (let i = 0; i < 4; i++) {
        let sum1 = tiles[i].innerHTML;
        let sum2 = tiles[i+width].innerHTML;
        let sum3 = tiles[i+(width*2)].innerHTML;
        let sum4 = tiles[i+(width*3)].innerHTML;
        let line = [sum1, sum2, sum3, sum4].map(num => +num);
  
        let filtered = line.filter(num => num);
        let remaining = 4 - filtered.length;
        let numTiles = Array(remaining).fill(0);

        if (dir == "up") {
          let newLine = filtered.concat(numTiles);
          for (let j = 0; j < 4; j++) {
            tiles[i + j * width].innerHTML = newLine[j];
          }  
        } else if (dir == "down") {
          let newLine = numTiles.concat(filtered);
          for (let j = 0; j < 4; j++) {
            tiles[i + j * width].innerHTML = newLine[j];
          }  
        }
      }
    }
  }

  function moveLeft() {
    move("left");
  }
  
  function moveRight() {
    move("right");
  }
  
  function moveUp() {
    move("up");
  }
  
  function moveDown() {
    move("down");
  }    

  function collapse(length, increment){
    for(let i = 0; i < length; i++) {
      if(tiles[i].innerHTML === tiles[i + increment].innerHTML) {
        let combinedTotal = 3 * parseInt(tiles[i].innerHTML);
        tiles[i].innerHTML = combinedTotal;
        tiles[i + increment].innerHTML = 0;
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

  /* Fix: If all directions cause no change then it's fail */
  function isLose() {
    /* Add turn red? 
    message.innerHTML = 'GAME OVER';
    document.removeEventListener('keyup', control);
    setTimeout(() => clear(), 3000); */
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
      collapse(15, 1);
      moveLeft();
      generate();
  }

  function keyRight() {
      moveRight();
      collapse(15, 1);
      moveRight();
      generate();
  }

  function keyUp() {
      moveUp();
      collapse(12, width);
      moveUp();
      generate();
  }

  function keyDown() {
      moveDown();
      collapse(12, width);
      moveDown();
      generate();
  }

  function clear() {
    clearInterval(myTimer);
  }

  function hex() {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style.textAlign = 'center';
        tiles[i].style.display = 'flex';
        tiles[i].style.alignItems = 'center';
        tiles[i].style.justifyContent = 'center';
        tiles[i].style.fontSize = '';
        tiles[i].style.color = '#546B51';
      if (tiles[i].innerHTML == 0) {
        tiles[i].style.backgroundColor = '#BDCCB3';
        tiles[i].style.color = '#BDCCB3';
      }
      else if (tiles[i].innerHTML == 3) {
        tiles[i].style.backgroundColor = '#ECEEDA';
      }
      else if (tiles[i].innerHTML == 9) {
        tiles[i].style.backgroundColor = '#E0EDC8';
      }
      else if (tiles[i].innerHTML == 27) {
        tiles[i].style.backgroundColor = '#CFF293';
      }
      else if (tiles[i].innerHTML == 81) {
        tiles[i].style.backgroundColor = '#9CD539';
      }
      else if (tiles[i].innerHTML == 243) {
        tiles[i].style.backgroundColor = '#0CB010';
        tiles[i].style.color = '#ECEEDA';
        tiles[i].style.fontSize = '2.9rem';
      }
      else if (tiles[i].innerHTML == 729) {
        tiles[i].style.backgroundColor = '#25A072';
        tiles[i].style.color = '#ECEEDA';
        tiles[i].style.fontSize = '2.9rem';
      }
      else if (tiles[i].innerHTML == 2187) {
        tiles[i].style.backgroundColor = '#0CB5A5';
        tiles[i].style.color = '#ECEEDA';
        tiles[i].style.fontSize = '2rem';
      }
      else if (tiles[i].innerHTML == 6561) {
        tiles[i].style.backgroundColor = '#056856';
        tiles[i].style.color = '#ECEEDA';
        tiles[i].style.fontSize = '2rem';
      }
    }
  }
    
hex()
var myTimer = setInterval(hex, 50)
})