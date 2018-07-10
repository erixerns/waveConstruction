
var wave1;
var wave2;
var zoom=0.8;
var zoomSlider;
function setup(){
  createCanvas(600, 600);
  wave1=new Wave(20, 100, color(255, 0, 0));
  wave2=new Wave(20, 200, color(0, 0, 255));
  zoomSlider = new Slider(500, zoom);
}

function draw(){
  background(0);

  // zoom slider
  zoomSlider.render();
  zoom=zoomSlider.value;
  // first wave
  wave1.render();

  // second wave
  wave2.render();

  // third wave
  push();
    translate(0, 300);
    stroke(0, 255, 0);
    for(let i=0; i<400/(this.zoom*10);){
      i+=0.01;
      point(i*this.zoom*20, Math.sin(2*Math.PI*wave1.f*i)*Math.sin(2*Math.PI*wave2.f*i)*30);
    }
    pop();
}

var Wave = function(x ,y, rgb){
  this.x=x;
  this.y=y;
  this.zoom=zoom;
  this.sliderX=500;
  this.f=0.5;
  this.rgb=rgb;
  this.sliderFreq=new Slider(this.y-20, this.f);
  this.render = function(){
    this.sliderFreq.render();
    this.f=this.sliderFreq.value;
    this.zoom=zoom;
    push();
    translate(this.x, this.y);
    stroke(this.rgb);
    for(let i=0; i<400/(this.zoom*10);){
      i+=0.01;
      point(i*this.zoom*10, Math.sin(2*Math.PI*this.f*i)*20);
    }
    pop();
  };
}

var Slider= function(y, value){
  this.y=y;
  this.value=value;
  this.sliderX=this.value*100+450;
  this.render=function(){
    push();
    rect(450, this.y-2, 100, 2);
    ellipse(this.sliderX, this.y, 10);

    if(mouseIsPressed && Math.abs(mouseX-this.sliderX)<10 && Math.abs(mouseY-this.y)<10 && mouseX>450 && mouseX<550){
      this.sliderX=mouseX;
      this.value=(this.sliderX-450)/100+0.1;
    }
    fill(255);
    text(Math.round(this.value*100)/100,570,this.y);
    pop();
  }
}