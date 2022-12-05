import View from './View.js';

export default class extends View {
    constructor() {
        super();
        this.setTitle("CreateBlogs");
    }

    async getHtml() {
        return `
            <h1 class='title'>Delete a blog!</h1>

            <form id='blogSubmission' action='#'>
                <label class='blogLabel' for='blogName'>Blog Title</label>
                <br>
                <input readonly type='text' name='blogTitle' id='blogTitle' value='Title here'>
                <br>
                <label class='blogLabel' for='blogContent'>Blog content</label>
                <br>
                <textarea readonly id='blogContent' name='blogContent' rows='250' cols='125'>Select a blog to delete</textarea>
                <br>
                <input class='submitButton' id='hide' type='submit' value='Delete Blog' post-link>
            </form>

            <p id="text"></p>
        `;
    }
}