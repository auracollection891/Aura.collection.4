function sendAutoWA(event) {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  // Your Twilio Details
  const sid = "ACb15b8dad70642f5d0bd798776e5281e9";
  const token = "9f3dd189502e9ba86ddd2a228037f1c4";
  const fromNum = "whatsapp:+19039138295"; // Your Twilio Sandbox Number

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;

  // Twilio requires Basic Auth (SID:Token encoded in Base64)
  const auth = btoa(`${sid}:${token}`);

  const formData = new URLSearchParams();
  formData.append("From", fromNum);
  formData.append("To", `whatsapp:+91${phone}`);
  formData.append("Body", `Order Confirmed! Hello ${name}, we got your order.`);

  fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData
  })
  .then(response => {
    if (response.ok) {
       // Trigger your animation here!
       showConfirmationAnimation();
    } else {
       console.error("Twilio Error:", response.statusText);
    }
  })
  .catch(error => console.error("Request Failed:", error));
}
