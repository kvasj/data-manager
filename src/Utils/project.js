import categoryEmuns from './categoryEnums'
class Project {
    id = 0
    name = ''
    featured = ''
    madeFor = ''
    date = ''
    aboutProject = ''
    categories = [
        {
            name: categoryEmuns.interiers,
            status: false
        },
        {
            name: categoryEmuns.designActivity,
            status: false
        },
        {
            name: categoryEmuns.vizualization,
            status: false
        },
    ]
    images = [
        {
            name: null,
            url: null,
            isTitle: false
        },
    ]
    published = false
    isNews = false

    constructor(objectData) {
        if (objectData) {
            this.setId(objectData.id)
            this.setName(objectData.name)
            this.setFeatured(objectData.featured)
            this.setMadeFor(objectData.madeFor)
            this.setDate(objectData.date)
            this.setAboutProject(objectData.aboutProject)
            this.setCategories(objectData.categories)
            this.setImages(objectData.images)
            this.setIsNews(objectData.isNews)
            this.setPublicity(objectData.published)
        }
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

    setIsNews(value) {
        this.isNews = value
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
}

export default Project