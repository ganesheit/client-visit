import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {

  pageTitle: string;

  routeSubscription: Subscription;

  constructor(private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.routeSubscription = this._activatedRoute.url.subscribe({
      next: () => {
        this.pageTitle = this._activatedRoute.snapshot.firstChild.data['name'];
      }
    })
  }

  ngOnDestroy(): void {
    if(this.routeSubscription) this.routeSubscription.unsubscribe();
  }
}
