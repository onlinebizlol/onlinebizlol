import $ from 'jquery';
import _ from 'lodash';
import FastClick from 'fastclick';

import EmailSwitcher from './EmailSwitcher';
import TemperatureController from './TemperatureController';
import TimeController from './TimeController';
import PermSnipController from './PermSnipController';
import ShowcaseController from './ShowcaseController';

import '../../styles/css/main.css';

$(function() {
  var $email = $('#email');
  var $temp = $('#temp-output');
  var $time = $('#time-output');
  var $snips = $('.snip.perm');
  var $showcases = $('.showcase');

  FastClick.attach(document.body);

  new EmailSwitcher($email);
  new TemperatureController($temp);
  new TimeController($time);
  new PermSnipController($snips);
  new ShowcaseController($showcases);
});