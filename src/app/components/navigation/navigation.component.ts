import { Component } from '@angular/core';
import { navigations } from './configuration';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  navigation = navigations;
}
