import { Component } from "@angular/core";

@Component({
  selector: "footer-component",
  standalone: true,
  template: `
    <footer>
      <p>
        <a href="contact.html" 
          title="contact us">contact us</a> -
        <a href="privacy-policy.txt" 
          title="download privacy policy" 
          download="privacy-policy.txt">privacy policy</a>
      </p>
    </footer>
  `,
  styles: `
    footer {
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--height-footer);
      width: 100%;
      background-color: rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(5px);
      z-index: 99;
    }
  `,
})
export class FooterComponent { }
