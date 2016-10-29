import Draggable from 'draggable';
import $ from 'jquery';

export default class ShowcaseController {
  constructor($showcases) {
    this.$showcases = $showcases;

    this.setLocation = this.setLocation.bind(this);
    this.revealOne = this.revealOne.bind(this);

    this.$showcases.find('img')
      .on('load', this.setLocation)
      .each(function() {
        if(this.complete) {
          $(this).trigger('load')
        }
      });
    window.setTimeout(this.revealOne, 2500);
  }

  setLocation(event) {
    var $target = $(event.target);
    var $showcase = $target.closest('.showcase');
    var top = Math.random() * ($(document).height() - $showcase.height());
    var left = Math.random() * ($(document).width() - $showcase.width());

    $showcase.addClass('loaded');
    $showcase.css({
      top,
      left
    });
  }

  revealOne() {
    var $loaded = this.$showcases.filter('.loaded:not(.revealed)');
    var which = Math.floor(Math.random() * $loaded.length);
    var $revealed = $loaded.eq(which);

    $revealed.addClass('revealed');
    $revealed.css({
      'visibility': 'visible',
      'position': 'absolute'
    });

    new Draggable($revealed[0], {
      handle: $revealed.find('img')[0],
      filterTarget: function(target) {
        return $(window).width() > 800;
      },
      onDragStart: function(element, x, y, event) {
        $(element).addClass('dragging');
      },
      onDragEnd: function(element, x, y, event) {
        $(element).removeClass('dragging');
        $('main').append(element);
      }
    })

    window.setTimeout(this.revealOne, 2500);
  }
}