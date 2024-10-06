import { ErrorComponent } from "@/views/error.component";
import { HomeComponent } from "@/views/home/home.component";
import { Route } from "@angular/router";

export const ROUTES: Route[] = [
  { // ========================== H O M E ========================== 
    path: "home",
    component: HomeComponent
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { // ========================== E R R O R ========================== 
    path: "**",
    component: ErrorComponent,
  }
]
