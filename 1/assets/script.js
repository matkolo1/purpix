var canvas = document.getElementById("gameCanvas");
var c = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth - siz(300);
document.getElementById('console').style.width = `${siz(300)}px`
document.getElementById('itex').style.width = `${siz(300)}px`;
document.getElementById('itex').style.fontSize = `${siz(25)}px`;
for (let i = 0; i <= 12; i++) {
  document.getElementById(`info${i}`).style.width = `${siz(300)}px`;
  document.getElementById(`info${i}`).style.height = `${siz(19)}px`;
  document.getElementById(`info${i}`).style.fontSize = `${siz(15)}px`;
}
document.getElementById('input').style.width = `${siz(297)}px`;
document.getElementById('input').style.height = `${siz(30)}px`;
document.getElementById('input').style.fontSize = `${siz(15)}px`
document.getElementById('cntrl').style.width = `${siz(299)}px`;

function siz(size) {
  size /= 50;
  size *= Math.floor(canvas.height / 10);
  return size;
}

var player = {
  x: canvas.width / 2 - siz(30), //240
  y: canvas.height / 2 - siz(30), //420
  size: siz(60),
  projection: [[1, 0, 1], [-1, 0, 0], [0, 1, 3], [0, -1, 2]]
};

const backgroundImage = new Image();
backgroundImage.src = './assets/lvl1_bg.jpg';
var bg = {
  x: player.x - siz(240),
  y: player.y - siz(300),
  h: siz(480 * 2),
  w: siz(900 * 2)
}

var gameBox = {
  x: bg.x + siz(180),
  y: bg.y + siz(180),
  h: bg.h - siz(360),
  w: bg.w - siz(360)
}

var walls = {
  A: { x: bg.x + siz(180), y: bg.y + siz(480), w: siz(120), h: siz(300) },
  B: { x: bg.x + siz(300), y: bg.y + 480, w: siz(360), h: siz(60) },
  C: { x: bg.x + siz(840), y: bg.y + siz(300), w: siz(120), h: siz(480) },
  D: { x: bg.x + siz(780), y: bg.y + siz(480), w: siz(240), h: siz(60) },
  E: { x: bg.x + siz(1140), y: bg.y + siz(480), w: siz(360), h: siz(60) },
  F: { x: bg.x + siz(1500), y: bg.y + siz(480), w: siz(120), h: siz(300) },
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
  A: { state: true, x: bg.x + siz(420), y: bg.y + siz(600) },
  B: { state: true, x: bg.x + siz(600), y: bg.y + siz(660) },
  C: { state: true, x: bg.x + siz(1140), y: bg.y + siz(660) },
  D: { state: true, x: bg.x + siz(1320), y: bg.y + siz(600) },
  size: siz(60),
  colected: 0,
}

var end = {
  x: bg.x + siz(1500),
  y: bg.y + siz(300),
}

var door = {
  A: { state: true, x: bg.x - 1 + siz(660), y: bg.y + siz(480), w: siz(122), h: siz(60) },
  B: { state: true, x: bg.x + siz(840), y: bg.y - 1 + siz(180), w: 60, h: siz(122) },
  C: { state: true, x: bg.x - 1 + siz(1020), y: bg.y + siz(480), w: siz(122), h: siz(60) },
  num: { A: { x: bg.x + siz(640), y: bg.y + siz(500) }, B: { x: bg.x + siz(840), y: bg.y + siz(318) }, C: { x: bg.x + siz(1000), y: bg.y + siz(500) } },
}

var sign = {
  A: { state: false, x: bg.x + siz(240), y: bg.y + siz(240) },
  B: { state: false, x: bg.x + siz(600), y: bg.y + siz(180) },
  C: { state: false, x: bg.x + siz(1320), y: bg.y + siz(180) },
}

