import React from 'react';

function InvoicePreview({ invoiceData }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div id="invoice-preview" className="bg-white border border-gray-200 rounded-xl shadow-lg max-w-4xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-sm opacity-90">Invoice #</p>
              <p className="text-lg font-semibold">{invoiceData.invoiceNumber || 'INV-001'}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="space-y-1">
              <p className="text-sm opacity-90">Date: <span className="font-medium">{formatDate(invoiceData.date)}</span></p>
              <p className="text-sm opacity-90">Due Date: <span className="font-medium">{formatDate(invoiceData.dueDate)}</span></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Business and Client Info */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* From */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">From</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                {invoiceData.business.name || 'Your Business Name'}
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{invoiceData.business.address || 'Your Business Address'}</p>
                <p>{invoiceData.business.email || 'your.email@business.com'}</p>
                <p>{invoiceData.business.phone || '(123) 456-7890'}</p>
              </div>
            </div>
          </div>
          
          {/* To */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Bill To</h3>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                {invoiceData.client.name || 'Client Name'}
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{invoiceData.client.address || 'Client Address'}</p>
                <p>{invoiceData.client.email || 'client@email.com'}</p>
                <p>{invoiceData.client.phone || '(123) 456-7890'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Items Table */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Invoice Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoiceData.items.length > 0 ? (
                  invoiceData.items.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-4 px-4 text-sm text-gray-800">
                        {item.description || 'Item Description'}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-800 text-center">
                        {item.quantity}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-800 text-center">
                        ₹{item.unitPrice.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-800 text-right">
                        ₹{item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>No items added yet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-full md:w-80">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Subtotal:</span>
                  <span className="text-lg text-gray-800">₹{invoiceData.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Tax ({invoiceData.taxRate}%):
                  </span>
                  <span className="text-lg text-gray-800">₹{invoiceData.taxAmount.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{invoiceData.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notes */}
        {invoiceData.notes && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Notes</h3>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 whitespace-pre-line">{invoiceData.notes}</p>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Thank you for your business! • Generated with QuickInvoice
          </p>
        </div>
      </div>
    </div>
  );
}

export default InvoicePreview;