import View from './View.js';

export default class extends View {
    constructor() {
        super();
        this.setTitle("ViewBlogs");
    }

    async getHtml() {
        return `
            <h1 class='title'>View Blogs!</h1>

            <p>Select a blog from the right</p>

            <div id='mainBlog'>
                <span class='title' id='blogTitle'></span>
                <p style='white-space: pre-line' id='blogContent'></p>
            </div>
        `;
    }
}