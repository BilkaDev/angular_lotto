import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

export const routes = [
  { path: "login", component: LoginComponent },
  {
    path: "register",
    component: RegisterComponent,
  },
];
