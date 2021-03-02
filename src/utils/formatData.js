const addCommasToNumbers = (num) => {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export default function formatData(data) {
  return data.map((item) => {
    item.last = addCommasToNumbers(item.last);
    item.buy = addCommasToNumbers(item.buy);
    item.sell = addCommasToNumbers(item.sell);
    item.difference = addCommasToNumbers(item.difference);
    item.savings = addCommasToNumbers(item.savings);
    item = { ...item, buysell: "₹ " + item.buy + " / ₹ " + item.sell };
    return item;
  });
}
