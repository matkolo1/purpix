var canvas = document.getElementById("gameCanvas");
var c = canvas.getContext("2d");

switch (Math.round(window.innerHeight / 10) % 3) {
  case (0):
    canvas.height = Math.round(window.innerHeight / 10) * 10;
    console.log(0, canvas.height);
    break;
  case (1):
    canvas.height = Math.round(window.innerHeight / 10) * 10 - 10;
    console.log('-1', canvas.height);
    break;
  case (2):
    canvas.height = Math.round(window.innerHeight / 10) * 10 - 20;
    console.log('-2', canvas.height);
    break;
  default:
    console.log('idk kurva')
    break;
}

canvas.width = window.innerWidth - (sie(200));
document.getElementById('console').style.width = `100%`;
document.getElementById('cntrl').style.width = `${sie(200)}px`;
document.getElementById('itex').style.width = `${sie(200)}px`;
document.getElementById('itex').style.fontSize = `${siz(25)}px`;
for (let i = 0; i <= 12; i++) {
  document.getElementById(`info${i}`).style.width = `100%`;
  document.getElementById(`info${i}`).style.height = `${siz(20)}px`;
  document.getElementById(`info${i}`).style.fontSize = `${siz(15)}px`;
}
document.getElementById('input').style.width = `100%`;
document.getElementById('input').style.height = `${siz(30)}px`;
document.getElementById('input').style.fontSize = `${siz(15)}px`

function siz(size) {
  size /= 60;
  size *= Math.floor(canvas.height / 10);
  return size;
}
function sie(size) {
  size /= 60;
  size *= Math.floor(window.innerWidth / 10);
  return size;
}
var player = {
  x: canvas.width / 2 - siz(30),
  y: canvas.height / 2 - siz(30),
  size: siz(60),
  projection: [[1, 0, 1], [-1, 0, 0], [0, 1, 3], [0, -1, 2]]
};

const backgroundImage = new Image();
backgroundImage.src = './assets/lvl9_bg.jpg';
var bg = {
  x: player.x - siz(240),
  y: player.y - siz(300),
  h: siz(900 * 2),
  w: siz(900 * 2)
}

var gameBox = {
  x: bg.x + siz(180),
  y: bg.y + siz(180),
  h: bg.h - siz(360),
  w: bg.w - siz(360)
}

