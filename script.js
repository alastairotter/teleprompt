 var w = window.innerWidth; 
    var tWidth = $(".tele").width(); 
//    console.log(tWidth);
    $(".tele").css("margin-left", (w - tWidth) / 2 + "px");
    
    
    if(localStorage.tpScript) { 
        var start = false;
        var script = localStorage.tpScript;
    }
    else { 
        var start = true;
        var script = "Click here to add script ...";
    }

    var start = true;
    var speed = 100;
    var increment = 3;
    var pause = true;
    var prevInc;
    if(start === true) { 
        var fontSize = 16; 
    }
    else { 
        var fontSize = 40;
        }
    var interval; 
    var text = false; 

    $(".text-input").css("margin-left", window.innerWidth / 2 - 400 + "px")
    
    $(".inner-speed").text(increment)
    
    var startY = y = window.innerHeight - 350; 
    
    $(".tele").css("top", y).css("font-size", fontSize)
    
    
   function play () {  
    
    interval = setInterval( function () { 
//        $(".tele").css("top", y);
        $(".tele").animate({"top": y}, speed)
        y -= increment; 
//        console.log(speed);
    }, speed)
                     
        }
    
    
    var updateSpeed = function () { 
        $(".inner-speed").text(increment);
    }
    
    
    $(document).on("keypress", function (e) {
//        console.log(e);
        if(e.which === 93) { increment = increment + 1; updateSpeed();  } // speed
        if(e.which === 91) { increment = increment - 1; updateSpeed(); } // speed
        if(e.which === 112 && pause == false) {  // pause
            clearInterval(interval);  
            pause = true; 
            $(".fa-pause").removeClass("inactive").addClass("active"); 
            $(".fa-play").removeClass("active").addClass("inactive"); }
        
        else if (e.which === 112 && pause == true) { // play
            play();  
            pause = false;  
            $(".fa-play").removeClass("inactive").addClass("active"); 
            $(".fa-pause").removeClass("active").addClass("inactive");
                                                   }
        
        // fonts
        if(e.which === 61) { fontSize += 1; $(".tele").css("font-size", fontSize)}
        if(e.which === 45) { fontSize -= 1; $(".tele").css("font-size", fontSize)}
        
        // restart
        if(e.which === 114) { 
            clearInterval(interval);
            pause = true; 
            y = startY;
            $(".tele").animate({"top": startY}, 2000);
            $(".fa-pause").removeClass("inactive").addClass("active"); 
            $(".fa-play").removeClass("active").addClass("inactive"); 
        }
        
       
        
        
    });
    
    
    
    // controls
    
    $(".fa-play").click( function () { 
        play(); 
        $(".fa-play").addClass("active").removeClass("inactive"); 
        $(".fa-pause").addClass("inactive").removeClass("active");
    } 
       ); 
    $(".fa-pause").click( function () { 
        clearInterval(interval);
        $(".fa-play").addClass("inactive").removeClass("active");
        $(".fa-pause").addClass("active").removeClass("inactive");
    })



// vue

    var myApp = new Vue({ 
        el: "#myApp",
        data: { 
            content: ""
            
        },
        methods: {
            saveScript: function () { 
            
                console.log(this.content)
                
            }
            
        }
        
    })
    
    

    
    
// script input
    $(".tele").click( function () { 
        if(start === true) { 
            $(".tele").text("").removeClass("tele-inactive").css("font-size", "40px");
            start = false;
        }
    })
    
    






// save
setInterval( function () { 
    
  myApp.saveScript();
    
}, 1000);

// Store

//var stored = true; 
//if(stored === true) { 
//localStorage.lastname = "Alastair Otter";
//}
// Retrieve
//document.getElementById("result").innerHTML = localStorage.lastname;