const heartsBlogHandler = async (event) => {
    event.preventDefault()
    const id = event.target.getAttribute('data-update-id')
    if (id) {
        const response = await fetch(`/api/blog/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        if(response.ok) {
            document.location.reload();
        } else {
            console.log('ERROR')
        }
    }
}

const unheartBlogHandler = async (event) => {
    event.preventDefault()
    const id = event.target.getAttribute('data-update-id')
    if (id) {
        const response = await fetch(`/api/blog/deleteLike/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        if(response.ok) {
            document.location.reload();
        } else {
            console.log('ERROR')
        }
    }
}

$('.non-heart').on('click', heartsBlogHandler)
$('.heart').on('click', unheartBlogHandler)
