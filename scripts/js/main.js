import $ from 'jquery';
import _ from 'lodash';

import EmailSwitcher from './EmailSwitcher';

import '../../styles/css/main.css';

$(function() {
  var $email = $('#email');

  new EmailSwitcher($email);
});