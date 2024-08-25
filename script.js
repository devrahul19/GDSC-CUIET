
// for the welcome transisitonss
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

// Sending Mails(not public)
document.addEventListener('submit', function(e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Please wait..."

  fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: json
      })
      .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
              result.innerHTML = json.message;
          } else {
              console.log(response);
              result.innerHTML = json.message;
          }
      })
      .catch(error => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
      })
      .then(function() {
          form.reset();
          setTimeout(() => {
              result.style.display = "none";
          }, 3000);
      });
});