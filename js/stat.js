'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color, outline = '#000') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeStyle = outline;
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      '#fff'
  );

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(
      'Ура вы победили!',
      CLOUD_X + FONT_GAP,
      CLOUD_Y + GAP + FONT_GAP
  );
  ctx.fillText(
      'Список результатов:',
      CLOUD_X + FONT_GAP,
      CLOUD_Y + GAP + FONT_GAP * 2
  );


  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };


  var getBarColor = function (player) {
    if (player === 'Вы') {
      return 'rgba(255, 0, 0, 1)';
    } else {
      return 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    }
  };

  var maxTime = getMaxElement(times);

  // Гистограмма времён участников
  for (var i = 0; i < players.length; i++) {

    // Имена игроков
    ctx.fillStyle = '#000';
    ctx.fillText(
        players[i],
        CLOUD_X + FONT_GAP * 2 + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - FONT_GAP
    );

    // Столбики
    ctx.fillStyle = getBarColor(players[i]);

    var currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;

    ctx.fillRect(
        CLOUD_X + FONT_GAP * 2 + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2 - BAR_HEIGHT + (BAR_HEIGHT - currentBarHeight), // Смещение столбика по вертикали
        BAR_WIDTH,
        currentBarHeight
    );

    // Времена игроков
    ctx.fillStyle = '#000';
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + FONT_GAP * 2 + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2 - BAR_HEIGHT + (BAR_HEIGHT - currentBarHeight) - GAP
    );

  }
};
