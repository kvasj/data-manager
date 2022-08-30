import { get } from "core-js/core/dict"

class Project {
    #id = 0
    #name = ''
    #featured = ''
    #madeFor = ''
    #date = ''
    #aboutProject = ''
    #categories = []
    #images = []
    #published = false

    /*
    constructor(newProjectObject) {
        
    }
    */

    //#region getters
    getId() {
        return this.#id
    }

    getName() {
        return this.#name
    }

    getFeatured() {
        return this.#featured
    }

    getMadeFor() {
        return this.#madeFor
    }

    getDate() {
        return this.#date
    }

    getAboutProject() {
        return this.#aboutProject
    }

    getCategories() {
        return this.#categories
    }

    getImages() {
        return this.#images
    }

    getProject() {
        return {
            id: this.getId(),
            name: this.getName(),
            featured: this.getFeatured(),
            madeFor: this.getMadeFor(),
            date: this.getDate(),
            aboutProject: this.getAboutProject(),
            categories: this.getCategories(),
            images: this.getImages(),
            published: this.isPublished(),
        }
    }

    isPublished() {
        return this.#published
    }
    //#endregion

    //#region setters
    setId(id) {
        this.#id = id
    }
    setName(name) {
        this.#name = name
    }
    setFeatured(featured) {
        this.#featured = featured
    }
    setMadeFor(madeFor) {
        this.#madeFor = madeFor
    }
    setDate(date) {
        this.#date = date
    }
    setAboutProject(aboutProject) {
        this.#aboutProject = aboutProject
    }
    setCategories(categories) {
        this.#categories = categories
    }
    setImages(images) {
        this.#images = images
    }

    setPublicity(value) {
        this.#published = value
    }
    //#endregion
}

export default Project