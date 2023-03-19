const blogbutton = document.getElementById('newBlog');
const blogForm = document.querySelector('#blogForm');

async function newBlog() {
    // event.preventDefault();

    const titleValue = document.querySelector('#title').value.trim();
    const bodyValue = document.querySelector('#body').value;
    console.log(titleValue);
    console.log(bodyValue);
    const blog = {
        title: titleValue,
        body: bodyValue,
    };
    const response = await fetch('/api/blogs/blog', {
        body: JSON.stringify(blog),
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    });

    if (response.ok) {
        // If successful, redirect the browser to the profile page
        // window.location.reload();
    } else {
        // If not successful, alert the user to try again
        alert("Did not save!");
    }
    // reset the form
    blogForm.reset();
};

blogbutton.addEventListener('click', () => newBlog());