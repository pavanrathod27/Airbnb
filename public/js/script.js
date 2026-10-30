(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();

(() => {
  const FLASH_TIMEOUT = 3000; 

  document.querySelectorAll('.flash-msg').forEach(alertEl => {
    setTimeout(() => {
      bootstrap.Alert.getOrCreateInstance(alertEl).close();
    }, FLASH_TIMEOUT);
  });
})();
