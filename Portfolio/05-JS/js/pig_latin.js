/*
Pig Latin
*/

function igpayAtinlay() {
  // TODO: Initialize the word array properly
  var str = document.getElementById("txtVal").value;
  var returnArray = [],
    wordArray = str.split(" ");
  
  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var beginning = wordArray[i].charAt(0);
    var word = wordArray[i].slice(1);

    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word+"way");
      continue;
    } else {
      returnArray.push(word+beginning+"ay");
    }
  }

  document.getElementById("pigLatLbl").innerHTML = returnArray.join(" ");
  return returnArray.join(" ");
}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"

