'use strict';

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  BACKGROUND_COLOR: 'white',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  OUTLINE: 'black'
};

var GAP = 10;

var Font = {
  GAP: 20,
  COLOR: 'black',
  FAMILY: '16px PT Mono'
};

var Bar = {
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 50
};

var Player = {
  NAME: 'Вы',
  COLOR: 'rgba(255, 0, 0, 1)'
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
  ctx.strokeStyle = Cloud.OUTLINE;
  ctx.strokeRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = Font.COLOR;
  ctx.font = Font.FAMILY;
  ctx.fillText(
      text,
      x,
      y
  );
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      Cloud.X + GAP,
      Cloud.Y + GAP,
      Cloud.SHADOW_COLOR
  );
  renderCloud(
      ctx,
      Cloud.X,
      Cloud.Y,
      Cloud.BACKGROUND_COLOR
  );

  // Текст - поздравление
  renderText(
      ctx,
      'Ура вы победили!',
      Cloud.X + Font.GAP,
      Cloud.Y + GAP + Font.GAP
  );

  renderText(
      ctx,
      'Список результатов:',
      Cloud.X + Font.GAP,
      Cloud.Y + GAP + Font.GAP * 2
  );

  var getMaxElement = function (elements) {
    var maxElement = elements[0];

    for (var i = 1; i < elements.length; i++) {
      maxElement = Math.max(maxElement, elements[i]);
    }

    return maxElement;
  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  };

  var getRandomBarColor = function () {
    return 'hsl(240, ' + getRandomIntInclusive(10, 90) + '%, 50%)';
  };

  var getBarColor = function (player) {
    return player === Player.NAME
      ? Player.COLOR
      : getRandomBarColor();
  };


  var maxTime = getMaxElement(times);

  // Гистограмма времён участников
  for (var i = 0; i < players.length; i++) {

    // Имена игроков
    renderText(
        ctx,
        players[i],
        Cloud.X + Font.GAP * 2 + (Bar.WIDTH + Bar.GAP) * i,
        Cloud.Y + Cloud.HEIGHT - Font.GAP
    );

    // Столбики
    ctx.fillStyle = getBarColor(players[i]);

    var currentBarHeight = (Bar.HEIGHT * times[i]) / maxTime;

    ctx.fillRect(
        Cloud.X + Font.GAP * 2 + (Bar.WIDTH + Bar.GAP) * i,
        Cloud.Y + Cloud.HEIGHT - Font.GAP * 2 - Bar.HEIGHT + (Bar.HEIGHT - currentBarHeight), // Смещение столбика по вертикали
        Bar.WIDTH,
        currentBarHeight
    );

    // Времена игроков
    renderText(
        ctx,
        Math.round(times[i]),
        Cloud.X + Font.GAP * 2 + (Bar.WIDTH + Bar.GAP) * i,
        Cloud.Y + Cloud.HEIGHT - Font.GAP * 2 - Bar.HEIGHT + (Bar.HEIGHT - currentBarHeight) - GAP
    );
  }
};
