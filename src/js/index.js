(() => {
  const $rollBtn = document.querySelectorAll('[data-roll]');
  const $dice = document.querySelectorAll('[data-dice]');

  const getRandomDiceNum = (min = 1, max = 6) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const showDot = ($dice, numberOfDots) => {
    $dice.innerHTML = '';
    $dice.className = '';
    $dice.classList.add('b-dice', `b-dice--${numberOfDots}`);

    for (let i = 0; i < numberOfDots; ++i) {
      $dice.innerHTML += '<span class="b-dice__dot"></span>';
    }
  };

  $rollBtn[0].addEventListener('click', () => {
    const rolledNum = getRandomDiceNum();

    showDot($dice[0], rolledNum);
  });
})();
