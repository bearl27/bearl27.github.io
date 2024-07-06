final int width = 800,height = 500;
float[] posX;
float[] posY;
float[] mc = new float[2];
int num = 25;
float[] vec;
float[] Yvec;
boolean flag = false;
int nx=1, ny=4;
boolean[][]turned=new boolean[ny][nx];
int score;
float life=0;
int sradius=100;
int mcnt;
int p=160, q=640, a=235;
int bx=sradius, by=sradius;
int cx=width-sradius, cy=height-sradius;
int bspeed=2, cspeed=-2;
int mode =0;
int hx=550, hy=400, nox=295, ex=100;
int red=255, green=215, blue=0;
int count=450;

void setup() {
  size(800, 500);
  frameRate(50);
  posX = new float[num];
  posY= new float[num];
  for (int i = 0; i < num; i++) {
    posX[i] = random(width);
    posY[i]=random(height);
  }
  mc[0] = width/2;
  mc[1] = height/2;
  vec = new float[num];
  Yvec =new float[num];
  for (int i = 0; i < num; i++) {
    vec[i] = random(-3, 3);
    Yvec[i] = random(-3, 3);
  }
  for (int i=0; i<nx; i++) {
    for (int j=0; j<ny; j++) {
      turned[j][i]=false;
    }
  }
}

void draw() {
  if (mode==0) {
    gameTitle();
  } else if (mode==1) {
    if (score==nx*ny) {
      fin();
    } else {
      play();
    }
  } else if (mode==2) {
    gameOver();
  }
}

void play() {
  if (flag == true) {
    background(255, 255, 0);
    flag = false;
  } else {
    background(255, 255, 255);
  }
  flag();
  maru();
  player();
  scoreDisp();
  lifeDisp();
  item();
}

void fin() {
  background(0);
  textSize(50);
  fill(random(100, 255), random(100, 255), random(100, 255));
  text("GAME CLEAR", 245, 245);
  if ((mcnt%60)<40 && point==nx*ny) {
    textSize(40);
    text("(: PERFECT :)", 280, 300);
  }
  packHorizon();
  packVector();
}

//当たり判定
boolean crash(float pX, float pY, float mX, float mY) {
  float dist = sqrt((pX-mX)*(pX-mX)+(pY-mY)*(pY-mY));
  if (dist <= 10) {
    return true;
  }
  return false;
}

void player() {
  if (mc[0] < mouseX) {
    mc[0] += kando;
  } else {
    mc[0] -=kando ;
  }
  if (mc[1] < mouseY) {
    mc[1] += kando;
  } else {
    mc[1] -= kando;
  }
  fill(0);
  ellipse(mc[0], mc[1], 20, 20);
}

void maru() {
  fill(255, 0, 0);
  for (int i = 0; i < num; i++) {
    ellipse(posX[i], posY[i], 20, 20);
    posX[i]=posX[i]+vec[i];
    posY[i]=posY[i]+Yvec[i];
    if (posX[i]<0 || posX[i]>width) {
      vec[i]=-vec[i];
    }
    if (posY[i]<0 || posY[i]>height) {
      Yvec[i]=-Yvec[i];
    }
    if (crash(posX[i], posY[i], mc[0], mc[1])) {
      flag = true;
      life=life+0.2;
      point=0;
    }
  }
}

void flag() {
  float x, y;
  for (int i=0; i<nx; i++) {
    for (int j=0; j<ny; j++) {
      x=width/nx*(i+0.5);
      y=height/ny*(j+0.5);
      fill(0, 200, 55);
      triangle(x-7, y-10, x+8, y, x-7, y+10);
      line(x-7, y, x-7, y+20);
      if (!turned[j][i]) {
        fill(255, 255, 255);
        triangle(x-7, y-10, x+8, y, x-7, y+10);
      }
      if (crash(x, y, mc[0], mc[1])&&!turned[j][i]) {
        turned[j][i]=true;
        score++;
        point++;
      }
    }
  }
}

int point;
void scoreDisp() {
  textSize(24);
  fill(0, 0, 100);
  text("combo:"+point, 10, 25);
}

void lifeDisp() {
  textSize(24);
  fill(255, 100, 0);
  text("life", 600, 25);
  Heart();
}

void packHorizon() {
  fill(255, 215, 0);
  arc(p, a, sradius, sradius, 0.52, 5.76);
  arc(q, a, sradius, sradius, 3.67, 8.9);
  mcnt++;
  if ((mcnt%60)<30) {
    ellipse(p, a, sradius, sradius);
    ellipse(q, a, sradius, sradius);
  }
}

void packVector() {
  fill(255, 215, 0);
  cx+=cspeed;
  if (cx >= width || cx<0) {
    cspeed=-cspeed;
  }
  if (cspeed>0) {
    arc(cx, cy, sradius, sradius, 0.52, 5.76);
  } else {
    arc(cx, cy, sradius, sradius, 3.67, 8.9);
  }
  bx+=bspeed;
  if (bx >= width|| bx<0) {
    bspeed=-bspeed;
  }
  if (cspeed<0) {
    arc(bx, by, sradius, sradius, 0.52, 5.76);
  } else {
    arc(bx, by, sradius, sradius, 3.67, 8.9);
  }
  mcnt++;
  if ((mcnt%60)<30) {
    ellipse(cx, cy, sradius, sradius);
    ellipse(bx, by, sradius, sradius);
  }
}

