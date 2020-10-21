const iLength = 3;
const jLength = 3;

let ground = new Array(iLength);

for (var i = 0; i < ground.length; i++) {
    ground[i] = new Array(jLength);
}

let isMoved = false;

function move() {
    this.right = function () {
        for (var i = 0; i < iLength; i++) {
            for (var j = jLength - 1; j > 0; j--) {
                var k = j - 1;
                while (k >= 0) {
                    if (ground[i][k] == 0) {
                        k--;
                        continue;
                    } else if (ground[i][k] == ground[i][j]) {
                        ground[i][j] = ground[i][k] + ground[i][j];
                        ground[i][k] = 0;
                        isMoved = true;
                    } else if (ground[i][j] == 0) {
                        ground[i][j] = ground[i][k];
                        ground[i][k] = 0;
                        isMoved = true;

                    } else {
                        break;
                    }
                    k--;
                }
            }
        }
    }

    this.left = function () {
        for (var i = 0; i < iLength; i++) {
            for (var j = 0; j < jLength - 1; j++) {
                var k = j + 1;
                while (k < jLength) {
                    if (ground[i][k] == 0) {
                        k++;

                        continue;
                    } else if (ground[i][k] == ground[i][j]) {
                        ground[i][j] = ground[i][k] + ground[i][j];
                        ground[i][k] = 0;
                        isMoved = true;
                    } else if (ground[i][j] == 0) {
                        ground[i][j] = ground[i][k];
                        ground[i][k] = 0;
                        isMoved = true;
                    } else {
                        break;
                    }
                    k++;
                }
            }
        }
    }

    this.down = function () {
        for (var j = 0; j < jLength; j++) {
            for (var i = iLength - 1; i > 0; i--) {
                var k = i - 1;
                while (k >= 0) {
                    if (ground[k][j] == 0) {
                        k--;
                        continue;
                    } else if (ground[k][j] == ground[i][j]) {
                        ground[i][j] = ground[k][j] + ground[i][j];
                        ground[k][j] = 0;
                        isMoved = true;
                    } else if (ground[i][j] == 0) {
                        ground[i][j] = ground[k][j];
                        ground[k][j] = 0;
                        isMoved = true;
                    } else {
                        break;
                    }
                    k--;
                }
            }
        }
    }

    this.up = function () {
        for (var j = 0; j < jLength; j++) {
            for (var i = 0; i < iLength - 1; i++) {
                var k = i + 1;
                while (k < iLength) {
                    if (ground[k][j] == 0) {
                        k++;
                        continue;
                    } else if (ground[k][j] == ground[i][j]) {
                        ground[i][j] = ground[k][j] + ground[i][j];
                        ground[k][j] = 0;
                        isMoved = true;
                    } else if (ground[i][j] == 0) {
                        ground[i][j] = ground[k][j];
                        ground[k][j] = 0;
                        isMoved = true;
                    } else {
                        break;
                    }
                    k++;
                }
            }
        }
    }
}


