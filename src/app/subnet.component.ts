import { Component, OnInit, Input } from '@angular/core';
import { Subnet } from './interfaces';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.scss']
})
export class SubnetComponent implements OnInit {
  @Input() subnet: Subnet;
  constructor() { }

  ngOnInit() {
  }

}
