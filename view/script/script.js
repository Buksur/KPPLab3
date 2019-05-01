const API_KEY = '12452a380bed46e6';

// fetch(
//   'https://coinlib.io/api/v1/coinlist?key=12452a380bed46e6&pref=BTC&page=1&order=volume_desc '
// )
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   });

function renderInfo(data) {
  infoWrapper.innerHTML = `
  <div id="infoWrapper">
        <div class="left-column">
          <div class="crypto-info">
            <img src="assets/CurrencyIcons/${data.symbol}.png" alt="" />
            <h2>${data.name}</h2>
            <span>Rank: ${data.rank}</span>
          </div>
          <ul class="price-list">
            <li><span>${data.markets[0].symbol}</span><span>${
    data.markets[0].price
  }</span></li>
            <li><span>${data.markets[1].symbol}</span><span>${
    data.markets[1].price
  }</span></li>
            <li><span>${data.markets[2].symbol}</span><span>${
    data.markets[2].price
  }</span></li>
          </ul>
        </div>
        <div class="right-column">
          <ul class="price-caps">
            <li class="highest"><span>Highest price last 24h</span><span>${
              data.high_24h
            }</span></li>
            <li class="lowest"><span>Lowest price last 24h</span><span>${
              data.low_24h
            }</span></li>
          </ul>
          <ul class="changes-list">
            <li><span>Price change last 1h</span><span>${
              data.delta_1h
            }</span></li>
            <li><span>Price change last 24h</span><span>${
              data.delta_24h
            }</span></li>
            <li><span>Price change last 7 days</span><span>${
              data.delta_7d
            }</span></li>
            <li><span>Price change last 30 days</span><span>${
              data.delta_30d
            }</span></li>
          </ul>
        </div>
      </div>
  `;
}

function updateInfo(type) {
  const URL = `https://coinlib.io/api/v1/coin?key=12452a380bed46e6&pref=UAH&symbol=${type}`;
  fetch(URL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderInfo(data);
    });
}
{
}
const select = document.querySelector('select');
const infoWrapper = document.getElementById('infoWrapper');
updateInfo(select.options[select.selectedIndex].value);
select.onchange = () => {
  const type = select.options[select.selectedIndex].value;
  updateInfo(type);
};
