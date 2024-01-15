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
  Ax: bg.x + 180,
  Ay: bg.y + 480,
  Aw: 120,
  Ah: 300,
  Bx: bg.x + 300,
  By: bg.y + 480,
  Bw: 360,
  Bh: 60,
  Cx: bg.x + 840,
  Cy: bg.y + 300,
  Cw: 120,
  Ch: 480,
  Dx: bg.x + 780,
  Dy: bg.y + 480,
  Dw: 240,
  Dh: 60,
  Ex: bg.x + 1140,
  Ey: bg.y + 480,
  Ew: 360,
  Eh: 60,
  Fx: bg.x + 1500,
  Fy: bg.y + 480,
  Fw: 120,
  Fh: 300,  
}

var block = {
  left: false,
  right: false,
  up: false,
  down: false
}

// Funkce pro vykreslení hráče a pozadí
function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.strokeRect(gameBox.x, gameBox.y, gameBox.w, gameBox.h);
  c.strokeRect(walls.Ax, walls.Ay, walls.Aw, walls.Ah);
  c.strokeRect(walls.Bx, walls.By, walls.Bw, walls.Bh);
  c.strokeRect(walls.Cx, walls.Cy, walls.Cw, walls.Ch);
  c.strokeRect(walls.Dx, walls.Dy, walls.Dw, walls.Dh);
  c.strokeRect(walls.Ex, walls.Ey, walls.Ew, walls.Eh);
  c.strokeRect(walls.Fx, walls.Fy, walls.Fw, walls.Fh);
  c.drawImage(backgroundImage, bg.x, bg.y, bg.w, bg.h);
  
  // Vykreslení hráče
  c.fillStyle = "red";
  c.fillRect(player.x, player.y, player.size, player.size);
}

function move(side) {
  switch (side) {
    case 1:
      bg.x += 60;
      gameBox.x += 60;
      walls.Ax += 60;
      walls.Bx += 60;
      walls.Cx += 60;
      walls.Dx += 60;
      walls.Ex += 60;
      walls.Fx += 60;
      break;
    case 2:
      bg.x -= 60;
      gameBox.x -= 60;
      walls.Ax -= 60;
      walls.Bx -= 60;
      walls.Cx -= 60;
      walls.Dx -= 60;
      walls.Ex -= 60;
      walls.Fx -= 60;
      break;
    case 3:
      bg.y += 60;
      gameBox.y += 60;
      walls.Ay += 60;
      walls.By += 60;
      walls.Cy += 60;
      walls.Dy += 60;
      walls.Ey += 60;
      walls.Fy += 60;
      break;
    case 4:
      bg.y -= 60;
      gameBox.y -= 60;
      walls.Ay -= 60;
      walls.By -= 60;
      walls.Cy -= 60;
      walls.Dy -= 60;
      walls.Ey -= 60;
      walls.Fy -= 60;    
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

    for (let i = 0; i < 6; i++) {
      let items = [[walls.Ax, walls.Ay, walls.Aw, walls.Ah], [walls.Bx, walls.By, walls.Bw, walls.Bh], [walls.Cx, walls.Cy, walls.Cw, walls.Ch], [walls.Dx, walls.Dy, walls.Dw, walls.Dh], [walls.Ex, walls.Ey, walls.Ew, walls.Eh], [walls.Fx, walls.Fy, walls.Fw, walls.Fh]];
      let wall = items[i];
      
      if (num == 0 && pr.x >= wall[0] && pr.x < wall[0] + wall[2] && pr.y < wall[1] + wall[3] && pr.y >= wall[1]) block.left = true;
      else if (num == 1 && pr.x >= wall[0] && pr.x < wall[0] + wall[2] && pr.y < wall[1] + wall[3] && pr.y >= wall[1]) block.right = true;
      else if (num == 2 && pr.y >= wall[1] && pr.y < wall[1] + wall[3] && pr.x < wall[0] + wall[2] && pr.x >= wall[0]) block.up = true;
      else if (num == 3 && pr.y >= wall[1] && pr.y < wall[1] + wall[3] && pr.x < wall[0] + wall[2] && pr.x >= wall[0]) block.down = true;
    }
  }

  draw();
});

// Načtení pozadí a první vykreslení
backgroundImage.onload = function () {
  draw();
};