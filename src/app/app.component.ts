import { Component } from '@angular/core';
import { SubnetService } from './subnet.service';
import { Subnet, Ip } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  loading: boolean = true;
  subnets: Subnet[] = [];
  selectedIp: Ip = {id: 0, subnet_id: 0, ip: '', address_tag: ''};
  selectedIpSubnet: string = '';
  
  constructor(private subnetService: SubnetService) {}

  async ngOnInit() {
    // retrieve subnets from database
    this.subnetService.getSubnets().subscribe(data => {
      this.subnets = data.subnets;
      this.loading = false;
    });
  }

  // when an Ip is clicked, do stuff
  ipSelected(ip: Ip){
    this.selectedIp = ip;
    this.selectedIpSubnet = this.subnets.find(subnet => subnet.id === ip.subnet_id).subnet;    
  }
}


