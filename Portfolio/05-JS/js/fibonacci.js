/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {1:1,2:1};
function fibonacci() {
  "use strict";
  var n = document.getElementById("num").value;
  var val = f(n);

  document.getElementById("result").innerHTML = val;
}

function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //TODO: Implement the fibonacci function here!
    i = 3;
    while (i <=n){
      if (memo[i] === undefined){ 
        memo[i] = memo[i-1] + memo[i-2];
      } 
      i++;
    } 
  }
  return memo[n];
}
console.log(fibonacci(15));
