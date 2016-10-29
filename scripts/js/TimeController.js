export default class TimeController {
  constructor($outputEl) {
    this.$outputEl = $outputEl;

    this.tick = this.tick.bind(this);

    this.tick()
  }

  dateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }

  // http://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
  pad(num, size) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

  // http://codegolf.stackexchange.com/questions/42289/return-the-clock-emoji-closest-to-the-current-time-when-run#answer-42306
  tick() {
    var now = this.dateToUTC(new Date());
    now.setHours(now.getHours() + 2);

    var dateString = `${this.pad(now.getHours(), 2)}:${this.pad(now.getMinutes(), 2)}:${this.pad(now.getSeconds(), 2)}`;
    var emojiCode = ~~(now.getHours() % 12 * 2 + now.getMinutes() / 30 + .5);
    emojiCode += emojiCode < 2 ? 24 : 0;
    var emoji = String.fromCharCode(55357, 56655 + (emojiCode % 2 ? 23 + emojiCode : emojiCode) / 2);

    this.$outputEl.html(`${emoji} ${dateString} CET`);
    window.setTimeout(this.tick, 1000);
  }
}