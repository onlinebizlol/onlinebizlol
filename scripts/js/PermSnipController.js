import $ from 'jquery';

export default class PermSnipController {
  constructor($snips) {
    var self = this;

    this.$snips = $snips;

    this.move = this.move.bind(this);

    this.$snips.each(function(index, el) {
      self.move($(el), false);

      // lol end me
      window.setTimeout(function() {
        self.move($(el));
      }, index * 1000);
    });
  }

  move($element, reschedule=true) {
    var self = this;
    var top = Math.random() * ($(document).height() - $element.height());
    var left = Math.random() * ($(document).width() - $element.width());

    $element.css({
      top,
      left,
      'visibility': 'visible'
    });

    if(!reschedule) {
      return;
    }

    window.setTimeout(function() {
      self.move($element);
    }, 5000);
  }
}