void gameTitle() {
  background(0);
  kando();
  textSize(70);
  fill(255, 215, 0);
  text("FLAG GAME", 190, 200);
  mcnt++;
  if ((mcnt%60)<40) {
    textSize(30);
    fill(255, 255, 255);
    text("Click to start!", 280, 300);
  }
  fullcombo();
  Level();
  FlagR();
  FlagL();
}

int tri=nox+70;
void Level() {
  fill(255, 215, 0);
  textSize(40);
  text("NORMAL", nox, hy);
  fill(255, 0, 0);
  text("HARD", hx, hy);
  fill(0, 255, 0);
  text("EASY", ex, hy);
  fill(255, 255, 255);
  textSize(20);
  text("Pressed 'N'", nox+27, hy+40);
  text("Pressed 'H'", hx, hy+40);
  text("Pressed 'E'", ex-3, hy+40);
  if ((mcnt%60)<40) {
    triangle(tri, hy-65, tri+30, hy-65, tri+15, hy-40);
  }
  fill(red, green, blue);
  if (key=='e') {
    red=0;
    green=255;
    blue=0;
    tri=ex+32;
    vec = new float[num];
    Yvec =new float[num];
    for (int i = 0; i < num; i++) {
      vec[i] = random(-2, 2);
      Yvec[i] = random(-2, 2);
    }
  }
  if (key=='h') {
    red=255;
    green=0;
    blue=0;
    tri=hx+40;
    vec = new float[num];
    Yvec =new float[num];
    for (int i = 0; i < num; i++) {
      vec[i] = random(-4, 4);
      Yvec[i] = random(-4, 4);
    }
  }
  if (key=='n') {
    red=255;
    green=215;
    blue=0;
    tri=nox+70;
    vec = new float[num];
    Yvec =new float[num];
    for (int i = 0; i < num; i++) {
      vec[i] = random(-3, 3);
      Yvec[i] = random(-3, 3);
    }
  }
}

void mousePressed() {
  if (mode==0) {
    mode=1;
  }
  if (mode==2 && count>0) {
    mode=1;
    life=0;
    count=0;
  }
  if ((mode==2 && count<=0) || score==nx*ny) {
    if (point==nx*ny) {
      full++;
    }
    formal();
    flagClear();
  }
}

void formal() {
  mode=0;
  life=0;
  score=0;
  point=0;
  count=450;
  sX=0;
  sY=200;
}

float fa = 15*sin(TWO_PI/120)+35;
int fx=910, fy=-350;
void FlagR() {
  scale(0.7);
  rotate(1*PI/6);
  stroke(120, 80, 0);
  strokeWeight(10);
  line(fx+10, fy, fx+10, fy+300);
  noStroke();
  beginShape();
  vertex(fx, fy); //A
  curveVertex(fx, fy+150); //B
  curveVertex(fx+fa, fy+150+fa/2);
  vertex(fx, fy+150); //B
  vertex(fx+200, fy+150); //C
  curveVertex(fx+200+fa, fy+150+fa/2);
  curveVertex(fx+200, fy+150); //C
  curveVertex(fx+200-fa, fy+100);
  curveVertex(fx+200, fy); //D
  curveVertex(fx+200+fa, fy-fa);
  vertex(fx+200, fy); //D
  endShape(CLOSE);
}

int lx=-50, ly=-410;
void FlagL() {
  scale(0.85);
  rotate(2*PI/3);
  stroke(120, 80, 0);
  strokeWeight(14);
  line(lx+10, ly+150, lx+10, ly-190);
  noStroke();
  beginShape();
  vertex(lx, ly); //A
  curveVertex(lx, ly+150); //B
  curveVertex(lx+fa, ly+150+fa/2);
  vertex(lx, ly+150); //B
  vertex(lx+200, ly+150); //C
  curveVertex(lx+200+fa, ly+150+fa/2);
  curveVertex(lx+200, ly+150); //C
  curveVertex(lx+200-fa, ly+100);
  curveVertex(lx+200, ly); //D
  curveVertex(lx+200+fa, ly-fa);
  vertex(lx+200, ly); //D
  endShape(CLOSE);
  stroke(0);
  strokeWeight(1);
}

void heart(float Hx, float Hy) {
  noStroke();
  fill(255, 0, 0);
  triangle(Hx, Hy, Hx+20, Hy+22, Hx+40, Hy);
  arc(Hx+10, Hy, 20, 20, PI, TWO_PI);
  arc(Hx+30, Hy, 20, 20, PI, TWO_PI);
  fill(255, 255, 255);
}

