import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/Services/auth.service";
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  isStyleInvalid = { "background-color": "#17a2b8", "border-color": "#17a2b8" };
  isStyleValid = { "background-color": "gray", "border-color": "gray" };
  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (this._AuthService.isLoggedIn()) {
      this._Router.navigate(["/profile"]);
    }
  }
  signIn = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/
      ),
    ]),
  });

  FormData() {
    if (this.signIn.valid) {
      this._AuthService.signIn(this.signIn.value).subscribe((res) => {
        if (res.message == "success") {
          this._Router.navigate(["/profile"]);
          localStorage.setItem("TOKEN", res.token);
        }
      });
    }
  }

  ngOnInit() {
    $("#signIn").particleground();
  }
}
