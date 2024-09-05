// Show modal to create new post
document.getElementById('createPostButton').addEventListener('click', function () {
    var myModal = new bootstrap.Modal(document.getElementById('postModal'));
    myModal.show();
});

// Handle post submission
document.getElementById('postForm').addEventListener('submit', addPost);

function addPost(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const postElement = document.createElement('div');
    postElement.classList.add('post', 'p-3', 'mb-3', 'bg-light', 'rounded');
    postElement.innerHTML = `
        <h4>${title}</h4>
        <p>${content}</p>
        <button class="btn btn-danger" onclick="deletePost(this)">Delete</button>
    `;

    document.getElementById('postsContainer').appendChild(postElement);
    document.getElementById('postForm').reset();

    // Hide modal after submission
    var postModal = bootstrap.Modal.getInstance(document.getElementById('postModal'));
    postModal.hide();
}

function deletePost(post) {
    post.parentElement.remove();
}
