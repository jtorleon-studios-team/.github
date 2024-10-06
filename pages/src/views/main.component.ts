import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { Title, Meta } from "@angular/platform-browser";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Component } from "@angular/core";

import { BaseComponent } from "@/views/base.component";
import { HeaderComponent } from "@/views/components/header.component";
import { FooterComponent } from "@/views/components/footer.component";
import { RainEmojiComponent } from "@/views/components/rain-emoji.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./main.component.html",
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RainEmojiComponent
  ]
})
export class MainComponent extends BaseComponent {

  public constructor(
    private _titleInjected: Title,
    private _metaInjected: Meta
  ) {
    super(
      _titleInjected,
      _metaInjected,
      "Link Tree - JTorLeon Studios Team",
      "Link Tree - JTorLeon Studios Team"
    );
  }

  public override attachSubscriptions(): Subscription[] {
    return [];
  }

}

