
const { jsPDF } = window.jspdf;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const entries = [...formData.entries()];

    // Crear documento 
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Formulario completado", 10, y);
    y += 10;

    const fecha = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Generado el: ${fecha}`, 10, y);
    y += 10;

    doc.setFontSize(12);
    entries.forEach(([key, value]) => {
      if (value.trim() !== "") {
        doc.text(`${key}: ${value}`, 10, y);
        y += 8;
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      }
    });

    doc.save("formulario.pdf");
  });
});