export default class TimeController {
  constructor($outputEl) {
    this.$outputEl = $outputEl;

    this.tick = this.tick.bind(this);

    this.tick()
  }

  // http://stackoverflow.com/questions/11887934/check-if-daylight-saving-time-is-in-effect-and-if-it-is-for-how-many-hours
  stdTimezoneOffset(date) {
    var jan = new Date(date.getFullYear(), 0, 1);
    var jul = new Date(date.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  // http://stackoverflow.com/questions/11887934/check-if-daylight-saving-time-is-in-effect-and-if-it-is-for-how-many-hours
  isDST(date) {
    return date.getTimezoneOffset() < this.stdTimezoneOffset(date);
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
    var offset = this.isDST(now) ? 2 : 1;
    now.setHours(now.getHours() + offset);

    var dateString = `${this.pad(now.getHours(), 2)}:${this.pad(now.getMinutes(), 2)}:${this.pad(now.getSeconds(), 2)}`;
    var emojiCode = ~~(now.getHours() % 12 * 2 + now.getMinutes() / 30 + .5);
    emojiCode += emojiCode < 2 ? 24 : 0;
    var emoji = String.fromCharCode(55357, 56655 + (emojiCode % 2 ? 23 + emojiCode : emojiCode) / 2);

    this.$outputEl.html(`${emoji} ${dateString} CET`);
    window.setTimeout(this.tick, 1000);
  }
}