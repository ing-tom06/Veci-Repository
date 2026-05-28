exports.sendConfirmationEmail = async (nombre, correo) => {
  try {
    const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
    const templateId = process.env.EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = process.env.EMAILJS_PUBLIC_KEY?.trim();
    const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.warn('EmailJS variables missing, skipping confirmation email.');
      return;
    }

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        nombre: nombre || 'Usuario',
        correo: correo
      }
    };

    console.log(`Sending EmailJS request for ${correo}...`);

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Confirmation email sent successfully via EmailJS');
    } else {
      const errorText = await response.text();
      console.error('Failed to send confirmation email via EmailJS:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        requestPayload: {
          ...data,
          accessToken: '***HIDDEN***'
        }
      });
    }
  } catch (error) {
    console.error('Error executing fetch for EmailJS:', error.message);
  }
};
