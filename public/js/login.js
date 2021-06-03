const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = $('#email-login').val().trim();
    const password = $('#password-login').val().trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
          } else {
            alert(response.statusText);
          }
    }
};

$('.login-form').on('submit', loginFormHandler);