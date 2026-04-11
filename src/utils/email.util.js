const nodemailer = require("nodemailer");
require("dotenv").config();

// Configuración del transporter usando las variables de entorno para Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Contraseña de Aplicación de Gmail
  },
});

/**
 * Plantilla HTML básica y moderna para un recibo de pago
 */
const generarHtmlRecibo = (
  carnet,
  nombre,
  planName,
  monto,
  fecha,
  stripeId,
) => {
  // Obtener el nombre del mes de la fecha actual
  const nombreMes = new Date().toLocaleString("es-GT", { month: "long" });
  const mesCapitalizado =
    nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f5f7; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        
        <div style="text-align: right; color: #333; font-size: 13px; margin-bottom: 20px;">
          Referencia UMG 93XXXXXX
        </div>

        <div style="text-align: center; margin-bottom: 30px;">
          <div style="font-size: 26px; font-weight: bold; letter-spacing: 1px;">
            <span style="color: #4aa0d5;">MI</span> <span style="color: #1a365d;">UMG</span>
          </div>
        </div>

        <h2 style="color: #555555; font-weight: normal; font-size: 22px; margin-bottom: 15px;">Pago con Tarjeta de Crédito</h2>

        <p style="color: #555555; font-size: 14px; line-height: 1.6; margin-bottom: 25px;">
          ¡Hola <strong>${nombre}</strong>! Hemos recibido tu pago de <strong>${planName}</strong>. Toma en cuenta los siguientes datos:
        </p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #555555;">
          <tbody>
            <tr>
              <td style="padding: 12px 15px 12px 0; border-top: 1px solid #eeeeee; width: 40%; text-align: right; font-weight: bold;">No. de Autorización</td>
              <td style="padding: 12px 0; border-top: 1px solid #eeeeee; width: 60%;">${stripeId}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px 12px 0; border-top: 1px solid #eeeeee; text-align: right; font-weight: bold;">Fecha de Pago</td>
              <td style="padding: 12px 0; border-top: 1px solid #eeeeee;">${fecha}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px 12px 0; border-top: 1px solid #eeeeee; text-align: right; font-weight: bold;">Estudiante</td>
              <td style="padding: 12px 0; border-top: 1px solid #eeeeee;">${nombre + " (" + carnet + ")"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px 12px 0; border-top: 1px solid #eeeeee; text-align: right; font-weight: bold;">Tipo de Pago</td>
              <td style="padding: 12px 0; border-top: 1px solid #eeeeee;">${"Tarjeta de Crédito"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px 12px 0; border-top: 1px solid #eeeeee; text-align: right; font-weight: bold;">Semestre</td>
              <td style="padding: 12px 0; border-top: 1px solid #eeeeee;">${"2026/01"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px 12px 0; border-top: 1px solid #eeeeee; text-align: right; font-weight: bold;">Mes</td>
              <td style="padding: 12px 0; border-top: 1px solid #eeeeee;">${mesCapitalizado}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px 12px 0; border-top: 1px solid #eeeeee; border-bottom: 1px solid #eeeeee; text-align: right; font-weight: bold;">Monto</td>
              <td style="padding: 12px 0; border-top: 1px solid #eeeeee; border-bottom: 1px solid #eeeeee; font-weight: bold;">Q${monto}</td>
            </tr>
          </tbody>
        </table>

        <p style="color: #777777; font-size: 13px; line-height: 1.6; margin-top: 35px;">
          Si tienes alguna duda puedes escribir a <a href="mailto:soporte@umg.edu.gt" style="color: #4aa0d5; text-decoration: none;">soporte@umg.edu.gt</a> o llamar al 
          <a href="tel:+50224111800" style="color: #4aa0d5; text-decoration: none;">2411 1800 ext. 1223</a> de lunes a viernes de 08:00 a 16:30 hrs. o sábados de 07:00 a 12:00 hrs.
        </p>

        <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 40px;">
          © 2026 Universidad Mariano Gálvez de Guatemala
        </p>

      </div>
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="#" style="color: #5b7593; font-size: 11px; text-decoration: none;">Si no puedes ver este mensaje correctamente, presiona aquí</a>
      </div>
    </div>
  `;
};

/**
 * Enviar correo de confirmación de pago
 */
exports.enviarCorreoPago = async (
  emailDestino,
  carnet,
  nombre,
  planName,
  monto,
  stripeId,
) => {
  try {
    const fechaFormat = new Date().toLocaleString("es-GT", {
      timeZone: "America/Guatemala",
    });
    const htmlBody = generarHtmlRecibo(
      carnet,
      nombre,
      planName,
      monto,
      fechaFormat,
      stripeId,
    );

    const mailOptions = {
      from: `"Universidad Mariano Galvez de Guatemala" <${process.env.SMTP_USER}>`,
      to: emailDestino,
      subject: "[miUMG] Confirmación de Pago de Parqueo",
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente: " + info.response);
    return true;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    // No lanzamos excepcion para no botar el webhook, solo notificamos
    return false;
  }
};
