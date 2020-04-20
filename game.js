function shuffle(arra1) {
  var ctr = arra1.length,
    temp, index;

  while (ctr > 0) {

    index = Math.floor(Math.random() * ctr);

    ctr--;

    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

var myArray1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var layer = shuffle(myArray1);
var order = 1;
var running = 0;
var r = 0.1;
var runTimer = 0.001;
var finalTime = 0;
var bestTimes = [];


var storedTimes = JSON.parse(localStorage.getItem("bestTimes"));

if (storedTimes === null) {

} else {
  bestTimes = storedTimes;
  var length = bestTimes.length;
  document.getElementById("best-time").innerHTML = "<h3>Best Time:</h3>";
  if (length <= 5) {
    for (let j = 0; j < length; j++) {
      document.getElementById("best-time").innerHTML += "<h5>" + bestTimes[j] + " s</h5>";
    }
  } else {
    for (let j = 0; j < 5; j++) {
      document.getElementById("best-time").innerHTML += "<h5>" + bestTimes[j] + " s</h5>";
    }
  }
}




document.getElementById("container").addEventListener("click", handleClick);



function handleClick() {
  const container = document.getElementById("container");

  function endCountdown() {
    for (let i = 0; i < 20; ++i) {
      const button = document.createElement("div");
      container.appendChild(button);
      button.innerHTML = "<p>" + layer[i] + "</p>";
      button.id = "block" + i;
      document.getElementById("block" + i).addEventListener("click", clicked);
    }
  }

  function clicked() {

    var value = parseInt(this.textContent);
    animatePress(this.id);

    if (value <= 20 && value === order) {
      playSound("click");
      num = value + 20;
      this.innerHTML = "<p>" + num + "</p>";
      this.style.backgroundColor = "rgba(0, 255, 0," + r + ")";
      this.style.color = "white";
      order++;
      r += 0.05;
    } else if (value < 40 && value > 20 && value === order) {
      playSound("click");
      this.style.backgroundColor = "black";
      this.style.color = "black";
      order++;
    } else if (value === 40) {
      playSound("bell");
      running = value;
      for (i = 0; i < 40; ++i) {
        document.getElementById("block" + i).style.display = "none";

      }
    }



  }

  var count = 3;
  var countDown = setInterval(function() {
    if (count === 0) {
      clearInterval(countDown);
      document.getElementById("container").innerHTML = "";
      endCountdown();
      running = 1;
      var timer = setInterval(function() {
        if (running === 1) {
          runTimer += 0.01;
          document.getElementById("Timer").innerHTML = "<h3>Timer:</h3><h4>" + runTimer + "</h4>";
        } else {
          finalTime = runTimer.toFixed(3);


          storedTimes = JSON.parse(localStorage.getItem("bestTimes"));

          if (storedTimes === null) {
            bestTimes.push(finalTime);
            document.getElementById("best-time").innerHTML = "<h3>Best Time:</h3>";
            localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
          } else {
            bestTimes = storedTimes;
            bestTimes.push(finalTime);
            length = bestTimes.length;
            bestTimes.sort(function(a, b) {
              return a - b
            });
            localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
            document.getElementById("best-time").innerHTML = "<h3>Best Time:</h3>";
            if (length <= 5) {
              for (let j = 0; j < length; j++) {
                document.getElementById("best-time").innerHTML += "<h5>" + bestTimes[j] + " s</h5>";
              }
            } else {
              for (let j = 0; j < 5; j++) {
                document.getElementById("best-time").innerHTML += "<h5>" + bestTimes[j] + " s</h5>";
              }
            }
          }




          document.getElementById("Timer").innerHTML = "<h3>Timer:</h3><h4>" + finalTime + " s</h4>";
          document.getElementById("container").innerHTML = "<h1> Your time: " + finalTime + " s</h1>";
          clearInterval(timer);
        }

      }, 10);
    } else {
      document.getElementById("container").removeEventListener("click", handleClick);
      document.getElementById("container").innerHTML = "<h1>" + count + "</h1>";
      playSound("count");
      count--;
    }
  }, 1000);


}

document.getElementById("new-game").addEventListener("click", function(){
  playSound("newgame");
});



function animatePress(currentColor) {
  document.getElementById(currentColor).classList.add("pressed");
  setTimeout(function () {
    document.getElementById(currentColor).classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
