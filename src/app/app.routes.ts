import { Routes } from "@angular/router";

import { unauthGuard } from "./modules/core/guards/unauth.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./modules/home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "play",
    loadComponent: () => import("./modules/play/play.component").then((c) => c.PlayComponent),
    canActivate: [unauthGuard],
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
