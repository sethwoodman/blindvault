//forms.js: helpers every form page shares. Include it before the page's own script.

// show a message under a field
function setFieldError(input, message) {
  const errorText = document.querySelector('#' + input.id + '-error');
  errorText.textContent = message;

  if (message) {
    input.setAttribute('aria-invalid', 'true');
  } else {
    input.removeAttribute('aria-invalid');
  }
}
// make a Show/Hide button work
function setupPasswordToggle(toggleButton, passwordInput) {
  toggleButton.addEventListener('click', function () {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    toggleButton.textContent = isHidden ? 'Hide' : 'Show';
    toggleButton.setAttribute('aria-pressed', String(isHidden));
  });
}

// Passwords are typed blind, so Caps Lock is an easy way to get locked out. warn while Caps Lock is on

function setupCapsLockHint(passwordInput, hintElement) {
  function check(event) {
    // Browser autofill sends fake key events without getModifierState, so check first.
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    hintElement.textContent = capsOn ? 'Caps Lock is on.' : '';
  }
  passwordInput.addEventListener('keydown', check);
  passwordInput.addEventListener('keyup', check);
  passwordInput.addEventListener('blur', function () { hintElement.textContent = ''; });
}
