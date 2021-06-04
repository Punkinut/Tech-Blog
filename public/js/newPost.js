const newPost = async (event) => {
    event.preventDefault();

    const title = $('#post-title').val().trim();
    const description = $('#post-description').val().trim();

    if (title && description) {
        const response = await fetch('/api/blog/post', {
            method: 'POST',
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

$('#postButton').on('click', newPost);