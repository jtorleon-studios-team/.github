import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "app-error", standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 15px">
      <h1 class="textCenter" i18n>
        Aie! Error 404, page not found !
      </h1>
    </div>`,
})
export class ErrorComponent {

  public constructor(meta: Meta) {
    let description = `Ai! Error 404, page not found ! `
    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ name: 'og:description', content: description });
    meta.updateTag({ name: 'og:title', content: `Ai! Error 404, page not found !` });
  }

}
