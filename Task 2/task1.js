let timeStorage = localStorage
let time

if (timeStorage.getItem("time") != null) {
    time = parseInt(timeStorage.getItem("time")) 
}
else {
    time = 300
    timeStorage.setItem("time", time)
}

console.log(time)
let answer = [
    ["harry potter", "гарі поттер"],
    ["губка боб", "sponge bob"],
    ["pirates of the caribbean", "пірати карибського моря"],
    ["сімпсони", "the simpsons"],
    ["зоряні війни", "star wars"],
    ["lion king", "король лев"],
    ["холодне серце", "frozen"],
    ["shrek", "шрек"],
    ["shrek", "шрек"],
    ["роккі", "rocky"],
    ["індіанна джонс", "indiana jones"],
    ["один вдома", "home alone"],
    ["термінатор", "terminator"],
    ["назад у майбутнє", "back to the future"],
    ["мисливці за привидами", "ghost busters"] 
];

let num = Math.floor(1 + Math.random() * 15) 
console.log(num)
let progress = 0
let was = []

$(document).ready(function () {
    $(".time").knob({
        'min':0,
        'max':300,
        'angleOffset': 0,
        'angleArc': 360,
        'readOnly': true
    })
    $(".progress").knob({
        'min':0,
        'max':5,
        'angleOffset': -60,
        'angleArc': 120,
        'readOnly': true
    })
    $(".slideRules").click(function(){
        $("#rules").slideToggle()
    })

    $("#start").click(function(){
        $("#start").css("display", "none")
        $(".sounds").css("display", "block")
        startRebus(num)
        starTime()        
    })
    
    
    $("#btnTask1").click(function(){
        if(answer[num - 1].indexOf($("#inputTask1").val().toLowerCase()) != -1){
            $("#inputTask1").val("")
            progress++
            $(".progress").val(progress).trigger("change")
            was.push(num)
            console.log(was)
            if (progress < 5) {
                do {
                    num = Math.floor(1 + Math.random() * 12) 
                }
                while (was.includes(num))
                console.log(num)
                startRebus(num)
            }
            else {
                $(".img, #btnTask1, #inputTask1").css({
                    'display': 'none'
                })
                $("#nextTask").css({
                    'display':'flex'
                })
            }
        }
        else {
           alertify.error("Try again") 
        }
    })
});

function startRebus(arg) {
    $("#mel").attr("src", `sound/${arg}.mp3`)
}
function starTime() {
    setInterval(function(){
        time = parseInt(localStorage.getItem("time")) - 1
        $(".time").val(time).trigger("change")
        if (time == 0) {
            alert("Time out")
            setTimeout(()=> window.open("../Task 1/task1.html", "_self", false), 2000)
            localStorage.removeItem("time")
        }
        else if (time > 0){
           localStorage.setItem("time", time) 
        }
    }, 1000)
}