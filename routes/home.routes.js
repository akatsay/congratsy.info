const { Router } = require("express")
const config = require("config")
const router = Router()
const imageSearch = require('image-search-google')

// let prevSearchString = ""
// let currentUrlList = []

async function GetImgUrlFromSearch(searchName, searchOccasion) {

    const cseId = config.get('cseId')
    const apiKey = config.get('apiKey')

    const searchString = searchOccasion + "+" + searchName

    const client = new imageSearch(cseId, apiKey)
    const options = { page: 1 }
    const clientSearch = client.search(searchString, options).then(images => {
        const urlList = images.map(item => {
            return item.url
        })
        return urlList

    })
    const fullUrlList = await clientSearch
    return fullUrlList
}

router.post("/", async (req, res) => {
    try {
        const searchName = req.body.name
        const searchOccasion = req.body.occasion

        imgUrl = await GetImgUrlFromSearch(searchName, searchOccasion)

        if (imgUrl.length === 0) {
            res.status(400).json({message: "server could not find image according to your query"})
        } else {
            res.status(200).json({ imgUrl })
        }
        
    } catch (e) {
        res.status(500).json({message: 'Server error, try again later'})
    }
})

module.exports = router