let canvas = document.getElementById('canvas');
let screen = canvas.getContext('2d');

let character = new Image();
let characterDrawed = false;
let characterPosX = 380;
let characterPosY = 280;
let characterWidth = 40;
let characterHeight = 40;
let characterVelX = 5;
let characterVelY = 5;

let right = false;
let left = false;
let up = false;
let down = false;

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
  character.onload = () => {
    characterDrawed = true;
  };

  if (characterDrawed) {
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
}

function draw() {
  screen.clearRect(0, 0, 800, 600);

  screen.drawImage(character, characterPosX, characterPosY);
}

function loop() {
  update();
  draw();

  setTimeout(loop, 33);
}

load();
