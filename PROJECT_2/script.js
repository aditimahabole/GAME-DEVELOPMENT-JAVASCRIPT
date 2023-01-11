this.element = document.getElementById('canvas1');
const ctx = this.context = this.element.getContext('2d');
console.log(this.context);
const CANVAS_WIDTH = this.element.width = 800;
const CANVAS_HEIGHT = this.element.height = 700;
const slider = document.getElementById('slider');
//----control gaming speed -----
let gameSpeed = 10;//more value more speed
slider.value = gameSpeed;
//---show game speed ---
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change',(e)=>{
    console.log(e);
    gameSpeed = e.target.value;
   showGameSpeed.innerHTML = gameSpeed; 
})
//---print image in background---
const backgroundLayer1 = new Image();
backgroundLayer1.src = './assets/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = './assets/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = './assets/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = './assets/layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = './assets/layer-5.png';

//--javascript classes---
class Layer {
    constructor(image,speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image=image;
        this.speedModifier=speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
       this.speed =  gameSpeed * this.speedModifier
       if(this.x<= -this.width){
        this.x = this.width + this.x2 -this.speed;
       }
       if(this.x2<= -this.width){
        this.x2 = this.width + this.x -this.speed;
       }

       this.x = Math.floor(this.x - this.speed);
       this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x2,this.y,this.width,this.height);
    }
}
const layer1 = new Layer(backgroundLayer1,0.2);
const layer2 = new Layer(backgroundLayer2,0.4);
const layer3 = new Layer(backgroundLayer3,0.6);
const layer4 = new Layer(backgroundLayer4,0.8);//moving 5 px per frame
const layer5 = new Layer(backgroundLayer5,1);
const gameObjects = [layer1, layer2, layer3, layer4, layer5]
function animate (){
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);//clearing old frame so that they do not mix with each other
    // this.context.drawImage(backgroundLayer4, x, 0);
    // x-=gameSpeed;//moving left 1 pixel per frame
    // layer1.update();
    // layer1.draw();
    // layer2.update();
    // layer2.draw();
    // layer3.update();
    // layer3.draw();
    // layer4.update();
    // layer4.draw();
    // layer5.update();
    // layer5.draw();
    gameObjects.forEach(object =>{
        object.update();
        object.draw();
    })
    requestAnimationFrame(animate);
}
animate();

