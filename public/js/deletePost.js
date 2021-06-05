const deletePost = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/blog/:id', {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log('ERROR')
      }

};

$('#deleteButton').on('click', deletePost);