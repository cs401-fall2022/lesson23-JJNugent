import View from './View.js';

export default class extends View {
    constructor() {
        super();
        this.setTitle("ViewBlogs");
    }

    async getHtml() {
        return `
            <h1>This has worked</h1>
        `;
    }
}