var rocky = require('rocky');

rocky.on('draw', function(event) {
  var ctx = event.context;
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, w, h);
  // Current date/time
  var d = new Date();
  var tsag = mongolTsag(d,0);
  var dtsag = ctx.measureText(tsag);
  var odor = mongolOdor(d);
  console.log(dtsag);
  var minute = mongolTsag(d,1);
  var offset = parseInt(Math.random()*(h-90)) + 5;
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.font = '28px bold Gothic';
  ctx.fillText(tsag, 5, offset, w);
  ctx.fillText(minute, 5, offset+30, w);
  ctx.font = '28px Gothic';
  ctx.fillText(odor, 5, offset+60, w);
});

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
});

function mongolOdor(d){
  var days = ["ням", "даваа", "мягмар", "лхагва", "пүрэв", "баасан","бямба"];
  return days[d.getDay()];
}

function mongolTsag(d, type){
  var ret = "";
  var time0 = ["", "нэгэн", "хоёр", "гурван", "дөрвөн", "таван","зургаан","долоон","найман","есөн"];
  var time1 = ["", "нэг", "хоёр", "гурав", "дөрөв", "тав","зургаа","долоо","найм","ес"];
  var time2 = ["", "арав","хорь","гуч","дөч","тавь","жар"];
  var time3 = ["","арван","хорин","гучин","дөчин","тавин","жаран"];
  var h = d.getHours();
  var m = d.getMinutes();
  var h1 = parseInt(d.getHours()/10);
  var h2 = parseInt(d.getHours()%10);
  if(type == 0){
    if (h == 0){
      ret += "тэг";
    } else if (m == 0){
      if (h == 1){
        ret += time1[h2];
      } else {
        ret += (time3[h1] + " " + time0[h2]).trim();
      }
    } else if (h2 == 0){
      ret += time2[h1];
    } else {
      ret += (time3[h1] + " " + time1[h2]).trim();
    }
    return ret.trim();
  } else {
    var m1 = parseInt(d.getMinutes()/10);
    var m2 = parseInt(d.getMinutes()%10);
    if (m == 0){
      ret += "цаг";
    } else if (m2 == 0){
      ret += time2[m1];
    } else {
      ret += (time3[m1] + " " + time1[m2]).trim();
    }
    return ret.trim();
  }
}