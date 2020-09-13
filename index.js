let canvas = document.getElementById('canvas');
let screen = canvas.getContext('2d');

let text = document.getElementById('text');
let images = document.getElementById('images');
let buttonDiv = document.getElementById('buttonDiv');


let character = new Image();
let characterDrawed = false;
let characterPosX = 100;
let characterPosY = 550;
let characterLastPosX = 100;
let characterLastPosY = 400;
let characterWidth = 40;
let characterHeight = 40;
let characterVelX = 0;
let characterVelY = 0;

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
let talk = false;
let pause = true;
let warrior = false;
let mage = false;

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

function start() {
    text.innerHTML = `Olá aventureiro(a)! Meu nome é 
    <a href="https://www.linkedin.com/in/ives-moreira-8871b318a/" target="_blank" rel="noopener">
      Ives Moreira
    </a> 
    e eu serei o mestre desse RPG!
    `;

    const button = document.createElement('button');
    button.setAttribute('type','button');
    button.setAttribute('id', 'button');
    button.setAttribute('onclick', 'firstDialog()');
    button.appendChild(document.createTextNode('Começar!'));

    buttonDiv.appendChild(button); 
}

function firstDialog() {
  clearDivs();

  text.innerHTML = `Escolha sua classe para começar a jogar:`

  const buttonWarrior = document.createElement('button');
  buttonWarrior.setAttribute('type','button');
  buttonWarrior.setAttribute('id', 'button');
  buttonWarrior.setAttribute('onclick', `selectedWarrior()`);
  buttonWarrior.appendChild(document.createTextNode('Guerreiro'));

  const buttonMage = document.createElement('button');
  buttonMage.setAttribute('type','button');
  buttonMage.setAttribute('id', 'button');
  buttonMage.setAttribute('onclick', `selectedMage()`);
  buttonMage.appendChild(document.createTextNode('Mago'));

  buttonDiv.appendChild(buttonWarrior);
  buttonDiv.appendChild(buttonMage);
}

function secondDialog() {
  clearDivs();

  text.innerHTML = `Você está num mundo onde existe apenas um único e grande continente, 
  chamado Erten. Nele, há duas cidades-estado, separadas por uma vasta floresta onde 
  ninguém governa...
  <br>
  <br>
  Tallve, a cidade-estado do sul, é governada por um conselho de cinco magos anciões elfos. 
  É uma cidade onde há respeito e paz. A magia é algo natural nessa cidade e muitas pessoas 
  a praticam. O conselho raramente se envolve com algo fora de Tallve. A harmonia da cidade é 
  o foco principal do conselho.
  <br>
  <br>
  Cornn, a cidade-estado do norte, é governada por um humano, chamado Harrien. Ele é conhecido por 
  sua crueldade e muitas pessoas o temem. A cidade possui bastante comércio e você pode encontrar 
  de tudo por lá. Por lá circulam desde criminosos, praticantes de magia proibida até andarilhos. 
  Isso tudo porque o tirano só se importa com ele mesmo e muitos guerreiros e magos de magia proibida 
  são seus seguidores, sendo quase impossível tirar ele do poder.
  <br>
  <br>
  No meio das cidades-estado, temos uma vasta e densa floresta. Ela não é muito explorada e possui 
  uma grande estrada ligando as cidades. Dizem que coisas estranhas acontecem naquela floresta...
  `;

  const button = document.createElement('button');
  button.setAttribute('type','button');
  button.setAttribute('id', 'button');
  button.setAttribute('onclick', 'thridDialog()');
  button.appendChild(document.createTextNode('Continuar...'));

  buttonDiv.appendChild(button);
}

function thridDialog() {
  clearDivs();

  text.innerHTML = `Você está na cidade de Tallve, mais precisamente na taverna "O Martelo 
  Quebrado". Você está procurando por algum trabalho e, normalmente, nessas tavernas sempre tem 
  alguém contratando...`;

  const button = document.createElement('button');
  button.setAttribute('type','button');
  button.setAttribute('id', 'button');
  button.setAttribute('onclick', 'load()');
  button.appendChild(document.createTextNode('Continuar...'));

  buttonDiv.appendChild(button);
}

function load() {
  console.log(warrior, mage);

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
  if (start) {
    clearDivs();

    characterVelX = 5;
    characterVelY = 5;

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
  
    if (
      characterPosX + characterWidth < allyPosX - 20 ||
      characterPosX - 20 > allyPosX + allyWidth ||
      characterPosY + characterHeight < allyPosY - 20 ||
      characterPosY - 20 > allyPosY + allyHeight
    ) {
      talk = false;
    } else {
      talk = true;
    }
  
    if (collision) {
      //right
      if (characterLastPosX >= allyPosX + allyWidth) {
        characterPosX = allyPosX + allyWidth;
      }
      //left
      else if (characterLastPosX <= allyPosX - characterWidth) {
        characterPosX = allyPosX - characterWidth;
      } else {
        //up
        if (characterLastPosY <= allyPosY - characterHeight) {
          characterPosY = allyPosY - characterHeight;
        }
        //down
        else {
          characterPosY = allyPosY + allyHeight;
        }
      }
    }
  
    characterLastPosX = characterPosX;
    characterLastPosY = characterPosY;
  
    if (talk) {
      images.innerHTML = `<img class="other"
                            src="https://i.pinimg.com/originals/7d/0a/2e/7d0a2e9970ed0bb5761611b51f2c687f.png"
                            alt="other"
                          />
                          `;
  
      text.innerHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat ndolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat ndolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nqui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    } else {
      text.innerHTML = '';
      images.innerHTML = '';
    }
  }
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

function clearDivs() {
  text.innerHTML = '';
  buttonDiv.innerHTML = '';
}

function selectedWarrior() {
  warrior = true;
  secondDialog();
}

function selectedMage() {
  mage = true;
  secondDialog();
}

start();