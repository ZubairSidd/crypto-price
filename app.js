const mainSection = document.querySelector(".main");

let allCoins = {
  coinName: ["BitCoin", "Ethereum", "DOGE Coin"],
  coinCode: ["btc", "eth", "doge"],
};

const getPrice = async (coinName) => {
  try {
    let url = `https://api.cryptonator.com/api/ticker/${coinName}-usd`;
    const res = await axios.get(url);
    // console.log(res.data.ticker);
    return res.data.ticker.price;
  } catch (e) {
    console.log("ERROR!!", e);
  }
};

const createCoin = async () => {
  for (let i = 0; i < allCoins.coinCode.length; i++) {
    const coinHolder = document.createElement("div");
    const coinNameHolder = document.createElement("h2");
    const coinPriceHolder = document.createElement("p");

    coinNameHolder.innerText = allCoins.coinName[i];
    let price = await getPrice(allCoins.coinCode[i]);
    coinPriceHolder.innerText = `$ ${price}`;
    coinHolder.append(coinNameHolder, coinPriceHolder);
    mainSection.append(coinHolder);
  }
};

createCoin();
