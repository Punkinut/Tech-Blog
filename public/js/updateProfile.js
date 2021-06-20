const updateProfile = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const description = $('#edit-description').val().trim();

      if (description) {
        const response = await fetch(`/api/blog/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ description }),
            headers: { 'Content-Type': 'application/json' },
          });
    
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            console.log('ERROR')
          }
      }
      }
  };
  
  $('#updateProfile').on('click', updateProfile);