var start, fontSize, interval, prevInc, script, increment, fontSize;

var updateSpeed = function () { 
        $(".inner-speed").text(increment);
    }
var updateFont = function () { 
    $(".inner-font").text(fontSize);
    $(".tele").css("font-size", fontSize);
}


var w = window.innerWidth; 
    var tWidth = $(".tele").width(); 

    $(".tele").css("margin-left", (w - tWidth) / 2 + "px");
    
    
    if(localStorage.teleScript) { 
        start = false;
        script = localStorage.teleScript;
        increment = +localStorage.teleIncrement; 
        fontSize = +localStorage.teleFont;

        
        
    }
    else { 
        start = true;
        script = "Click here to add script ...";
        increment = 3; 
        fontSize = 40;
            
    }


    updateSpeed(); 
    updateFont();


    var editing = false; 
    var speed = 100;
    var pause = true;
//    var text = false; 

    $(".editbox").css("margin-left", window.innerWidth / 2 - 400 + "px")
    
    $(".inner-speed").text(increment)
    
    var startY = y = window.innerHeight - 350; 
    
    $(".tele").css("top", y).css("font-size", fontSize)
    
    
   function play () {  
    
    interval = setInterval( function () { 

        $(".tele").animate({"top": y}, speed)
        y -= increment; 

    }, speed)
                     
        }
    
    
    
    
    
    $(document).on("keypress", function (e) {
        
        if(editing === false) { 

            if(e.which === 93) { increment = +increment + 1; updateSpeed();  } // speed
            if(e.which === 91) { increment = +increment - 1; updateSpeed(); } // speed
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
            if(e.which === 61) { fontSize += 1; updateFont(); $(".tele").css("font-size", fontSize)}
            if(e.which === 45) { fontSize -= 1; updateFont(); $(".tele").css("font-size", fontSize)}

            // restart
            if(e.which === 114) { 
                clearInterval(interval);
                pause = true; 
                y = startY;
                $(".tele").animate({"top": startY}, 300);
                $(".fa-pause").removeClass("inactive").addClass("active"); 
                $(".fa-play").removeClass("active").addClass("inactive"); 
            }
            
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
            content: script
            
        },
        methods: {
            saveScript: function () { 
            
                console.log(this.content)
                
            }
            
        }
        
    })
    
    

    
// script editing
    
$(".edit").click( function () { 
    $(".editbox").fadeIn("slow");
    $(".tele").fadeOut("slow");
    $(".controls").addClass("blur");
    
});

$(".done-inner").click( function () { 
    $(".editbox").fadeOut("slow");
    $(".tele").fadeIn("slow");
    $(".controls").removeClass("blur")
    
})
    
    

    
// save information
    
setInterval( function () { 
    
    if(start === false) { 
        localStorage.teleScript = myApp.content;
        localStorage.teleFont = fontSize; 
        localStorage.teleIncrement = increment;
    }
    

    
}, 1000)
    
// disable control keys when editing

$('.tele').focus( function () {
   editing = true; 
}).blur( function () { 
    editing = false;   
})


// new script
$(".new").click( function () { 
    clearInterval(interval);
//    $(".tele").animate({"top": startY}, 1000);
    y = startY;
    myApp.content = "Click here to add a script ...";
    fontSize = 40; 
    increment = 3; 
    updateSpeed();
    updateFont();
    start = true;
    $(".fa-play").addClass("inactive").removeClass("active");
    $(".fa-pause").addClass("inactive").removeClass("active");
    pause = true;
    
    
    
    
})





