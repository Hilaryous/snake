export function getRandomNumberWithin(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function withinFive(num1, num2, num3, num4) {
  let xdiff = Math.abs(num1 - num2);
  let ydiff = Math.abs(num3 - num4);

  return (xdiff <= 5 && ydiff <= 5);
}


