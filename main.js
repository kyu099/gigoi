const ctx = canvas.getContext("2d");
const share = document.getElementById("sharebutton");

let silverPlayers = [-1, -1, -1, -1];
let goldPlayers = [-1, -1, -1, -1];
let waiting = [];

function countSilverPlayers() {
    let x = 0;
    for (let i = 0; i < silverPlayers.length; i++){
        x += silverPlayers[i];
    }
    return x;
}

function countGoldPlayers(){
    let x = 0;
    for (let i = 0; i < goldPlayers.length; i++){
        x += goldPlayers[i];
    }
    return x;
}

//バツ印を描画する関数
function drawCross(x, y, size, ctx) {
    ctx.beginPath();
    ctx.moveTo(x-size, y-size+size/10);
    ctx.lineTo(x-size+size/10, y-size);
    ctx.lineTo(x+size, y+size-size/10);
    ctx.lineTo(x+size-size/10, y+size);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x+size-size/10, y-size);
    ctx.lineTo(x+size, y-size+size/10);
    ctx.lineTo(x-size+size/10, y+size);
    ctx.lineTo(x-size, y+size-size/10);
    ctx.closePath();
    ctx.fill();
}

function draw(ctx) {
    ctx.fillStyle = "#006CDC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 180, 120);
    ctx.fillRect(0, 125, 180, 120);
    ctx.fillRect(0, 250, 180, 120);
    ctx.fillRect(0, 375, 180, 120);
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 500, 180, 120);
    ctx.fillRect(0, 625, 180, 120);
    ctx.fillRect(0, 750, 180, 120);
    ctx.fillRect(0, 875, 180, 120);
    ctx.fillStyle = "red"
    
    if(silverPlayers[0] == 1){
        drawCross(150, 60, 50, ctx);
    }
    if(silverPlayers[1] == 1){
        drawCross(150, 60 + 125, 50, ctx);  
    }
    if(silverPlayers[2] == 1){
        drawCross(150, 60 + 125 * 2, 50, ctx);
    }
    if(silverPlayers[3] == 1){
        drawCross(150, 60 + 125 * 3, 50, ctx);
    }
    if(goldPlayers[0] == 1){
        drawCross(150, 60 + 125 * 4, 50, ctx);
    }
    if(goldPlayers[1] == 1){
        drawCross(150, 60 + 125 * 5, 50, ctx);
    }
    if(goldPlayers[2] == 1){
        drawCross(150, 60 + 125 * 6, 50, ctx);
    }
    if(goldPlayers[3] == 1){
        drawCross(150, 60 + 125 * 7, 50, ctx);
    }

    for(i = 0; i < waiting.length; i++) {
        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath();
        ctx.arc(waiting[i].x, waiting[i].y, 60, 0, 360 * Math.PI / 180, false);
        ctx.fill();
    }
    ctx.fillStyle = "white"
    ctx.font = '64px sans-serif';
    ctx.fillText("シルバー空き", 200, 820);
    ctx.fillText("：" + String((4 - countSilverPlayers())/2), 570, 820);
    ctx.fillText("ゴールド空き", 200, 900);
    ctx.fillText("：" + String((4 - countGoldPlayers())/2), 570, 900);
    ctx.fillText("待ち", 455, 980);
    ctx.fillText("：" + String(waiting.length), 570, 980);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

draw(ctx);

canvas.addEventListener("click", (e) => {
    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = e.clientY - canvas.getBoundingClientRect().top;
    if(x < 200){
        if(y < 120) {silverPlayers[0] = -silverPlayers[0];}
        if(y > 125 && y < 245) {silverPlayers[1] = -silverPlayers[1];}
        if(y > 250 && y < 370) {silverPlayers[2] = -silverPlayers[2];}
        if(y > 375 && y < 495) {silverPlayers[3] = -silverPlayers[3];}
        if(y > 500 && y < 620) {goldPlayers[0] = -goldPlayers[0];}
        if(y > 625 && y < 745) {goldPlayers[1] = -goldPlayers[1];}
        if(y > 750 && y < 870) {goldPlayers[2] = -goldPlayers[2];}
        if(y > 875 && y < 995) {goldPlayers[3] = -goldPlayers[3];}
    } else {
        waiting.push({x: x, y: y});
    }
    draw(ctx);
    //console.log(x, y, waiting.length);
}, false);

share.onclick = () => {
    let text ="";
    let now = new Date();
    text = `#Gi恋情報
#ゴギガガガGiGO
${now.getHours()}時${now.getMinutes()}分
チュウニズム
シルバー空き${(4-countSilverPlayers())/2}
ゴールド空き${(4-countGoldPlayers())/2}
待ち${waiting.length}
Gi恋情報共有はこちらから！
↓ ↓ ↓
https://kyu099.github.io/gigoi/`

    const cvs = document.getElementById("canvas");

    cvs.toBlob(function(blob) {
        const image = new File([blob], "tmp.png", {type: "image/png"});
        navigator.share({
            text: decodeURI(text),
            files: [image]
        }).then(() => {
            console.log("Share was successful.");
        }).catch((error) => {
            console.log("Sharing failed", error);
        });
    });
}