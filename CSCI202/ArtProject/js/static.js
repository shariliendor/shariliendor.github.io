function setup() {
  // each grid line = 20px
  createCanvas(400, 500);
}

function draw() {
  background(20, 100, 150);
  stroke(0);

  // grid
  // for (let i = 0; i < 20; i ++) {
  //   line(20*i, 0, 20*i, 500);
  // }

  // for (let i = 0; i < 25; i ++) {
  //   line(0, 20*i, 400, 20*i);
  // }

  // funny black thing in the corner
  fill(0);
  beginShape();
  vertex(0, 500);
  vertex(0, 480);
  
  bezierVertex(20, 475, 55, 460, 60, 420);
  vertex(100, 500);
  endShape(CLOSE);
  
  
  // funny green blob on the bottom
  strokeWeight(5);

  fill(0, 75, 0);
  beginShape();
  vertex(105, 500);
  bezierVertex(90, 470, 110, 430, 205, 380);
  vertex(220, 365);
  bezierVertex(230, 375, 250, 375, 255, 360);
  bezierVertex(230, 340, 230, 320, 250, 305);
  bezierVertex(340, 360, 360, 450, 340, 500);

  endShape(CLOSE);



  // other black thing in the middle
  fill(0);
  beginShape();
  vertex(220, 365);
  bezierVertex(230, 375, 250, 375, 255, 360);
  bezierVertex(230, 340, 230, 320, 250, 305);
  bezierVertex(210, 310, 190, 360, 205, 380);
  endShape(CLOSE);


  // yellow beak
  fill(175, 175, 0);
  beginShape();
  vertex(160, 280);
  bezierVertex(155, 240, 160, 235, 145, 215);
  bezierVertex(165, 205, 180, 205, 200, 180);
  vertex(180, 280);
  endShape(CLOSE);

  // funny line thing sticking out of its head
  fill(175, 175, 0);
  strokeWeight(0);

  beginShape();
  vertex(200, 180);
  bezierVertex(210, 115, 210, 85, 180, 0);
  vertex(190, 0);
  bezierVertex(220, 85, 220, 115, 210, 180);
  endShape(CLOSE);

  strokeWeight(5);
  noFill();
  bezier(200, 180, 210, 115, 210, 85, 180, 0); 

  // orange chicken neck
  fill(200, 100, 50);
  beginShape();
  vertex(105, 500);
  bezierVertex(90, 470, 110, 430, 205, 380);
  bezierVertex(190, 360, 210, 310, 250, 305);
  bezierVertex(300, 290, 300, 180, 200, 180);
  bezierVertex(180, 300, 100, 320, 60, 420);
  bezierVertex(70, 480, 70, 490, 100, 500);
  endShape(CLOSE);


  // funny circle thing sticking out of its head
  circle(125, 165, 70);

  strokeWeight(0);
  beginShape();
  vertex(200, 180);
  bezierVertex(180, 175, 140, 190, 125, 165);
  vertex(125, 200);
  bezierVertex(160, 200, 160, 180, 200, 180);
  endShape(CLOSE);
  
  strokeWeight(5);
  noFill();
  bezier(200, 180, 180, 175, 140, 190, 125, 165);
  bezier(200, 180, 160, 180, 160, 200, 125, 200);
  
}