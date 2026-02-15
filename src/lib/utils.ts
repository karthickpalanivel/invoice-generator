import { InvoiceData } from "../types/index";

export const EMPTY_DATA: InvoiceData = {
  sellerName: "",
  sellerAddress1: "",
  sellerAddress2: "",
  sellerCityZip: "",
  sellerPan: "",
  sellerGstin: "",
  sellerState: "",
  invoiceNo: "",
  date: new Date()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase(),
  deliveryNote: "",
  modeOfPayment: "",
  referenceNo: "",
  otherReference: "",
  buyerOrderNo: "",
  buyerOrderDate: "",
  dispatchDocNo: "",
  deliveryNoteDate: "",
  dispatchedThrough: "",
  destination: "",
  billOfLading: "",
  motorVehicleNo: "",
  termsOfDelivery: "",
  buyerName: "",
  buyerAddress: "",
  buyerCityZip: "",
  buyerState: "",
  buyerGstin: "",
  isConsigneeSame: true,
  consigneeName: "",
  consigneeAddress: "",
  consigneeCityZip: "",
  consigneeState: "",
  consigneeGstin: "",
  items: [
    {
      id: "1",
      description: "",
      hsn: "",
      quantity: 0,
      rate: 0,
      per: "Nos",
      cgstRate: 9,
      sgstRate: 9,
    },
  ],
  bankName: "",
  accountNo: "",
  branchIfsc: "",
  accountHolder: "",
  amountInWords: "",
};

export const EXAMPLE_DATA: InvoiceData = {
  sellerName: "SWAMY & CO",
  sellerAddress1: "1/137, PILLAIYAR KOVIL THOTTAM,",
  sellerAddress2: "SINGALANDAPURAM, NAMAKKAL",
  sellerCityZip: "NAMAKKAL 637412",
  sellerPan: "AIPPM1462R",
  sellerGstin: "33AIPPM1462R3ZL",
  sellerState: "33 - TAMIL NADU",
  invoiceNo: "009",
  date: "20-JULY-2025",
  deliveryNote: "",
  modeOfPayment: "Credit",
  referenceNo: "",
  otherReference: "",
  buyerOrderNo: "PO/2025/001",
  buyerOrderDate: "15-JULY-2025",
  dispatchDocNo: "",
  deliveryNoteDate: "",
  dispatchedThrough: "TIPPER",
  destination: "Rasipuram",
  billOfLading: "",
  motorVehicleNo: "TN20547130",
  termsOfDelivery: "",
  buyerName: "SELVARAJE RAMASAMY",
  buyerAddress: "8/153, WEST STREET SINGALANDAPURAM PO, MGR COLONY RASIPURAM,",
  buyerCityZip: "NAMAKKAL - 637412",
  buyerState: "Tamil Nadu",
  buyerGstin: "33ENPPS9979N1ZH",
  isConsigneeSame: true,
  consigneeName: "",
  consigneeAddress: "",
  consigneeCityZip: "",
  consigneeState: "",
  consigneeGstin: "",
  items: [
    {
      id: "1",
      description: "Chettinad Cement",
      hsn: "25232930",
      quantity: 26.0,
      rate: 6600,
      per: "Ton",
      cgstRate: 14,
      sgstRate: 14,
    },
  ],
  bankName: "CITY UNION BANK",
  accountNo: "510909010055034",
  branchIfsc: "Rasipuram & CIUB0000159",
  accountHolder: "MAGUDEESWARAN P",
  amountInWords:
    "INR Two Lakh Ninety Thousand Six Hundred And Forty Eight Only",
};

export const numToWords = (n: number): string => {
  if (n === 0) return "Zero";
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const convertLess1000 = (num: number): string => {
    let str = "";
    if (num >= 100) {
      str += units[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      str += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num >= 10) {
      str += teens[num - 10] + " ";
      return str;
    }
    if (num > 0) {
      str += units[num] + " ";
    }
    return str;
  };

  let str = "";
  if (n >= 10000000) {
    str += convertLess1000(Math.floor(n / 10000000)) + "Crore ";
    n %= 10000000;
  }
  if (n >= 100000) {
    str += convertLess1000(Math.floor(n / 100000)) + "Lakh ";
    n %= 100000;
  }
  if (n >= 1000) {
    str += convertLess1000(Math.floor(n / 1000)) + "Thousand ";
    n %= 1000;
  }
  str += convertLess1000(n);
  return str.trim();
};
