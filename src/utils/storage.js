import { v4 as uuidv4 } from 'uuid';

export const saveInvoice = (invoice) => {
  const id = uuidv4();
  const name = `${invoice.client.name || 'Untitled'} - ${invoice.invoiceNumber}`;
  
  localStorage.setItem(`invoice_${id}`, JSON.stringify(invoice));
  
  const savedInvoices = getSavedInvoices();
  const updatedInvoices = [...savedInvoices, { id, name }];
  localStorage.setItem('invoice_index', JSON.stringify(updatedInvoices));
  
  return id;
};

export const getSavedInvoices = () => {
  const savedInvoices = localStorage.getItem('invoice_index');
  return savedInvoices ? JSON.parse(savedInvoices) : [];
};

export const deleteSavedInvoice = (id) => {
  localStorage.removeItem(`invoice_${id}`);
  
  const savedInvoices = getSavedInvoices();
  const updatedInvoices = savedInvoices.filter(invoice => invoice.id !== id);
  localStorage.setItem('invoice_index', JSON.stringify(updatedInvoices));
};