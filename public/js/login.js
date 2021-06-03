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
            document.location.replace('/dashboard');
          } else {
            console.log('Not working')
            $('.form-input').css('border', '2px solid rgba(255, 0, 0, 0.253)')
            $('.wrong').css('display', 'block');
          }
    }
};

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

$('.login-form').on('submit', loginFormHandler);
$('#logout').on('click', logout);