var walls = { // 52
  A: { x: bg.x + siz(1320), y: bg.y + siz(1440), w: siz(5 * 60), h: siz(60) },
  B: { x: bg.x + siz(1560), y: bg.y + siz(1260), w: siz(60), h: siz(60) },
  C: { x: bg.x + siz(1260), y: bg.y + siz(1600), w: siz(60), h: siz(20) },
  D: { x: bg.x + siz(1260), y: bg.y + siz(1480), w: siz(20), h: siz(140) },
  E: { x: bg.x + siz(1300), y: bg.y + siz(1440), w: siz(20), h: siz(140) },
  F: { x: bg.x + siz(1160), y: bg.y + siz(1480), w: siz(120), h: siz(20) },
  G: { x: bg.x + siz(1180), y: bg.y + siz(1440), w: siz(120), h: siz(20) },
  H: { x: bg.x + siz(1080), y: bg.y + siz(1440), w: siz(80), h: siz(60) },
  I: { x: bg.x + siz(1020), y: bg.y + siz(1440), w: siz(60), h: siz(180) },
  J: { x: bg.x + siz(900), y: bg.y + siz(1260), w: siz(9 * 60), h: siz(60) },
  K: { x: bg.x + siz(1260), y: bg.y + siz(1080), w: siz(60), h: siz(6 * 60) },
  L: { x: bg.x + siz(600), y: bg.y + siz(1060), w: siz(12 * 60), h: siz(20) },
  M: { x: bg.x + siz(840), y: bg.y + siz(1080), w: siz(60), h: siz(9 * 60) },
  N: { x: bg.x + siz(600), y: bg.y + siz(1380), w: siz(120), h: siz(60) },
  O: { x: bg.x + siz(580), y: bg.y + siz(1060), w: siz(20), h: siz(6 * 60 + 20) },
  P: { x: bg.x + siz(600), y: bg.y + siz(1020), w: siz(12 * 60), h: siz(20) },
  Q: { x: bg.x + siz(360), y: bg.y + siz(1600), w: siz(60), h: siz(20) },
  R: { x: bg.x + siz(360), y: bg.y + siz(1420), w: siz(20), h: siz(200) },
  S: { x: bg.x + siz(400), y: bg.y + siz(1380), w: siz(20), h: siz(200) },
  T: { x: bg.x + siz(260), y: bg.y + siz(1420), w: siz(120), h: siz(20) },
  U: { x: bg.x + siz(280), y: bg.y + siz(1380), w: siz(120), h: siz(20) },
  V: { x: bg.x + siz(180), y: bg.y + siz(1380), w: siz(80), h: siz(60) },
  W: { x: bg.x + siz(360), y: bg.y + siz(1140), w: siz(60), h: siz(4 * 60) },
  X: { x: bg.x + siz(180), y: bg.y + siz(1080), w: siz(4 * 60), h: siz(60) },
  Y: { x: bg.x + siz(420), y: bg.y + siz(1260), w: siz(120), h: siz(60) },
  Z: { x: bg.x + siz(180), y: bg.y + siz(840), w: siz(60), h: siz(60) },
  AA: { x: bg.x + siz(1440), y: bg.y + siz(300), w: siz(180), h: siz(60) },
  AB: { x: bg.x + siz(1380), y: bg.y + siz(180), w: siz(60), h: siz(6 * 60) },
  AC: { x: bg.x + siz(1260), y: bg.y + siz(900), w: siz(60), h: siz(120) },
  AD: { x: bg.x + siz(840), y: bg.y + siz(900), w: siz(60), h: siz(120) },
  AE: { x: bg.x + siz(780), y: bg.y + siz(840), w: siz(14 * 60), h: siz(60) },
  AF: { x: bg.x + siz(840), y: bg.y + siz(820), w: siz(60), h: siz(20) },
  AG: { x: bg.x + siz(1200), y: bg.y + siz(820), w: siz(60), h: siz(20) },
  AH: { x: bg.x + siz(1240), y: bg.y + siz(480), w: siz(20), h: siz(5 * 60 + 20) },
  AI: { x: bg.x + siz(1260), y: bg.y + siz(480), w: siz(120), h: siz(60) },
  AJ: { x: bg.x + siz(1260), y: bg.y + siz(660), w: siz(6 * 60), h: siz(60) },
  AK: { x: bg.x + siz(1200), y: bg.y + siz(180), w: siz(60), h: siz(180) },
  AL: { x: bg.x + siz(1140), y: bg.y + siz(300), w: siz(60), h: siz(60) },
  AM: { x: bg.x + siz(1200), y: bg.y + siz(480), w: siz(20), h: siz(6 * 60) },
  AN: { x: bg.x + siz(900), y: bg.y + siz(300), w: siz(120), h: siz(60) },
  AO: { x: bg.x + siz(840), y: bg.y + siz(180), w: siz(60), h: siz(140) },
  AP: { x: bg.x + siz(900), y: bg.y + siz(480), w: siz(5 * 60), h: siz(60) },
  AQ: { x: bg.x + siz(880), y: bg.y + siz(320), w: siz(20), h: siz(8 * 60) },
  AR: { x: bg.x + siz(840), y: bg.y + siz(340), w: siz(20), h: siz(8 * 60) },
  AS: { x: bg.x + siz(600), y: bg.y + siz(840), w: siz(60), h: siz(60) },
  AT: { x: bg.x + siz(600), y: bg.y + siz(660), w: siz(240), h: siz(60) },
  AU: { x: bg.x + siz(540), y: bg.y + siz(180), w: siz(60), h: siz(200) },
  AV: { x: bg.x + siz(580), y: bg.y + siz(380), w: siz(20), h: siz(11 * 60) },
  AW: { x: bg.x + siz(540), y: bg.y + siz(400), w: siz(20), h: siz(17 * 60 + 20) },
  AX: { x: bg.x + siz(360), y: bg.y + siz(840), w: siz(180), h: siz(60) },
  AY: { x: bg.x + siz(360), y: bg.y + siz(660), w: siz(60), h: siz(180) },
  AZ: { x: bg.x + siz(180), y: bg.y + siz(660), w: siz(180), h: siz(60) },
  BA: { x: bg.x + siz(180), y: bg.y + siz(420), w: siz(6*60), h: siz(60) },
  all: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC',
    'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP',
    'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 'BA']
}

var block = {
  left: false,
  right: false,
  up: false,
  down: false
}

const coinImg = new Image();
coinImg.src = './assets/coin.jpg';
var coin = {
  A: { state: true, x: bg.x + siz(660), y: bg.y + siz(720) },
  B: { state: true, x: bg.x + siz(1500), y: bg.y + siz(240) },
  C: { state: true, x: bg.x + siz(1320), y: bg.y + siz(600) },
  D: { state: true, x: bg.x + siz(240), y: bg.y + siz(1500) },
  E: { state: true, x: bg.x + siz(1440), y: bg.y + siz(1320) },
  F: { state: true, x: bg.x + siz(1140), y: bg.y + siz(1560) },
  size: siz(60),
  colected: 0,
}

var end = {
  x: bg.x + siz(1560),
  y: bg.y + siz(1500),
}

var sign = {
  A: { state: false, x: bg.x + siz(240), y: bg.y + siz(720) },
  B: { state: false, x: bg.x + siz(720), y: bg.y + siz(540) },
  C: { state: false, x: bg.x + siz(960), y: bg.y + siz(180) },
  D: { state: false, x: bg.x + siz(240), y: bg.y + siz(240) },
}

var start = {
  x: player.x,
  y: player.y,
}

var door = {
  A: { state: true, x: bg.x + siz(239), y: bg.y + siz(840), w: siz(122), h: siz(60) },
  B: { state: true, x: bg.x + siz(659), y: bg.y + siz(840), w: siz(122), h: siz(60) },
  C: { state: true, x: bg.x + siz(1439), y: bg.y + siz(1260), w: siz(122), h: siz(60) },
  num: { A: { x: bg.x + siz(365), y: bg.y + siz(858) }, B: { x: bg.x + siz(645), y: bg.y + siz(858) }, C: { x: bg.x + siz(1425), y: bg.y + siz(1278) }, },
}

