const express = require("express")
const imageupload = require("../Helpers/Libraries/imageUpload");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const {addStory,getAllStories,detailStory,likeStory, editStory, deleteStory, editStoryPage } = require("../Controllers/story")
const { addCategory ,editCategory,deleteCategory,getAllCategories} = require("../Controllers/category");
const { checkStoryExist, checkUserAndStoryExist } = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router();

router.post('/addcategory', [getAccessToRoute], addCategory)

router.get('/getallcategories', getAllCategories)

router.put('/editcategory/:id', [getAccessToRoute], editCategory)

router.delete('/deletecategory/:id', [getAccessToRoute], deleteCategory)

router.post("/addstory" ,[getAccessToRoute, imageupload.single("image")],addStory)

router.post('/addImage', imageupload.single("image"), (req, res) => {
    res.json({
        url: `https://svalbardexperts.com/api/storyImages/${req.savedStoryImage}`
    })
})

router.post("/:slug", checkStoryExist, detailStory)

router.post("/:slug/like",[getAccessToRoute,checkStoryExist] ,likeStory)

router.get("/editStory/:slug",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist] , editStoryPage)

router.put("/:slug/edit",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist, imageupload.single("image")] ,editStory)

router.delete("/:slug/delete",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist] ,deleteStory)

router.get("/getAllStories",getAllStories)


module.exports = router