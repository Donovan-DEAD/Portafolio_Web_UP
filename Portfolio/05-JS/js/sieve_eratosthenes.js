/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function () {

  n = Number(document.getElementById("num").value)

  var array = [],
    primes = [],
    i,
    j;

  filterNumbers = (factor, limit)=>{
    for (i = factor; i <= limit; i += factor){
      array[i] = true;
    }
  }

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  for ( ii = 2; ii < n; ii++){
    if (array[ii] == undefined) {
      primes.push(ii);
      filterNumbers(ii, n);
    }
  };

  document.getElementById("primes").innerHTML = primes.join(", ");
  return primes;
}
