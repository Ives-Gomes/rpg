let canvas = document.getElementById('canvas');
let screen = canvas.getContext('2d');

let character = new Image();
let characterDrawed = false;
let characterPosX = 100;
let characterPosY = 400;
let characterLastPosX = 100;
let characterLastPosY = 400;
let characterWidth = 40;
let characterHeight = 40;
let characterVelX = 5;
let characterVelY = 5;

let ally = new Image();
let allyDrawed = false;
let allyPosX = 400;
let allyPosY = 100;
let allyWidth = 40;
let allyHeight = 40;

let right = false;
let left = false;
let up = false;
let down = false;

let collision = false;

document.addEventListener('keydown', (e) => {
  var kc = e.keyCode;
  e.preventDefault();

  if (kc === 37) left = true;
  if (kc === 38) up = true;
  if (kc === 39) right = true;
  if (kc === 40) down = true;
});

document.addEventListener('keyup', (e) => {
  var kc = e.keyCode;
  e.preventDefault();

  if (kc === 37) left = false;
  if (kc === 38) up = false;
  if (kc === 39) right = false;
  if (kc === 40) down = false;
});

function load() {
  character.src = 'assets/character.png';
  ally.src = 'assets/ally.png';

  character.onload = () => {
    characterDrawed = true;
  };

  ally.onload = () => {
    allyDrawed = true;
  };

  if (characterDrawed && allyDrawed) {
    loop();
  } else {
    setTimeout(load, 100);
  }
}

function update() {
  if (right) {
    characterPosX += characterVelX;

    if (characterPosX > 800 - characterWidth) {
      characterPosX = 800 - characterWidth;
    }
  } else if (left) {
    characterPosX -= characterVelX;

    if (characterPosX < 0) {
      characterPosX = 0;
    }
  } else if (up) {
    characterPosY -= characterVelY;

    if (characterPosY < 0) {
      characterPosY = 0;
    }
  } else if (down) {
    characterPosY += characterVelY;

    if (characterPosY > 600 - characterHeight) {
      characterPosY = 600 - characterHeight;
    }
  }

  if (right && down) {
    characterPosX += characterVelX / 3;
    characterPosY += characterVelY / 3;

    if (characterPosX > 800 - characterWidth) {
      characterPosX = 800 - characterWidth;
    }

    if (characterPosY > 600 - characterHeight) {
      characterPosY = 600 - characterHeight;
    }
  }
  if (left && down) {
    characterPosX -= characterVelX / 3;
    characterPosY += characterVelY / 3;

    if (characterPosX < 0) {
      characterPosX = 0;
    }

    if (characterPosY > 600 - characterHeight) {
      characterPosY = 600 - characterHeight;
    }
  }
  if (right && up) {
    characterPosX += characterVelX / 3;
    characterPosY -= characterVelY / 3;

    if (characterPosX > 800 - characterWidth) {
      characterPosX = 800 - characterWidth;
    }

    if (characterPosY < 0) {
      characterPosY = 0;
    }
  }
  if (left && up) {
    characterPosX -= characterVelX / 3;
    characterPosY -= characterVelY / 3;
  }

  if (characterPosX < 0) {
    characterPosX = 0;
  }

  if (characterPosY < 0) {
    characterPosY = 0;
  }

  // colisão com ally
  // if (
  //   characterPosX < allyPosX + allyWidth + 10 &&
  //   characterPosX + characterWidth + 10 > allyPosX &&
  //   characterPosY < allyPosY + allyHeight + 10 &&
  //   characterPosY + characterHeight + 10 > allyPosY
  // ) {
  //   console.log('Colidiu!');
  // }

  if (
    characterPosX + characterWidth < allyPosX ||
    characterPosX > allyPosX + allyWidth ||
    characterPosY + characterHeight < allyPosY ||
    characterPosY > allyPosY + allyHeight
  ) {
    collision = false;
  } else {
    collision = true;
  }

  if (collision) {
    if (characterLastPosX >= allyPosX + allyWidth) {
      characterPosX = allyPosX + allyWidth + 1;
    }
    //esquerda
    else if (characterLastPosX <= allyPosX - characterWidth) {
      characterPosX = allyPosX - characterWidth - 1;
    }
    //meio
    else {
      //cima
      if (characterLastPosY <= allyPosY - characterHeight + 1) {
        characterPosY = allyPosY - characterHeight + 1;
      }
      //baixo
      else {
        characterPosY = allyPosY + allyHeight + 1;
      }
    }
  }

  characterLastPosX = characterPosX;
  characterLastPosY = characterPosY;
}

function draw() {
  screen.clearRect(0, 0, 800, 600);

  screen.drawImage(character, characterPosX, characterPosY);
  screen.drawImage(ally, allyPosX, allyPosY);
}

function loop() {
  update();
  draw();

  setTimeout(loop, 33);
}

load();
