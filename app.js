const mainSection = document.querySelector(".coinSection");
const currencySelect = document.querySelector("#currency");
let currencyRates = "";
const coinLoc = (fileName) => {
  return `/images/${fileName}`;
};

let allCoins = {
  coinName: ["BitCoin", "Ethereum", "DOGE Coin", "Ripple", "TRON"],
  coinCode: ["btc", "eth", "doge", "xrp", "trx"],
  coinImage: [
    coinLoc("bitcoin.svg"),
    coinLoc("ethereum.svg"),
    coinLoc("dogecoin.svg"),
    coinLoc("xrp.svg"),
    coinLoc("trx.svg"),
  ],
};

const getData = async (coinName) => {
  try {
    let url = `https://api.cryptonator.com/api/ticker/${coinName}-usd`;
    const res = await axios.get(url);
    // console.log(res.data.ticker);
    return res.data.ticker;
  } catch (e) {
    console.log("ERROR!!", e);
  }
};

const getCurrencyData = async () => {
  try {
    const res = await axios.get(
      "https://openexchangerates.org/api/latest.json?app_id=7b6d6f85ddc34e4fab1166a2d98825fe"
    );
    const data = res.data.rates;
    // console.log(data);
    return data;
  } catch (e) {
    console.log("ERORR!!", e);
  }
};
const currencyConverter = async () => {
  currencyRates = await getCurrencyData();
  for (let currency in currencyRates) {
    const newOption = document.createElement("option");
    newOption.value = currencyRates[currency];
    newOption.innerText = currency;
    currencySelect.append(newOption);
  }
};

currencyConverter();

const createCoin = async (exchangeRate = 1) => {
  for (let i = 0; i < allCoins.coinCode.length; i++) {
    const coinHolder = document.createElement("div");
    const coinName = document.createElement("h2");
    const coinPrice = document.createElement("p");
    const coinVolume = document.createElement("p");
    const coinImage = document.createElement("img");
    const coinChange = document.createElement("p");

    let coinData = await getData(allCoins.coinCode[i]);

    coinName.innerText = allCoins.coinName[i];
    let roundVolume = parseFloat(coinData.volume).toFixed(4);
    coinVolume.innerHTML = `Volume : ${"<br>"}${roundVolume}`;
    let roundChange = parseFloat(coinData.change).toFixed(4);
    coinChange.innerHTML = `Change : ${"<br>"}${roundChange}`;
    let roundPrice = parseFloat(coinData.price * exchangeRate).toFixed(4);
    coinPrice.innerHTML = `Price : ${"<br>"}${roundPrice}`;

    coinImage.src = allCoins.coinImage[i];
    coinImage.width = 64;
    coinImage.height = 64;
    coinHolder.classList.add("coinHolder");

    coinHolder.append(coinImage, coinName, coinPrice, coinVolume, coinChange);
    mainSection.append(coinHolder);
  }
};

createCoin();
let selectedCurrency = 0;
currencySelect.addEventListener("change", (e) => {
  mainSection.innerHTML = "";
  createCoin(e.srcElement.value);
});
