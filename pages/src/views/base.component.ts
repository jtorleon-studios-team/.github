import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class BaseComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[];

  public constructor(
    private title: Title,
    private meta: Meta,
    contentTitle: string,
    contentDescription: string
  ) {
    this._subscriptions = [];
    this.setTitle(contentTitle);
    this.setDescription(contentDescription);
  }

  public ngOnInit(): void {
    this._subscriptions = this.attachSubscriptions();
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(v => v.unsubscribe());
    this._subscriptions.splice(0, this._subscriptions.length);
  }

  public abstract attachSubscriptions(): Subscription[];

  public setTitle(contentTitle: string): void {
    this.title.setTitle(contentTitle);
    this.meta.updateTag({ name: 'og:title', content: contentTitle });
  }

  public setDescription(contentDescription: string): void {
    this.meta.updateTag({ name: 'description', content: contentDescription });
    this.meta.updateTag({ name: 'og:description', content: contentDescription });
  }

  public scrollToTop(): void { BaseComponent.scrollToTop() }
  public static scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  public static getScrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop;
  }

  public static hasScrollToBottom(threshold = 150): boolean {
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;
    return position > height - threshold;
  }

} 
