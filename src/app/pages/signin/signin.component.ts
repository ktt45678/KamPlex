import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  formLoading: boolean = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['continue'] || '/';
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get fc() {
    return this.signInForm.controls;
  }

  onSignIn(formData: any): void {
    if (this.signInForm.invalid) {
      return;
    }
    const { username, password } = formData;
    this.formLoading = true;
    this.signInForm.disable();
    this.authService.login({ username, password }).subscribe(() => {
      this.router.navigate([this.returnUrl]);
    }).add(() => this.afterRespone());
  }

  afterRespone(): void {
    this.formLoading = false;
    this.signInForm.enable();
  }

  ngOnInit(): void {
  }

}
