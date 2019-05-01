import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    apiKey: '12452a380bed46e6',
    currencies: {},
    currencyInfo: {
      markets: []
    }
  };
  componentDidMount() {
    fetch('https://cryptochecker-7bcc5.firebaseio.com/CurrencyInfo.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ currencies: { ...data } });
        console.log(this.state.currencies);
        const type = Object.keys(this.state.currencies)[0];
        const URL = `https://coinlib.io/api/v1/coin?key=${
          this.state.apiKey
        }&pref=UAH&symbol=${type}`;
        fetch(URL)
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({ currencyInfo: data });
            console.log(this.state.currencyInfo);
          });
      });
  }

  updateInfoHandler(event) {
    const type = event.target.value;
    const URL = `https://coinlib.io/api/v1/coin?key=${
      this.state.apiKey
    }&pref=UAH&symbol=${type}`;
    fetch(URL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ currencyInfo: data });
      });
  }
  render() {
    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
      });
      return images;
    }

    const images = importAll(
      require.context('./assets/icons', false, /\.(png|jpe?g|svg)$/)
    );
    const currencies = [];
    for (let item of Object.keys(this.state.currencies)) {
      currencies.push({
        code: this.state.currencies[item].code,
        name: this.state.currencies[item].name
      });
    }
    const select = currencies.map((item, i) => {
      return (
        <option key={i} value={item.code}>
          {item.name}
        </option>
      );
    });
    const data = this.state.currencyInfo;
    const priceList = data.markets.map((item, i) => {
      return (
        <li key={i}>
          <span>{item.symbol}</span>
          <span>{item.price}</span>
        </li>
      );
    });
    return (
      <section>
        <h1>Select cryptocurrency</h1>
        <select onChange={event => this.updateInfoHandler(event)}>
          {select}
        </select>
        <div id='infoWrapper'>
          <div className='left-column'>
            <div className='crypto-info'>
              <img src={images[`${data.symbol}.png`]} alt='' />
              <h2>{data.name}</h2>
              <span>Rank: {data.rank}</span>
            </div>
            <ul className='price-list'>{priceList}</ul>
          </div>
          <div className='right-column'>
            <ul className='price-caps'>
              <li className='highest'>
                <span>Last 24h</span>
                <span>{data.high_24h}</span>
              </li>
              <li className='lowest'>
                <span>Lowest 24h</span>
                <span>{data.low_24h}</span>
              </li>
            </ul>
            <ul className='changes-list'>
              <li>
                <span>Price change(1 hour)</span>
                <span className={data.delta_1h > 0 ? 'green' : 'red'}>
                  {data.delta_1h}
                </span>
              </li>
              <li>
                <span>Price change(24 hours)</span>
                <span className={data.delta_24h > 0 ? 'green' : 'red'}>
                  {data.delta_24h}
                </span>
              </li>
              <li>
                <span>Price change(7 days)</span>
                <span className={data.delta_7d > 0 ? 'green' : 'red'}>
                  {data.delta_7d}
                </span>
              </li>
              <li>
                <span>Price change(30 days)</span>
                <span className={data.delta_30d > 0 ? 'green' : 'red'}>
                  {data.delta_30d}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
