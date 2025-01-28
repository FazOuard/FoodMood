import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const exportToPDF = (ingData) => {

  const pdf = new jsPDF('p', 'mm', 'a4'); 

  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.style.width = '100%';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  ['Ingrédient', 'Quantité', 'Unité', 'Prix total'].forEach((headerText) => {
    const th = document.createElement('th');
    th.textContent = headerText;
    th.style.border = '1px solid #000';
    th.style.padding = '8px';
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  ingData.forEach((item) => {
    const row = document.createElement('tr');
    [item.IngredientName, item.QuantityNeeded.toFixed(2), item.Unit, item.TotalPriceForQuantity.toFixed(2)].forEach((text) => {
      const td = document.createElement('td');
      td.textContent = text;
      td.style.border = '1px solid #000';
      td.style.padding = '8px';
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.appendChild(table);
  document.body.appendChild(tempContainer);

  html2canvas(tempContainer).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    const imgWidth = 190; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width; 
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

    document.body.removeChild(tempContainer);

    pdf.save('ingredients.pdf');
  });
};
export default exportToPDF;