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
            $('.form-input').css('border', '2px solid rgba(255, 0, 0, 0.253)')
            $('.wrong').css('display', 'block');
          }
    }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const name = $('#name-sign').val().trim();
  const email =  $('#email-sign').val().trim();
  const password = $('#password-sign').val().trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      if (pathname === '/signup') {
        document.location.replace('/addicon');
        $('.navigation').css('display', 'none')
      } else {
        document.location.replace('/dashboard');
      }
    } else {
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
    console.log('Works')
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

$('.login-form').on('submit', loginFormHandler);
$('.signup-form').on('submit', signupFormHandler);
$('#logout').on('click', logout);