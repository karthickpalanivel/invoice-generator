import React from "react";
import { InvoiceData } from "@/types";

const formatMoney = (value: number) =>
  value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const InvoicePaper = ({
  data,
  totals,
}: {
  data: InvoiceData;
  totals: {
    taxableValue: number;
    cgstAmount: number;
    sgstAmount: number;
    totalTax: number;
    grandTotal: number;
  };
}) => {
  const firstItem = data.items[0];
  const perUnit = firstItem?.per === "Nos" ? "" : firstItem?.per;

  return (
    <div className="bg-white shadow-xl origin-top scale-[0.42] sm:scale-[0.56] md:scale-[0.75] lg:scale-100 transition-transform print:scale-100 print:shadow-none">
      <div
        style={{ width: "210mm", minHeight: "297mm" }}
        className="mx-auto border border-black text-[15px] leading-tight font-sans"
      >
        <div className="text-center py-12 pb-4 font-semibold tracking-tight">TAX INVOICE</div>

        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="w-[50%] border border-black align-top p-2" rowSpan={6}>
                <div className="font-bold mb-3">{data.sellerName || "SWAMY & CO"}</div>
                <div>{data.sellerAddress1}</div>
                <div>{data.sellerAddress2}</div>
                <div>{data.sellerCityZip}</div>
                <div>PAN: {data.sellerPan}</div>
                <div>GSTIN: {data.sellerGstin}</div>
                <div>SEGMENT: TRADE</div>
                <div>STATE CODE &amp; NAME: {data.sellerState}</div>
              </td>
              <td className="w-[22%] border border-black p-2 align-top">
                <div>Invoice No.</div>
                <div className="font-bold">{data.invoiceNo}</div>
              </td>
              <td className="w-[28%] border border-black p-2 align-top">
                <div>Date</div>
                <div className="font-bold">{data.date}</div>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 h-9 align-top">Delivery Note</td>
              <td className="border border-black p-2 h-9 align-top">Mode / Terms of Payment</td>
            </tr>
            <tr>
              <td className="border border-black p-2 h-9 align-top">Reference No. &amp; Date</td>
              <td className="border border-black p-2 h-9 align-top">Other reference</td>
            </tr>
            <tr>
              <td className="border border-black p-2 h-9 align-top">Buyer’s Order No.</td>
              <td className="border border-black p-2 h-9 align-top">Dated</td>
            </tr>
            <tr>
              <td className="border border-black p-2 h-9 align-top">Dispatch Doc No.</td>
              <td className="border border-black p-2 h-9 align-top">Delivery Note Date</td>
            </tr>
            <tr>
              <td className="border border-black p-2 align-top">
                <div>Dispatched Through</div>
                <div className="font-bold">{data.dispatchedThrough}</div>
              </td>
              <td className="border border-black p-2 align-top">Destination</td>
            </tr>

            <tr>
              <td className="border border-black p-2 align-top">
                <div>Buyer (Bill to)</div>
                <div className="font-bold">{data.buyerName}</div>
                <div>{data.buyerAddress}</div>
                <div>{data.buyerCityZip}</div>
                <div>{data.buyerState}</div>
                <div>GSTIN/UIN : {data.buyerGstin}</div>
              </td>
              <td className="border border-black p-2 align-top">
                <div>Bill of Lading/ LR-RR</div>
              </td>
              <td className="border border-black p-2 align-top">
                <div>Motor Vehicle NO.</div>
                <div className="font-bold">{data.motorVehicleNo}</div>
              </td>
            </tr>

            <tr>
              <td className="border border-black p-2">Consignee (Ship to)</td>
              <td className="border border-black p-2">Terms of Delivery</td>
              <td className="border border-black p-2" />
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-1 w-[5%] text-left font-normal">Sl. no</th>
              <th className="border border-black p-1 w-[28%] text-left font-normal">Description of the goods</th>
              <th className="border border-black p-1 w-[17%] text-left font-normal">HSN/SAC</th>
              <th className="border border-black p-1 w-[12%] text-left font-normal">Quantity</th>
              <th className="border border-black p-1 w-[11%] text-left font-normal">Rate</th>
              <th className="border border-black p-1 w-[6%] text-left font-normal">Per</th>
              <th className="border border-black p-1 w-[21%] text-left font-normal">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 align-top">1</td>
              <td className="border border-black p-1 align-top">
                <div>{firstItem?.description}</div>
                <div className="h-14" />
                <div className="text-right text-[13px]">CGST@{firstItem?.cgstRate ?? 0}%</div>
                <div className="text-right text-[13px]">SGST@{firstItem?.sgstRate ?? 0}%</div>
              </td>
              <td className="border border-black p-1 align-top">{firstItem?.hsn}</td>
              <td className="border border-black p-1 align-top">{firstItem?.quantity}</td>
              <td className="border border-black p-1 align-top text-right">
                {firstItem ? firstItem.rate.toLocaleString("en-IN") : ""}
              </td>
              <td className="border border-black p-1 align-top">{perUnit}</td>
              <td className="border border-black p-1 align-top text-right">
                {firstItem && <div>{formatMoney(firstItem.quantity * firstItem.rate)}</div>}
                <div className="border-t border-black/40 mt-6 pt-1 text-[13px]">{formatMoney(totals.taxableValue)}</div>
                <div className="text-[13px]">{formatMoney(totals.cgstAmount)}</div>
                <div className="text-[13px]">{formatMoney(totals.sgstAmount)}</div>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1" />
              <td className="border border-black p-1 text-right text-[15px] font-bold">Total</td>
              <td className="border border-black p-1" />
              <td className="border border-black p-1 font-bold">
                {firstItem?.quantity} {perUnit}
              </td>
              <td className="border border-black p-1" />
              <td className="border border-black p-1" />
              <td className="border border-black p-1 text-right text-[15px] font-bold">₹ {formatMoney(totals.grandTotal)}</td>
            </tr>
          </tbody>
        </table>

        <div className="border-l border-r border-b border-black px-2 py-1 text-right text-[14px]">E. &amp; E.O</div>

        <div className="border-l border-r border-b border-black p-2 font-bold text-[15px]">
          {data.amountInWords || "INR TWO LAKH NINETY THOUSAND SIX HUNDRED AND FORTY EIGHT ONLY"}
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-1" rowSpan={2}>Taxable value</th>
              <th className="border border-black p-1" colSpan={2}>CGST</th>
              <th className="border border-black p-1" colSpan={2}>SGST</th>
              <th className="border border-black p-1" colSpan={1}>Total</th>
            </tr>
            <tr>
              <th className="border border-black p-1 font-normal">Rate</th>
              <th className="border border-black p-1 font-normal">Amount</th>
              <th className="border border-black p-1 font-normal">Rate</th>
              <th className="border border-black p-1 font-normal">Amount</th>
              <th className="border border-black p-1 font-normal">Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 text-right">{formatMoney(totals.taxableValue)}</td>
              <td className="border border-black p-1 text-center">{firstItem?.cgstRate ?? 0}%</td>
              <td className="border border-black p-1 text-right">{formatMoney(totals.cgstAmount)}</td>
              <td className="border border-black p-1 text-center">{firstItem?.sgstRate ?? 0}%</td>
              <td className="border border-black p-1 text-right">{formatMoney(totals.sgstAmount)}</td>
              <td className="border border-black p-1 text-right font-bold">{formatMoney(totals.grandTotal)}</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-right font-bold">Total&nbsp;&nbsp;{formatMoney(totals.taxableValue)}</td>
              <td className="border border-black p-1" />
              <td className="border border-black p-1 text-right">{formatMoney(totals.cgstAmount)}</td>
              <td className="border border-black p-1" />
              <td className="border border-black p-1 text-right">{formatMoney(totals.sgstAmount)}</td>
              <td className="border border-black p-1 text-right font-bold">{formatMoney(totals.grandTotal)}</td>
            </tr>
          </tbody>
        </table>

        <div className="border-l border-r border-b border-black p-2 text-[14px]">
          Tax Amount (in words) : <span className="font-bold">{data.amountInWords.replace(/^INR\s*/i, "")}</span>
        </div>

        <div className="border-l border-r border-b border-black grid grid-cols-2 min-h-[265px]">
          <div />
          <div className="border-l border-black p-2">
            <div>A/c Holder’s Name : <span className="font-bold">{data.accountHolder}</span></div>
            <div>Bank Name : <span className="font-bold">{data.bankName}</span></div>
            <div>A/c No. : <span className="font-bold">{data.accountNo}</span></div>
            <div>Branch &amp; IFSC Code : <span className="font-bold">{data.branchIfsc}</span></div>
            <div className="text-right font-bold mt-2">for {data.sellerName}</div>
            <div className="h-20" />
            <div className="text-right">Authorised Signatory</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePaper;
