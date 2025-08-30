function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#a6f2ffff";
  ctx.fill();

  // Draw the edge circle with gradient
  // TODO: (Optional) add a gradient circle

  // TODO: make the central black circle
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.07, 0, 2 * Math.PI);
  ctx.fillStyle = "#000000ff";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  //TODO: Make sure you show all the numbers
  var ang;
  var num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  for (var i = 0; i < num.length; i++) {
    
    ang = (num[i] * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num[i].toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }

}

function drawTime(ctx, radius) {
  // TODO: Calculate the angles of every hand depending on the time
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  console.log(hour, minute, second)
  second = Math.PI * 2 * (second / 60) ;
  minute =   Math.PI * 2 * (minute / 60) + second/60;
  hour = hour%12/12*Math.PI*2 + minute/12 + second/360;
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  //minute
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  // second
  drawHand(ctx, second, radius * .9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  // Rotate recibe en radianes no en grados. Corregir calculo.
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
