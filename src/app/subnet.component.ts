import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subnet, Ip } from './interfaces';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html'  
})
export class SubnetComponent {
  expanded: boolean = false;
  selectedIp: Ip = {
    id: 0,
    subnet_id: 0,
    ip: '',
    address_tag: ''
  };

  @Input() subnet: Subnet;
  @Input() lastSelectedIp: number;
  @Output() notify:EventEmitter<Ip> = new EventEmitter<Ip>();
  constructor() { }

  toggleExpanded(){
    this.expanded = !this.expanded;
  }

  // when user selectes an Ip, alert the parent component
  ipSelected(ip: Ip){
    this.selectedIp = ip;
    this.notify.emit(ip);
  }
}