int h1=750, h2=700, h3=650;
void Heart() {
  heart(h1, 15);
  heart(h2, 15);
  heart(h3, 15);
  if (flag == true) {
    fill(255, 255, 0);
    arc(h1+20, 19, 50, 50, -PI/2, (-PI/2)+life);
    if (life>(3*PI/2)) {
      arc(h2+20, 19, 50, 50, 3*PI/2, (-PI/2)+life);
    }
    if (life>7*PI/2) {
      arc(h3+20, 19, 50, 50, 7*PI/2, (-PI/2)+life);
    }
  } else {
    fill(255, 255, 255);
    arc(h1+20, 19, 50, 50, -PI/2, (-PI/2)+life);
    if (life>(3*PI/2)) {
      arc(h2+20, 19, 50, 50, 3*PI/2, (-PI/2)+life);
    }
    if (life>7*PI/2) {
      arc(h3+20, 19, 50, 50, 7*PI/2, (-PI/2)+life);
    }
  }
  stroke(0);
  if (life>(12*PI/2)) {
    mode=2;
  }
}

int ox=1;
int oy;
void gameOver() {
  if (ox<width) {
    fill(255, 0, 0);
    rect((width-ox)/2, (height-oy)/2, ox, oy );
    ox=ox+10;
    oy=ox*height/width;
  } else {
    fill(0);
    rect(0, 0, width, height);
    mcnt++;
    textSize(70);
    fill(255, 0, 0);
    text("GAME OVER", 190, 220);
    textSize(24);
    text("Remaining flags:"+((nx*ny)-score), 280, 370);
    con();
  }
}

int kando=3;
int tx=720;
void kando() {
  fill(255, 255, 255);
  triangle(tx, 390, tx+20, 350, tx+40, 390);
  triangle(tx, 450, tx+20, 490, tx+40, 450);
  textSize(50);
  text(""+kando, tx+3, 440);
}

void keyPressed() {
  if (keyCode==UP&&kando<5) {
    kando++;
  }
  if (keyCode==DOWN&& kando>1) {
    kando--;
  }
}

void con() {
  textSize(30);
  count--;
  if (mcnt%100<70 && count>-20) {
    text("Click to contenue!    "+count/45, 240, 300);
  }
}

void star(float sx, float sy) {
  noStroke();
  beginShape();
  vertex(sx, sy);
  vertex(sx+40, sy);
  vertex(sx+10, sy+20);
  vertex(sx+20, sy-13);
  vertex(sx+30, sy+20);
  vertex(sx, sy);
  endShape(CLOSE);
  stroke(0);
}

float angle=0.0;
float sX=0, sY=200;
int direction=1;
void item() {
  angle+=0.1;
  sX+=4.5;
  fill(random(150), random(150), random(150));
  star(sX-3*width, sY+60*sin(angle));
  star(7*width-sX, sY+200+60*sin(angle));
  if (crash(sX-3*width, sY+60*sin(angle), mc[0], mc[1]) || crash(7*width-sX, sY+200+60*sin(angle), mc[0], mc[1])) {
    life-=2*PI;
    sY=1000;
  }
  if (sX>9*width) {
    sX=0;
    sY=200;
  }
}

void flagClear() {
  for (int i=0; i<nx; i++) {
    for (int j=0; j<ny; j++) {
      turned[j][i]=false;
    }
  }
}

int full=0;
void fullcombo() {
  fill(255, 215, 0);
  for (int i=0; i<full; i++) {
    star(30+40*i, 30);
  }
}

/*
関数でまとめたため、void drawがすっきりしています。
 ゲームタイトル画面、プレイ画面、クリア画面、ゲームオーバー画面を作りました。
 ゲームタイトル画面では、難易度や感度を選べます。
 難易度は'e','n','h'を押すことで変えることができ、現在の難易度がわかりやすいように左右にある旗の色が変わるようにしました。
 また、EASY、NORMAL、HARDの文字の上に三角を表示しました。
 難易度が高いほど障害物の動きが速くなります。
 感度は右下にある数字で１〜５の５段階で数が多いほどPlayerの動きが速くなります。
 次にプレイ画面では旗に触ると旗が緑色に、障害物に当たると画面が黄色になります。
 また障害物に当たると右上にある"life"が減っていきます。
 lifeが0になるとゲームオーバーとなってしまいます。
 ゲーム中に一定頻度で星が現れます。
 星は"life"を回復するアイテムなので、当たるとハート一つ分回復します。
 左上にcomboを表示しました。
 障害物に当たることなく、連続で旗にさわれた回数です。
 　旗が全て緑色になるとクリア画面にいきます。
 クリア画面では今まで愛用したパックマンを使いました。
 そして、'full combo'（障害物に一度も当たることなくクリアする）の時だけPERFECTと書かれます。
 fullcomboの後にゲームタイトルに戻るとfullcomboできた分だけ右上に星が追加されます
 最後にゲームオーバー画面ではコンティニューできるようにしました。
 　ゲームオーバー画面になってから10秒以内に一度だけコンティニューできます。
 コンティニューをすると旗はゲームオーバーした時の状態のままでライフが全回復している状態でスタートします。
 　次にゲームをするときの指標になるよう、旗の残数を表示しました。
 ゲームオーバー画面とクリア画面からクリックするとタイトルに戻るようにしました。
 */