const codedoorImgW = new Image();
const codedoorImgH = new Image();
codedoorImgW.src = './assets/CodedoorsW.jpg';
codedoorImgH.src = './assets/CodedoorsH.jpg'
var codedoor = {
  A: { state: true, near: false, code: Math.floor(Math.random() * 100000), x: bg.x + siz(1019), y: bg.y + siz(300), w: siz(122), h: siz(60) },
  B: { state: true, near: false, code: Math.floor(Math.random() * 100000), x: bg.x + siz(719), y: bg.y + siz(1380), w: siz(122), h: siz(60) },
  C: { state: true, near: false, code: Math.floor(Math.random() * 100000), x: bg.x + siz(1020), y: bg.y + siz(1319), w: siz(60), h: siz(122) },
  num: { A: { x: bg.x + siz(1005), y: bg.y + siz(318) }, C: { x: bg.x + siz(1020), y: bg.y + siz(1318) }, B: { x: bg.x + siz(705), y: bg.y + siz(1398) }, },
}

var jumppad = {
  A: { x: bg.x + siz(480), y: bg.y + siz(300), way: [2, 2] },
  B: { x: bg.x + siz(600), y: bg.y + siz(300), way: [1, 2] },
  C: { x: bg.x + siz(1320), y: bg.y + siz(420), way: [2, 2] },
  D: { x: bg.x + siz(1440), y: bg.y + siz(420), way: [1, 2] },
  E: { x: bg.x + siz(480), y: bg.y + siz(540), way: [2, 2] },
  F: { x: bg.x + siz(600), y: bg.y + siz(540), way: [1, 2] },
  G: { x: bg.x + siz(1080), y: bg.y + siz(600), way: [4, 2] },
  H: { x: bg.x + siz(1080), y: bg.y + siz(720), way: [3, 2] },
  I: { x: bg.x + siz(480), y: bg.y + siz(960), way: [2, 2] },
  J: { x: bg.x + siz(600), y: bg.y + siz(960), way: [1, 2] },
  K: { x: bg.x + siz(960), y: bg.y + siz(960), way: [4, 2] },
  L: { x: bg.x + siz(960), y: bg.y + siz(1080), way: [3, 2] },
  M: { x: bg.x + siz(1200), y: bg.y + siz(1140), way: [2, 2] },
  N: { x: bg.x + siz(1320), y: bg.y + siz(1140), way: [1, 2] },
  O: { x: bg.x + siz(180), y: bg.y + siz(1320), way: [4, 2] },
  P: { x: bg.x + siz(180), y: bg.y + siz(1440), way: [3, 2] },
  Q: { x: bg.x + siz(1200), y: bg.y + siz(1500), way: [2, 2] },
  R: { x: bg.x + siz(1320), y: bg.y + siz(1500), way: [1, 2] },
}

var teleporters = {
  A: { state: false, x1: bg.x + siz(960), x2: bg.x + siz(1500), y1: bg.y + siz(600), y2: bg.y + siz(180), way1: [[7, 3], [9, 2]], way2: [[7, 4], [9, 1]] },
  B: { state: false, x1: bg.x + siz(240), x2: bg.x + siz(300), y1: bg.y + siz(540), y2: bg.y + siz(960), way1: [[1, 2], [7, 4]], way2: [[1, 1], [7, 3]] },
  C: { state: false, x1: bg.x + siz(1140), x2: bg.x + siz(1500), y1: bg.y + siz(960), y2: bg.y + siz(720), way1: [[4, 3], [6, 2]], way2: [[4, 4], [6, 1]] },
  D: { state: false, x1: bg.x + siz(660), x2: bg.x + siz(900), y1: bg.y + siz(1200), y2: bg.y + siz(1500), way1: [[4, 2], [5, 4]], way2: [[4, 1], [5, 3]] }
}

var resizer = {
  A: { x: bg.x + siz(360), y: bg.y + siz(360) },
  B: { x: bg.x + siz(660), y: bg.y + siz(420) },
  C: { x: bg.x + siz(1080), y: bg.y + siz(420) },
  D: { x: bg.x + siz(960), y: bg.y + siz(780) },
  E: { x: bg.x + siz(1380), y: bg.y + siz(780) },
  F: { x: bg.x + siz(1440), y: bg.y + siz(1020) },
  G: { x: bg.x + siz(1140), y: bg.y + siz(1320) },
  H: { x: bg.x + siz(660), y: bg.y + siz(1500) },
  I: { x: bg.x + siz(1440), y: bg.y + siz(1500) },
  J: { x: bg.x + siz(240), y: bg.y + siz(1200) },
  state: false,
}

