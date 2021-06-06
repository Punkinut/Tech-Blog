const newComment = async (event) => {
    event.preventDefault();

    const comment = $('#comment').val().trim();

    if (comment) {
        const response = await fetch('/api/blog/comment', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            console.log('ERROR')
          }
    }
};

$('#commentButton').on('click', newComment);