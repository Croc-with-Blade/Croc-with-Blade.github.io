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
var r1 = 0.1, r2 = 0.1, r3 = 0.1;
var runTimer = 0.001;
var finalTime = 0;
var bestTimes = [];
var difficulty = 5;
var length;

var storedTimes = new Array(3);
var bestTimes = new Array(3);

for (var i = 0; i < 3; i++) {
  storedTimes[i] = new Array(5);
  bestTimes[i] = new Array(5);
}




storedTimes = JSON.parse(localStorage.getItem("bestTimes"));



document.getElementById("easy").addEventListener("click", easyClick);
document.getElementById("moderate").addEventListener("click", moderateClick);
document.getElementById("hard").addEventListener("click", hardClick);

function easyClick() {
  this.style.backgroundColor = "#3e8e41";
  difficulty = 0;
  document.getElementById("container").addEventListener("click", handleClick);
  document.getElementById("container").innerHTML = "<h1 id='title'><a href='#'>Click here to Start!</a></h1>";

  document.getElementById("easy").removeEventListener("click", easyClick);
  document.getElementById("moderate").removeEventListener("click", moderateClick);
  document.getElementById("hard").removeEventListener("click", hardClick);

  if (storedTimes === null) {

  } else {
    bestTimes = storedTimes;
    length = bestTimes[0].length;
    document.getElementById("best-time").innerHTML = "<h3>Best Time:</h3>";
    for (let j = 0; j < length; j++) {
        if(bestTimes[difficulty][j] === null){

        }
        else {
          document.getElementById("best-time").innerHTML += "<h5>" + bestTimes[difficulty][j] + " s</h5>";
        }


    }

  }

}

function moderateClick() {
  this.style.backgroundColor = "#FFA500";
  difficulty = 1;
  document.getElementById("container").addEventListener("click", handleClick);
  document.getElementById("container").innerHTML = "<h1 id='title'><a href='#'>Click here to Start!</a></h1>";
  document.getElementById("easy").removeEventListener("click", easyClick);
  document.getElementById("moderate").removeEventListener("click", moderateClick);
  document.getElementById("hard").removeEventListener("click", hardClick);

  if (storedTimes === null) {

  } else {
    bestTimes = storedTimes;
    length = bestTimes[1].length;
    document.getElementById("best-time").innerHTML = "<h3>Best Time:</h3>";
    for (let j = 0; j < length; j++) {
        if(bestTimes[difficulty][j] === null){

        }
        else {
          document.getElementById("best-time").innerHTML += "<h5>" + bestTimes[difficulty][j] + " s</h5>";
        }


    }
  }
}

function hardClick() {
  this.style.backgroundColor = "red";
  difficulty = 2;
  document.getElementById("container").addEventListener("click", handleClick);
  document.getElementById("container").innerHTML = "<h1 id='title'><a href='#'>Click here to Start!</a></h1>";
  document.getElementById("easy").removeEventListener("click", easyClick);
  document.getElementById("moderate").removeEventListener("click", moderateClick);
  document.getElementById("hard").removeEventListener("click", hardClick);

  if (storedTimes === null) {

  } else {
    bestTimes = storedTimes;
    length = bestTimes[2].length;
    document.getElementById("best-time").innerHTML = "<h3>Best Time:</h3>";
    for (let j = 0; j < length; j++) {
        if(bestTimes[difficulty][j] === null){

        }
        else {
          document.getElementById("best-time").innerHTML += "<h5>" + bestTimes[difficulty][j] + " s</h5>";
        }


    }
  }
}


function handleClick() {

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
            bestTimes[difficulty].push(finalTime);
            document.getElementById("best-time").innerHTML = "<h3>Best Time:</h3>";
            localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
          } else {
            bestTimes = storedTimes;
            bestTimes[difficulty].push(finalTime);
            length = bestTimes[difficulty].length;
            bestTimes[difficulty].sort(function(a, b) {
              return a - b
            });
            localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
            document.getElementById("best-time").innerHTML = "<h3>Best Time:</h3>";
            for (let j = 0; j < length; j++) {
                if(bestTimes[difficulty][j] === null){

                }
                else {
                  document.getElementById("best-time").innerHTML += "<h5>" + bestTimes[difficulty][j] + " s</h5>";
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
    if(difficulty === 0) {
      if (value <= 20 && value === order) {
        playSound("click");
        num = value + 20;
        this.innerHTML = "<p>" + num + "</p>";
        this.style.backgroundColor = "rgba(0, 255, 0," + r1 + ")";
        this.style.color = "white";
        order++;
        r1 += 0.05;
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
    else if (difficulty === 1) {
      if (value <= 20 && value === order) {
        playSound("click");
        num = value + 20;
        this.innerHTML = "<p>" + num + "</p>";
        this.style.backgroundColor = "rgba(0, 255, 0," + r1 + ")";
        this.style.color = "white";
        order++;
        r1 += 0.05;
      } else if (value <= 40 && value > 20 && value === order) {
        playSound("click");
        num = value + 20;
        this.innerHTML = "<p>" + num + "</p>";
        this.style.backgroundColor = "rgba(255,165,0," + r2 + ")";
        this.style.color = "white";
        order++;
        r2 += 0.05;
      } else if (value < 60 && value > 40 && value === order) {
        playSound("click");
        this.style.backgroundColor = "black";
        this.style.color = "black";
        order++;
      }else if (value === 60) {
        playSound("bell");
        running = value;
        for (i = 0; i < 20; ++i) {
          document.getElementById("block" + i).style.display = "none";

        }
      }
    }
    else if (difficulty === 2
    ) {
      if (value <= 20 && value === order) {
        playSound("click");
        num = value + 20;
        this.innerHTML = "<p>" + num + "</p>";
        this.style.backgroundColor = "rgba(0, 255, 0," + r1 + ")";
        this.style.color = "white";
        order++;
        r1 += 0.05;
      } else if (value <= 40 && value > 20 && value === order) {
        playSound("click");
        num = value + 20;
        this.innerHTML = "<p>" + num + "</p>";
        this.style.backgroundColor = "rgba(255,165,0," + r2 + ")";
        this.style.color = "white";
        order++;
        r2 += 0.05;
      } else if (value <= 60 && value > 40 && value === order) {
        playSound("click");
        num = value + 20;
        this.innerHTML = "<p>" + num + "</p>";
        this.style.backgroundColor = "rgba(255,0,0," + r3 + ")";
        this.style.color = "white";
        order++;
        r3 += 0.05;
      }else if (value < 80 && value > 60 && value === order) {
        playSound("click");
        this.style.backgroundColor = "black";
        this.style.color = "black";
        order++;
      }else if (value === 80) {
        playSound("bell");
        running = value;
        for (i = 0; i < 20; ++i) {
          document.getElementById("block" + i).style.display = "none";

        }
      }
    }


  }

}
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
