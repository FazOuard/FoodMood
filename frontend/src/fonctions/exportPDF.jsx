import jsPDF from 'jspdf';
import "jspdf-autotable"; 
import box from "../assets/icons/box.png"

const exportToPDF = (ingData) => {
    if (!Array.isArray(ingData) || ingData.length === 0) {
        console.error('No data provided or data is invalid.');
        return;
    }

    const doc = new jsPDF();

    const total = ingData.reduce((acc, item) => acc + parseFloat(item.TotalPriceForQuantity), 0);

    const headers = [[" ","Ingrédients", "Quantité", "Prix estimé"]];
    
    const data = ingData.map(item => ["O",
                                      item.IngredientName,
                                      `${item.QuantityNeeded} ${item.Unit}`,
                                      `${item.TotalPriceForQuantity.toFixed(2)} MAD`]);
    
    
    data.push(["", "", "", ""]);
    data.push(["", "", "Total", `${total} MAD`]);

    doc.autoTable({
    head: headers,
    body: data,
    startY: 10,
    columnStyles: {
        0: { cellWidth: 10, halign: 'center' },  // Centrer la case à cocher dans la première colonne
        1: { halign: 'left' },  // Aligner les ingrédients à gauche
        2: { halign: 'center' },  // Centrer les quantités
        3: { halign: 'right' },  // Aligner les prix à droite
    },
    });

    doc.save("Ingrédients.pdf");
};

export default exportToPDF;