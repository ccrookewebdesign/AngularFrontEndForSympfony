export interface Subnet {
  id: number;
  subnet: string;
  cidr: number;
  ips: Ip[];
}

export interface Ip {
  id: number;
  ip: string;
  address_tag: string;
}

export interface SubnetCollection {
  subnets: Subnet[];
}

export interface SubnetResponse {
  subnets: Subnet[];
}
