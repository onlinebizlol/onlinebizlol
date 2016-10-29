import $ from 'jquery';

export default class PermSnipController {
  constructor($snips) {
    this.$snips = $snips;

    this.move = this.move.bind(this);

    this.move();
  }

  move() {
    this.$snips.each(function() {
      var $this = $(this);
      var top = Math.random() * ($(document).height() - $this.height());
      var left = Math.random() * ($(document).width() - $this.width());

      $this.animate({
        top,
        left
      }, {
        duration: 0,
        easing: 'linear'
      });
    });

    window.setTimeout(this.move, 5000);
  }
}