self.onmessage = (event) => {
  let n = BigInt(event.data);
  n++;

  while (!primeChecker(n)) {
    n += BigInt(1);
  }

  self.postMessage(n);
};

function primeChecker(n) {
  if (n < BigInt(0)) n = -n;

  if (n === BigInt(1)) return false;
  if (n === BigInt(2)) return true;

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

  return true;
}