function Ground() {
    this.groundSquare = Math.ceil(((window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) - 200) / 100) * 100;
    this.table = document.getElementById("Table");
    this.colors = {
        '0': '#E5FFCC',
        '2': '#FFE5CC',
        '4': '#FFCC99',
        '8': '#FF9999',
        '16': '#FFB266',
        '32': '#FF6666',
        '64': '#FF9933',
        '128': '#FF3333',
        '256': '#FFFF00',
        '512': '#CC0000',
        '1024': '#66CC00',
        '2048': '#0000CC',
        '4096': '#CCFFFF'
    };

    this.setTable = function () {
        var mainBox = document.getElementById('main');
        mainBox.style.height = '' + this.groundSquare + 'px';
        mainBox.style.width = '' + this.groundSquare + 'px';

    }

    this.makeDiv = function (className, idName) {
        var div = document.createElement("div");
        div.className = className;
        div.id = idName;
        return div;
    }

    this.getColunm = function (i, j) {
        var div = this.makeDiv("Cell");
        div.id = i + "" + j;
        var p = document.createElement("h1");
        p.style.fontSize = ((this.groundSquare / 10) - 10) + 'px';
        div.appendChild(p);
        return div;
    }



    this.removeAllChild = function () {
        while (this.table.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
    }

    this.drawTable = function () {
        this.removeAllChild();
        this.setTable();
        for (var i = 0; i < iLength; i++) {
            var row = this.makeDiv("Row", i);
            this.table.appendChild(row);
            for (var j = 0; j < jLength; j++) {
                var colunm = this.getColunm(i, j);
                row.appendChild(colunm);
            }
        }
    }

    this.setNumber = function (i, j) {
        var element = document.getElementById(i + '' + j);
        element.firstChild.innerHTML = ground[i][j] == 0 ? ' ' : ground[i][j];
        element.style.backgroundColor = this.colors[ground[i][j]]
    }

    this.draw = function () {
        for (var i = 0; i < iLength; i++) {
            for (var j = 0; j < jLength; j++) {
                this.setNumber(i, j);
            }
            console.log("\n");
        }
    }

    this.addNewElement = function () {
        if (isMoved) {
            var posi = Math.floor(Math.random() * iLength);
            var posj = Math.floor(Math.random() * jLength);
            while (ground[posi][posj] != 0) {
                posi = Math.floor(Math.random() * iLength);
                posj = Math.floor(Math.random() * jLength);
            }

            ground[posi][posj] = 2;
        }
    }

    this.fillRough = function () {
        var posi = Math.floor(Math.random() * iLength);
        var posj = Math.floor(Math.random() * jLength);
        var posi2 = Math.floor(Math.random() * iLength);
        var posj2 = Math.floor(Math.random() * jLength);


        for (var i = 0; i < iLength; i++) {
            for (var j = 0; j < jLength; j++) {
                ground[i][j] = 0;
            }
        }

        ground[posi][posj] = 2;
        ground[posi2][posj2] = 2;


    }

    this.highScore = function () {
        var sum = 0;
        for (var i = 0; i < iLength; i++) {
            for (var j = 0; j < jLength; j++) {
                sum += ground[i][j];
            }
        }
        return sum;
    }

    this.putScore = function () {
        var score = document.getElementById('score');
        score.innerHTML = this.highScore();
    }

    this.draw2 = function () {
        console.log(JSON.stringify(ground));
        console.log("height :" + this.groundSquare + "block size:" + Math.floor((this.groundSquare / 9)));
    }

    this.isgameOver = function () {
        var checkGame = true;
        for (var i = 0; i < iLength; i++) {
            for (var j = 0; j < jLength; j++) {
                if (ground[i][j] == 0) {
                    checkGame = false;
                }
            }
        }

        if (checkGame) {
            for (var i = 0; i < iLength; i++) {
                for (var j = 1; j < jLength; j++) {
                    if (ground[i][j] == ground[i][j - 1]) {
                        checkGame = false;
                        break;
                    }
                }
                if (!checkGame) {
                    break;
                }
            }
        }

        if (checkGame) {
            for (j = 0; j < jLength; j++) {
                for (i = 1; i < iLength; i++) {
                    if (ground[i][j] == ground[i - 1][j]) {
                        checkGame = false;
                        break;
                    }
                }
                if (!checkGame) {
                    break;
                }
            }
        }
        return checkGame;
    }
}


function userMove(e) {
    if (!background.isgameOver()) {
        switch (e.keyCode) {
            case 38: {
                moves.up();
                break;
            }
            case 40: {
                moves.down();
                break;
            }
            case 39: {
                moves.right();
                break;
            }
            case 37: {
                moves.left();
                break;
            }

        }
        if (isMoved) {
            background.putScore();
            background.addNewElement();
            background.draw();
            isMoved = false;
        }
    } else {

        background.table.style.backgroundColor = "white";
        background.table.innerHTML = "game over";

    }
}

document.onkeydown = userMove;


let background = new Ground();
let moves = new move();
background.fillRough();
background.drawTable();
background.draw();
