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

canvas.width = window.innerWidth - sie(200);
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

var start, codedoor, sign, bg, player, turrets, gameBox, walls, block, coin, end, door, resizer, teleporters, jumppad;
const codedoorImg = new Image();
const backgroundImage = new Image();
const coinImg = new Image();

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

strt()
function strt() {
  player = {
    x: canvas.width / 2 - siz(30),
    y: canvas.height / 2 - siz(30),
    size: siz(60),
    projection: [[1, 0, 1], [-1, 0, 0], [0, 1, 3], [0, -1, 2]]
  };

  backgroundImage.src = './assets/lvl8_bg.jpg';
  bg = {
    x: player.x - siz(240),
    y: player.y - siz(420),
    w: siz(900 * 2),
    h: siz(600 * 2),
  }

  gameBox = {
    x: bg.x + siz(180),
    y: bg.y + siz(180),
    h: bg.h - siz(360),
    w: bg.w - siz(360)
  }

  walls = {
    A: { x: bg.x + siz(420), y: bg.y + siz(360), w: siz(120), h: siz(60) },
    B: { x: bg.x + siz(600), y: bg.y + siz(360), w: siz(120), h: siz(60) },
    C: { x: bg.x + siz(780), y: bg.y + siz(360), w: siz(120), h: siz(60) },
    D: { x: bg.x + siz(960), y: bg.y + siz(360), w: siz(120), h: siz(60) },
    E: { x: bg.x + siz(420), y: bg.y + siz(420), w: siz(11 * 60), h: siz(60) },
    F: { x: bg.x + siz(420), y: bg.y + siz(480), w: siz(60), h: siz(9 * 60) },
    G: { x: bg.x + siz(480), y: bg.y + siz(720), w: siz(6 * 60), h: siz(60) },
    H: { x: bg.x + siz(720), y: bg.y + siz(480), w: siz(60), h: siz(9 * 60) },
    I: { x: bg.x + siz(1320), y: bg.y + siz(180), w: siz(60), h: siz(3 * 60) },
    J: { x: bg.x + siz(1200), y: bg.y + siz(360), w: siz(3 * 60), h: siz(2 * 60) },
    K: { x: bg.x + siz(1380), y: bg.y + siz(420), w: siz(80), h: siz(60) },
    L: { x: bg.x + siz(1479), y: bg.y + siz(420), w: siz(140), h: siz(60) },
    M: { x: bg.x + siz(960), y: bg.y + siz(720), w: siz(8 * 60), h: siz(60) },
    N: { x: bg.x + siz(1560), y: bg.y + siz(720), w: siz(60), h: siz(60) },
    O: { x: bg.x + siz(1200), y: bg.y + siz(480), w: siz(60), h: siz(9 * 60) },
  }

  block = {
    left: false,
    right: false,
    up: false,
    down: false
  }

  coinImg.src = './assets/coin.jpg';
  coin = {
    A: { state: true, x: bg.x + siz(600), y: bg.y + siz(540) },
    B: { state: true, x: bg.x + siz(540), y: bg.y + siz(600) },
    C: { state: true, x: bg.x + siz(240), y: bg.y + siz(840) },
    D: { state: true, x: bg.x + siz(300), y: bg.y + siz(900) },
    size: siz(60),
    colected: 0,
  }

  end = {
    x: bg.x + siz(1440),
    y: bg.y + siz(240),
  }

  door = {
    A: { state: true, x: bg.x - 1 + siz(1440), y: bg.y + siz(720), w: siz(122), h: siz(60) },
    num: { A: { x: bg.x + siz(1425), y: bg.y + siz(738) }, },
  }

  codedoorImg.src = './assets/CodedoorsW.jpg';
  codedoor = {
    A: { state: true, near: false, code: Math.floor(Math.random() * 100000), x: bg.x + siz(839), y: bg.y + siz(720), w: siz(122), h: siz(60) },
    num: { A: { x: bg.x + siz(825), y: bg.y + siz(738) } },
  }

  turrets = {
    A: {
      way: [-1, 0], x: bg.x + siz(1260), y: bg.y + siz(180), w: siz(60), h: siz(60),
      pro: { state1: false, state2: false, x1: 0, y1: 0, x2: 0, y2: 0, l: 18, a1: 0, a2: -1, },
    },
    B: {
      way: [-1, 0], x: bg.x + siz(1260), y: bg.y + siz(240), w: siz(60), h: siz(60),
      pro: { state1: false, state2: false, x1: 0, y1: 0, x2: 0, y2: 0, l: 18, a1: 0, a2: -1, },
    },
    C: {
      way: [-1, 0], x: bg.x + siz(1260), y: bg.y + siz(300), w: siz(60), h: siz(60),
      pro: { state1: false, state2: false, x1: 0, y1: 0, x2: 0, y2: 0, l: 18, a1: 0, a2: -1, },
    },
  }

  sign = {
    A: { state: false, x: bg.x + siz(540), y: bg.y + siz(960) },
  }

  start = {
    x: player.x,
    y: player.y,
  }

  jumppad = {
    x: { A: bg.x + siz(660), B: bg.x + siz(780), C: bg.x + siz(600), D: bg.x + siz(600), E: bg.x + siz(1140), F: bg.x + siz(1260) },
    y: { A: bg.y + siz(600), B: bg.y + siz(600), C: bg.y + siz(660), D: bg.y + siz(780), E: bg.y + siz(900), F: bg.y + siz(900) },
    way: { A: [2, 2], B: [1, 2], C: [4, 2], D: [3, 2], E: [2, 2], F: [1, 2] }
  }

  teleporters = {
    A: { state: false, x1: bg.x + siz(180), x2: bg.x + siz(1200), y1: bg.y + siz(960), y2: bg.y + siz(240), way1: [[17, 2], [12, 3]], way2: [[12, 4], [17, 1]] },
    B: { state: false, x1: bg.x + siz(360), x2: bg.x + siz(660), y1: bg.y + siz(960), y2: bg.y + siz(960), way1: [[5, 2]], way2: [[5, 1]] },
  }

  resizer = {
    A: { x: bg.x + siz(1500), y: bg.y + siz(300) },
    B: { x: bg.x + siz(1500), y: bg.y + siz(540) },
    state: false,
  }

}

