// Získání canvas elementu a nastavení kontextu
var canvas = document.getElementById("gameCanvas");
var c = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth - 300;

// Načtení obrázku pozadí
const backgroundImage = new Image();
backgroundImage.src = './images/lvl1_bg.jpg';

// Inicializace hráče
var player = {
  x: canvas.width / 2 - 30, //240
  y: canvas.height / 2 - 30, //420
  size: 60,
  projection: [[1, 0, 1], [-1, 0, 0], [0, 1, 3], [0, -1, 2]]
};

var bg = {
  x: player.x - 240,
  y: player.y - 300,
  h: 480 * 2,
  w: 900 * 2
}

var gameBox = {
  x: bg.x + 180,
  y: bg.y + 180,
  h: bg.h - 360,
  w: bg.w - 360
}

var walls = {
  A: { x: bg.x + 180, y: bg.y + 480, w: 120, h: 300 },
  B: { x: bg.x + 300, y: bg.y + 480, w: 360, h: 60 },
  C: { x: bg.x + 840, y: bg.y + 300, w: 120, h: 480 },
  D: { x: bg.x + 780, y: bg.y + 480, w: 240, h: 60 },
  E: { x: bg.x + 1140, y: bg.y + 480, w: 360, h: 60 },
  F: { x: bg.x + 1500, y: bg.y + 480, w: 120, h: 300 },
}

var block = {
  left: false,
  right: false,
  up: false,
  down: false
}

const coinImg = new Image();
coinImg.src = './images/coin.jpg';
var coin = {
  A: { state: true, x: bg.x + 420, y: bg.y + 600 },
  B: { state: true, x: bg.x + 600, y: bg.y + 660 },
  C: { state: true, x: bg.x + 1140, y: bg.y + 660 },
  D: { state: true, x: bg.x + 1320, y: bg.y + 600 },
  size: 60,
  colected: 0,
}

// Funkce pro vykreslení hráče a pozadí
function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.strokeRect(gameBox.x, gameBox.y, gameBox.w, gameBox.h);
  c.strokeRect(walls.A.x, walls.A.y, walls.A.w, walls.A.h);
  c.strokeRect(walls.B.x, walls.B.y, walls.B.w, walls.B.h);
  c.strokeRect(walls.C.x, walls.C.y, walls.C.w, walls.C.h);
  c.strokeRect(walls.D.x, walls.D.y, walls.D.w, walls.D.h);
  c.strokeRect(walls.E.x, walls.E.y, walls.E.w, walls.E.h);
  c.strokeRect(walls.F.x, walls.F.y, walls.F.w, walls.F.h);
  c.drawImage(backgroundImage, bg.x, bg.y, bg.w, bg.h);
  if (coin.A.state) c.drawImage(coinImg, coin.A.x, coin.A.y, coin.size, coin.size);
  if (coin.B.state) c.drawImage(coinImg, coin.B.x, coin.B.y, coin.size, coin.size);
  if (coin.C.state) c.drawImage(coinImg, coin.C.x, coin.C.y, coin.size, coin.size);
  if (coin.D.state) c.drawImage(coinImg, coin.D.x, coin.D.y, coin.size, coin.size);

  // Vykreslení hráče
  c.fillStyle = "red";
  c.fillRect(player.x, player.y, player.size, player.size);
}

function move(side) {
  function Move(prop, value) {
    bg[prop] += value;
    gameBox[prop] += value;
    walls.A[prop] += value;
    walls.B[prop] += value;
    walls.C[prop] += value;
    walls.D[prop] += value;
    walls.E[prop] += value;
    walls.F[prop] += value;
    coin.A[prop] += value;
    coin.B[prop] += value;
    coin.C[prop] += value;
    coin.D[prop] += value;
  }


  switch (side) {
    case 1:
      Move('x', 60);
      break;
    case 2:
      Move('x', -60);
      break;
    case 3:
      Move('y', 60);
      break;
    case 4:
      Move('y', -60);
      break;
  }
}

// Posluchači klávesnice pro posunutí pozadí
window.addEventListener("keydown", function (event) {

  switch (event.key) {
    case "ArrowLeft":
      if (!block.left) move(1);
      break;
    case "ArrowRight":
      if (!block.right) move(2);
      break;
    case 'ArrowUp':
      if (!block.up) move(3);
      break;
    case 'ArrowDown':
      if (!block.down) move(4);
      break;
  }

  block.left = false; block.right = false; block.up = false; block.down = false;

  for ([x, y, num] of player.projection) {
    let pr = { x: player.x + x * 60, y: player.y + y * 60 }
    if (pr.x < gameBox.x) block.left = true;
    else if (!(pr.x + player.size <= gameBox.x + gameBox.w)) block.right = true;
    else if (!(pr.y + player.size <= gameBox.y + gameBox.h)) block.down = true;
    else if (!(pr.y >= gameBox.y)) block.up = true;

    let items = [walls.A, walls.B, walls.C, walls.D, walls.E, walls.F];
    for (wall of items) {
      if (num == 0 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.left = true;
      else if (num == 1 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.right = true;
      else if (num == 2 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.up = true;
      else if (num == 3 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.down = true;
    }
  }
  let coins = [coin.A, coin.B, coin.C, coin.D]
  for (coinObj of coins) {
    if (coinObj['state'] && player.x == coinObj['x'] && player.y == coinObj['y']) {coinObj['state'] = false; coin.colected++; console.log(coin.colected)}
  }
  draw();
});

// Načtení pozadí a první vykreslení
backgroundImage.onload = function () {
  draw();
};
let actionsDisabled = false;

function toggleActions() {
  if (actionsDisabled) {
    enableActions();
  } else {
    disableActions();
  }
}
  document.addEventListener('contextmenu', preventDefault);
  document.addEventListener('keydown', preventKeyCombination);

function enableActions() {
  document.removeEventListener('contextmenu', preventDefault);
  document.removeEventListener('keydown', preventKeyCombination);

  alert('Actions are now enabled.');
  actionsDisabled = false;
}

function preventDefault(e) {
  e.preventDefault();
}

function preventKeyCombination(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.key === 'u')) {
    e.preventDefault();
  }
}