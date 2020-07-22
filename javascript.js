let canvas =document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let img = document.getElementById("myCanvas").getContext("2d");
let planes = {};
let enplanes = [];
let bullet = [];
let number = 0;
let count = 0;
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
    }
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
    }
    planes.creatPlanes();
    for (let i = 0; i <enplanes.length; i++) {
        enplanes[i].creatPlanesEnemy();
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
    setInterval(creatNewBullet,100);
    setInterval(creatNewEnemy,1500);

}

function moveMouse(evt) {
    let canvas_x = evt.pageX -9;
    let canvas_y = evt.pageY -9;
    planes.toadoX = canvas_x -14;
    planes.toadoY = canvas_y - 9;
}