var canvas = document.getElementById("gameCanvas");
var c = canvas.getContext("2d");
canvas.height = window.innerHeight;
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

var walls = {
  A: { x: bg.x + siz(1320), y: bg.y + siz(1440), w: siz(5 * 60), h: siz(60) },
  B: { x: bg.x + siz(1560), y: bg.y + siz(1260), w: siz(60), h: siz(60) },
  C: { x: bg.x + siz(1260), y: bg.y + siz(1600), w: siz(59), h: siz(20) },
  D: { x: bg.x + siz(1260), y: bg.y + siz(1480), w: siz(20), h: siz(140) },
  E: { x: bg.x + siz(1300), y: bg.y + siz(1440), w: siz(19), h: siz(140) },
  F: { x: bg.x + siz(1160), y: bg.y + siz(1480), w: siz(120), h: siz(19) },
  G: { x: bg.x + siz(1179), y: bg.y + siz(1440), w: siz(120), h: siz(20) },
  H: { x: bg.x + siz(1079), y: bg.y + siz(1440), w: siz(80), h: siz(60) },
  I: { x: bg.x + siz(1020), y: bg.y + siz(1440), w: siz(60), h: siz(180) },
  J: { x: bg.x + siz(900), y: bg.y + siz(1260), w: siz(9*60), h: siz(60) },
  K: { x: bg.x + siz(1260), y: bg.y + siz(1080), w: siz(60), h: siz(6*60) },
  L: { x: bg.x + siz(600), y: bg.y + siz(1060), w: siz(12*60), h: siz(19) },
  M: { x: bg.x + siz(0), y: bg.y + siz(0), w: siz(0), h: siz(0) },
  N: { x: bg.x + siz(0), y: bg.y + siz(0), w: siz(0), h: siz(0) },
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
  A: { state: true, x: bg.x + siz(0), y: bg.y + siz(0), w: siz(120), h: siz(60) },
  B: { state: true, x: bg.x + siz(0), y: bg.y + siz(0), w: siz(120), h: siz(60) },
  C: { state: true, x: bg.x + siz(0), y: bg.y + siz(0), w: siz(120), h: siz(60) },
  num: { A: { x: bg.x + siz(1260), y: bg.y + siz(720) }, B: { x: bg.x + siz(1260), y: bg.y + siz(720) }, C: { x: bg.x + siz(1260), y: bg.y + siz(720) }, },
}

const codedoorImgW = new Image();
const codedoorImgH = new Image();
codedoorImgW.src = './assets/CodedoorsW.jpg';
codedoorImgH.src = './assets/CodedoorsH.jpg'
var codedoor = {
  A: { state: true, near: false, code: Math.floor(Math.random() * 100000), x: bg.x + siz(0), y: bg.y + siz(0), w: siz(120), h: siz(60) },
  B: { state: true, near: false, code: Math.floor(Math.random() * 100000), x: bg.x + siz(1020), y: bg.y + siz(1319), w: siz(60), h: siz(122) },
  C: { state: true, near: false, code: Math.floor(Math.random() * 100000), x: bg.x + siz(0), y: bg.y + siz(0), w: siz(120), h: siz(60) },
  num: { A: { x: bg.x + siz(225), y: bg.y + siz(1278) }, B: { x: bg.x + siz(1020), y: bg.y + siz(1318) }, C: { x: bg.x + siz(225), y: bg.y + siz(1278) }, },
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
  if (codedoor.B.state) c.drawImage(codedoorImgH, codedoor.B.x, codedoor.B.y, codedoor.B.w, codedoor.B.h);
  if (codedoor.C.state) c.drawImage(codedoorImgW, codedoor.C.x, codedoor.C.y, codedoor.C.w, codedoor.C.h);

  c.fillStyle = 'black';
  c.font = '20px Verdana';
  c.fillText('1', door.num.A.x, door.num.A.y);
  c.fillText('1', codedoor.num.A.x, codedoor.num.A.y);
  c.fillText('2', door.num.B.x, door.num.B.y);
  c.fillText('2', codedoor.num.B.x, codedoor.num.B.y);
  c.fillText('3', door.num.C.x, door.num.C.y);
  c.fillText('3', codedoor.num.C.x, codedoor.num.C.y);

  c.strokeRect(walls.A.x, walls.A.y, walls.A.w, walls.A.h);
  c.strokeRect(walls.B.x, walls.B.y, walls.B.w, walls.B.h);
  c.strokeRect(walls.C.x, walls.C.y, walls.C.w, walls.C.h);
  c.strokeRect(walls.D.x, walls.D.y, walls.D.w, walls.D.h);
  c.strokeRect(walls.E.x, walls.E.y, walls.E.w, walls.E.h);
  c.strokeRect(walls.F.x, walls.F.y, walls.F.w, walls.F.h);
  c.strokeRect(walls.G.x, walls.G.y, walls.G.w, walls.G.h);
  c.strokeRect(walls.H.x, walls.H.y, walls.H.w, walls.H.h);
  c.strokeRect(walls.I.x, walls.I.y, walls.I.w, walls.I.h);
  c.strokeRect(walls.J.x, walls.J.y, walls.J.w, walls.J.h);
  c.strokeRect(walls.K.x, walls.K.y, walls.K.w, walls.K.h);
  c.strokeRect(walls.L.x, walls.L.y, walls.L.w, walls.L.h);
  c.strokeRect(walls.M.x, walls.M.y, walls.M.w, walls.M.h);
  c.strokeRect(walls.N.x, walls.N.y, walls.N.w, walls.N.h);






  win()
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
    walls.G[prop] += value;
    walls.H[prop] += value;
    walls.I[prop] += value;
    walls.J[prop] += value;
    walls.K[prop] += value;
    walls.L[prop] += value;
    walls.M[prop] += value;
    walls.N[prop] += value;
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
        if (work == 'open') door.A.state = false
        else door.B.state = true
        break;
      case ('door3'):
        if (work == 'open') door.A.state = false
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

    let items = [walls.A, walls.B, walls.C, walls.D, walls.E, walls.F, walls.G, walls.H, walls.I, walls.J, walls.K, walls.L, walls.M, walls.N];
    for (let wall of items) {
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
  let ress = [resizer.A, resizer.B, resizer.C, resizer.D, resizer.E, resizer.F, resizer.G, resizer.H, resizer.I]
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