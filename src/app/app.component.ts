import { Component } from '@angular/core';

import { SubnetService } from './subnet.service';
import { Subnet } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  subnets: Subnet[] = [];
  
  constructor(private subnetService: SubnetService) {}

  async ngOnInit() {
    this.subnetService.getSubnets().subscribe(data => {
      this.subnets = data.subnets;
      console.log(this.subnets);
    });
  }
}


