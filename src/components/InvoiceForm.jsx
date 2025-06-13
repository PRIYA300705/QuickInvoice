import React from 'react';
import { Plus, Trash2, Building, User, FileText, Calculator } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

function InvoiceForm({ invoiceData, setInvoiceData }) {
  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      business: {
        ...invoiceData.business,
        [name]: value,
      },
    });
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      client: {
        ...invoiceData.client,
        [name]: value,
      },
    });
  };

  const handleInvoiceDetailChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleAddItem = () => {
    const newItem = {
      id: uuidv4(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0,
    };
    
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, newItem],
    });
  };

  const handleRemoveItem = (id) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter(item => item.id !== id),
    });
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = invoiceData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === 'quantity' || field === 'unitPrice') {
          const quantity = field === 'quantity' ? Number(value) : item.quantity;
          const unitPrice = field === 'unitPrice' ? Number(value) : item.unitPrice;
          updatedItem.amount = quantity * unitPrice;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    const taxAmount = subtotal * (invoiceData.taxRate / 100);
    
    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
      subtotal,
      taxAmount,
      total: subtotal + taxAmount,
    });
  };

  const handleTaxRateChange = (e) => {
    const taxRate = Number(e.target.value);
    const taxAmount = invoiceData.subtotal * (taxRate / 100);
    
    setInvoiceData({
      ...invoiceData,
      taxRate,
      taxAmount,
      total: invoiceData.subtotal + taxAmount,
    });
  };

  return (
    <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
      {/* Business and Client Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Business Information */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Your Business</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
              <input
                type="text"
                name="name"
                value={invoiceData.business.name}
                onChange={handleBusinessChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Your Company Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
              <input
                type="text"
                name="address"
                value={invoiceData.business.address}
                onChange={handleBusinessChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="123 Business Street, City, State 12345"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={invoiceData.business.email}
                onChange={handleBusinessChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="contact@yourbusiness.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={invoiceData.business.phone}
                onChange={handleBusinessChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </div>
        
        {/* Client Information */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Client Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
              <input
                type="text"
                name="name"
                value={invoiceData.client.name}
                onChange={handleClientChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Client or Company Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Address</label>
              <input
                type="text"
                name="address"
                value={invoiceData.client.address}
                onChange={handleClientChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="123 Client Street, City, State 12345"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
              <input
                type="email"
                name="email"
                value={invoiceData.client.email}
                onChange={handleClientChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="client@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Phone</label>
              <input
                type="text"
                name="phone"
                value={invoiceData.client.phone}
                onChange={handleClientChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Invoice Details */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Invoice Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number *</label>
            <input
              type="text"
              name="invoiceNumber"
              value={invoiceData.invoiceNumber}
              onChange={handleInvoiceDetailChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm font-mono"
              placeholder="INV-001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date *</label>
            <input
              type="date"
              name="date"
              value={invoiceData.date}
              onChange={handleInvoiceDetailChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
            <input
              type="date"
              name="dueDate"
              value={invoiceData.dueDate}
              onChange={handleInvoiceDetailChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Items Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Calculator className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Invoice Items</h3>
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
          >
            <Plus size={16} className="mr-2" />
            Add Item
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5/12">Description</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Quantity</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Unit Price</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Amount</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoiceData.items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                        placeholder="Item description"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm text-center"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(item.id, 'unitPrice', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm text-center"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium text-gray-800">₹{item.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {invoiceData.items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Calculator className="h-12 w-12 text-gray-300 mb-2" />
                        <p>No items added yet. Click "Add Item" to begin.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Totals Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Subtotal:</span>
              <span className="text-lg font-semibold text-gray-800">₹{invoiceData.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Tax Rate (%):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={invoiceData.taxRate}
                  onChange={handleTaxRateChange}
                  className="w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm text-center"
                />
              </div>
              <span className="text-sm text-gray-600">₹{invoiceData.taxAmount.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-blue-600">₹{invoiceData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notes Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
        <textarea
          name="notes"
          value={invoiceData.notes}
          onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          placeholder="Payment terms, thank you message, or any additional information..."
          rows={4}
        />
      </div>
    </div>
  );
}

export default InvoiceForm;