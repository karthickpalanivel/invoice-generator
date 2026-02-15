export interface LineItem {
  id: string;
  description: string;
  hsn: string;
  quantity: number;
  rate: number;
  per: string;
  cgstRate: number;
  sgstRate: number;
}

export interface InvoiceData {
  // Seller
  sellerName: string;
  sellerAddress1: string;
  sellerAddress2: string;
  sellerCityZip: string;
  sellerPan: string;
  sellerGstin: string;
  sellerState: string;

  // Invoice Logistics
  invoiceNo: string;
  date: string;
  deliveryNote: string;
  modeOfPayment: string;
  referenceNo: string;
  otherReference: string;
  buyerOrderNo: string;
  buyerOrderDate: string;
  dispatchDocNo: string;
  deliveryNoteDate: string;
  dispatchedThrough: string;
  destination: string;
  billOfLading: string;
  motorVehicleNo: string;
  termsOfDelivery: string;

  // Buyer & Consignee
  buyerName: string;
  buyerAddress: string;
  buyerCityZip: string;
  buyerState: string;
  buyerGstin: string;

  isConsigneeSame: boolean;
  consigneeName: string;
  consigneeAddress: string;
  consigneeCityZip: string;
  consigneeState: string;
  consigneeGstin: string;

  // Items & Footer
  items: LineItem[];
  bankName: string;
  accountNo: string;
  branchIfsc: string;
  accountHolder: string;
  amountInWords: string;
}
