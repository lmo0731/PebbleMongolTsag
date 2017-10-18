var rocky = require('rocky');

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Current date/time
  var d = new Date();

  // Set the text color
  ctx.fillStyle = 'white';

  // Center align the text
  ctx.textAlign = 'left';
  ctx.font = '28px bold Gothic';

  // Display the time, in the middle of the screen
  ctx.fillText(mongolTsag(d), 0, 0, w);
});

rocky.on('minutechange', function(event) {
  // Display a message in the system logs
  console.log("Another minute with your Pebble!");

  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});

function mongolTsag(d){
  var ret = "";
  var time0 = ["", "нэгэн", "хоёр", "гурван", "дөрвөн", "таван","зургаан","долоон","найман","есөн"];
  var time1 = ["", "нэг", "хоёр", "гурав", "дөрөв", "тав","зургаа","долоо","найм","ес"];
  var time2 = ["", "арав","хорь","гуч","дөч","тавь","жар"];
  var time3 = ["","арван","хорин","гучин","дөчин","тавин","жаран"];
  var h = d.getHours();
  var m = d.getMinutes();
  var h1 = parseInt(d.getHours()/10);
  var h2 = parseInt(d.getHours()%10);
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
  ret += "\n";
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