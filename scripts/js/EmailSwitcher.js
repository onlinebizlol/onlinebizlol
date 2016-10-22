class EmailSwitcher {
  constructor($email) {
    this.i = 0;
    this.$email = $email;
    this.addresses = _.shuffle(this.constructor.ADDRESS_LIST);

    this.changeEmail = this.changeEmail.bind(this);

    setTimeout(this.changeEmail, this.constructor.CHANGE_INTERVAL);
  }

  changeEmail() {

    if(this.i >= this.addresses.length) {
      this.addresses = _.shuffle(this.constructor.ADDRESS_LIST);
      this.i = 0;
    }

    var address = this.addresses[this.i];
    var email = address + this.constructor.DOMAIN;

    this.$email.attr('href', 'mailto:' + email + this.constructor.SUBJECT);
    this.$email.text(email);

    this.i += 1;
    setTimeout(this.changeEmail, this.constructor.CHANGE_INTERVAL);
  }
}

EmailSwitcher.CHANGE_INTERVAL = 1000;
EmailSwitcher.SUBJECT = '?subject=👌👌👌';
EmailSwitcher.DOMAIN = '@onlinebusiness.lol';
EmailSwitcher.ADDRESS_LIST = [
  'i.want.it',
  'tekno',
  'nein',
  'succ',
  'bye',
  'hainberg',
  'whatever',
  'weltweit',
  'dont.give.a.hoot',
  'seriousbusiness',
  'iwantyoutoworkforme',
  'lol',
  'you.dump',
  'biiigcliiicks',
  'graphixcustum4me',
  'pepe+the+racist'
];

export default EmailSwitcher;