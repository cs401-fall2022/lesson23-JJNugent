import ViewBlogs from './views/ViewBlogs';
import CreateBlog from './views/CreateBlog';
import DeleteBlog from './views/DeleteBlog';
import EditBlog from './views/EditBlog';

//Maintain state for application - track blogs, and a selected blog, if any
const state = {
    blogs: [],
    selected: {}
};

//Push state to allow forward and backward navigation without page changing
const navigate = url => {
    history.pushState(null, null, url);
    router();
    state.selected = {};
}

//Router function matches location.pathname against routes object and serves view
const router = async () => {
    loadBlogs();
    const routes = [
        { path: '/', view: ViewBlogs },
        { path: '/create', view: CreateBlog },
        { path: '/edit', view: EditBlog },
        { path: '/delete', view: DeleteBlog },
    ];

    //Create a map for each route where isMatch corresponds to location.pathName
    const potentialRoutes = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialRoutes.find(possibleMatch => possibleMatch.isMatch);

    //Default to view page
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    //Serve view
    document.querySelector('#content').innerHTML = await view.getHtml();
};

//Get value from form, make post request to backend, if successful update app
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

//Get value from form, make post request to backend, if successful update app
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

//Confirm selected blog for deletion, and make post request to backend -- update app if successful
async function deleteBlog(e) {
    if (confirm(`Are you sure you want to delete blog titled ${state.selected.blogTitle}?`) == true){
        await fetch('/delete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: state.selected._id})
        })
        .then(response => {
            if (response.status == 200){
                document.querySelector('#blogTitle').value = 'Title Here';
                document.querySelector('#blogContent').value = 'Select a blog to delete';
                let text = document.querySelector('#text');
                text.innerHTML = 'Successfully deleted blog.';
                document.getElementById('hide').style.visibility = 'hidden';
            }
        });
    
        loadBlogs();
    }
}

//Load all blogs and then call display
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

//Save all current blogs to state and display all blogs in the right menu
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

//If a blog is clicked, set state and update app
function blogClicked(e){
    state.selected = state.blogs[e.target.getAttribute('key')];
    displayBlogs(state.blogs);
    updateView();
}

//Update each view with appropriate blog data
function updateView(){
    let blogTitle = document.querySelector('#blogTitle');
    let blogContent = document.querySelector('#blogContent');
    if(location.pathname=='/'){
        blogTitle.innerHTML = state.selected.blogTitle;
        blogContent.innerHTML = state.selected.blogContent;
    }
    else if (location.pathname=='/edit'){
        blogTitle.value = state.selected.blogTitle;
        blogTitle.removeAttribute('readonly');
        blogContent.value = state.selected.blogContent;
        blogContent.removeAttribute('readonly');
    }
    else if (location.pathname=='/delete'){
        document.getElementById('hide').style.visibility = 'visible';
        blogTitle.value = state.selected.blogTitle;
        blogContent.value = state.selected.blogContent;
    }
}

//Allow backwards navigation
window.addEventListener("popstate", router);

//Allow button navigation without changing the page through event listeners
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
            else if (location.pathname=='/delete'){
                deleteBlog(e);
            }
            else{
                postBlog(e);
            }
        }
    });

    router();
});