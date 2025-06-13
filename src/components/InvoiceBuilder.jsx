import React, { useState } from 'react';
import { FileText, FileDown, Save, Trash2, Plus, Zap } from 'lucide-react';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import { generatePDF } from '../utils/pdfGenerator';
import { saveInvoice, getSavedInvoices, deleteSavedInvoice } from '../utils/storage';

const emptyInvoice = {
  invoiceNumber: `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
  date: new Date().toISOString().slice(0, 10),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  business: {
    name: '',
    address: '',
    email: '',
    phone: ''
  },
  client: {
    name: '',
    address: '',
    email: '',
    phone: ''
  },
  items: [],
  subtotal: 0,
  taxRate: 0,
  taxAmount: 0,
  total: 0,
  notes: ''
};

function InvoiceBuilder() {
  const [invoiceData, setInvoiceData] = useState(emptyInvoice);
  const [savedInvoices, setSavedInvoices] = useState(getSavedInvoices());
  const [activeTab, setActiveTab] = useState('edit');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveInvoice = () => {
    setIsLoading(true);
    setTimeout(() => {
      const savedId = saveInvoice(invoiceData);
      setSavedInvoices(getSavedInvoices());
      setIsLoading(false);
      // Show success message with better styling
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      successDiv.innerHTML = '✓ Invoice saved successfully!';
      document.body.appendChild(successDiv);
      setTimeout(() => {
        successDiv.style.transform = 'translateX(400px)';
        setTimeout(() => document.body.removeChild(successDiv), 300);
      }, 2000);
    }, 500);
  };
  
  const handleLoadInvoice = (id) => {
    const loaded = JSON.parse(localStorage.getItem(`invoice_${id}`));
    setInvoiceData(loaded);
    setActiveTab('edit');
  };
  
  const handleDeleteInvoice = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      deleteSavedInvoice(id);
      setSavedInvoices(getSavedInvoices());
    }
  };
  
  const handleExportPDF = () => {
    setIsLoading(true);
    setTimeout(() => {
      generatePDF('invoice-preview', `QuickInvoice-${invoiceData.invoiceNumber}`);
      setIsLoading(false);
    }, 500);
  };
  
  const handleCreateNew = () => {
    if (window.confirm('Create a new invoice? This will clear the current form.')) {
      setInvoiceData({
        ...emptyInvoice,
        invoiceNumber: `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`
      });
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Panel - Form */}
        <div className={`${activeTab === 'edit' ? 'block' : 'hidden'} lg:block lg:w-3/5 border-r border-gray-100`}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-600" />
                  Invoice Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">Fill in your business and client information</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleSaveInvoice}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  <Save size={16} className="mr-2" />
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button 
                  onClick={handleCreateNew}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
                >
                  <Plus size={16} className="mr-2" />
                  New
                </button>
                <button 
                  onClick={() => setActiveTab('preview')}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 flex items-center lg:hidden shadow-md hover:shadow-lg"
                >
                  <FileText size={16} className="mr-2" />
                  Preview
                </button>
              </div>
            </div>
          </div>
          
          <InvoiceForm 
            invoiceData={invoiceData} 
            setInvoiceData={setInvoiceData} 
          />
          
          {savedInvoices.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Saved Invoices ({savedInvoices.length})
              </h3>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                {savedInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-800 truncate block">{invoice.name}</span>
                      <span className="text-xs text-gray-500">Click to load</span>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button 
                        onClick={() => handleLoadInvoice(invoice.id)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Load invoice"
                      >
                        <FileText size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteInvoice(invoice.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete invoice"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Panel - Preview */}
        <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block lg:w-2/5`}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Live Preview</h2>
                <p className="text-sm text-gray-600 mt-1">See how your invoice will look</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleExportPDF}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex items-center shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  <FileDown size={16} className="mr-2" />
                  {isLoading ? 'Generating...' : 'Export PDF'}
                </button>
                <button 
                  onClick={() => setActiveTab('edit')}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center lg:hidden shadow-md hover:shadow-lg"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 overflow-auto max-h-[calc(100vh-250px)] bg-gray-50">
            <InvoicePreview invoiceData={invoiceData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceBuilder;