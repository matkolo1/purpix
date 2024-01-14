// Získání canvas elementu a nastavení kontextu
var canvas = document.getElementById("gameCanvas");
var c = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth - 300;

// Načtení obrázku pozadí
const backgroundImage = new Image();
backgroundImage.src = 'images/lvl1-bg.jpg';

// Inicializace hráče
var player = {
  x: canvas.width / 2 - 30, //240
  y: canvas.height / 2 - 30, //420
  size: 60,
  projection: [[1, 0], [-1, 0], [0, 1], [0, -1]]
};

var bg = {
  x: player.x - 240,
  y: player.y - 300,
  h: 480 * 2,
  w: 900 * 2
}

var gameBox = {
  x: bg.x + 120,
  y: bg.y + 120,
  h: bg.h - 240,
  w: bg.w - 240
}

// Funkce pro vykreslení hráče a pozadí
function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(backgroundImage, bg.x, bg.y, bg.w, bg.h); 
  c.strokeRect(gameBox.x, gameBox.y, gameBox.w, gameBox.h);

  // Vykreslení hráče
  c.fillStyle = "red";
  c.fillRect(player.x, player.y, player.size, player.size);
}

function move(side) {
  switch (side) {
    case 1:
      bg.x += 60;
      gameBox.x += 60;
      break;
    case 2:
      bg.x -= 60;
      gameBox.x -= 60;
      break;
    case 3:
      bg.y += 60;
      gameBox.y += 60;
      break;
    case 4:
      bg.y -= 60;
      gameBox.y -= 60;
      break;
  }
}

// Posluchači klávesnice pro posunutí pozadí
window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      move(1);
      break;
    case "ArrowRight":
      move(2);
      break;
    case 'ArrowUp':
      move(3);
      break;
    case 'ArrowDown':
      move(4);
      break;
  }

  for ([x, y] of player.projection) {
    let pr = {x: player.x + x * 60, y: player.y + y * 60}
    if (!(pr.x >= gameBox.x) || !(pr.x + player.size <= gameBox.x + gameBox.w)) console.log(pr.x, gameBox.x, 'end', pr.x + player.size, gameBox.x + gameBox.w);
  }

  draw();
});

// Načtení pozadí a první vykreslení
backgroundImage.onload = function () {
  draw();
};