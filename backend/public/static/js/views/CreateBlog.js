import View from './View.js';

export default class extends View {
    constructor() {
        super();
        this.setTitle("CreateBlogs");
    }

    async getHtml() {
        return `
            <h1 class='title'>Write a blog!</h1>

            <form id='blogSubmission' action='#'>
                <label class='blogLabel' for='blogName'>Blog Title</label>
                <br>
                <input type='text' name='blogTitle' id='blogTitle' value='Title here'></input>
                <br>
                <label class='blogLabel' for='blogContent'>Blog content</label>
                <br>
                <textarea id='blogContent' name='blogContent' rows='250' cols='125'>Content...</textarea>
                <br>
                <input type='submit' post-link></input>
            </form>

            <p id="text"></p>
        `;
    }
}