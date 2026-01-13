import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import QRCode from 'qrcode'; 

pdfMake.vfs = pdfFonts.vfs;

export const generarTicketPDF = async (saleCreated: any, products: any[]) => {
  const logoUrl = "https://res.cloudinary.com/dlamufioy/image/upload/v1755733945/puntocom/3_paawzo.png";

  const logoBase64 = await fetch(logoUrl)
    .then(res => res.blob())
    .then(
      blob =>
        new Promise(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        })
    );

  const qrBase64 = await QRCode.toDataURL(saleCreated.sale.saleCode);

  const content: any[] = [
    {
      image: logoBase64,
      width: 60,
      alignment: 'center',
      margin: [0, 0, 0, 4],
    },
    {
      text: 'Ticket de venta',
      alignment: 'center',
      bold: true,
      margin: [0, 0, 0, 4],
    },
    {
      text: `Folio: ${saleCreated.sale.saleCode}`,
      margin: [0, 0, 0, 2],
    },
    {
      text: `Fecha: ${new Date(saleCreated.sale.saleDate).toLocaleString()}`,
      margin: [0, 0, 0, 2],
    },
  ];

  if (saleCreated.sale.User?.name) {
    content.push({
      text: `Vendedor: ${saleCreated.sale.User.name}`,
      margin: [0, 0, 0, 2],
    });
  }

  content.push(
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }] },
    {
      text: '\nProductos:\n',
      bold: true,
    },
    {
      layout: 'noBorders',
      table: {
        widths: ['*', 'auto', 'auto', 'auto'],
        body: products.map(({ product, quantity, discount, unitPrice }) => {
          const subtotal = quantity * unitPrice - discount;
          return [
            {
              text: product?.name ?? 'Producto',
              margin: [0, 2, 0, 0],
              fontSize: 8
            },
            {
              text: `x${quantity}`,
              alignment: 'right',
              margin: [0, 2, 0, 0],
              fontSize: 8
            },
            {
              text: `$${unitPrice.toFixed(2)}`,
              alignment: 'right',
              margin: [0, 2, 0, 0],
              fontSize: 8
            },
            {
              text: `$${subtotal.toFixed(2)}`,
              alignment: 'right',
              margin: [0, 2, 0, 0],
              fontSize: 8
            },
          ];
        }),
      },
    },
    {
      text: '\n',
      margin: [0, 0, 0, 0],
    },
    {
      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }],
    },
    {
      text: `\nTOTAL: $${saleCreated.sale.saleTotal.toFixed(2)}`,
      alignment: 'right',
      bold: true,
      fontSize: 11,
    },
    {
      image: qrBase64,
      width: 80,
      alignment: 'center',
      margin: [0, 10, 0, 0],
    },
    {
      text: '\n¡Gracias por su compra!',
      alignment: 'center',
      margin: [0, 5, 0, 0],
    }
  );  

  const docDefinition: TDocumentDefinitions  = {
    pageSize: {
      width: 220,
      height: 'auto',
    },
    pageMargins: [10, 10, 10, 10],
    defaultStyle: {
      fontSize: 9,
    },
    content,
  };

  pdfMake.createPdf(docDefinition).download(`ticket-${saleCreated.sale.saleCode}.pdf`);
};
