function myPlanes(image, hight, weight, size) {
    this.image = image;
    this.hight = hight;
    this.weight = weight;
    this.size = size;
    this.getWith = function () {
        return this.hight
    };
    this.getHeight = function () {
        return this.weight;
    };
    this.creatPlanes = function () {
        return '<img width="'+ this.size + '"' +
            ' height="'+ this.size + '"' +
            ' src="' + this.image +'"' +
            ' style="position:absolute;" />';
    }
}
let creatPlanes = document.getElementById("myCanvas").getContext("2d");
let planes = new myPlanes('planes.jpg', 100, 100, 15);
creatPlanes.drawImage(planes.creatPlanes(),0,0,planes.getWith(),planes.getHeight());
