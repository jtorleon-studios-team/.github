import { BaseComponent } from "../base.component";
import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { HeaderComponent } from "../components/header.component";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  imports: [CommonModule, HeaderComponent]
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {


  public constructor(
    private readonly _route: ActivatedRoute,
    private readonly _title: Title,
    private readonly _meta: Meta
  ) {
    super(_title, _meta, "Finder: Home", "Finder: Home");
  }

  public override attachSubscriptions(): Subscription[] {
    return [];
  }



}
