function multiplyElement(node, count, deep) {
  for (var i = 0, copy; i < count - 1; i++) {
    copy = node.cloneNode(deep);
    node.parentNode.insertBefore(copy, node);
  }
}

multiplyElement(document.querySelector('.square'), 100, true);

// time
let millisecondsCounter = 0;
let timeCount;
let randomSquareCount;
let player1Score = 0;
let player2Score = 0;
let gameSpeed;
let endScore = 10;

function startTime() {
  document.getElementById('startBtn').style.opacity = '0';
  timeCount = setInterval(function() {
    millisecondsCounter++;
    if ( millisecondsCounter < 10 ) {
      document.getElementById('milliseconds').innerText = '00' + millisecondsCounter + ' milliseconds';
    } else if ( millisecondsCounter >= 10 && millisecondsCounter < 100 ) {
      document.getElementById('milliseconds').innerText = '0' + millisecondsCounter + ' milliseconds';
    } else {
      document.getElementById('milliseconds').innerText = millisecondsCounter + ' milliseconds';
    }
  }, 10);
}

function setDifficulty() {
  if ( document.getElementById('easy').checked ) {
    gameSpeed = 3000;
  }
  if ( document.getElementById('normal').checked ) {
    gameSpeed = 2000;
  }
  if ( document.getElementById('hard').checked ) {
    gameSpeed = 1500;
  }
  if ( document.getElementById('unreal').checked ) {
    gameSpeed = 800;
  }
}

function endTime() {
  clearInterval(timeCount);
}
function runGame(event) {
  // start
  document.querySelector('.difficulty').style.display = 'none';
  setDifficulty();
  startTime(event);
  chooseRandomSquare();
  randomSquareCount = setInterval(chooseRandomSquare, gameSpeed);
}

function endRandomSquare() {
  let square = document.querySelectorAll('.square');

  for ( let i = 0; i < square.length; i++ ) {

    square[i].classList.remove('to-click');
    square[i].classList.remove('clicked');

  }

  clearInterval(randomSquareCount);
}

function stopGame(result) {
  endTime();
  endRandomSquare();
  showModal(result);
}

function chooseRandomSquare() {
  let random = Math.floor(Math.random() * 100) + 1; // random value from 1 to 100
  let square = document.querySelectorAll('.square');

  square[random].classList.add('to-click');
  square[random].addEventListener('click', correctlyClicked, false);
  let resetSquare = setInterval(function() {
    square[random].removeEventListener('click', correctlyClicked, false);

    if ( square[random].classList.contains('clicked') ) {
      square[random].classList.remove('clicked');
    } else {
      square[random].classList.add('not-clicked');
      setInterval(function() {
        if ( square[random].classList.contains('not-clicked') ) {
          square[random].classList.remove('not-clicked');
        }
      }, 500);
      player2Score = player2Score + 1;
      if ( player2Score === endScore ) {
        stopGame('lose');
      }
      document.getElementById('player2').innerText = player2Score;
    }

    if ( square[random].classList.contains('to-click') ) {
      square[random].classList.remove('to-click');
    }
    clearInterval(resetSquare);
  }, gameSpeed);
}

function correctlyClicked(event) {
  event.target.classList.add('clicked');
  player1Score++;
  if ( player1Score === endScore ) {
    stopGame('win');
  }
  document.getElementById('player1').innerText = player1Score;
}

function showModal(result) {
  let modal = document.getElementById('message');

  modal.style.display = 'block';
  modal.querySelector("#time-result").innerHTML = 'Your time is: ' + millisecondsCounter + ' milliseconds';
  modal.querySelector("#time-result").style.display = 'block';

  if ( result === 'win' ) {
    modal.querySelector("#win").style.display = 'block';
    modal.querySelector("#lose").style.display = 'none';
  } else if ( result === 'lose' ) {
    modal.querySelector("#win").style.display = 'none';
    modal.querySelector("#lose").style.display = 'block';
  }
}
function hideModal() {
  let modal = document.getElementById('message');

  modal.style.display = 'none';
  modal.querySelector("#time-result").innerHTML = '';
  modal.querySelector("#time-result").style.display = 'none';
  modal.querySelector("#win").style.display = 'block';
  modal.querySelector("#lose").style.display = 'none';
}

document.getElementById('startBtn').addEventListener('click', runGame, false);
document.addEventListener('click', function (event) {
  if ( event.target.classList.contains( 'difficulty__block--item' ) ) {
    setDifficulty();
  }
}, false);
document.getElementById('menuBtn').addEventListener('click', function() {
  window.location.reload();
}, false);

