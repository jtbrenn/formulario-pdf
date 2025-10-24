import express from "express";
import bodyParser from "body-parser";
import PDFDocument from "pdfkit";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/generar-pdf", (req, res) => {
  const data = req.body;

  res.setHeader("Content-Disposition", "attachment; filename=formulario.pdf");
  res.setHeader("Content-Type", "application/pdf");

  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  doc.fontSize(20).text("Formulario completado", { align: "center" });
  doc.moveDown();

  const addSection = (title) => {
    doc.moveDown(0.8);
    doc.fontSize(14).fillColor("#1d2a30").text(title, { underline: true });
    doc.moveDown(0.3);
    doc.fillColor("black").fontSize(12);
  };

  addSection("Información básica");
  doc.text(`Nombre: ${data["fullname"] || ""}`);
  doc.text(`Email: ${data["email"] || ""}`);
  doc.text(`Teléfono: ${data["phone"] || ""}`);
  doc.text(`Compañía: ${data["company"] || ""}`);
  doc.text(`Fecha: ${data["experience-date"] || ""}`);

  addSection("Valoraciones");
  doc.text(`Satisfacción general: ${data["overall-satisfaction"] || ""}`);
  doc.text(`Calidad del servicio: ${data["service-quality"] || ""}`);
  doc.text(`Comunicación / soporte: ${data["support-rating"] || ""}`);
  doc.text(`¿Recomendaría?: ${data["recommendation"] || ""}`);

  addSection("Comentarios");
  doc.text(`Lo que más le gustó: ${data["liked-most"] || ""}`);
  doc.text(`Aspectos a mejorar: ${data["improvement"] || ""}`);
  doc.text(`Comentarios adicionales: ${data["additional-comments"] || ""}`);

  addSection("Detalles del servicio");
  doc.text(`Equipo de servicio: ${data["service-team"] || ""}`);
  doc.text(`Tipo de servicio: ${data["service-type"] || ""}`);
  doc.text(`Nombre/ID del proyecto: ${data["project-id"] || ""}`);

  addSection("Evaluación y características");
  doc.text(`Nivel de acuerdo: ${data["likert-scale"] || ""}`);
  const features = Array.isArray(data["features-used"])
    ? data["features-used"].join(", ")
    : data["features-used"] || "";
  doc.text(`Funciones más usadas: ${features}`);

  addSection("Consentimiento");
  doc.text(`Permite seguimiento: ${data["follow-up"] ? "Sí" : "No"}`);
  doc.text(`Permite uso público del testimonio: ${data["testimonial-consent"] ? "Sí" : "No"}`);

  doc.end();
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
