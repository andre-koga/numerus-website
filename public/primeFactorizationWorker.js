self.onmessage = (event) => {
  let n = BigInt(event.data);

  if (n < BigInt(0)) n = -n;

  if (n <= 1) {
    self.postMessage(n);
    self.postMessage(-1);
    return;
  }

  // Check for divisibility by 2
  while (n % BigInt(2) === BigInt(0)) {
    n /= BigInt(2);
    self.postMessage(2);
  }

  // Check for divisibility by odd numbers up to the square root of the number
  for (let i = BigInt(3); i * i <= n; i += BigInt(2)) {
    while (n % i === BigInt(0)) {
      n /= i;
      self.postMessage(BigInt(i));
    }
  }

  // If number is a prime number greater than 2
  if (n > BigInt(2)) {
    self.postMessage(BigInt(n));
  }

  self.postMessage(-1);
};