var start = {
  x: player.x,
  y: player.y,
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

  c.fillStyle = '#aaaaaa';
  if (door['A']['state']) c.fillRect(door.A.x, door.A.y, door.A.w, door.A.h);
  if (door.B.state) c.fillRect(door.B.x, door.B.y, door.B.w, door.B.h);
  if (door.C.state) c.fillRect(door.C.x, door.C.y, door.C.w, door.C.h);
  c.fillStyle = 'black';
  c.font = '20px Verdana';
  c.fillText('1', door.num.A.x, door.num.A.y);
  c.fillText('2', door.num.B.x, door.num.B.y);
  c.fillText('3', door.num.C.x, door.num.C.y);

  c.fillStyle = "red";
  c.fillRect(player.x, player.y, player.size, player.size);



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
    coin.A[prop] += value;
    coin.B[prop] += value;
    coin.C[prop] += value;
    coin.D[prop] += value;
    end[prop] += value;
    door.A[prop] += value;
    door.B[prop] += value;
    door.C[prop] += value;
    door.num.A[prop] += value;
    door.num.B[prop] += value;
    door.num.C[prop] += value;
    sign.A[prop] += value;
    sign.B[prop] += value;
    sign.C[prop] += value;
    start[prop] += value;
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
  let names = ['bot1', 'door1', 'door2', 'door3', 'menu'];
  let works = { bot: ['moveup', 'movedown', 'moveright', 'moveleft'], door: ['open', 'close'] };
  let item = text.split('.')[0];
  let workk = text.split('(')[0];
  let work = workk.split('.')[1];
  let num = text.split('(')[1];
  let state = { name: '', work: '', num: '' };
  if (!comands) {
    for (let name of names) {
      if (item == name) {
        state.name = [true,]
        if (item == 'menu') location.replace("../main.php");
        break;
      } else {
        state.name = [false, `${item} nebyl nalezen.`]
      }
    }
    if (item != 'bot1') {
      for (let wok of works.door) {
        if (work == wok) {
          state.work = [true, false,];
          break;
        }
        else {
          state.work = [false, false, `${work} nebyl nalezen.`];
        }
      }
    }
    if (item == 'bot1') {
      for (let wok of works.bot) {
        if (work == wok) {
          state.work = [true, true,];
          if (String(Number(num.slice(0, num.length - 1))) == 'NaN') {
            state.num = [false, `${num.slice(0, num.length - 1)} není číslo.`]
            break;
          } else if (num.at(num.length - 1) == ')') {
            state.num = [true,]
            break;
          } else {
            state.num = [false, `Nedokončená závorka.`]
            break
          }
        }
        else {
          state.work = [false, true, `${work} nebyl nalezen.`];
        }
      }
    }
    if (state.name[0]) {
      if (state.work[0] && !state.work[1]) {
        return true
      } else if (state.work[0] && state.work[1] && !state.num[0]) {
        write('err', state.num[1])
        return false
      } else if (state.work[0] && state.work[1] && state.num[0]) {
        return true
      } else if (!state.work[0]) {
        write('err', state.work[2])
        return false
      }
    } else if (!state.name[0]) {
      write('err', state.name[1])
      return false
    }
  }
  if (comands) {
    switch (item) {
      case ('bot1'):
        myInt = setInterval(timeout, 500, work, num.slice(0, num.length - 1));
        break;
      case ('door1'):
        switch (work) {
          case ('open'):
            door.A.state = false
            break;
          case ('close'):
            door.A.state = true
            break;
        }
        break;
      case ('door2'):
        switch (work) {
          case ('open'):
            door.B.state = false
            break;
          case ('close'):
            door.B.state = true
            break;
        }
        break;
      case ('door3'):
        switch (work) {
          case ('open'):
            door.C.state = false
            break;
          case ('close'):
            door.C.state = true
            break;
        }
        break;
    }
    draw();
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
    let pr = { x: player.x + x * 60, y: player.y + y * 60 }
    if (pr.x < gameBox.x) block.left = true;
    else if (!(pr.x + player.size <= gameBox.x + gameBox.w)) block.right = true;
    else if (!(pr.y + player.size <= gameBox.y + gameBox.h)) block.down = true;
    else if (!(pr.y >= gameBox.y)) block.up = true;

    let items = [walls.A, walls.B, walls.C, walls.D, walls.E, walls.F];
    for (let wall of items) {
      if (num == 0 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.left = true;
      else if (num == 1 && pr.x >= wall['x'] && pr.x < wall['x'] + wall['w'] && pr.y < wall['y'] + wall['h'] && pr.y >= wall['y']) block.right = true;
      else if (num == 2 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.up = true;
      else if (num == 3 && pr.y >= wall['y'] && pr.y < wall['y'] + wall['h'] && pr.x < wall['x'] + wall['w'] && pr.x >= wall['x']) block.down = true;
    }

    let doors = [door.A, door.B, door.C]
    for (let obj of doors) {
      if (obj['state'] && num == 0 && pr.x >= obj['x'] && pr.x < obj['x'] + obj['w'] && pr.y < obj['y'] + obj['h'] && pr.y >= obj['y']) block.left = true;
      else if (obj['state'] && num == 1 && pr.x >= obj['x'] && pr.x < obj['x'] + obj['w'] && pr.y < obj['y'] + obj['h'] && pr.y >= obj['y']) block.right = true;
      else if (obj['state'] && num == 2 && pr.y >= obj['y'] && pr.y < obj['y'] + obj['h'] && pr.x < obj['x'] + obj['w'] && pr.x >= obj['x']) block.up = true;
      else if (obj['state'] && num == 3 && pr.y >= obj['y'] && pr.y < obj['y'] + obj['h'] && pr.x < obj['x'] + obj['w'] && pr.x >= obj['x']) block.down = true;
    }
  }

  let coins = [coin.A, coin.B, coin.C, coin.D]
  for (coinObj of coins) {
    if (coinObj['state'] && player.x == coinObj['x'] && player.y == coinObj['y']) { coinObj['state'] = false; coin.colected++; write('cmd', `Posbíráno peněz: ${coin.colected}/4`); }
  }

  if (player.x == sign.A.x && player.y == sign.A.y) sign.A.state = true; else sign.A.state = false;
  if (player.x == sign.B.x && player.y == sign.B.y) sign.B.state = true; else sign.B.state = false;
  if (player.x == sign.C.x && player.y == sign.C.y) sign.C.state = true; else sign.C.state = false;

  const sign1 = 'Pohybovat se můžete i do ostatích stran. <br> Stačí nahradit "moveup" za "movedown", "moveright" nebo "moveleft". <br> Také můžete zkusit nahradit číslo v závorce.';
  const sign2 = 'Dveře můžete otevřít použitím příkazu "door1.open" <br> nebo zavřít příkazem "door1.close". <br> Každé dveře mají jiné číslo.';
  const sign3 = 'Abyste dokončili level, musíte posbírat všechny peníze a dojít do cíle.';
  const startinf = 'Když se kouknete do středu pole, tak uvidíte červený čtverec. To jste vy. <br> Zkuste zadat příkaz: "bot1.moveup(1)".';
  if (player.x == start.x && player.y == start.y) {
    document.getElementById('itex').innerHTML = startinf;
    document.getElementById('input').setAttribute('placeholder', 'Zadejte příkaz.');
  }
  else if (sign.A.state) { document.getElementById('itex').innerHTML = sign1; document.getElementById('input').removeAttribute('placeholder'); }
  else if (sign.B.state) document.getElementById('itex').innerHTML = sign2;
  else if (sign.C.state) document.getElementById('itex').innerHTML = sign3;
  else document.getElementById('itex').innerHTML = '';
}

function timeout(work, num) {
  switch (work) {
    case ('moveup'):
      checkBlock()
      if (!block.up) move(3);
      draw();
      break;
    case ('movedown'):
      checkBlock()
      if (!block.down) move(4);
      draw();
      break;
    case ('moveleft'):
      checkBlock()
      if (!block.left) move(1);
      draw();
      break;
    case ('moveright'):
      checkBlock()
      if (!block.right) move(2);
      draw();
      break;
  }
  interval++
  if (interval == num.at(0)) {
    clearInterval(myInt);
    interval = 0
    myInt = null;
  }
}

backgroundImage.onload = function () {
  draw();
  checkBlock();
};

function win() {
  if (coin.colected == 4 && player.x == end.x && player.y == end.y) {
    block.down = true; block.left = true; block.right = true; block.up = true;
    var urlParams = new URLSearchParams(window.location.search);
    var url = window.location.pathname;
    var parts = url.split('/');
    var lastPart = parts[parts.length - 2];
    var levelId = parseInt(lastPart);
    var points = 1;
    var url = '.././win.php?id=' + encodeURIComponent(levelId) + '&points=' + encodeURIComponent(points);
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
    document.getElementById('itex').innerHTML = 'Vyhrál jsi první level. Když napíšeš "menu" vrátíš se do menu. <br> Neboj, body se ti zapsaly.'
  } else if (coin.colected < 4 && player.x == end.x && player.y == end.y) {
    write('err', `Nedostatek peněz ${coin.colected}/4`);
  }
}


