let kw = 0;
let hr = 0;
let qt = 0;
let time = "k";
let timeb = "k";
let good = true;

function off() {
    document.getElementById("body").style.opacity = "1";
    document.getElementById("body").style.backgroundImage = "url(/static/images/wall.jpg)";
    playSound();
    getSunsetTime();
}
function playSound() {
    document.getElementById("clickSound").play();
  }

function selected(image, yearlykW) {
    playSound();
    kw = yearlykW;
    answer();
      document.querySelectorAll("#unselected").forEach(img => {
          img.style.opacity = "0.5";
    image.style.opacity = "1";
    });
}

function answer(){
    good = true;
    if (kw == 0  || qt == 0 || hr == 0){
        document.getElementById("answer1").style.animation = "fadeintext 2s forwards";
        document.getElementById("answer1").textContent = "Please fill all the information above.";
        return;
    }
    document.getElementById("answer1").style.animation = "fadeintext 2s forwards";
    document.getElementById("answer1").textContent = "You spend " + (kw/8 * hr * 16 / 100 * qt) + " dollars per year on this lightbulb.";
    document.getElementById("answer2").style.animation = "fadeintext 4s forwards";
    document.getElementById("answer3").style.animation = "fadeintext 6s forwards";
    if (hr > (22-timeb)){
        good = false;
        document.getElementById("answer2").textContent = "Since the sun sets at " + time + " in your area. Assuming you go to sleep at 10pm, your lights should only be on for " + (22 - timeb) + " hours.";
    }
    else{
        document.getElementById("answer2").textContent = "You are using your lights for the apporiate amount of time. Keep up the good work!";    
    }
    if (kw != 22){
        good = false;
    document.getElementById("answer3").textContent = "You can also switch to a more energy efficient lightbulb like the LED lightbulb to save money and the environment.";
    }
    else{
    document.getElementById("answer3").textContent = "You are already doing great by using LED lightbulbs!";
    }
if (good == true){
    document.getElementById("answer4").style.animation = "fadeintext 8s forwards";
    document.getElementById("answer4").textContent = "There are no tips for you at the moment. You are doing your part!";
    document.getElementById("answer5").textContent = " ";
}
else{
    document.getElementById("answer4").style.animation = "fadeintext 8s forwards";
    document.getElementById("answer4").textContent = "If you were to change your habits like using your lights less or switching to LED lightbulbs, you could save money and the environment.";
    document.getElementById("answer5").style.animation = "fadeintext 8s forwards";
    document.getElementById("answer5").textContent = "Instead of what you are currently doing, you could be saving " + (((107/8 * (22-timeb) *16 / 100 * qt) - (kw/8 * hr * 16 / 100 * qt)).toFixed(2)) + " dollars per year.";
}
}

function hrchange(inp)
{
   hr = document.getElementById("hours").value;
   answer();
}

function qtchange(inp)
{
    qt = document.getElementById("qt").value;
    answer();
}
function tanswer(txt){
    document.getElementById("answer1").style.animation = "fadeintext 2s forwards";
    document.getElementById("answer1").textContent = txt;
}
function getSunsetTime() {
    // Step 1: Get user's geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            
            // Step 2: Fetch sunset time from Sunrise-Sunset API
            fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === "OK") {
                        let sunsetUTC = new Date(data.results.sunset);
                        
                        // Step 3: Convert to local time
                        let sunsetLocal = sunsetUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        
                        console.log("Sunset Time:", sunsetLocal);
                        time = sunsetLocal;
                        timeb = sunsetUTC.getHours();
                    } else {
                        console.error("Failed to fetch sunset time.");
                    }
                })
                .catch(error => console.error("Error fetching data:", error));
        }, error => console.error("Geolocation Error:", error.message));
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// Call the function