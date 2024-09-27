import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { unauthGuard } from "../core/guards/unauth.guard";

export const routes = [
  { path: "login", component: LoginComponent, canActivate: [unauthGuard] },
  {
    path: "register",
    component: RegisterComponent,
  },
];
