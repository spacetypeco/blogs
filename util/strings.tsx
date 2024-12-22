export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function formatMoney(currency: string, amountTotal: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });

  return formatter.format(amountTotal / 100);
}

export function formatMoneyShort(currency: string, amountTotal: number) {
  return formatMoney(currency, amountTotal).split(".")[0];
}
