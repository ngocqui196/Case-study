let canvas = document.getElementById("myCanvas").getContext("2d");
let planes = {};
let numberPoint = -999999999999999999999999999999999999;
let enplanes = [];
let bullet = [];
let bulletEnemy = [];

let number = 0;
let count = 0;
let point = 0;



let score = 0;      // Biến lưu điểm

// Khởi tạo lớp máy bay của người chơi;
function MyPlanes(toaDoX,toaDoY,width,height) {
    this.image = new Image();
    this.image.src = "planes.jpg";
    this.toadoX = toaDoX;
    this.toadoY = toaDoY;
    this.width = width;
    this.height = height;
    this.getToaDoX = function () {
        return this.toadoX + this.width / 2;
    };
    this.getToaDoY = function () {
        return this.toadoY + this.height / 2;
    };
    this.getWidthMyPlanes = function () {
        return this.width;
    };
    this.getHeightMyPlanes = function () {
        return this.height;
    }
    this.creatPlanes = function () {
        canvas.drawImage(this.image,this.toadoX,this.toadoY,this.width,this.height)
    };

}
//Khởi tạo lớp đạn:
function Bullet (x,y,w,h) {
    this.image = new Image();
    this.image.src = "dan.png";
    this.topY = 2;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.creatBullet = function () {
        this.y -= this.topY;
        canvas.drawImage(this.image,this.x,this.y,this.w,this.h);
    };
    this.checkDiem =function (enplanet) {
        let bullet_x = this.x + this.w / 2;
        let bullet_y = this.y + this.h / 2;
        if ( Math.abs(enplanet.getXCenter() - bullet_x) < (enplanet.getWidthEnemy() + this.w) / 2
            &&  Math.abs(enplanet.getYCenter() - bullet_y) < enplanet.getHeightEnemy() + this.h / 2) {
            this.y = -100;
            enplanet.toadoy = numberPoint;
            score++;
        }
    };
    document.getElementById("point").innerHTML = "Điểm của bạn: " + score;
}

// Khởi tjao lớp máy bay địch
function EnemyPlanes (toadox,toadoy,wEnemy,hEnemy) {
    this.image = new Image();
    this.image.src = "1942-1.png";
    this.dy = 0.5;
    this.toadox = toadox;
    this.toadoy = toadoy;
    this.wEnemy = wEnemy;
    this.hEnemy = hEnemy;
    this.getXCenter = function () {
        return this.toadox  ;
    };
    this.getYCenter = function () {
        return this.toadoy  ;
    };

    this.getWidthEnemy = function () {
        return this.wEnemy;
    };
    this.getHeightEnemy = function () {
        return this.hEnemy;
    };
    this.creatPlanesEnemy = function () {
        this.toadoy += this.dy;
        if (this.toadoy >= 500) {
            alert("GameOver")
        }
        canvas.drawImage(this.image,this.toadox,this.toadoy,this.wEnemy,this.hEnemy);
    }
}

// Khởi tạo lớp đạn địch:
function BulletEnemy (x,y,w,h){
    this.image = new Image();
    this.image.src = "bullet.png"
    this.bulletY = 0.3;
    this.bulletX = 0.3;
    this.bulletXEnemy = x;
    this.bulletYEnemy = y;
    this.bulletWEnemy = w;
    this.bulletHEnemy = h;
    this.getXBullet = function () {
        return this.bulletXEnemy;
    };
    this.getYBullet = function () {
        return this.bulletYEnemy;
    }
    this.creatEnemyBullet = function (df) {
            if (df.getXCenter() <= 250){
            this.bulletYEnemy += this.bulletY;
            this.bulletXEnemy += this.bulletX;
        }
        if (df.getXCenter() > 250) {
            this.bulletYEnemy += this.bulletY;
            this.bulletXEnemy -= this.bulletX;
        }
        canvas.drawImage(this.image,this.bulletXEnemy,this.bulletYEnemy,this.bulletWEnemy,this.bulletHEnemy);
        this.checkGameOver = function (planesenemy) {
            // let bullet_enemy_x = this.bulletXEnemy + this.bulletWEnemy / 2;
            // let bullet_enemy_y = this.bulletYEnemy + this.bulletHEnemy / 2;
            console.log(parseInt(planesenemy.getToaDoX()) , 1)
            console.log(parseInt(this.getXBullet()) , 2)
            // if ((planesenemy.getToaDoX()) === (this.getXBullet())) {
            //     alert('Game over')
            // }

            // if (Math.abs(planesenemy.getToaDoX() - bullet_enemy_x) < (planesenemy.getWidthMyPlanes() + this.bulletXEnemy) / 2
            // && Math.abs(planesenemy.getToaDoY() - bullet_enemy_y) <  (planesenemy.getHeightMyPlanes() + this.bulletYEnemy) / 2) {
            //     alert("Game Over")
            // }
        }

    }
;}




window.addEventListener("mousemove", moveMouse);
function drawAll() {
    canvas.clearRect(0, 0, 500, 500);
    for (let i = 0; i < bullet.length; i++) {
        bullet[i].creatBullet();
        for (let j = 0; j <enplanes.length ; j++) {
            bullet[i].checkDiem(enplanes[j]);

        }git add .constructor
    }
    planes.creatPlanes();
    for (let i = 0; i <enplanes.length; i++) {
        enplanes[i].creatPlanesEnemy();

    }
    for (let i = 0; i <bulletEnemy.length; i++) {
        bulletEnemy[i].creatEnemyBullet(enplanes[i]);
            bulletEnemy[i].checkGameOver(planes);


    }

}
// Tạo đối tượng máy bay địch;
function creatNewEnemy() {
    count++;
    let random = Math.floor(Math.random() * (500));
    enplanes[count] = new EnemyPlanes(random, -10,27,25)
}

// Bắn ra đạn:
function creatNewBullet() {
    number++;
    bullet[number] = new Bullet(planes.getToaDoX() ,planes.getToaDoY(),29,13)
}
// Địch phản công:
function creatBulletEnemy() {
    point++;
    bulletEnemy[point] = new BulletEnemy(enplanes[count].getXCenter(),enplanes[count].getYCenter(),6,6);
}

function startGame() {
    let random = Math.floor(Math.random() * (500));
    planes = new MyPlanes(200,200,29,18);
    bullet[number] = new Bullet(planes.getToaDoX(),planes.getToaDoY(),25,18);
    enplanes[count] = new EnemyPlanes(random, -10,27,25);
     bulletEnemy[point] = new BulletEnemy (enplanes[count].getXCenter(),enplanes[count].getYCenter(),6,6);


    setInterval(drawAll,parseFloat("0.001"));
    setInterval(creatNewBullet,300);
    setInterval(creatNewEnemy,1000);
    setInterval(creatBulletEnemy,1000);

}

function moveMouse(evt) {
    let canvas_x = evt.pageX -9;
    let canvas_y = evt.pageY -9;
    planes.toadoX = canvas_x -14;
    planes.toadoY = canvas_y - 9;
}

