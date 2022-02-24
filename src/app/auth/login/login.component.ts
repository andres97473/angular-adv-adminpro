import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare let gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    remember: [Boolean(localStorage.getItem('remember')) || false],
  });

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private router: Router,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    // this.router.navigateByUrl('/');
    // console.log(this.loginForm.value);
    this._usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        // console.log(resp);
        const remember = this.loginForm.get('remember')?.value;
        const email = this.loginForm.get('email')?.value;
        if (remember) {
          localStorage.setItem('email', email);
          localStorage.setItem('remember', 'true');
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }

        // mover al dashboard
        this.router.navigateByUrl('/');
      },
      (err) => {
        // console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  async startApp() {
    await this._usuarioService.googleInit();
    this.auth2 = this._usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    // console.log(element.id);
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this._usuarioService.loginGoogle(id_token).subscribe((res) => {
          // mover al dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
