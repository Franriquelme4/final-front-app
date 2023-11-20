import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';

export const handleGeneratePDF = async (venta) => {
    console.log('Generando PDF...');
    console.log(venta.productos)
    try {
        // Crear el contenido HTML del PDF
        const pdfContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              font-size: 24px;
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Factura de Venta</h1>
          <p><strong>Venta ID:</strong> ${ venta.id }</p>
          <p><strong>RUC:</strong> ${ venta.ruc }</p>
          <p><strong>Total:</strong> ${ venta.total } Gs.</p>
          <table>
            <thead>
              <tr>
                <th>Producto ID</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              ${ venta.productos.map((producto) => `
                <tr>
                  <td>${ producto.id }</td>
                  <td>${ producto.cantidad }</td>
                </tr>
              `).join('') }
            </tbody>
          </table>
        </body>
      </html>
    `;

        // Generar el PDF
        const { uri } = await Print.printToFileAsync({
            html: pdfContent,
            width: 612, // Ancho estándar de una página en puntos (8.5 pulgadas)
            height: 792, // Alto estándar de una página en puntos (11 pulgadas)
        });

        // Mover el PDF a un directorio accesible
        const pdfUri = `${ FileSystem.cacheDirectory }venta_${ venta.id }.pdf`;
        await FileSystem.moveAsync({
            from: uri,
            to: pdfUri,
        });

        // Abre el visor de PDF en Expo Go
        await Print.printAsync({ uri: pdfUri });
    } catch (error) {
        console.error('Error al generar el PDF:', error);
    }
};
