const updatePost = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
  
      const response = await fetch(`/api/blog/update/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, description }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          console.log('ERROR')
        }
      }
  };
  
  $('#updateButton').on('click', updatePost);