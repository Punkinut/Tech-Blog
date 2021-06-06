const newComment = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('post-id');
    const comment = $('#comment').val().trim();

    if (comment) {
        const response = await fetch(`/api/blog/comment/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            document.location.replace(`/page/comment/${id}`);
          } else {
            console.log('ERROR')
          }
    }
};

$('#commentButton').on('click', newComment);