$(document).ready(function(){
    //---------------DEFENDER SECTION--------------//
        //creating defender class, adding image, move function, then creating space_cat as defender instance
            class Defender {
                constructor(src, alt, x, y, container){
                    this.src = src;
                    this.alt = alt;
                    this.container = container;
                    this.x = x; 
                    this.y = y;
                    this.defender_imageElement = $('<img>', {
                        src: this.src,
                        alt: this.alt,
                    });
        
                    this.defender_imageElement.css('position', 'absolute', );
                    this.defender_imageElement.css('left', this.x + 'px');
                    this.defender_imageElement.css('top', this.y + 'px');
            
        
                } 
        
                append_defenderImage(){
                    $(this.container).append(this.defender_imageElement);
        
                }
        
                
                move(direction){
                    const containerWidth = $(this.container).width();
                    const containerLeft = 0;
                    if (direction === 'left'){
                        this.x -= 15; 
                        if (this.x < containerLeft){
                            this.x = containerLeft;
                            //to make it stop at the container boundary 
                        }
                    } else if (direction === 'right'){
                        this.x += 15;
                        const containerRight = containerWidth - this.defender_imageElement.width();
                        if (this.x > containerRight){
                            this.x = containerRight;
                        }
                    }
        
                    this.defender_imageElement.css('left', this.x + 'px' );
                }
    
            checkIfDefenderHit(bullet){
                    const bulletPosition = bullet.bullet_imageElement.position();
                    const defenderPosition = this.defender_imageElement.position();
    
        
        
                    if (bulletPosition.left > defenderPosition.left + this.defender_imageElement.width() &&
                        bulletPosition.left + bullet.bullet_imageElement.width() < defenderPosition.left &&
                        bulletPosition.top > defenderPosition.top + this.defender_imageElement.height() &&
                        bulletPosition.top + bullet.bullet_imageElement.height() + defenderPosition.top){
                        return true 
        
                    }
                    return false;
                }
    
                hideDefender(){
                    this.defender_imageElement.remove();
                }
        
            }
        //keypress functions which help move defender
                $(document).keydown(function(e){
                    if (e.which === 37){
                        space_cat.move('left');
                    } else if (e.which === 39){
                        space_cat.move('right');
                    } else if (e.which === 32){
                        shoot();
                    }
                });
        
        
           
        // part of main programme
        const space_cat = new Defender ('spacecat.png', 'space cat', 370, 560, '#gamecontainer');
        space_cat.append_defenderImage();
        space_cat.move();
        
    
    
    
    //---DEFENDER BULLET---//
    
    
    
        class Bullet {
            constructor(x, y, container){
                this.x = x - 15; //setting position relative to defender image size
                this.y = y - 30;
              
                this.container = container;
                this.bullet_imageElement = $('<img>', {
                    src: 'star.png',
                    class: 'bullet',
                });
    
                this.bullet_imageElement.css('position', 'absolute');
                this.bullet_imageElement.css('left', this.x + 'px');
                this.bullet_imageElement.css('top', this.y + 'px');
            }
    
            appendBullet(){
                $(this.container).append(this.bullet_imageElement); //appending defender bullet to the game container
            }
            move(){
    
                this.y -= 10; //moves up by 10 pixels 
                this.bullet_imageElement.css('top', this.y + 'px');
    
                if(this.y > $(this.container).height()){
                    this.hideBullet()
                    return true;
                }
    
                return false;
            }
            hideBullet(){
                this.bullet_imageElement.remove();
            }
    
            checkIfHit(invader){
                const bulletPosition = this.bullet_imageElement.position();
                const invaderPosition = invader.invader_imageElement.position();
                console.log(bulletPosition);
    
                if (bulletPosition.left < invaderPosition.left + invader.invader_imageElement.width() &&
                    bulletPosition.left + this.bullet_imageElement.width() > invaderPosition.left &&
                    bulletPosition.top < invaderPosition.top + invader.invader_imageElement.height() &&
                    bulletPosition.top + this.bullet_imageElement.height() + invader.invader_imageElement.height()){
                    return true 
    
                }
                return false;
            }
        }
    
        let bullets = [];
        let shootingAllowed = true;
        let score = 0;
        function shoot(){
            if (shootingAllowed){
                const space_catPosition = space_cat.defender_imageElement.position();
                const bullet = new Bullet(space_catPosition.left, space_catPosition.top, '#gamecontainer');
                bullet.appendBullet();
                bullets.push(bullet);
    
                shootingAllowed = false;
            }
    
        }
    
        function moveBullet(){
            for (let i = bullets.length - 1; i >= 0;  i--){
                const bullet = bullets[i];
                if (bullet.move()){
                    bullets.splice(i, 1);
                    shootingAllowed = true;
                } else {
                    for (let j = invaders.length - 1; j >= 0; j--){
                        const invader = invaders[j];
                        if (bullet.checkIfHit(invader)){
                                bullet.hideBullet();
                                bullets.splice(i, 1);
                                invader.hideInvader();
                                invaders.splice(j, 1);
                                score += 10;
                                newScore();
                                shootingAllowed = true;
                        }
                    }
                }
            }
            requestAnimationFrame(moveBullet);
        }
    
        requestAnimationFrame(moveBullet);
    
        function newScore(){
            $('#score').text('Score: ' + score)
        }
        newScore();
    
    
    
    
        //-------------------INVADER SECTION---------------//
    
    
    
        //invader array
        let invaders = [];
    
        //invader class definition
        class Invader {
            constructor(src, alt, speed, direction, x, y, container){
                this.src = src;
                this.alt = alt;
                this.speed = speed;
                this.direction = direction;
                this.x = x; //x position of a single invader 
                this.y = y; //y position of a single invader 
                this.container = container; 
                this.invader_imageElement = $('<img>', {
                    src: this.src,
                    alt: this.alt
                });
    
    
        
                this.invader_imageElement.css('position', 'absolute');
                this.invader_imageElement.css('left', this.x + 'px' );
                this.invader_imageElement.css('top', this.y + 'px');
        
        
                }
        
                append_invaderImage(){
                    $(this.container).append(this.invader_imageElement);
        
                }
               
                //this moves the invaders from left to right and vice versa at a certain speed 
                move(){
                    const containerWidth = $(this.container).width();
                    const invaderWidth = this.invader_imageElement.width();
                
    
                    if (this.direction === 'right'){
                        this.x += this.speed;
                    } else if (this.direction === 'left'){
                        this.x -= this.speed;
                    }
    
                        if (this.x + invaderWidth >= containerWidth || this.x <= 0){
                            return true;
                        }
                    
    
                    this.invader_imageElement.css('left', this.x + 'px');
                    this.invader_imageElement.css('top', this.y + 'px');
    
                    return false;
        
                }
    
                hideInvader(){
                    this.invader_imageElement.remove();
                
                }
                    
        
        }
        let invaderBullets = []; 
    
       
        //function to create a grid of invaders - invader class instantised inside this function
        function invaderGrid (rows, columns, container){
            initialPosition = 0;
            for (let i = 0; i < rows; i++){
                for (let j = 0; j < columns; j++){
                    const x = 0 + j * 66;
                    const y = i * 66;
        
                const space_mouse = new Invader('spacemouse.png', 'space mouse', 2, 'right', x, y, container);
                invaders.push(space_mouse);
                space_mouse.append_invaderImage();
                }
            }
        
        }
        //invader grid created 
        invaderGrid(5, 8,'#gamecontainer');
    
        //moves invaders down once they reach container edge 
        function moveInvaders() {
            let moveDown = false;
            let changeDirection = false;
            const containerWidth = $('#gamecontainer').width();    
            const containerHeight = $('#resetinvaders').height();  
           
            //moves individual elements of the array down at the same time 
            invaders.forEach(function(invader, index){
                if (invader.move()){
                    moveDown = true;
                    changeDirection = true;
                }
    
    
                if(invader.y + invader.invader_imageElement.height() >= containerHeight){
                    if (index === invaders.length - 1){
                        resetInvaderGrid();
                    }
                    changeDirection = true;
                }
    
                if (invader.x + invader.invader_imageElement.width() >= containerWidth || invader.x <= 0){
                    moveDown = true;
                    changeDirection = true;
                }
            });
            if (moveDown) {
                invaders.forEach(function(invader){
                    invader.y += 50;
                    invader.invader_imageElement.css('top', invader.y + 'px');
                });
    
                if(changeDirection){
                    invaders.forEach(function(invader){
                        invader.direction = (invader.direction === 'right') ? 'left' : 'right';
                    });
                }
        
    
                
            }
            requestAnimationFrame(moveInvaders);
        }
        requestAnimationFrame(moveInvaders); 
    
        //creates new invader grid when the invaders reach the bottom of the resetinvaders container 
    
        function resetInvaderGrid(){
            invaders.forEach(function(invader){
                invader.hideInvader();
            });
            invaders = [];
    
            //new invader grid 
            invaderGrid(5, 8, '#gamecontainer')
        }
        
        function endGame(){
            alert('Game Over. Final Score: ' + score);
        }
    
    
    
    
        //---INVADER BULLETS---//
    
    
    
    //creating invader bullets 
        class InvaderBullets {
            constructor(x, y, container){
                this.x = x - 15;
                this.y = y - 30;
    
                this.container = container;
                this.bullet_imageElement = $('<img>', {
                    src: 'star.png',
                    class: 'bullet',
                });
                
                this.bullet_imageElement.css('position', 'absolute');
                this.bullet_imageElement.css('left', this.x + 'px');
                this.bullet_imageElement.css('top', this.y + 'px');
            }
            
            appendBullet(){
                $(this.container).append(this.bullet_imageElement);
            }
    
            move(){
                //moves down by 5px 
                this.y += 2;
                //positon updated
                this.bullet_imageElement.css('top', this.y + 'px');
                //when bullet leaves container it must disappear 
                if(this.y > $(this.container).height()) {
                    this.hideBullet();
                    return true;
                }
                return false;
            }
            
            hideBullet(){
                this.bullet_imageElement.remove();
            }
    
           checkIfHit(defender){
                const bulletPosition = this.bullet_imageElement.position();
                const defenderPosition = defender.defender_imageElement.position();
                console.log(bulletPosition);
                console.log(defenderPosition);
    
                if (bulletPosition.left < defenderPosition.left + defender.defender_imageElement.width() &&
                    bulletPosition.left + this.bullet_imageElement.width() > defenderPosition.left &&
                    bulletPosition.top < defenderPosition.top + defender.defender_imageElement.height() &&
                    bulletPosition.top + this.bullet_imageElement.height() > defenderPosition.top){

                        decreaseLives();
                        return true    

                        }
                      
                    return false;    
    
                }
                
            }
    


    let lives = 3;
    let gameOver = false;
    function updateLives(){
        $('#lives').text('Lives: ' + lives);
    }

    function decreaseLives(){
        lives--;

        updateLives();
        
        if (lives === 0){
            endGame();
        }
    }
    function endGame(){
        alert('Game over! Final Score: ' + score);
    }
   
    

    function invaderShoot(){
        if(Math.random() < 0.01){
            const randomInvaderIndex = Math.floor(Math.random() * invaders.length);
            const randomInvader = invaders[randomInvaderIndex];
    
            const bullet = new InvaderBullets(
                randomInvader.x + randomInvader.invader_imageElement.width() / 2,
                randomInvader.y + randomInvader.invader_imageElement.height(), '#gamecontainer'
            );
            bullet.appendBullet();
            invaderBullets.push(bullet);
            moveInvaderBullet(bullet);
        
        }
    
        requestAnimationFrame(invaderShoot);
    }
    function moveInvaderBullet(bullet){
        function animateBullet(){
            if(!gameOver){
                if(bullet.move()){
                    invaderBullets.splice(invaderBullets.indexOf(bullet), 1);
                } else {
                        if (bullet.checkIfHit(space_cat)){
                        bullet.hideBullet();
                        //decreaseLives();
                        //space_cat.hideDefender();
                } else {
                    requestAnimationFrame(animateBullet);
            }
            
        }

    } 
}
    //requestAnimationFrame(animateBullet);
    animateBullet();
    }
    updateLives();
    invaderShoot();
    
    //-----DOCUMENTREADY TAGS CLOSED -----//
    
    });
