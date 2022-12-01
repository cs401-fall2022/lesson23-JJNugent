import ViewBlogs from './views/ViewBlogs';
import CreateBlog from './views/CreateBlog';

const navigate = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: '/', view: ViewBlogs },
        { path: '/create', view: CreateBlog },
        { path: '/edit', view: () => console.log("Create Blogs") },
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

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () =>{
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")){
            e.preventDefault();
            navigate(e.target.href);
        }
    });

    router();
});