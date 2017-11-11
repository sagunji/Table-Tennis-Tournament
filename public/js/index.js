//because read.csv is in utils
ocpu.seturl("//public.opencpu.org/ocpu/library/utils/R")

//actual handler
$("#submitbutton").on("click", function(){
    
    var file = $("#csvfile")[0].files[0];
    
      var reader = new FileReader();
      reader.onload = function(progressEvent){
        // Entire file
        console.log(this.result);
    
        // By lines
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
          console.log(lines[line]);
        }
      };
      reader.readAsText(file);
      debugger;


    var myheader = $("#header").val() == "true";
    var myfile = $("#csvfile")[0].files[0];
        
    if(!myfile){
        alert("No file selected.");
        return;
    }

    //disable the button during upload
    $("#submitbutton").attr("disabled", "disabled");

    //perform the request
    var req = ocpu.call("read.csv", {
        "file" : myfile,
        "header" : myheader
    }, function(session){
        session.getConsole(function(outtxt){
            $("#output").text(outtxt); 
        });
    });
        
    //if R returns an error, alert the error message
    req.fail(function(){
        alert("Server error: " + req.responseText);
    });
    
    //after request complete, re-enable the button 
    req.always(function(){
        $("#submitbutton").removeAttr("disabled")
    });        
});    