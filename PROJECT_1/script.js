function canvasLayer() {
    //--state of player--
    let playerState ='idle';
    const dropdown = document.getElementById('animations');
    dropdown.addEventListener('change',(e)=>{
        playerState = e.target.value;
    })
    this.element = document.getElementById('canvas1');
    this.context = this.element.getContext("2d");
    console.log(this.context);
    let CANVAS_WIDTH = this.element.width = 600;
    let CANVAS_HEIGHT = this.element.height = 600;
    const spriteWidth = 575;//total pic width/num of col = 1 dog
    const spriteHeight = 523;//total pic height/num of row = 1 dog
    let gameFrame = 0;
    const staggerFrames = 5;//more the number slower the animation
    //--making object array --
    const spriteAnimations = [];
    //--------------------- --
    //-- animation states --
    const animationStates =[
        {
            name:'idle',
            frames:7,
        },
        {
            name:'jump',
            frames:7,
        },
        {
            name:'fall',
            frames:7,
        },
        {
            name:'run',
            frames:9,
        },
        {
            name:'dizzy',
            frames:11,
        },
        {
            name:'sit',
            frames:5,
        },
        {
            name:'roll',
            frames:7,
        },
        {
            name:'bite',
            frames:7,
        },
        {
            name:'ko',
            frames:12,
        },
        {
            name:'getHit',
            frames:4,
        }
    ];
    //--------------------------------
    animationStates.forEach((state,index)=>{
        let frames ={
            loc:[],
        }
        for(let j = 0; j<state.frames;j++){
            let positionX = j * spriteWidth;
            let positionY = index * spriteHeight;
            frames.loc.push({x:positionX,y:positionY});
        }
        spriteAnimations[state.name] = frames;
    })
    console.log(spriteAnimations);
    console.log("--------------------");
    const playerImage = new Image();
    playerImage.src = './assets/shadow_dog.png';
    function animate(){
        this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // this.context.fillRect(x,50,100,100);
        // let position = Math.floor(gameFrame/staggerFrames) % 6;
        let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
        let frameX = spriteWidth*position;//moving horizontally
        let frameY = spriteAnimations[playerState].loc[position].y;
        this.context.drawImage(playerImage,frameX,frameY,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
        //by multiplying we will be able to move to next pic of dog in that png
        gameFrame++;
        requestAnimationFrame(animate)
    }
    animate();
}
canvasLayer();