var interval = 0;
var myInt;

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(backgroundImage, bg.x, bg.y, bg.w, bg.h);

  if (coin.A.state) c.drawImage(coinImg, coin.A.x, coin.A.y, coin.size, coin.size);
  if (coin.B.state) c.drawImage(coinImg, coin.B.x, coin.B.y, coin.size, coin.size);
  if (coin.C.state) c.drawImage(coinImg, coin.C.x, coin.C.y, coin.size, coin.size);
  if (coin.D.state) c.drawImage(coinImg, coin.D.x, coin.D.y, coin.size, coin.size);
  if (coin.E.state) c.drawImage(coinImg, coin.E.x, coin.E.y, coin.size, coin.size);
  if (coin.F.state) c.drawImage(coinImg, coin.F.x, coin.F.y, coin.size, coin.size);

  c.fillStyle = "red";
  c.fillRect(player.x, player.y, player.size, player.size);

  c.fillStyle = '#aaaaaa';
  if (door.A.state) c.fillRect(door.A.x, door.A.y, door.A.w, door.A.h);
  if (door.B.state) c.fillRect(door.B.x, door.B.y, door.B.w, door.B.h);
  if (door.C.state) c.fillRect(door.C.x, door.C.y, door.C.w, door.C.h);

  if (codedoor.A.state) c.drawImage(codedoorImgW, codedoor.A.x, codedoor.A.y, codedoor.A.w, codedoor.A.h);
  if (codedoor.B.state) c.drawImage(codedoorImgW, codedoor.B.x, codedoor.B.y, codedoor.B.w, codedoor.B.h);
  if (codedoor.C.state) c.drawImage(codedoorImgH, codedoor.C.x, codedoor.C.y, codedoor.C.w, codedoor.C.h);

  c.fillStyle = 'black';
  c.font = `${siz(20)}px Verdana`;
  c.fillText('1', door.num.A.x, door.num.A.y);
  c.fillText('1', codedoor.num.A.x, codedoor.num.A.y);
  c.fillText('2', door.num.B.x, door.num.B.y);
  c.fillText('2', codedoor.num.B.x, codedoor.num.B.y);
  c.fillText('3', door.num.C.x, door.num.C.y);
  c.fillText('3', codedoor.num.C.x, codedoor.num.C.y);

  for (let z of walls.all) {
    c.strokeRect(walls[z].x, walls[z].y, walls[z].w, walls[z].h);
  }

  win()
}

function move(side) {
  function Move(prop, value) {
    bg[prop] += value;
    gameBox[prop] += value;
    for (let z of walls.all) {
      walls[z][prop] += value;
    }
    coin.A[prop] += value;
    coin.B[prop] += value;
    coin.C[prop] += value;
    coin.D[prop] += value;
    coin.E[prop] += value;
    coin.F[prop] += value;
    end[prop] += value;
    sign.A[prop] += value;
    sign.B[prop] += value;
    sign.C[prop] += value;
    sign.D[prop] += value;
    start[prop] += value;
    jumppad.A[prop] += value;
    jumppad.B[prop] += value;
    jumppad.C[prop] += value;
    jumppad.D[prop] += value;
    jumppad.E[prop] += value;
    jumppad.F[prop] += value;
    jumppad.G[prop] += value;
    jumppad.H[prop] += value;
    jumppad.I[prop] += value;
    jumppad.J[prop] += value;
    jumppad.K[prop] += value;
    jumppad.L[prop] += value;
    jumppad.M[prop] += value;
    jumppad.N[prop] += value;
    jumppad.O[prop] += value;
    jumppad.P[prop] += value;
    jumppad.Q[prop] += value;
    jumppad.R[prop] += value;
    teleporters.A[`${prop}1`] += value;
    teleporters.A[`${prop}2`] += value;
    teleporters.B[`${prop}1`] += value;
    teleporters.B[`${prop}2`] += value;
    teleporters.C[`${prop}1`] += value;
    teleporters.C[`${prop}2`] += value;
    teleporters.D[`${prop}1`] += value;
    teleporters.D[`${prop}2`] += value;
    resizer.A[prop] += value;
    resizer.B[prop] += value;
    resizer.C[prop] += value;
    resizer.D[prop] += value;
    resizer.E[prop] += value;
    resizer.F[prop] += value;
    resizer.G[prop] += value;
    resizer.H[prop] += value;
    resizer.I[prop] += value;
    resizer.J[prop] += value;
    door.A[prop] += value;
    door.num.A[prop] += value;
    door.B[prop] += value;
    door.num.B[prop] += value;
    door.C[prop] += value;
    door.num.C[prop] += value;
    codedoor.A[prop] += value;
    codedoor.num.A[prop] += value;
    codedoor.B[prop] += value;
    codedoor.num.B[prop] += value;
    codedoor.C[prop] += value;
    codedoor.num.C[prop] += value;
  }


  switch (side) {
    case 1:
      Move('x', player.size);
      break;
    case 2:
      Move('x', -player.size);
      break;
    case 3:
      Move('y', player.size);
      break;
    case 4:
      Move('y', -player.size);
      break;
  }
  checkBlock();
}

const input = document.getElementById('input');
input.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    let text = input.value;
    input.value = "";
    if (text == '') write('err', 'Žádný příkaz nezadán!');
    else {
      if (CMD(text, false)) { write('cmd', text); CMD(text, true); }
    }
  }
})

