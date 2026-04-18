import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  @Output() closeModal = new EventEmitter<void>();

  step: 'mobile' | 'otp' = 'mobile';

  mobile = '';

  defaultOtp = '123456';
  otp: string[] = ['', '', '', '', '', ''];
  timer = '00:30';
  interval: any;
  show = true;

  canResend = false;


  constructor(private authService: AuthService) { }

  goToOtp() {
    if (this.mobile.length === 10) {
      this.step = 'otp';
      this.startTimer();
    }
  }


  close() {
    this.resetState();
    this.closeModal.emit(); // 🔥 notify parent
  }

  resetState() {
    this.step = 'mobile';
    this.mobile = '';
    this.otp = ['', '', '', '', '', ''];

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.timer = '00:30';
  }
  verifyOtp() {
    const enteredOtp = this.otp.join('');

    if (enteredOtp === this.defaultOtp) {

      const user = {
        mobile: this.mobile
      };

      this.authService.login(user);

      this.close(); // close modal

    } else {
      alert('Invalid OTP ❌');
    }
  }


  startTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    let seconds = 30;
    this.canResend = false;

    this.interval = setInterval(() => {
      seconds--;

      this.timer = `00:${seconds < 10 ? '0' + seconds : seconds}`;

      if (seconds === 0) {
        clearInterval(this.interval);
        this.canResend = true;
      }
    }, 1000);
  }


  moveNext(event: any, index: number) {
    const input = event.target;

    if (input.value && input.nextElementSibling) {
      input.nextElementSibling.focus();
    }

    // 🔥 Check full OTP
    const enteredOtp = this.otp.join('');

    if (enteredOtp.length === 6) {
      this.verifyOtp();
    }
  }

  resendOtp() {
    this.startTimer();
  }
}

