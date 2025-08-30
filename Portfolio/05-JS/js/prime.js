/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function () {
  "use strict";
  var n = Number(document.getElementById("num").value);
  console.log(n);

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i,
    sequence = [];

  if (isPrime(n)) {
    sequence.push(n);
    document.getElementById("pf").innerHTML = sequence.join(" * ");
    return sequence;
  }

  var superior_limit=n
  for (i = 2; i <= superior_limit; i++) {
    if (n % i === 0 && isPrime(i)) {
      sequence.push(i);
      superior_limit=n/i;
    }
  }

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  document.getElementById("pf").innerHTML = sequence.join(" * ");
  return sequence;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));
