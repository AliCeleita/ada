import {Component} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {ToolbarService} from "../../service/tooldbar.service";

interface Menu {
  path: string
  icon: IconProp
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  menuOptions: Menu[] = [
    {path: '/home/products', icon: 'box'},
  ];

  constructor(public toolbar: ToolbarService) {
  }

  onNew() {
    this.toolbar.onNew.emit();
  }
}