function CMD(text, comands) {
  let names = ['bot1', 'menu', 'jumppad', 'teleport', 'door1', 'door2', 'door3', 'codedoor1', 'codedoor2', 'codedoor3', 80085];
  let works = { bot: ['moveup', 'movedown', 'moveright', 'moveleft', 'size'], door: ['open', 'close'], jumppad: ['activate'], teleport: ['send'] };
  let item = text.split('.')[0];
  let workk = text.split('(')[0];
  let work = workk.split('.')[1];
  let code = null;
  let num = text.split('(')[1];
  let state = { name: '', work: '', num: '', code: '' };
  if (!comands) {
    for (let name of names) {
      if (item == name) {
        state.name = [true,]
        if (item == 'menu') location.replace("../main.php");
        if (item == ('codedoor1')) code = workk.split('.')[2];
        break;
      } else {
        state.name = [false, `${item} nebyl nalezen.`]
      }
    }
    if (item == 80085) {
      state.work = [true, 'door',]
      return true
    }

    if (item != 'bot1') {
      for (let wok of works.door) {
        if (work == wok) {
          if (item == ('codedoor1')) {
            state.work = [true, 'codedoor',];
            if (!(codedoor.A.near)) {
              state.code = [false, 'Nejste u dveří.']
              break;
            } else if (code == null) {
              state.code = [false, `Nebyl zadán kód.`]
              break;
            } else if (code == 'code') {
              state.code = [true,]
              if (num == null) {
                state.num = [false, 'Nebyl zadán kód']
                break;
              } else if (String(Number(num.slice(0, num.length - 1))) == 'NaN') {
                state.num = [false, `${num.slice(0, num.length - 1)} není číslo.`]
                break;
              } else if (!(num.slice(0, num.length - 1) == (codedoor.A.code))) {
                state.num = [false, `${num.slice(0, num.length - 1)} není správně.`]
                break;
              } else if (num.at(num.length - 1) == ')') {
                if (num.slice(0, num.length - 1) == (codedoor.A.code)) {
                  state.num = [true,]
                  break;
                } else state.num = [false, `${num.slice(0, num.length - 1)} není správně.`]
                break;
              } else {
                state.num = [false, `Nedokončená závorka.`]
                break;
              }
            } else {
              state.code = [false, `${code} nebyl nalezen.`]
              break;
            }
          } else {
            state.work = [true, 'door',];
          }
          break;
        }
        else {
          state.work = [false, 'door', `${work} nebyl nalezen.`];
        }
      }
    }

    if (item == 'jumppad') {
      if (work == 'activate') {
        if (jump(true)) {
          state.work = [true, 'jumppad',]
        } else state.work = [false, 'jumppad', `Nestojíte na jumppadu.`]
      } else state.work = [false, 'jumppad', `${work} nebylo nalezeno.`]
    }

    if (item == 'teleport') {
      if (work == 'send') {
        if (port(true)) {
          state.work = [true, 'teleport',]
        } else state.work = [false, 'teleport', 'Nestojíte na teleportu.']
      } else state.work = [false, 'teleport', `${work} nebylo nalezeno.`]
    }

    if (item == 'bot1') {
      for (let wok of works.bot) {
        if (work == wok) {
          state.work = [true, 'bot',];
          if (num == null) {
            state.num = [false, 'Nebyl zadán příkaz.']
            break;
          } else if (String(Number(num.slice(0, num.length - 1))) == 'NaN' && work != 'size') {
            state.num = [false, `${num.slice(0, num.length - 1)} není číslo.`]
            break;
          } else if (num.at(num.length - 1) == ')') {
            if (work == 'size') {
              if ((num.slice(0, num.length - 1) != 'down') && (num.slice(0, num.length - 1) != 'up')) {
                state.num = [false, `${num.slice(0, num.length - 1)} nebylo nalezeno`]
                break;
              } else if (!resize(num.slice(0, num.length - 1), true)[0]) {
                state.num = [false, `Nestojíte na zmenšovači.`];
                break;
              } else if (resize(num.slice(0, num.length - 1), true)[1] && num == 'down)') {
                state.num = [false, `Nemůžete se zmenšit`]
                break;
              } else if (resize(num.slice(0, num.length - 1), true)[1] && num == 'up)') {
                state.num = [false, `Nemůžete se zvětšit.`]
                break;
              } else if (resize(num.slice(0, num.length - 1), true)[0]) {
                state.num = [true,];
                break;
              }
            } else {
              state.num = [true,]
              break;
            }
          } else if (work == 'size' && num != ('up' && 'down')) {
            state.num = [false, `${num} nebylo nalezeno.`]
            break;
          } else {
            state.num = [false, `Nedokončená závorka.`]
            break
          }
        }
        else {
          state.work = [false, 'bot', `${work} nebyl nalezen.`];
        }
      }
    }

    if (state.name[0]) {
      if (state.work[0]) {
        if (state.work[1] == 'door') {
          return true
        } else if (state.work[1] == 'codedoor') {
          if (state.code[0]) {
            if (state.num[0]) {
              return true
            } else {
              write('err', state.num[1]);
              return false
            }
          } else {
            write('err', state.code[1]);
            return false
          }
        } else if (state.work[1] == 'bot') {
          if (state.num[0]) {
            return true
          } else {
            write('err', state.num[1]);
            return false
          }
        } else if (state.work[1] == 'jumppad') {
          return true
        } else if (state.work[1] == 'teleport') {
          return true
        }
      } else {
        write('err', state.work[2])
        return false
      }
    } else {
      write('err', state.name[1])
      return false
    }
  }

  if (comands) {
    switch (item) {
      case ('bot1'):
        if (work == 'size') {
          resize(num.slice(0, num.length - 1))
        } else myInt = setInterval(timeout, 500, work, num.slice(0, num.length - 1));
        break;
      case ('80085'):
        enableActions()
        break;
      case ('door1'):
        if (work == 'open') door.A.state = false
        else door.A.state = true
        break;
      case ('door2'):
        if (work == 'open') door.B.state = false
        else door.B.state = true
        break;
      case ('door3'):
        if (work == 'open') door.C.state = false
        else door.C.state = true
        break;
      case ('codedoor1'):
        if (codedoor.A.near && num.slice(0, num.length - 1) == codedoor.A.code) {
          switch (work) {
            case ('open'):
              codedoor.A.state = false
              break;
            case ('close'):
              codedoor.A.state = true
              break;
          }
        }
        break;
      case ('codedoor2'):
        if (codedoor.B.near && num.slice(0, num.length - 1) == codedoor.B.code) {
          switch (work) {
            case ('open'):
              codedoor.B.state = false
              break;
            case ('close'):
              codedoor.B.state = true
              break;
          }
        }
        break;
      case ('codedoor3'):
        if (codedoor.C.near && num.slice(0, num.length - 1) == codedoor.C.code) {
          switch (work) {
            case ('open'):
              codedoor.C.state = false
              break;
            case ('close'):
              codedoor.C.state = true
              break;
          }
        }
        break;
      case ('jumppad'):
        jump()
        break;
      case ('teleport'):
        port()
        break;
    }
  }
}

