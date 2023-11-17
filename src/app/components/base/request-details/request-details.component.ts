import { Component } from '@angular/core';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent {
  selectedTab: string = 'Participants';

  onTabChange(event : any): void {
    this.selectedTab = event.tab.textLabel;
  }

}
