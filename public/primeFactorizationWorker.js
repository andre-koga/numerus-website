self.onmessage = (event) => {
  let number = event.data;
  let factors = {};

  for (let i = 2; i <= number; i++) {
    while (number % i === 0) {
      if (factors[i]) factors[i]++;
      else factors[i] = 1;
      number /= i;
    }
  }

  self.postMessage(factors);
};
