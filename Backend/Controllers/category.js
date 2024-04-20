const asyncErrorWrapper = require("express-async-handler")
const Category = require("../Models/category");
const {searchHelper, paginateHelper} =require("../Helpers/query/queryHelpers")

const addCategory = asyncErrorWrapper(async  (req,res,next)=> {

    const {category,description} = req.body 
    try {
        const existingCategory = await Category.findOne({ category: category });
        const newCategory = await Category.create({
            category,
            description,
            author : req.user.id
        })

        return res.status(200).json({
            success :true ,
            message : "add category successfully ",
            data: newCategory
        })
    }

    catch(error) {
        return next(error)
        
    }
  
})

const getAllCategories = asyncErrorWrapper( async (req,res,next) =>{

    let query = Category.find();

    query =searchHelper("category",query,req)

    const paginationResult =await paginateHelper(Category , query ,req)

    query = paginationResult.query  ;

    query = query.sort("-createdAt")

    const categories = await query
    
    return res.status(200).json(
        {
            success:true,
            count : categories.length,
            data : categories ,
            page : paginationResult.page ,
            pages : paginationResult.pages
        })
})





const editCategory  =asyncErrorWrapper(async(req,res,next)=>{
    const {id} = req.params
    const {category,description} = req.body 

    let updatedCategory = {
        category,
        description
    }

    updatedCategory = await Category.findByIdAndUpdate(id,updatedCategory,{
        new:true,
        runValidators:true
    })

})

const deleteCategory  =asyncErrorWrapper(async(req,res,next)=>{
    const {id} = req.params

    const category = await Category.findByIdAndDelete(id)

    if(!category){
        return next(new CustomError("Category not found",400))
    }

    return res.status(200).json({
        success:true,
        message : "delete category successfully"
    })
})


module.exports ={
    addCategory,
    editCategory ,
    deleteCategory,
    getAllCategories
}