var interval = 0;
var myInt;
var points = 3;

function draw(fire) {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(backgroundImage, bg.x, bg.y, bg.w, bg.h);

  if (coin.A.state) c.drawImage(coinImg, coin.A.x, coin.A.y, coin.size, coin.size);
  if (coin.B.state) c.drawImage(coinImg, coin.B.x, coin.B.y, coin.size, coin.size);
  if (coin.C.state) c.drawImage(coinImg, coin.C.x, coin.C.y, coin.size, coin.size);
  if (coin.D.state) c.drawImage(coinImg, coin.D.x, coin.D.y, coin.size, coin.size);

  c.fillStyle = '#aaaaaa';
  if (door.A.state) c.fillRect(door.A.x, door.A.y, door.A.w, door.A.h);

  if (codedoor.A.state) c.drawImage(codedoorImg, codedoor.A.x, codedoor.A.y, codedoor.A.w, codedoor.A.h);

  c.fillStyle = 'black';
  c.font = '20px Verdana';
  c.fillText('1', door.num.A.x, door.num.A.y);
  c.fillText('1', codedoor.num.A.x, codedoor.num.A.y);

  c.fillStyle = "red";
  c.fillRect(player.x, player.y, player.size, player.size);

  c.fillStyle = 'darkred';
  if (turrets.A.pro.state1) c.fillRect(turrets.A.pro.x1, turrets.A.pro.y1, siz(60), siz(60));
  if (turrets.B.pro.state1) c.fillRect(turrets.B.pro.x1, turrets.B.pro.y1, siz(60), siz(60));
  if (turrets.C.pro.state1) c.fillRect(turrets.C.pro.x1, turrets.C.pro.y1, siz(60), siz(60));
  if (turrets.A.pro.state2) c.fillRect(turrets.A.pro.x2, turrets.A.pro.y2, siz(60), siz(60));
  if (turrets.B.pro.state2) c.fillRect(turrets.B.pro.x2, turrets.B.pro.y2, siz(60), siz(60));
  if (turrets.C.pro.state2) c.fillRect(turrets.C.pro.x2, turrets.C.pro.y2, siz(60), siz(60));


  checkBlock()
  if (!fire) win()
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
    walls.O[prop] += value;
    coin.A[prop] += value;
    coin.B[prop] += value;
    coin.C[prop] += value;
    coin.D[prop] += value;
    end[prop] += value;
    door.A[prop] += value;
    door.num.A[prop] += value;
    sign.A[prop] += value;
    start[prop] += value;
    codedoor.A[prop] += value;
    codedoor.num.A[prop] += value;
    turrets.A[prop] += value;
    turrets.B[prop] += value;
    turrets.C[prop] += value;
    turrets.A.pro[`${prop}1`] += value;
    turrets.B.pro[`${prop}1`] += value;
    turrets.C.pro[`${prop}1`] += value;
    turrets.A.pro[`${prop}2`] += value;
    turrets.B.pro[`${prop}2`] += value;
    turrets.C.pro[`${prop}2`] += value;
    jumppad[prop].A += value;
    jumppad[prop].B += value;
    jumppad[prop].C += value;
    jumppad[prop].D += value;
    jumppad[prop].E += value;
    jumppad[prop].F += value;
    teleporters.A[`${prop}1`] += value;
    teleporters.A[`${prop}2`] += value;
    teleporters.B[`${prop}2`] += value;
    teleporters.B[`${prop}1`] += value;
    resizer.A[prop] += value;
    resizer.B[prop] += value;
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
  let names = ['bot1', 'door1', 'menu', 'codedoor1', 'jumppad', 'teleport', 80085];
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
          if (item == ('codedoor1' || 'codedoor2')) {
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
          } else state.work = [true, 'door',];
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
  codedoor.A.near = false;

  for (let [x, y, num] of player.projection) {
    let pr = { x: player.x + x * player.size, y: player.y + y * player.size }
    if (pr.x < gameBox.x) block.left = true;
    else if (!(pr.x + player.size <= gameBox.x + gameBox.w)) block.right = true;
    else if (!(pr.y + player.size <= gameBox.y + gameBox.h)) block.down = true;
    else if (!(pr.y >= gameBox.y)) block.up = true;

    let items = [walls.A, walls.B, walls.C, walls.D, walls.E, walls.F, walls.G, walls.H, walls.I, walls.J, walls.K, walls.L, walls.M, walls.N, walls.O, turrets.A, turrets.B, turrets.C];
    for (let wall of items) {
      if (num == 0 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.left = true;
      else if (num == 1 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.right = true;
      else if (num == 2 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.up = true;
      else if (num == 3 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.down = true;
    }

    let doors = [door.A]
    for (let obj of doors) {
      if (obj['state'] && num == 0 && pr.x >= obj['x'] && pr.x < obj['x'] + obj['w'] && pr.y < obj['y'] + obj['h'] && pr.y >= obj['y']) { block.left = true; }
      else if (obj['state'] && num == 1 && pr.x >= obj['x'] && pr.x < obj['x'] + obj['w'] && pr.y < obj['y'] + obj['h'] && pr.y >= obj['y']) { block.right = true; }
      else if (obj['state'] && num == 2 && pr.y >= obj['y'] && pr.y < obj['y'] + obj['h'] && pr.x < obj['x'] + obj['w'] && pr.x >= obj['x']) { block.up = true; }
      else if (obj['state'] && num == 3 && pr.y >= obj['y'] && pr.y < obj['y'] + obj['h'] && pr.x < obj['x'] + obj['w'] && pr.x >= obj['x']) { block.down = true; }
    }

    doors = [codedoor.A]
    for (let obj of doors) {
      if (obj['state'] && num == 0 && pr.x >= obj['x'] && pr.x < obj['x'] + obj['w'] && pr.y < obj['y'] + obj['h'] && pr.y >= obj['y']) { block.left = true; obj['near'] = true; }
      else if (obj['state'] && num == 1 && pr.x >= obj['x'] && pr.x < obj['x'] + obj['w'] && pr.y < obj['y'] + obj['h'] && pr.y >= obj['y']) { block.right = true; obj['near'] = true; }
      else if (obj['state'] && num == 2 && pr.y >= obj['y'] && pr.y < obj['y'] + obj['h'] && pr.x < obj['x'] + obj['w'] && pr.x >= obj['x']) { block.up = true; obj['near'] = true; }
      else if (obj['state'] && num == 3 && pr.y >= obj['y'] && pr.y < obj['y'] + obj['h'] && pr.x < obj['x'] + obj['w'] && pr.x >= obj['x']) { block.down = true; obj['near'] = true; }
    }
  }

  let coins = [coin.A, coin.B, coin.C, coin.D]
  for (coinObj of coins) {
    if (coinObj['state'] && (between(coinObj['x'], 1, player.x) && (between(coinObj['y'], 1, player.y) || between(coinObj['y'] + siz(20), 1, player.y) || between(coinObj['y'] + siz(40), 1, player.y)))) { coinObj['state'] = false; coin.colected++; write('cmd', `Posbíráno peněz: ${coin.colected}/4`); }
    else if (coinObj['state'] && (between(coinObj['x'] + siz(20), 1, player.x) && (between(coinObj['y'], 1, player.y) || between(coinObj['y'] + siz(20), 1, player.y) || between(coinObj['y'] + siz(40), 1, player.y)))) { coinObj['state'] = false; coin.colected++; write('cmd', `Posbíráno peněz: ${coin.colected}/4`); }
    else if (coinObj['state'] && (between(coinObj['x'] + siz(40), 1, player.x) && (between(coinObj['y'], 1, player.y) || between(coinObj['y'] + siz(20), 1, player.y) || between(coinObj['y'] + siz(40), 1, player.y)))) { coinObj['state'] = false; coin.colected++; write('cmd', `Posbíráno peněz: ${coin.colected}/4`); }
  }

  if (between(sign.A.y, 1, player.y) && between(sign.A.x, 1, player.x)) sign.A.state = true; else sign.A.state = false;

  const sign1 = `codedoor1 = ${codedoor.A.code}`;
  if (sign.A.state) document.getElementById('itex').innerHTML = sign1;
  else document.getElementById('itex').innerHTML = '';

  let turretts = [turrets.A, turrets.B, turrets.C]
  for (let turret of turretts) {
    for (let i = 1; i <= 2; i++) {
      let x = turret.pro[`x${i}`]
      let y = turret.pro[`y${i}`]
      if (between(x, 1, player.x) && between(y, 1, player.y)) ded()
    }
  }
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
  if (coin.colected == 4 && between(end.x, 1, player.x) && between(end.y, 1, player.y)) {
    document.getElementById('itex').innerHTML = 'Vyhrál jsi osmý level. Když napíšeš "menu" vrátíš se do menu. <br> Neboj, body se ti zapsaly.'
    block.down = true; block.left = true; block.right = true; block.up = true;
    var urlParams = new URLSearchParams(window.location.search);
    var url = window.location.pathname;
    var parts = url.split('/');
    var lastPart = parts[parts.length - 2];
    var levelId = parseInt(lastPart);
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
  } else if (coin.colected < 4 && player.x == end.x && player.y == end.y) write('err', `Nedostatek peněz ${coin.colected}/4`);
}

function jump(ask) {
  let jumpp = ['A', 'B', 'C', 'D', 'E', 'F']
  for (let j of jumpp) {
    let x = jumppad.x[j]
    let y = jumppad.y[j]

    if (between(x, 1, player.x) && between(y, 1, player.y)) {
      if (ask) {
        return true
      } else {
        for (let i = 0; i < jumppad.way[j][1]; i++) move(jumppad.way[j][0]);
        draw()
        break;
      }
    }
  }
  if (ask) return false
  else draw()
}

function port(ask) {
  let ports = [teleporters.A, teleporters.B]
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
  let ress = [resizer.A, resizer.B]
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

setInterval(fire, 2000)
function fire() {
  let turretts = [turrets.A, turrets.B, turrets.C]
  for (let turret of turretts) {
    let prp = turret['pro'];
    let next = { x: turret.way[0] * siz(60), y: turret.way[1] * siz(60) };
    if (prp.state1 && (prp.a1 < prp.l) && (prp.a1 >= 0)) {
      prp.x1 += next.x
      prp.y1 += next.y
    } else if (prp.state1 && (prp.a1 == prp.l)) {
      prp.state1 = false
      prp.x1 = 0
      prp.y1 = 0
      prp.a1 = -1
    } else {
      prp.state1 = true
      prp.x1 = turret.x + next.x
      prp.y1 = turret.y + next.y
    }
    if (prp.state2 && (prp.a2 < prp.l) && (prp.a2 >= 0)) {
      prp.x2 += next.x
      prp.y2 += next.y
    } else if (prp.state2 && (prp.a2 == prp.l)) {
      prp.state2 = false
      prp.x2 = 0
      prp.y2 = 0
      prp.a2 = -1
    } else {
      prp.state2 = true
      prp.x2 = turret.x + next.x
      prp.y2 = turret.y + next.y
    }
    prp.a1++; prp.a2++;
  }
  draw(true)
}

function ded() {
  strt()
  if (points != 1) points--
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

