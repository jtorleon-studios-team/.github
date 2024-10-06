/// <reference types="@angular/localize" /> 
import { LOCALE_ID } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { MainComponent } from "@/views/main.component";
import { ROUTES } from "@/router";

bootstrapApplication(MainComponent, {
  providers: [
    provideRouter(ROUTES, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: "en-US" }
  ]
}).catch((err) => console.error(err));
