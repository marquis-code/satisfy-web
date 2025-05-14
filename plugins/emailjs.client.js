export default defineNuxtPlugin(() => {
    if (process.client) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.type = "text/javascript";
      script.onload = () => {
        emailjs.init({
          publicKey: "q-OlS4tMTSeJQl4Xq",
        });
        console.log("EmailJS initialized!");
      };
      document.body.appendChild(script);
    }
  });
  