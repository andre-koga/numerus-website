self.onmessage = (event) => {
  let m = BigInt(event.data) - BigInt(1);
  let n = BigInt(event.data) + BigInt(1);

  // Find the previous prime number less than m
  while (!isPrime(m)) {
    m--;
  }

  // Find the next prime number greater than n
  while (!isPrime(n)) {
    n++;
  }

  // Post the result back to the main thread
  self.postMessage([m, n]);

  self.postMessage(-1);
};

function isPrime(n) {
  if (n < BigInt(0)) return isPrime(-n);
  if (n <= BigInt(1)) return false;

  // Check for divisibility by 2
  if (n % BigInt(2) === BigInt(0)) {
    return false;
  }

  // Check for divisibility by odd numbers up to the square root of the number
  for (let i = BigInt(3); i * i <= n; i += BigInt(2)) {
    if (n % i === BigInt(0)) {
      return false;
    }
  }

  // If number is a prime number greater than 2
  return true;
}
