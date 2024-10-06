import { Component, Input } from "@angular/core";

@Component({
  selector: "svg-use",
  standalone: true,
  template: `
    <svg
      fill="currentColor"
      class="svg-icon"
      viewBox="0 -960 960 960"
      [attr.height]="this.height"
      [attr.width]="this.width"
      xmlns="http://www.w3.org/2000/svg">
        <use [attr.href]="this.useHref"></use>
    </svg>
    `
})
export class SvgUseComponent {
  private _useHref: string;
  private _height: number;
  private _width: number;

  public constructor() {
    this._useHref = "icon-brocken";
    this._height = 24;
    this._width = 24;
  }

  // I n p u t

  @Input("paramUseHref")
  public set paramUseHref(v: string) { this._useHref = v }
  @Input("paramHeight")
  public set paramHeight(v: number) { this._height = v }
  @Input("paramWidth")
  public set paramWidth(v: number) { this._width = v }

  // G e t t e r

  public get useHref(): string { return this._useHref }
  public get height(): number { return this._height }
  public get width(): number { return this._width }

}
