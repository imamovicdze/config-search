const search = document.getElementById('search');
const listPosts = document.getElementById('listPosts');
let posts = [];

search.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredPosts = posts.filter((post) => {
        return (
            post.title.toLowerCase().includes(searchString) ||
            post.body.toLowerCase().includes(searchString)
        );
    });

    if (searchString.length === 0) {
        listPosts.innerHTML = '';
    } else if (filteredPosts.length === 0) {
        displayNotFound();
    } else {
        displayPosts(filteredPosts.slice(0, 5), searchString);
    }
});

const loadData = async() => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?q=lorem');
        posts = await res.json();
    } catch (err) {
        console.log(err);
    }
}

const displayPosts = (posts, searchString) => {
    var regex = new RegExp(searchString, 'g');

    const htmlString = posts
        .map((post) => {
            return `
                <li key=${post.id}>
                    <p>${post.title.substring(0, 40).replace(regex, '<b>' + searchString + '</b>')}...</p>
                    <p>${post.title.substring(0, 50).replace(regex, '<b>' + searchString + '</b>')}...</p>
                </li>
            `;
        })
        .join('');

    listPosts.innerHTML = htmlString;
};

const displayNotFound = () => {
    return listPosts.innerHTML =
        `<li>
            <p class="not-found"><b>Sorry, we couldn't find anything :(</b></p>
        </li>`;
};

loadData();