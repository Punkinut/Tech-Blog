const deletePost = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');


    const response = await fetch(`/api/blog/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log('ERROR')
      }
    }
};

$('#deleteButton').on('click', deletePost);