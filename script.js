const canvas = document.getElementById("Gamecanvas");
const ctx = canvas.getContext("2d");



const gravity = 0.3;
let friction
const ground_friction = 1
const air_friction = 0.4
let acceleration = 0
let accValue = 2
let velocityY = 0;
let velocityX = 0;
let grounded = false
let force;
let maxVelocity = 14



const player = {
    x: 90,
    y: 1,
    width: 40,
    height: 40
};




const platform = {
    x: 50,
    y: 400,
    width: 40,
    height: 300
};

const platform2 = {
    x: 120,
    y: 450,
    width: 540,
    height: 40
};

const platform3 = {
    x: 420,
    y: 150,
    width: 100,
    height: 40
};
const platform4 = {
    x:360,
    y:300,
    width:100,
    height:40,
}

const platforms = [
    platform,
    platform2,
    platform3,
    platform4
] ;
 



function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Player
    ctx.fillStyle = "green";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );


    // Platforms
    ctx.fillStyle = "purple";

    for (let i = 0; i < platforms.length; i++) {

        const p = platforms[i];

        ctx.fillRect(
            p.x,
            p.y,
            p.width,
            p.height
        );
    }
}




function isColliding(x, y, platform) {

    return (
        x < platform.x + platform.width &&
        x + player.width > platform.x &&
        y < platform.y + platform.height &&
        y + player.height > platform.y
    );
}




function moveHorizontal() {
    velocityX += acceleration;

    if (velocityX > maxVelocity) {
        velocityX = maxVelocity;
    }

    if (velocityX < -maxVelocity) {
        velocityX = -maxVelocity;
    }

    const nextX = player.x + velocityX;

    for (let i = 0; i < platforms.length; i++) {

        const p = platforms[i];

        if (isColliding(nextX, player.y, p)) {
              
          
            if (velocityX > 0) {

                player.x = p.x - player.width;
            }

            // Moving left
            else if (velocityX < 0) {

                player.x = p.x + p.width;
            }

            velocityX = 0;

            return;
        }
    }

    // No collision
    player.x = nextX;
}



function moveVertical() {
    
    grounded = false
    const nextY = player.y + velocityY;

    for (let i = 0; i < platforms.length; i++) {

        const p = platforms[i];

        if (isColliding(player.x, nextY, p)) {

            // Falling downward
            if (velocityY > 0) {

                player.y = p.y - player.height;
                velocityY = 0;
                grounded = true
            }

            // Moving upward
            else if (velocityY < 0) {
                 
                player.y = p.y + p.height;
                
                   velocityY = 0;
            }
     
         

            return;
        }
    }

    // No collision
    player.y = nextY;
}



function applyFriction() {
    if(grounded){
        friction = ground_friction
    }
   else{
    friction = air_friction
   }
    if (velocityX > 0) {

        velocityX -= friction;

        if (velocityX < 0) {
            velocityX = 0;
        }
    }

    else if (velocityX < 0) {

        velocityX += friction;

        if (velocityX > 0) {
            velocityX = 0;
        }
    }
}




function animate() {

    
    velocityY += gravity;


   
    applyFriction();


  
    moveHorizontal();


  
    moveVertical();


    
    draw();


    
    requestAnimationFrame(animate);
}



document.addEventListener("keydown", (event) => {

    switch (event.code) {

        case "Space":

            
            if(grounded){

            velocityY = -10;
            grounded = false
            }

            break;


        case "ArrowRight":

            acceleration = accValue;

            break;


        case "ArrowLeft":

            acceleration = -accValue;

            break;


        default:

            break;
    }
});

document.addEventListener("keyup", (event) => {

    if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
        acceleration = 0;
    }

});

animate();