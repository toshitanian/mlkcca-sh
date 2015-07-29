var MilkCocoa = require('milkcocoa');
var milkcocoa = new MilkCocoa('guitaricoz8m9j.mlkcca.com');
var ds = milkcocoa.dataStore('mlkcca-sh');

var exec = require('child_process').exec,
    child;

ds.on("push", function(data){
  console.log(data.value.message);
    if(data.value.type=="response") return;
    child = exec(data.value.message,
		 function (error, stdout, stderr) {
		     console.log('stdout: ' + stdout);
		     console.log('stderr: ' + stderr);
		     if(stdout!=""){
			 ds.push({message: stdout, type:"response"});
		     }
                     if(stderr!=""){
                         ds.push({message: stderr, type:"response"});
                     }
		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }
		 });

});
