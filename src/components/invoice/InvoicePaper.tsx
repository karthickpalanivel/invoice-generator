import React from "react";
import { InvoiceData } from "@/types";

// This component is PURELY visual. It mimics the PDF structure.
const InvoicePaper = ({ data, totals }: { data: InvoiceData; totals: any }) => {
  return (
    <div
      className="bg-white shadow-2xl origin-top transform scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 transition-transform duration-300 print:scale-100 print:shadow-none print:m-0"
      style={{ width: "210mm", minHeight: "297mm", padding: "0" }}
    >
      <div className="p-8 h-full flex flex-col font-serif text-sm leading-tight">
        <div className="border-2 border-black h-full flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between items-center border-b-2 border-black p-2 bg-gray-50 print:bg-white">
            <div className="w-1/3"></div>
            <div className="w-1/3 text-center">
              <h1 className="font-bold text-xl uppercase tracking-wide">
                Tax Invoice
              </h1>
            </div>
            <div className="w-1/3 text-right text-xs">Original Copy</div>
          </div>

          {/* TOP GRID - SELLER & INVOICE META */}
          <div className="flex border-b border-black">
            <div className="w-1/2 border-r border-black p-3 flex flex-col gap-1">
              <h2 className="font-bold text-lg">
                {data.sellerName || "SELLER NAME"}
              </h2>
              <p>{data.sellerAddress1 || "Address Line 1"}</p>
              <p>{data.sellerAddress2}</p>
              <p className="font-bold">
                {data.sellerCityZip || "City - Zipcode"}
              </p>
              <div className="mt-2 space-y-1">
                <p>PAN: {data.sellerPan}</p>
                <p>
                  GSTIN: <span className="font-bold">{data.sellerGstin}</span>
                </p>
                <p>STATE CODE & NAME: {data.sellerState}</p>
              </div>
            </div>
            <div className="w-1/2 grid grid-cols-2 text-xs">
              {/* Mapping meta fields to grid cells */}
              {[
                ["Invoice No.", data.invoiceNo],
                ["Date", data.date],
                ["Delivery Note", data.deliveryNote],
                ["Mode / Terms", data.modeOfPayment],
                ["Ref No. & Date", data.referenceNo],
                ["Other Ref", data.otherReference],
                ["Buyer Order No.", data.buyerOrderNo],
                ["Dated", data.buyerOrderDate],
                ["Dispatch Doc No.", data.dispatchDocNo],
                ["Delivery Note Date", data.deliveryNoteDate],
                ["Dispatched Through", data.dispatchedThrough],
                ["Destination", data.destination],
                ["Bill of Lading", data.billOfLading],
                ["Motor Vehicle No.", data.motorVehicleNo],
              ].map(([label, val], i) => (
                <div
                  key={i}
                  className={`p-1 border-b border-black ${i % 2 === 0 ? "border-r" : ""}`}
                >
                  <span className="block font-bold">{label}</span>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BUYER / CONSIGNEE */}
          <div className="flex border-b border-black text-sm">
            <div className="w-1/2 border-r border-black p-3">
              <span className="font-bold text-xs uppercase text-gray-600 block mb-1">
                Buyer (Bill to)
              </span>
              <h3 className="font-bold">{data.buyerName || "BUYER NAME"}</h3>
              <p className="w-3/4">{data.buyerAddress || "Buyer Address"}</p>
              <p className="font-bold mt-1">{data.buyerCityZip}</p>
              <p>State: {data.buyerState}</p>
              <p className="mt-2">
                GSTIN/UIN: <span className="font-bold">{data.buyerGstin}</span>
              </p>
            </div>
            <div className="w-1/2 p-3">
              <span className="font-bold text-xs uppercase text-gray-600 block mb-1">
                Consignee (Ship to)
              </span>
              <h3 className="font-bold">
                {data.isConsigneeSame
                  ? data.buyerName || "BUYER NAME"
                  : data.consigneeName || "CONSIGNEE NAME"}
              </h3>
              <p className="w-3/4">
                {data.isConsigneeSame
                  ? data.buyerAddress || "Same as Buyer"
                  : data.consigneeAddress || "Consignee Address"}
              </p>
              <p className="font-bold mt-1">
                {data.isConsigneeSame
                  ? data.buyerCityZip
                  : data.consigneeCityZip}
              </p>
              <p>
                State:{" "}
                {data.isConsigneeSame ? data.buyerState : data.consigneeState}
              </p>
            </div>
          </div>

          {/* ITEMS HEADER */}
          <div className="flex text-xs font-bold text-center border-b border-black bg-gray-50 print:bg-white">
            <div className="w-[5%] border-r border-black py-2">Sl.</div>
            <div className="w-[40%] border-r border-black py-2">
              Description of Goods
            </div>
            <div className="w-[10%] border-r border-black py-2">HSN/SAC</div>
            <div className="w-[10%] border-r border-black py-2">Qty</div>
            <div className="w-[10%] border-r border-black py-2">Rate</div>
            <div className="w-[10%] border-r border-black py-2">Per</div>
            <div className="w-[15%] py-2">Amount</div>
          </div>

          {/* ITEMS BODY */}
          <div className="flex-1 flex flex-col">
            {data.items.map((item, idx) => (
              <div key={item.id} className="flex text-xs text-center">
                <div className="w-[5%] border-r border-black py-1 h-full">
                  {idx + 1}
                </div>
                <div className="w-[40%] border-r border-black py-1 text-left px-2 font-bold flex flex-col justify-between">
                  <span>{item.description}</span>
                  {(item.cgstRate > 0 || item.sgstRate > 0) && (
                    <div className="text-[10px] font-normal mt-1 flex justify-between px-4 text-gray-600">
                      <span>CGST @ {item.cgstRate}%</span>
                      <span>SGST @ {item.sgstRate}%</span>
                    </div>
                  )}
                </div>
                <div className="w-[10%] border-r border-black py-1">
                  {item.hsn}
                </div>
                <div className="w-[10%] border-r border-black py-1 font-bold">
                  {item.quantity}
                </div>
                <div className="w-[10%] border-r border-black py-1">
                  {item.rate.toLocaleString("en-IN")}
                </div>
                <div className="w-[10%] border-r border-black py-1">
                  {item.per}
                </div>
                <div className="w-[15%] py-1 font-bold text-right px-2">
                  {(item.quantity * item.rate).toFixed(2)}
                </div>
              </div>
            ))}
            {/* Spacer Rows to keep the paper looking full */}
            {data.items.length < 5 &&
              Array.from({ length: 5 - data.items.length }).map((_, i) => (
                <div
                  key={i}
                  className="flex text-xs text-center flex-1 min-h-[24px]"
                >
                  <div className="w-[5%] border-r border-black"></div>
                  <div className="w-[40%] border-r border-black"></div>
                  <div className="w-[10%] border-r border-black"></div>
                  <div className="w-[10%] border-r border-black"></div>
                  <div className="w-[10%] border-r border-black"></div>
                  <div className="w-[10%] border-r border-black"></div>
                  <div className="w-[15%]"></div>
                </div>
              ))}
          </div>

          {/* TOTALS & TAX */}
          <div className="border-t border-black text-xs">
            <div className="flex font-bold">
              <div className="w-[85%] text-right pr-2 py-1 border-r border-black">
                Total
              </div>
              <div className="w-[15%] text-right px-2 py-1">
                {totals.taxableValue.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="border-t border-black grid grid-cols-12 text-center text-xs font-bold bg-gray-50 print:bg-white">
            <div className="col-span-4 border-r border-black py-1">
              Taxable Value
            </div>
            <div className="col-span-4 border-r border-black py-1 flex">
              <div className="w-1/2 border-r border-black">CGST</div>
              <div className="w-1/2">Amount</div>
            </div>
            <div className="col-span-4 py-1 flex">
              <div className="w-1/2 border-r border-black">SGST</div>
              <div className="w-1/2">Amount</div>
            </div>
          </div>
          <div className="border-t border-black grid grid-cols-12 text-center text-xs">
            <div className="col-span-4 border-r border-black py-1 font-bold">
              {totals.taxableValue.toFixed(2)}
            </div>
            <div className="col-span-4 border-r border-black py-1 flex">
              <div className="w-1/2 border-r border-black">14%</div>
              <div className="w-1/2">{(totals.totalTax / 2).toFixed(2)}</div>
            </div>
            <div className="col-span-4 py-1 flex">
              <div className="w-1/2 border-r border-black">14%</div>
              <div className="w-1/2">{(totals.totalTax / 2).toFixed(2)}</div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-black flex items-center">
            <div className="w-1/2 p-2 border-r border-black text-xs">
              <span className="font-bold">Amount (in words):</span>
              <div className="italic mt-1 uppercase leading-snug">
                {data.amountInWords}
              </div>
            </div>
            <div className="w-1/2 flex bg-gray-100 print:bg-gray-100">
              <div className="w-1/2 p-2 font-bold text-right flex items-center justify-end">
                Grand Total:
              </div>
              <div className="w-1/2 p-2 font-bold text-lg text-right">
                ₹ {totals.grandTotal.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="border-t border-black flex flex-1 min-h-[100px]">
            <div className="w-1/2 p-2 text-xs border-r border-black">
              <h4 className="font-bold underline mb-2">Bank Details</h4>
              <p>
                Bank: <span className="font-bold">{data.bankName}</span>
              </p>
              <p>
                A/c No: <span className="font-bold">{data.accountNo}</span>
              </p>
              <p>
                IFSC: <span className="font-bold">{data.branchIfsc}</span>
              </p>
              <p>
                Holder: <span className="font-bold">{data.accountHolder}</span>
              </p>
            </div>
            <div className="w-1/2 p-2 flex flex-col justify-between text-center">
              <div className="text-xs font-bold text-right">
                for {data.sellerName || "SELLER"}
              </div>
              <div className="h-10"></div>
              <div className="text-xs font-bold text-right">
                Authorised Signatory
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] mt-2 text-gray-400">
          Computer Generated Invoice
        </div>
      </div>
    </div>
  );
};

export default InvoicePaper;
