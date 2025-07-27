const span = document.getElementById('score');
var msg = "着地した回数:" + 0;
function share() {
var url = window.location.href;
var shareText = `ウサギぴょんぴょんで${point}点を獲得したよ！\nみんなもやってみよう！\n${url}`;
var lineShareUrl = `https://line.me/R/msg/text/${encodeURIComponent(shareText)}`;
window.open(lineShareUrl, '_blank');
console.log('share');
}
var usagi;
var point = 0;
var g = 10;
var jump = false;
var a; 
const config = {
type: Phaser.WEBGL,
width: 800,
height: 600,
pixelArt: true,
parent: 'game',

scene: {
preload: preload,
create: create,
update: update
}
};
function save(){
localStorage.setItem('points', point.toString());
}
function load(){
point = parseInt(localStorage.getItem('points'), 10);
if (isNaN(point)) {
point = 0;
}
}
function preload(){
this.load.image('usagi', 'usagi.png');
}
function create(){
this.cameras.main.setBackgroundColor('#FFFFFF');
console.log(point);
const sh = document.getElementById('share');
sh.addEventListener('click', share);
load();
usagi = this.add.image(400, 500, 'usagi');

usagi.setInteractive();
console.log(usagi);
usagi.setScale(5);
usagi.on('pointerdown', () =>{
a = g;
jump = true;
});
}
function update(time, delta){
if (jump === true){
usagi.y -= a;
a -= 1;
if (usagi.y > 500){
a = 0;
console.log('着地！！')
jump = false;
usagi.y = 500;
point += 1;
console.log(point);
msg = "着地した回数:" + point;
span.innerText = msg;
save();
}
}
}
var game = new Phaser.Game(config);
