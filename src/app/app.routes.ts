import { Routes } from "@angular/router";
import { authGuard } from "./modules/core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./modules/home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "play",
    loadComponent: () => import("./modules/play/play.component").then((c) => c.PlayComponent),
    canActivate: [authGuard],
  },
  {
    path: "results",
    loadComponent: () => import("./modules/results/results.component").then((c) => c.ResultsComponent),
  },
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.routes").then((m) => m.routes),
  },
];
