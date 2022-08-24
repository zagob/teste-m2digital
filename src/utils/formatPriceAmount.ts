export function formatPriceCurrency(value: number) {
  return new Intl.NumberFormat("Pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function priceChange(value1 = 0, value2 = 0, value3 = 0) {
  return value1 + value2 + value3;
}