function write(type, cont) {
  for (let i = 11; i >= 0; i--) {
    let info = document.getElementById(`info${i}`);
    let inf = document.getElementById(`info${i + 1}`);
    inf.innerHTML = info.innerHTML;
    if (info.classList.contains('err')) {
      if (inf.classList.contains('cmd')) inf.classList.remove('cmd');
      if (!inf.classList.contains('err')) inf.classList.add('err');
      info.classList.remove('err');
    }
    if (info.classList.contains('cmd')) {
      if (inf.classList.contains('err')) inf.classList.remove('err');
      if (!inf.classList.contains('cmd')) inf.classList.add('cmd');
      info.classList.remove('cmd')
    }
  }

  if (type == 'cmd') {
    document.getElementById('info0').innerHTML = cont;
    document.getElementById('info0').classList.add('cmd');
  }
  if (type == 'err') {
    document.getElementById('info0').innerHTML = cont;
    document.getElementById('info0').classList.add('err');
  }
}

function checkBlock() {
  block.left = false; block.right = false; block.up = false; block.down = false;

  for (let [x, y, num] of player.projection) {
    let pr = { x: player.x + x * player.size, y: player.y + y * player.size }
    if (pr.x < gameBox.x) block.left = true;
    else if (!(pr.x + player.size <= gameBox.x + gameBox.w)) block.right = true;
    else if (!(pr.y + player.size <= gameBox.y + gameBox.h)) block.down = true;
    else if (!(pr.y >= gameBox.y)) block.up = true;

    for (let z of walls.all) {
      let wall = walls[z];
      if (num == 0 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.left = true;
      else if (num == 1 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.right = true;
      else if (num == 2 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.up = true;
      else if (num == 3 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.down = true;
    }

    items = [door.A, door.B, door.C];
    for (let wall of items) {
      if (wall['state'] && num == 0 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.left = true;
      else if (wall['state'] && num == 1 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.right = true;
      else if (wall['state'] && num == 2 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.up = true;
      else if (wall['state'] && num == 3 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.down = true;
    }

    items = [codedoor.A, codedoor.B, codedoor.C];
    for (let wall of items) {
      if (wall['state'] && num == 0 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) { block.left = true; wall['near'] = true; }
      else if (wall['state'] && num == 1 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) { block.right = true; wall['near'] = true; }
      else if (wall['state'] && num == 2 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) { block.up = true; wall['near'] = true; }
      else if (wall['state'] && num == 3 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) { block.down = true; wall['near'] = true; }
    }
  }

  let coins = [coin.A, coin.B, coin.C, coin.D, coin.E, coin.F]
  for (coinObj of coins) {
    if (coinObj['state'] && (between(coinObj['x'], 1, player.x) && (between(coinObj['y'], 1, player.y) || between(coinObj['y'] + siz(20), 1, player.y) || between(coinObj['y'] + siz(40), 1, player.y)))) { coinObj['state'] = false; coin.colected++; write('cmd', `Posbíráno peněz: ${coin.colected}/6`); }
    else if (coinObj['state'] && (between(coinObj['x'] + siz(20), 1, player.x) && (between(coinObj['y'], 1, player.y) || between(coinObj['y'] + siz(20), 1, player.y) || between(coinObj['y'] + siz(40), 1, player.y)))) { coinObj['state'] = false; coin.colected++; write('cmd', `Posbíráno peněz: ${coin.colected}/6`); }
    else if (coinObj['state'] && (between(coinObj['x'] + siz(40), 1, player.x) && (between(coinObj['y'], 1, player.y) || between(coinObj['y'] + siz(20), 1, player.y) || between(coinObj['y'] + siz(40), 1, player.y)))) { coinObj['state'] = false; coin.colected++; write('cmd', `Posbíráno peněz: ${coin.colected}/6`); }
  }

  if (between(sign.A.y, 1, player.y) && between(sign.A.x, 1, player.x)) sign.A.state = true; else sign.A.state = false;
  if (between(sign.B.y, 1, player.y) && between(sign.B.x, 1, player.x)) sign.B.state = true; else sign.B.state = false;
  if (between(sign.C.y, 1, player.y) && between(sign.C.x, 1, player.x)) sign.C.state = true; else sign.C.state = false;
  if (between(sign.D.y, 1, player.y) && between(sign.D.x, 1, player.x)) sign.D.state = true; else sign.D.state = false;

  const sign1 = `codedoor1 = ${codedoor.A.code}`;
  const sign2 = `codedoor2 = ${codedoor.B.code}`;
  const sign3 = `codedoor3 = ${codedoor.C.code}`;
  const sign4 = `Toto je poslední level.<br>V tomto levelu musíš nasbírat 6 peněz místo 4. `;
  if (sign.A.state) document.getElementById('itex').innerHTML = sign1;
  else if (sign.B.state) document.getElementById('itex').innerHTML = sign2;
  else if (sign.C.state) document.getElementById('itex').innerHTML = sign3;
  else if (sign.D.state) document.getElementById('itex').innerHTML = sign4;
  else document.getElementById('itex').innerHTML = '';
}

function between(x, range, test) {
  for (let i = -range; i < range; i += 0.01) {
    if ((Math.round(x) + i) == test) return true;
  }
  return false
}

var b;
function timeout(work, num) {
  switch (work) {
    case ('moveup'):
      checkBlock()
      if (!block.up) move(3);
      else b = true
      draw();
      break;
    case ('movedown'):
      checkBlock()
      if (!block.down) move(4);
      else b = true
      draw();
      break;
    case ('moveleft'):
      checkBlock()
      if (!block.left) move(1);
      else b = true
      draw();
      break;
    case ('moveright'):
      checkBlock()
      if (!block.right) move(2);
      else b = true
      draw();
      break;
  }
  interval++
  if (interval == num || b) {
    clearInterval(myInt);
    interval = 0
    myInt = null;
    b = null;
  }
}

backgroundImage.onload = function () {
  draw();
  checkBlock();
};

function win() {
  if (coin.colected == 6 && between(end.x, 1, player.x) && between(end.y, 1, player.y)) {
    block.down = true; block.left = true; block.right = true; block.up = true;
    document.getElementById('itex').innerHTML = 'Vyhrál jsi devátý level. Když napíšeš "menu" vrátíš se do menu. <br> Neboj, body se ti zapsaly.'
    var urlParams = new URLSearchParams(window.location.search);
    var url = window.location.pathname;
    var parts = url.split('/');
    var lastPart = parts[parts.length - 2];
    var levelId = parseInt(lastPart);
    var points = 2;
    var url = '.././points.php?id=' + encodeURIComponent(levelId) + '&points=' + encodeURIComponent(points);
    $.ajax({
      type: 'GET',
      url: url,
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error(error);
      }
    });
  } else if (coin.colected < 6 && player.x == end.x && player.y == end.y) write('err', `Nedostatek peněz ${coin.colected}/6`);
}

function jump(ask) {
  let jumpp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']
  for (let j of jumpp) {
    let x = jumppad[j].x
    let y = jumppad[j].y

    if (between(x, 1, player.x) && between(y, 1, player.y)) {
      if (ask) {
        return true
      } else {
        for (let i = 0; i < jumppad[j].way[1]; i++) move(jumppad[j].way[0]);
        draw()
        break;
      }
    }
  }
  if (ask) return false
  else draw()
}

function port(ask) {
  let ports = [teleporters.A, teleporters.B, teleporters.C, teleporters.D]
  for (let port of ports) {
    if (between(port.x1, 2, player.x) && between(port.y1, 2, player.y)) {
      if (ask) {
        return true
      } else {
        for (let [loop, way] of port.way1) {
          for (let i = 0; i < loop; i++) {
            move(way);
          }
        }
      }
    } else if (between(port.x2, 2, player.x) && between(port.y2, 2, player.y)) {
      if (ask) {
        return true
      } else {
        for (let [loop, way] of port.way2) {
          for (let i = 0; i < loop; i++) {
            move(way);
          }
        }
      }
    }
  }
  if (ask) return false
  else draw()
}

function resize(way, ask) {
  let ress = [resizer.A, resizer.B, resizer.C, resizer.D, resizer.E, resizer.F, resizer.G, resizer.H, resizer.I, resizer.J]
  for (let res of ress) {
    let r = false;
    if ((between(res['x'], 1, player.x) && (between(res['y'], 1, player.y) || between(res['y'] + siz(20), 1, player.y) || between(res['y'] + siz(40), 1, player.y)))) { r = true }
    else if ((between(res['x'] + siz(20), 1, player.x) && (between(res['y'], 1, player.y) || between(res['y'] + siz(20), 1, player.y) || between(res['y'] + siz(40), 1, player.y)))) { r = true }
    else if ((between(res['x'] + siz(40), 1, player.x) && (between(res['y'], 1, player.y) || between(res['y'] + siz(20), 1, player.y) || between(res['y'] + siz(40), 1, player.y)))) { r = true }
    if (r) {
      if (player.size == siz(60) && way == 'down') {
        if (ask) return [true, false];
        else {
          player.size = siz(20)
          move(2)
          move(4)
          draw()
        }
      } else if (player.size == siz(20) && way == 'down') {
        if (ask) return [true, true];
      } else if (player.size == siz(20) && way == 'up') {
        if (ask) return [true, false];
        else {
          for (let i = 0; i < 3; i++) {
            if (!(between(res.x, 1, player.x))) move(1)
            if (!(between(res.y, 1, player.y))) move(3)
          }
          player.size = siz(60)
          draw()
        }
      } else if (player.size == siz(60) && way == 'up') {
        if (ask) return [true, true];
      }
    }
  }
  if (ask) return [false,]
}

document.addEventListener('contextmenu', preventDefault);
document.addEventListener('keydown', preventKeyCombination);

function enableActions() {
  document.removeEventListener('contextmenu', preventDefault);
  document.removeEventListener('keydown', preventKeyCombination);
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣤⣤⣤⣤⣤⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⡾⠛⠉⠁⠀⠀⠀⠀⠈⠉⠉⠉⠛⠷⢶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡄⣹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡶⠿⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⢿⣿⡀⠀⠀⢀⣤⡶⠖⠛⠛⠛⠷⠶⠶⠶⠶⠾⠶⢶⣦⡄⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⠁⠀⣰⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⡀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⠀⢀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣧⠀⢸⡷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⡀⠀⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣇⢰⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⣸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡶⠾⠿⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢻⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⢹⡗⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣃⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣾⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠻⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣿⣿⣧⣤⣤⣤⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⣼⢻⡇⠈⠻⠶⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡶⠿⢿⡟⣿⡟⠀⠀⠀⠀⠹⣿⠀⠀⠀⠀⠀⠀⠀⢠⡿⢸⣇⠀⠀⠀⠀⠀⠉⠉⠻⠿⢶⣦⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⠾⠛⠉⠀⠀⣾⡇⢸⡇⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⣰⡿⠁⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠷⠶⣤⣄⣀⠀⠀⠀⠀⠀⠀");
  console.log("⠀⠀⠀⠀⠀⠀⣀⣴⠶⠛⠉⠀⠀⠀⠀⠀⢸⣿⠀⢸⡇⠀⠀⠀⠀⡆⣿⠀⠀⠀⠀⣠⣾⠏⠀⠀⣸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠷⣦⡀⠀⠀");
  console.log("⠀⠀⢀⣤⡶⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⢸⡇⠀⠀⠀⠀⣿⡟⠀⠀⣀⣴⠟⠁⠀⠀⢠⣿⠑⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⡆⠀");
  console.log("⢠⣾⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⠀⢸⡇⠀⠀⠀⠀⠸⣿⣴⠾⠋⠀⠀⠀⠀⢠⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡦");
  console.log("⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣧⠀⣸⣿⣀⣀⣤⣀⣘⣿⣷⣄⠀⠀⠀⢀⣰⢿⣧⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷");
  console.log("⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢿⣿⡏⠉⢩⣽⣿⣏⠉⠉⠀⠙⠳⢶⣤⠞⠁⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿");
  console.log("⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣧⠀⣿⠟⠉⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡿⠿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿");
  console.log("⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⣿⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠂⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣇⠀⠸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿");
  console.log("⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⡿⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⢶⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⢻⡆⠀⠀⣠⣴⣶⣤⠀⠀⢸⡟⠇");
  console.log("⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⢸⡇⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⢸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡇⠀⠘⣷⣠⡾⠋⠀⣽⡟⣷⡀⠘⣷⣤");
  console.log("⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡿⣧⠀⣰⡿⠃⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠙⠟⣥⡶⠟⣻⣿⠟⠧⣴⣿⣧");
  console.log("⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⣹⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⢘⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢾⡇⠀⠀⠀⣴⢷⣄⠠⣿⣧⡀⠈⣿⣄⣀");
}

function preventDefault(e) {
  e.preventDefault();
}

function preventKeyCombination(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.key === 'u')) {
    e.preventDefault();
  }
}

// Posluchači klávesnice pro posunutí pozadí
window.addEventListener("keydown", function (event) {
  checkBlock()
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
  draw();
});