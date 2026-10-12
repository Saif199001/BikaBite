export interface WhatsAppOptions {
  type: 'general' | 'kitchen' | 'namkeen' | 'mithai' | 'wholesale' | 'bulk';
  itemName?: string;
  packSize?: string;
  quantity?: string | number;
  location?: string;
  requiredDate?: string;
  businessName?: string;
  orderType?: string;
}

export function buildWhatsAppLink(whatsappNumber: string, options: WhatsAppOptions): string {
  // Strip out any non-numeric characters for wa.me format
  const sanitizedNumber = whatsappNumber.replace(/\D/g, '');

  let message = '';

  switch (options.type) {
    case 'kitchen':
      message = `Hello Bika Bite Kitchen, I would like to enquire about placing an order.\n\nItem: ${options.itemName || '[Item Name]'}\n\nQuantity: ${options.quantity || '1'}\n\nDelivery or collection location: ${options.location || '[City / Area]'}\n\nPlease confirm availability and pricing.`;
      break;

    case 'namkeen':
      message = `Hello Bika Bite team, I am interested in your Namkeen range.\n\nProduct: ${options.itemName || '[Product Name]'}\n\nPack size: ${options.packSize || '[Pack Size]'}\n\nQuantity: ${options.quantity || '1'}\n\nPlease confirm availability, price and delivery options.`;
      break;

    case 'mithai':
      message = `Hello Bika Bite team, I would like to enquire about Mithai.\n\nProduct or gift box: ${options.itemName || '[Product Name]'}\n\nQuantity: ${options.quantity || '1 box'}\n\nRequired date: ${options.requiredDate || '[Date]'}\n\nDelivery city: ${options.location || '[City]'}\n\nPlease share availability and pricing.`;
      break;

    case 'wholesale':
      message = `Hello Bika Bite team, I am interested in a wholesale or distribution enquiry.\n\nBusiness name: ${options.businessName || '[Business Name]'}\n\nCity: ${options.location || '[City]'}\n\nProducts of interest: ${options.itemName || '[Products]'}\n\nPlease contact me to discuss your business terms.`;
      break;

    case 'bulk':
      message = `Hello Bika Bite team, I would like to enquire about a bulk order.\n\nOrder type: ${options.orderType || '[Order Type]'}\n\nProducts: ${options.itemName || '[Products]'}\n\nQuantity: ${options.quantity || '[Quantity]'}\n\nRequired date: ${options.requiredDate || '[Date]'}\n\nLocation: ${options.location || '[Location]'}\n\nPlease contact me to discuss the details.`;
      break;

    case 'general':
    default:
      message = `Hello Bika Bite team, I would like to know more about your products and services. Please assist me.`;
      break;
  }

  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`;
}

export function buildPhoneLink(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
