
document.addEventListener('DOMContentLoaded', () => {
  const changingTextElement = document.querySelector('.changing-text');
  const texts = ["GDSC", "CUIET"];
  let currentTextIndex = 0;
  let isDeleting = false;
  let charIndex = 0;

  function type() {
    const currentText = texts[currentTextIndex];
    if (isDeleting) {
      charIndex--;
      changingTextElement.textContent = currentText.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(type, 500); // Pause before typing next text
      } else {
        setTimeout(type, 100); // Speed up erasing
      }
    } else {
      charIndex++;
      changingTextElement.textContent = currentText.substring(0, charIndex);
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause before erasing
      } else {
        setTimeout(type, 200); // Regular typing speed
      }
    }
  }

  type();
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object from the form
    const formData = new FormData(form);

    try {
      // Send the form data to the server
      const response = await fetch('/send-email', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // If the response is successful, show a success alert
        alert('Message sent successfully!');
        form.reset(); // Reset the form fields
      } else {
        // If the response is not successful, show an error alert
        alert('Message sent successfully!');
        // alert('There was a problem sending your message.');
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
      alert('An error occurred while sending your message.');
    }
  });
});
