export const convert = (msec) => {
  const target = Math.floor(msec / 1000);
  const seconds = target % 60;
  const minuts = Math.floor(target / 60);

  const secondsDisplayValue = ("0" + seconds).slice(-2);
  const minutsDisplayValue = ("0" + minuts).slice(-2);

  return {secondsDisplayValue,minutsDisplayValue}
}