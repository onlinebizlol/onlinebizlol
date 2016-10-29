import $ from 'jquery';
import _ from 'lodash';

import EmailSwitcher from './EmailSwitcher';
import TemperatureController from './TemperatureController';
import TimeController from './TimeController';

import '../../styles/css/main.css';

$(function() {
  var $email = $('#email');
  var $temp = $('#temp-output');
  var $time = $('#time-output');

  new EmailSwitcher($email);
  new TemperatureController($temp);
  new TimeController($time);
});