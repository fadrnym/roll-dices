(() => {
  const $newGameBtn = document.querySelectorAll('[data-new-game]');
  const $rollBtn = document.querySelectorAll('[data-roll]');
  const $savePointsBtn = document.querySelectorAll('[data-save-points]');
  const $dice = document.querySelectorAll('[data-dice]');
  const $players = document.querySelectorAll('[data-player]');
  const activePlayerClass = 'd-none';
  const limitToWin = 10;

  const getRandomDiceNum = (min = 1, max = 6) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomPlayer = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const showDots = ($dice, numberOfDots) => {
    $dice.innerHTML = '';
    $dice.className = '';
    $dice.classList.add('b-dice', `b-dice--${numberOfDots}`);

    for (let i = 0; i < numberOfDots; ++i) {
      $dice.innerHTML += '<span class="b-dice__dot"></span>';
    }
  };

  const setActivePlayer = ($players, key = 0) => {
    $players.forEach(function(item) {
      item.querySelectorAll('[data-active-badge]')[0].classList.add(activePlayerClass);
      item.dataset.playerActive = '';
    });

    $players[key].querySelectorAll('[data-active-badge]')[0].classList.remove(activePlayerClass);
    $players[key].dataset.playerActive = '1';
  };

  const getActivePlayer = () => {
    return document.querySelectorAll('[data-player-active="1"]')[0];
  };

  const resetPlayerCount = ($players) => {
    $players.forEach((item) => {
      item.querySelectorAll('[data-score]')[0].innerText = 0;
      item.querySelectorAll('[data-score-total]')[0].innerText = 0;
    });
  };

  const addPoints = ($players, $activePlayer, rolledNum = 0) => {
    if (rolledNum === 1) {
      $activePlayer.querySelectorAll('[data-score]')[0].innerText = 0;
      switchPlayer($players);
      return;
    }

    const sum = parseInt($activePlayer.querySelectorAll('[data-score]')[0].innerText);
    $activePlayer.querySelectorAll('[data-score]')[0].innerText = sum + rolledNum;
  };

  const addTotalPoints = ($activePlayer, $players, limitToWin = 0) => {
    const points = parseInt($activePlayer.querySelectorAll('[data-score]')[0].innerText);
    const totalPoints = parseInt($activePlayer.querySelectorAll('[data-score-total]')[0].innerText);
    const totalSum = points + totalPoints;

    $activePlayer.querySelectorAll('[data-score]')[0].innerText = 0;
    $activePlayer.querySelectorAll('[data-score-total]')[0].innerText = totalSum;

    if (totalSum >= limitToWin) {
      alert(`Vítězí ${$activePlayer.querySelectorAll('[data-name]')[0].innerText}`);
      return;
    }

    switchPlayer($players);
  };

  const switchPlayer = ($players) => {
    let nextPlayerIndex = 0;

    $players.forEach((item, index) => {
      if (!item.dataset.playerActive) return;

      if ($players.length - 1 > index) {
        nextPlayerIndex = index + 1;
      }
    });

    setActivePlayer($players, nextPlayerIndex);
  };

  // Buttons
  $newGameBtn[0].addEventListener('click', () => {
    const randomPlayer = getRandomPlayer(0, $players.length - 1);
    resetPlayerCount($players);
    setActivePlayer($players, randomPlayer);
  });

  $rollBtn[0].addEventListener('click', () => {
    const rolledNum = getRandomDiceNum();
    const $activePlayer = getActivePlayer();

    if (!$activePlayer) return;

    showDots($dice[0], rolledNum);
    addPoints($players, $activePlayer, rolledNum);
  });

  $savePointsBtn[0].addEventListener('click', () => {
    const $activePlayer = getActivePlayer();

    if (!$activePlayer) return;

    addTotalPoints($activePlayer, $players, limitToWin);
  });
})();
