const updateIcon = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const picture = event.target.getAttribute('value');
      

        const response = await fetch(`/api/users/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ picture }),
            headers: { 'Content-Type': 'application/json' },
          });
    
          if (response.ok) {
            document.location.replace(`/profile/${id}`);
          } else {
            console.log('ERROR')
          }
      }
  };

  $('.chooseImage').on('click', updateIcon);