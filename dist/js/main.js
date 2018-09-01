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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIG11bHRpcGx5RWxlbWVudChub2RlLCBjb3VudCwgZGVlcCkge1xuICBmb3IgKHZhciBpID0gMCwgY29weTsgaSA8IGNvdW50IC0gMTsgaSsrKSB7XG4gICAgY29weSA9IG5vZGUuY2xvbmVOb2RlKGRlZXApO1xuICAgIG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY29weSwgbm9kZSk7XG4gIH1cbn1cblxubXVsdGlwbHlFbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcXVhcmUnKSwgMTAwLCB0cnVlKTtcblxuLy8gdGltZVxubGV0IG1pbGxpc2Vjb25kc0NvdW50ZXIgPSAwO1xubGV0IHRpbWVDb3VudDtcbmxldCByYW5kb21TcXVhcmVDb3VudDtcbmxldCBwbGF5ZXIxU2NvcmUgPSAwO1xubGV0IHBsYXllcjJTY29yZSA9IDA7XG5sZXQgZ2FtZVNwZWVkO1xubGV0IGVuZFNjb3JlID0gMTA7XG5cbmZ1bmN0aW9uIHN0YXJ0VGltZSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0QnRuJykuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgdGltZUNvdW50ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgbWlsbGlzZWNvbmRzQ291bnRlcisrO1xuICAgIGlmICggbWlsbGlzZWNvbmRzQ291bnRlciA8IDEwICkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbGxpc2Vjb25kcycpLmlubmVyVGV4dCA9ICcwMCcgKyBtaWxsaXNlY29uZHNDb3VudGVyICsgJyBtaWxsaXNlY29uZHMnO1xuICAgIH0gZWxzZSBpZiAoIG1pbGxpc2Vjb25kc0NvdW50ZXIgPj0gMTAgJiYgbWlsbGlzZWNvbmRzQ291bnRlciA8IDEwMCApIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaWxsaXNlY29uZHMnKS5pbm5lclRleHQgPSAnMCcgKyBtaWxsaXNlY29uZHNDb3VudGVyICsgJyBtaWxsaXNlY29uZHMnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWlsbGlzZWNvbmRzJykuaW5uZXJUZXh0ID0gbWlsbGlzZWNvbmRzQ291bnRlciArICcgbWlsbGlzZWNvbmRzJztcbiAgICB9XG4gIH0sIDEwKTtcbn1cblxuZnVuY3Rpb24gc2V0RGlmZmljdWx0eSgpIHtcbiAgaWYgKCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWFzeScpLmNoZWNrZWQgKSB7XG4gICAgZ2FtZVNwZWVkID0gMzAwMDtcbiAgfVxuICBpZiAoIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub3JtYWwnKS5jaGVja2VkICkge1xuICAgIGdhbWVTcGVlZCA9IDIwMDA7XG4gIH1cbiAgaWYgKCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGFyZCcpLmNoZWNrZWQgKSB7XG4gICAgZ2FtZVNwZWVkID0gMTUwMDtcbiAgfVxuICBpZiAoIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bnJlYWwnKS5jaGVja2VkICkge1xuICAgIGdhbWVTcGVlZCA9IDgwMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmRUaW1lKCkge1xuICBjbGVhckludGVydmFsKHRpbWVDb3VudCk7XG59XG5mdW5jdGlvbiBydW5HYW1lKGV2ZW50KSB7XG4gIC8vIHN0YXJ0XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWZmaWN1bHR5Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgc2V0RGlmZmljdWx0eSgpO1xuICBzdGFydFRpbWUoZXZlbnQpO1xuICBjaG9vc2VSYW5kb21TcXVhcmUoKTtcbiAgcmFuZG9tU3F1YXJlQ291bnQgPSBzZXRJbnRlcnZhbChjaG9vc2VSYW5kb21TcXVhcmUsIGdhbWVTcGVlZCk7XG59XG5cbmZ1bmN0aW9uIGVuZFJhbmRvbVNxdWFyZSgpIHtcbiAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKTtcblxuICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBzcXVhcmUubGVuZ3RoOyBpKysgKSB7XG5cbiAgICBzcXVhcmVbaV0uY2xhc3NMaXN0LnJlbW92ZSgndG8tY2xpY2snKTtcbiAgICBzcXVhcmVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnY2xpY2tlZCcpO1xuXG4gIH1cblxuICBjbGVhckludGVydmFsKHJhbmRvbVNxdWFyZUNvdW50KTtcbn1cblxuZnVuY3Rpb24gc3RvcEdhbWUocmVzdWx0KSB7XG4gIGVuZFRpbWUoKTtcbiAgZW5kUmFuZG9tU3F1YXJlKCk7XG4gIHNob3dNb2RhbChyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VSYW5kb21TcXVhcmUoKSB7XG4gIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTsgLy8gcmFuZG9tIHZhbHVlIGZyb20gMSB0byAxMDBcbiAgbGV0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKTtcblxuICBzcXVhcmVbcmFuZG9tXS5jbGFzc0xpc3QuYWRkKCd0by1jbGljaycpO1xuICBzcXVhcmVbcmFuZG9tXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvcnJlY3RseUNsaWNrZWQsIGZhbHNlKTtcbiAgbGV0IHJlc2V0U3F1YXJlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgc3F1YXJlW3JhbmRvbV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb3JyZWN0bHlDbGlja2VkLCBmYWxzZSk7XG5cbiAgICBpZiAoIHNxdWFyZVtyYW5kb21dLmNsYXNzTGlzdC5jb250YWlucygnY2xpY2tlZCcpICkge1xuICAgICAgc3F1YXJlW3JhbmRvbV0uY2xhc3NMaXN0LnJlbW92ZSgnY2xpY2tlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcXVhcmVbcmFuZG9tXS5jbGFzc0xpc3QuYWRkKCdub3QtY2xpY2tlZCcpO1xuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggc3F1YXJlW3JhbmRvbV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdub3QtY2xpY2tlZCcpICkge1xuICAgICAgICAgIHNxdWFyZVtyYW5kb21dLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1jbGlja2VkJyk7XG4gICAgICAgIH1cbiAgICAgIH0sIDUwMCk7XG4gICAgICBwbGF5ZXIyU2NvcmUgPSBwbGF5ZXIyU2NvcmUgKyAxO1xuICAgICAgaWYgKCBwbGF5ZXIyU2NvcmUgPT09IGVuZFNjb3JlICkge1xuICAgICAgICBzdG9wR2FtZSgnbG9zZScpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcjInKS5pbm5lclRleHQgPSBwbGF5ZXIyU2NvcmU7XG4gICAgfVxuXG4gICAgaWYgKCBzcXVhcmVbcmFuZG9tXS5jbGFzc0xpc3QuY29udGFpbnMoJ3RvLWNsaWNrJykgKSB7XG4gICAgICBzcXVhcmVbcmFuZG9tXS5jbGFzc0xpc3QucmVtb3ZlKCd0by1jbGljaycpO1xuICAgIH1cbiAgICBjbGVhckludGVydmFsKHJlc2V0U3F1YXJlKTtcbiAgfSwgZ2FtZVNwZWVkKTtcbn1cblxuZnVuY3Rpb24gY29ycmVjdGx5Q2xpY2tlZChldmVudCkge1xuICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuICBwbGF5ZXIxU2NvcmUrKztcbiAgaWYgKCBwbGF5ZXIxU2NvcmUgPT09IGVuZFNjb3JlICkge1xuICAgIHN0b3BHYW1lKCd3aW4nKTtcbiAgfVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyMScpLmlubmVyVGV4dCA9IHBsYXllcjFTY29yZTtcbn1cblxuZnVuY3Rpb24gc2hvd01vZGFsKHJlc3VsdCkge1xuICBsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpO1xuXG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3RpbWUtcmVzdWx0XCIpLmlubmVySFRNTCA9ICdZb3VyIHRpbWUgaXM6ICcgKyBtaWxsaXNlY29uZHNDb3VudGVyICsgJyBtaWxsaXNlY29uZHMnO1xuICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3RpbWUtcmVzdWx0XCIpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gIGlmICggcmVzdWx0ID09PSAnd2luJyApIHtcbiAgICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3dpblwiKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2xvc2VcIikuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfSBlbHNlIGlmICggcmVzdWx0ID09PSAnbG9zZScgKSB7XG4gICAgbW9kYWwucXVlcnlTZWxlY3RvcihcIiN3aW5cIikuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2xvc2VcIikuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH1cbn1cbmZ1bmN0aW9uIGhpZGVNb2RhbCgpIHtcbiAgbGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKTtcblxuICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3RpbWUtcmVzdWx0XCIpLmlubmVySFRNTCA9ICcnO1xuICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiI3RpbWUtcmVzdWx0XCIpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIG1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjd2luXCIpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICBtb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2xvc2VcIikuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0QnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW5HYW1lLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAoIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdkaWZmaWN1bHR5X19ibG9jay0taXRlbScgKSApIHtcbiAgICBzZXREaWZmaWN1bHR5KCk7XG4gIH1cbn0sIGZhbHNlKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51QnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufSwgZmFsc2UpO1xuXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
