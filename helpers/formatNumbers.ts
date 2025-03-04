export function formatNumberWithCommas(number: Number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
