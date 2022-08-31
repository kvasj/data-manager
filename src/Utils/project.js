class Project {
    id = 0
    name = ''
    featured = ''
    madeFor = ''
    date = ''
    aboutProject = ''
    categories = []
    images = []
    published = false

    constructor(id, name, featured, madeFor, date, aboutProject, categories, images, published) {
        const processedImages = this.#processImages(images)
        const processedCategories = this.#processCategories(categories)
        this.setId(id)
        this.setName(name)
        this.setFeatured(featured)
        this.setMadeFor(madeFor)
        this.setDate(date)
        this.setAboutProject(aboutProject)
        this.setCategories(processedCategories)
        this.setImages(processedImages)
        this.setPublicity(published)
    }

    isPublished() {
        return this.published
    }

    //#region getters
    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getFeatured() {
        return this.featured
    }

    getMadeFor() {
        return this.madeFor
    }

    getDate() {
        return this.date
    }

    getAboutProject() {
        return this.aboutProject
    }

    getCategories() {
        return this.categories
    }

    getImages() {
        return this.images
    }
    //#endregion

    //#region setters
    setId(id) {
        this.id = id
    }
    setName(name) {
        this.name = name
    }
    setFeatured(featured) {
        this.featured = featured
    }
    setMadeFor(madeFor) {
        this.madeFor = madeFor
    }
    setDate(date) {
        this.date = date
    }
    setAboutProject(aboutProject) {
        this.aboutProject = aboutProject
    }
    setCategories(categories) {
        this.categories = categories
    }
    setImages(images) {
        this.images = images
    }

    setPublicity(value) {
        this.published = value
    }
    //#endregion

    #processImages(images) {
        var result = [];
        for (let i = 0; i < images.length; i++) {
            var image = images[i]
            result.push({
                name: image[0],
                url: image[1]
            })
        }
        return result
    }

    #processCategories(categories) {
        const result = []
        for (let i = 0; i < categories.length; i++) {
            var category = categories[i]
            result.push({
                name: category[0],
                status: category[1]
            })
        }
        return result;
    }
    /*
    processCategories(interiers, designActivity, vizualization) {
        let result = [];

        if (interiers.value) {
            result.push(categoryEnums.interiers);
        }
        if (designActivity.value) {
            result.push(categoryEnums.designActivity);
        }
        if (vizualization.value) {
            result.push(categoryEnums.vizualization);
        }

        return result;
    }
    */
}

export default Project