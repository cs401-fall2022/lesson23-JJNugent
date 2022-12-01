import View from './View.js';

export default class extends View {
    constructor() {
        super();
        this.setTitle("CreateBlogs");
    }

    async getHtml() {
        return `
            <h1 class='title'>Write a blog!</h1>

            <form id='blogSubmission'>
                <input type='text' name='blogName' id='blogName' value='Name here'></input>
            </form>
        `;
    }
}