export interface MyCompany {
  name: string;
  address: string;
  zipCodeAndPostOffice: string;
  nip: string;
}

export interface ClientCompany {
  shortName: string;
  fullName: string;
  address: string;
  zipCodeAndPostOffice: string;
  nip: string;
}

export interface Supervisor {
  name: string;
  phone: string;
  email: string;
}

export interface JsonResponse {
  place: string;
  client: ClientCompany;
  supervisor: Supervisor;
  myCompany: MyCompany;
  productName: string;
  myName: string;
  orderNumber: string;
  orderDate: string;
  invoiceDate: string;
  realizationDate: string;
  spentHours: number;
  hourlyRate: number;
}