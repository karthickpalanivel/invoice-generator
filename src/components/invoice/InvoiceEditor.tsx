import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { InvoiceData } from "@/types";
import { useInvoice } from "@/hooks/useInvoice";
import { InputGroup } from "@/components/ui/InputGroup";
import { SectionHeader } from "@/components/ui/Section";

const InvoiceEditor = ({
  data,
  actions,
}: {
  data: InvoiceData;
  actions: ReturnType<typeof useInvoice>;
}) => {
  const [openSection, setOpenSection] = useState<string>("seller");

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Seller Section */}
      <SectionHeader
        title="Seller Information"
        isOpen={openSection === "seller"}
        toggle={() => setOpenSection(openSection === "seller" ? "" : "seller")}
      />
      {openSection === "seller" && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
          <InputGroup
            label="Company Name"
            value={data.sellerName}
            onChange={(v) => actions.updateField("sellerName", v)}
            className="md:col-span-2"
          />
          <InputGroup
            label="Address Line 1"
            value={data.sellerAddress1}
            onChange={(v) => actions.updateField("sellerAddress1", v)}
          />
          <InputGroup
            label="Address Line 2"
            value={data.sellerAddress2}
            onChange={(v) => actions.updateField("sellerAddress2", v)}
          />
          <InputGroup
            label="City & Zip"
            value={data.sellerCityZip}
            onChange={(v) => actions.updateField("sellerCityZip", v)}
          />
          <InputGroup
            label="State"
            value={data.sellerState}
            onChange={(v) => actions.updateField("sellerState", v)}
          />
          <InputGroup
            label="PAN"
            value={data.sellerPan}
            onChange={(v) => actions.updateField("sellerPan", v)}
          />
          <InputGroup
            label="GSTIN"
            value={data.sellerGstin}
            onChange={(v) => actions.updateField("sellerGstin", v)}
          />
        </div>
      )}

      {/* Logistics Section */}
      <SectionHeader
        title="Invoice Logistics"
        isOpen={openSection === "logistics"}
        toggle={() =>
          setOpenSection(openSection === "logistics" ? "" : "logistics")
        }
      />
      {openSection === "logistics" && (
        <div className="p-4 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
          <InputGroup
            label="Invoice No"
            value={data.invoiceNo}
            onChange={(v) => actions.updateField("invoiceNo", v)}
          />
          <InputGroup
            label="Date"
            value={data.date}
            onChange={(v) => actions.updateField("date", v)}
          />
          <InputGroup
            label="Dispatched Through"
            value={data.dispatchedThrough}
            onChange={(v) => actions.updateField("dispatchedThrough", v)}
          />
          <InputGroup
            label="Destination"
            value={data.destination}
            onChange={(v) => actions.updateField("destination", v)}
          />
          <InputGroup
            label="Vehicle No"
            value={data.motorVehicleNo}
            onChange={(v) => actions.updateField("motorVehicleNo", v)}
          />
          <InputGroup
            label="Terms"
            value={data.termsOfDelivery}
            onChange={(v) => actions.updateField("termsOfDelivery", v)}
          />
          <InputGroup
            label="Buyer Order No."
            value={data.buyerOrderNo}
            onChange={(v) => actions.updateField("buyerOrderNo", v)}
          />
          <InputGroup
            label="Buyer Order Date"
            value={data.buyerOrderDate}
            onChange={(v) => actions.updateField("buyerOrderDate", v)}
          />
        </div>
      )}

      {/* Buyer Section */}
      <SectionHeader
        title="Buyer & Consignee"
        isOpen={openSection === "buyer"}
        toggle={() => setOpenSection(openSection === "buyer" ? "" : "buyer")}
      />
      {openSection === "buyer" && (
        <div className="p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded">
            <h4 className="font-bold text-sm text-blue-800 mb-2">
              Billing Details (Buyer)
            </h4>
            <InputGroup
              label="Buyer Name"
              value={data.buyerName}
              onChange={(v) => actions.updateField("buyerName", v)}
            />
            <InputGroup
              label="Address"
              value={data.buyerAddress}
              onChange={(v) => actions.updateField("buyerAddress", v)}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="City/Zip"
                value={data.buyerCityZip}
                onChange={(v) => actions.updateField("buyerCityZip", v)}
              />
              <InputGroup
                label="GSTIN"
                value={data.buyerGstin}
                onChange={(v) => actions.updateField("buyerGstin", v)}
              />
              <InputGroup
                label="State"
                value={data.buyerState}
                onChange={(v) => actions.updateField("buyerState", v)}
              />
            </div>
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-gray-800">
                Shipping Details (Consignee)
              </h4>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.isConsigneeSame}
                  onChange={(e) =>
                    actions.updateField("isConsigneeSame", e.target.checked)
                  }
                  className="rounded"
                />
                Same as Buyer
              </label>
            </div>
            {!data.isConsigneeSame && (
              <div className="animate-in fade-in">
                <InputGroup
                  label="Consignee Name"
                  value={data.consigneeName}
                  onChange={(v) => actions.updateField("consigneeName", v)}
                />
                <InputGroup
                  label="Address"
                  value={data.consigneeAddress}
                  onChange={(v) => actions.updateField("consigneeAddress", v)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="City/Zip"
                    value={data.consigneeCityZip}
                    onChange={(v) => actions.updateField("consigneeCityZip", v)}
                  />
                  <InputGroup
                    label="State"
                    value={data.consigneeState}
                    onChange={(v) => actions.updateField("consigneeState", v)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Items Section */}
      <SectionHeader
        title="Line Items"
        isOpen={openSection === "items"}
        toggle={() => setOpenSection(openSection === "items" ? "" : "items")}
      />
      {openSection === "items" && (
        <div className="p-4 animate-in slide-in-from-top-2">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="mb-6 p-4 bg-gray-50 rounded border border-gray-200 relative group"
            >
              <button
                onClick={() => actions.removeItem(index)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-8">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Description
                  </label>
                  <input
                    className="w-full p-2 text-sm border rounded"
                    value={item.description}
                    onChange={(e) =>
                      actions.updateItem(index, "description", e.target.value)
                    }
                    placeholder="Item Name"
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    HSN/SAC
                  </label>
                  <input
                    className="w-full p-2 text-sm border rounded"
                    value={item.hsn}
                    onChange={(e) =>
                      actions.updateItem(index, "hsn", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Qty
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 text-sm border rounded"
                    value={item.quantity}
                    onChange={(e) =>
                      actions.updateItem(
                        index,
                        "quantity",
                        parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Rate
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 text-sm border rounded"
                    value={item.rate}
                    onChange={(e) =>
                      actions.updateItem(
                        index,
                        "rate",
                        parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Total
                  </label>
                  <div className="w-full p-2 text-sm bg-gray-200 rounded text-right font-mono">
                    {(item.quantity * item.rate).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={actions.addItem}
            className="w-full py-3 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 rounded border border-dashed border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Plus size={16} /> Add New Item
          </button>
        </div>
      )}

      {/* Bank Section */}
      <SectionHeader
        title="Bank & Footer"
        isOpen={openSection === "bank"}
        toggle={() => setOpenSection(openSection === "bank" ? "" : "bank")}
      />
      {openSection === "bank" && (
        <div className="p-4 grid grid-cols-1 gap-4 animate-in slide-in-from-top-2">
          <InputGroup
            label="Bank Name"
            value={data.bankName}
            onChange={(v) => actions.updateField("bankName", v)}
          />
          <InputGroup
            label="Account No"
            value={data.accountNo}
            onChange={(v) => actions.updateField("accountNo", v)}
          />
          <InputGroup
            label="Branch & IFSC"
            value={data.branchIfsc}
            onChange={(v) => actions.updateField("branchIfsc", v)}
          />
          <div className="mt-2">
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
              Amount In Words
            </label>
            <textarea
              value={data.amountInWords}
              onChange={(e) =>
                actions.updateField("amountInWords", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded text-sm h-16 resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceEditor;
