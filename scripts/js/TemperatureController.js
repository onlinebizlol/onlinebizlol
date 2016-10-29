import $ from 'jquery';

export default class TemperatureController {
  constructor($outputEl) {
    this.$outputEl = $outputEl;


    this.onTemperature = this.onTemperature.bind(this);
    this.onError = this.onError.bind(this);

    this.initiateRequest();
  }

  ktoc(k) {
    return k - 272.15;
  }

  initiateRequest() {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=52.476820&lon=13.438370&APPID=169cf9a9e7aaab39a5963522a5154d4f')
      .done(this.onTemperature)
      .fail(this.onError);
  }

  onTemperature(response) {
    var temperature = ~~this.ktoc(response.main.temp);
    this.$outputEl.text(`${temperature} °C`);
  }

  onError(error) {
    // FIXME try again?
    console.error(error);
  }
}