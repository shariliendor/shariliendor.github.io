let img;

function load() {
  img = loadImage("images/artProjectImage.jpg");
}


function setup() {
  // each grid line = 20px
  createCanvas(400, 500);
  
  //image(img, 0, 0, 385, 480);
}

function draw() {
  background(20, 100, 150);

  // grid
  for (let i = 0; i < 20; i ++) {
    line(20*i, 0, 20*i, 500);
  }

  for (let i = 0; i < 25; i ++) {
    line(0, 20*i, 400, 20*i);
  }
  
  noFill();
  // funny black thing in the corner
  bezier(0, 480, 45, 465, 45, 465, 60, 420);
  bezier(60, 420, 70, 480, 70, 480, 100, 500);
  
  // funny green blob on the bottom
  bezier(105, 500, 90, 470, 110, 430, 205, 380);
  line(205, 380, 220, 365);
  bezier(220, 365, 230, 375, 250, 375, 255, 360);
  bezier(255, 360, 230, 340, 230, 320, 250, 305);
  bezier(340, 500, 360, 450, 340, 360, 250, 305);

  // other black thing in the middle
  bezier(205, 380, 190, 360, 210, 310, 250, 305);

  // orange chicken neck
  bezier(60, 420, 100, 320, 180, 300, 200, 180);
  bezier(250, 305, 300, 290, 300, 180, 200, 180);

  // yellow beak
  bezier(160, 280, 0, 0, 0, 0, 0, 115);

}