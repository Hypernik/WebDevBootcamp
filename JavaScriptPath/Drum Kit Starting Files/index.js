var drums = document.getElementsByClassName("drum");
for (const drum of drums) {
    drum.addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;
        playSound(buttonInnerHTML);
        btnAnimation(buttonInnerHTML);
    });
}

document.addEventListener("keydown", function name(event) {
    playSound(event.key);
    btnAnimation(event.key);
});

function playSound(key){
    var sound = "";
        switch (key) {
            case "w":
                sound = "tom-1";
                break;
            case "a":
                sound = "tom-2";
                break;
            case "s":
                sound = "tom-3";
                break;
            case "d":
                sound = "tom-4";
                break;
            case "j":
                sound = "snare";
                break;
            case "k":
                sound = "crash";
                break;
            case "l":
                sound = "kick-bass";
                break;
            default:
                sound = "";
                break;
        }
        if (sound.length>0) {
            var bdm = new Audio("sounds/" + sound + ".mp3");
            bdm.play();
        }
}

function btnAnimation(currentKey){
    if(currentKey in ['a','w','s','d','j','k','l']){
        var activeBtn = document.querySelector("." + currentKey);
        activeBtn.classList.add("pressed");
        setTimeout(function () {
            activeBtn.classList.remove("pressed");
        }, 100);
    }
}