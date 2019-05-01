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

function updateInfo(type) {
  const URL = `https://coinlib.io/api/v1/coin?key=12452a380bed46e6&pref=UAH&symbol=${type}`;
  fetch(URL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
}

const select = document.querySelector('select');
updateInfo(select.options[select.selectedIndex].value);
select.onchange = () => {
  const type = select.options[select.selectedIndex].value;
  updateInfo(type);
};
