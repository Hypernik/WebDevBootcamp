var randomNumber1 = Math.ceil(Math.random()*6);
document.getElementsByClassName("img1")[0].setAttribute("src", "images/dice" + randomNumber1 + ".png");
var randomNumber2 = Math.ceil(Math.random()*6);
document.getElementsByClassName("img2")[0].setAttribute("src", "images/dice" + randomNumber2 + ".png");
var heading = "";
if(randomNumber1>randomNumber2){
    heading = "Player 1 wins!";
}else if(randomNumber1===randomNumber2){
    heading = "Its a tie!";
}else{
    heading = "Player 2 wins!";
}
document.querySelector("h1").innerText = heading;