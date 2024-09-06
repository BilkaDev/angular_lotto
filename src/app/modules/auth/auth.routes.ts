import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const routes = [
  { path: "login", component: LoginComponent },
  {
    path: "register",
    component: RegisterComponent,
  },
];
