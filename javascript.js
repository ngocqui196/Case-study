let img = document.getElementById("myCanvas").getContext("2d");
let planes = {};
let bullet = [];
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

window.addEventListener("mousemove", moveMouse);
function drawAll() {
    img.clearRect(0,0,535,380);
    for (let i = 0; i < bullet.length; i++) {
        bullet[i].creatBullet();
    }
    planes.creatPlanes();
}
// Bắn ra đạn:
function creatNewBullet() {
    count++;
    bullet[count] = new Bullet(planes.getToaDoX() ,planes.getToaDoY(),29,13)
}
function startGame() {
    planes = new MyPlanes(200,200,29,18);
    let moveright = planes.getToaDoX() + 20;
    bullet[count] = new Bullet(moveright,planes.getToaDoY(),25,18);
    setInterval(drawAll,parseFloat("0.001"));
    setInterval(creatNewBullet,100);


}

function moveMouse(evt) {
    let canvas_x = evt.pageX -9;
    let canvas_y = evt.pageY -9;
    planes.toadoX = canvas_x -14;
    planes.toadoY = canvas_y - 9;
}
