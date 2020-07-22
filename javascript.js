let img = document.getElementById("myCanvas").getContext("2d");
img.width = 500;
img.height = 500;

let planes = {};
let enplanes = [];
let bullet = [];
let number = 0;
let count = 0;
let score = 0;
// Khởi tạo lớp máy bay của người chơi;
function MyPlanes(toaDoX,toaDoY,width,height) {
    this.image = new Image();
    this.image.src = "planes.jpg";
    this.toadoX = toaDoX;
    this.toadoY = toaDoY;
    this.width = width;
    this.height = height;
    this.getToaDoX = function () {
        return this.toadoX;
    };
    this.getToaDoY = function () {
        return this.toadoY;
    };
    this.creatPlanes = function () {
        img.drawImage(this.image,this.toadoX,this.toadoY,this.width,this.height)
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
        img.drawImage(this.image,this.x,this.y,this.w,this.h);
    };
    this.checkDiem =function (enplanet) {
        let bullet_x = this.x + this.w / 2;
        let bullet_y = this.y + this.h / 2;
        if ( Math.abs(enplanet.getXCenter() - bullet_x) < (enplanet.getWidthEnemy() + this.w) / 2
        &&  Math.abs(enplanet.getYCenter() - bullet_y) < enplanet.getHeightEnemy() + this.h / 2) {
            this.y = -100;
            enplanet.toadoy = 2000;
            score++;
        }

    };

}

// Khởi tjao lớp máy bay địch
function EnemyPlanes (toadox,toadoy,wEnemy,hEnemy) {
    this.image = new Image();
    this.image.src = "1942-1.png";
    this.dy = 0.1;
    this.toadox = toadox;
    this.toadoy = toadoy;
    this.wEnemy = wEnemy;
    this.hEnemy = hEnemy;
    this.getXCenter = function () {
        return this.toadox+this.wEnemy/2;
    };
    this.getYCenter = function () {
        return this.toadoy + this.hEnemy/2;
    };
    this.getXEnemy = function () {
        return this.toadox;
    };
    this.getYEnemy = function () {
        return this.toadoy;
    };
    this.getWidthEnemy = function () {
        return this.wEnemy;
    };
    this.getHeightEnemy = function () {
        return this.hEnemy;
    };
    this.creatPlanesEnemy = function () {
        this.toadoy += this.dy;
        img.drawImage(this.image,this.toadox,this.toadoy,this.wEnemy,this.hEnemy);
    }
}

window.addEventListener("mousemove", moveMouse);
function drawAll() {
    img.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bullet.length; i++) {
        bullet[i].creatBullet();
        for (let j = 0; j <enplanes.length ; j++) {
            bullet[i].checkDiem(enplanes[j]);
        }
    }
    planes.creatPlanes();
    for (let j = 0; j <enplanes.length; j++) {
        enplanes[j].creatPlanesEnemy();
        bullet[number].checkDiem(enplanes[j])
    }

}
// Tạo đối tượng máy bay địch;
function creatNewEnemy() {
    count++;
    let random = Math.floor(Math.random() * (canvas.width));
    enplanes[count] = new EnemyPlanes(random, -10,27,25)
}

// Bắn ra đạn:
function creatNewBullet() {
    number++;
    bullet[number] = new Bullet(planes.getToaDoX() ,planes.getToaDoY(),29,13)
}

function startGame() {
    planes = new MyPlanes(200,200,29,18);
    bullet[number] = new Bullet(planes.getToaDoX(),planes.getToaDoY(),25,18);
    let random = Math.floor(Math.random() * (canvas.width));
    enplanes[count] = new EnemyPlanes(random, -10,27,25);
    setInterval(drawAll,parseFloat("0.001"));
    setInterval(creatNewBullet,300);
    setInterval(creatNewEnemy,1000);
}

function moveMouse(evt) {
    let canvas_x = evt.pageX -9;
    let canvas_y = evt.pageY -9;
    planes.toadoX = canvas_x -14;
    planes.toadoY = canvas_y - 9;
}