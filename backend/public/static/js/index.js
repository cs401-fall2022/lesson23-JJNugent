import ViewBlogs from './views/ViewBlogs';
import CreateBlog from './views/CreateBlog';

const state = {
    blogs: [],
    selected: {},
};

const navigate = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    loadBlogs();
    const routes = [
        { path: '/', view: ViewBlogs },
        { path: '/create', view: CreateBlog },
        { path: '/edit', view: CreateBlog },
        { path: '/delete', view: () => console.log("View Blogs") },
    ];

    //Test route for match
    const possibleMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = possibleMatches.find(possibleMatch => possibleMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    document.querySelector('#content').innerHTML = await view.getHtml();
};

async function postBlog(e) {
    let blogTitle = document.querySelector('#blogTitle').value;
    let blogContent = document.querySelector('#blogContent').value;

    await fetch('/save', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({blogTitle: blogTitle, blogContent: blogContent})
    })
    .then(response => {
        if (response.status == 200){
            let text = document.querySelector('#text');
            text.innerHTML = 'Successfully saved blog.';
        }
    });

    loadBlogs();
}

async function updateBlog(e) {
    let blogTitle = document.querySelector('#blogTitle').value;
    let blogContent = document.querySelector('#blogContent').value;
    let id = state.selected._id;

    await fetch('/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: state.selected._id, blogTitle: blogTitle, blogContent: blogContent})
    })
    .then(response => {
        if (response.status == 200){
            let text = document.querySelector('#text');
            text.innerHTML = 'Successfully saved blog.';
        }
    });

    loadBlogs();
}

function loadBlogs() {
    fetch('/get', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => displayBlogs(data));
}

function displayBlogs(data) {
    state.blogs = data;

    let blogList = document.querySelector('#blogList');
    let container = document.createElement('div');
    container.setAttribute('id', 'blogContainer');

    data.forEach((blog, index) => {
        let blogDiv = document.createElement('div');
        blogDiv.setAttribute('class', 'blogDiv');
        blogDiv.setAttribute('key', index);
        if (state.selected._id == blog._id){
            blogDiv.style.backgroundColor = 'rgba(97, 86, 255, 0.5)';
        }
        blogDiv.addEventListener("click", e => {
            blogClicked(e);
        })
        blogDiv.innerHTML = blog.blogTitle;
        container.appendChild(blogDiv);
    });

    blogList.innerHTML = '';
    blogList.appendChild(container);
}

function blogClicked(e){
    state.selected = state.blogs[e.target.getAttribute('key')];
    displayBlogs(state.blogs);
    updateView();
}

function updateView(){
    if(location.pathname=='/'){
        document.querySelector('#blogTitle').innerHTML = state.selected.blogTitle;
        document.querySelector('#blogContent').innerHTML = state.selected.blogContent;
    }
    else if (location.pathname=='/edit'){
        document.querySelector('#blogTitle').value = state.selected.blogTitle;
        document.querySelector('#blogContent').value = state.selected.blogContent;
    }
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")){
            e.preventDefault();
            navigate(e.target.href);
        }
        else if (e.target.matches("[post-link]")){
            e.preventDefault();
            if (location.pathname=='/edit'){
                updateBlog(e);
            }
            else{
                postBlog(e);
            }
        }
    });

    router();
});