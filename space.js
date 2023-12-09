$(document).ready(function(){

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
    
            $(document).keydown(function(e){
                if (e.which === 37){
                    space_cat.move('left');
                } else if (e.which === 39){
                    space_cat.move('right');
                } else if (e.which === 32){
                    shoot();
                }
            });
    
    
       
    
        const space_cat = new Defender ('spacecat.png', 'space cat', 370, 560, '#gamecontainer');
        space_cat.append_defenderImage();
        space_cat.move();
    
    
    let invaders = [];
    class Invader {
        constructor(src, alt, speed, direction, x, y, container){
            this.src = src;
            this.alt = alt;
            this.speed = speed;
            this.direction = direction;
            this.x = x;
            this.y = y;
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
            shoot(){    
                const bullet = new Bullet(
                    this.x + this.invader_imageElement.width() / 2,
                     this.y + this.invader_imageElement.height(),
                      '#invadercontainer');
            
            bullet.appendBullet();
            invaderBullets.push(bullet);
                }
    
    }

    /*let invaderBullets = [];*/ 
    
    function invaderGrid (rows, columns, container){
        initialPosition = 0;
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++){
                const x = 0 + j * 70;
                const y = i * 70;
    
            
           
    
            const space_mouse = new Invader('spacemouse.png', 'space mouse', 3, 'right', x, y, container);
            invaders.push(space_mouse);
            space_mouse.append_invaderImage();
            }
        }

    
    }
    
    invaderGrid(5, 8,'#invadercontainer');

    
    function moveInvaders() {
        let moveDown = false;
    
        for (let i = 0; i < invaders.length; i++) {
            if (invaders[i].move()) {
                moveDown = true;
            }
        }
            if (moveDown) {
                $('#invadercontainer').css('top', '+=50px');
                

                for (let i = 0; i < invaders.length; i++){
                    if (invaders[i].direction === 'right'){
                        invaders[i].direction = 'left';
                    } else {
                        invaders[i].direction = 'right';
                    }
                    if (Math.random() < 0.02 ){
                        invaders[i].shoot();
                    }
                } 
              

                }   
                invaderShoot()
                requestAnimationFrame(moveInvaders);

    } 
    requestAnimationFrame(moveInvaders);


       /* here, after ifmovedown is closed*/
    


    function endGame(){
        alert('Game Over. Final Score: ' + score);
    }

    class Bullet {
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

            this.y -= 10;
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
            //moves down by 20px 
            this.y += 20;
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
        checkIfDefenderHit(defender){
            const bulletPosition = this.bullet_imageElement.position();
            const defenderPosition = defender.defender_imageElement.position();

            if (
                bulletPosition.left < defenderPosition.left + defender.defender_imageElement.width() &&
                bulletPosition.left + this.bullet_imageElement.width() < defenderPosition.left &&
                bulletPosition.top < defenderPosition.top + defender.defender_imageElement.height() &&
                bulletPosition.top + this.bullet_imageElement.height() + defenderPosition.top){
                    return true
                }       
                return false;    
             
        }
    
    }
    let invaderBullets = [];
   
   function moveInvaderBullet(){
        if (invaderBullets.length === 0){
            const randomIndex = Math.floor(Math.random() + invaders.length);
            const invader = invaders[randomIndex];
            const invaderPosition = invader.invader_imageElement.position();

        }
        for(let i = invaderBullets.length - 1; i >= 0; i--){
            const bullet = invaderBullets[i];


            if(bullet.move()){
                invaderBullets.splice(i, 1);
            } else {
                bullet.move();

                const defenderPosition = space_cat.defender_imageElement.position();
                const bulletPosition = bullet.bullet_imageElement.position();

                if(bulletPosition.left < defenderPosition.left + this.defender_imageElement.width() &&
                bulletPosition.left + bullet.bullet_imageElement.width() < defenderPosition.left &&
                bulletPosition.top < defenderPosition.top + this.defender_imageElement.height() &&
                bulletPosition.top + bullet.bullet_imageElement.height() + defenderPosition.top
                ){
                bullet.hideBullet();
                space_cat.hideDefender();
                endGame();
                return;
                }
            }
           
        }
        requestAnimationFrame(moveInvaderBullet);
    } 
    requestAnimationFrame(moveInvaderBullet);




    function invaderShoot(){
        for (let i = 0; i < invaders.length; i++){
            if(Math.random() < 0.0000001){
                const invader = invaders[i];
                const invaderPosition = invader.invader_imageElement.position();

                const bullet = new InvaderBullets(
                invaderPosition.left, invaderPosition.top, '#invadercontainer');
                bullet.appendBullet();
                bullet.checkIfDefenderHit(space_cat);
                invaderBullets.push(bullet);
            }
        }
        requestAnimationFrame(invaderShoot);
        }

    });
    
