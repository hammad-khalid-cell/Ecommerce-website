import express, { request, response } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.mjs"
import { authorizeRoles } from "../middlewares/roleMiddleware.mjs"
import  {Category} from "../models/category.mjs"
import { validationResult } from "express-validator";

const router =  express.Router();

router.post("/create", authMiddleware, authorizeRoles("admin"), async(request, response)=>{
    const error =  validationResult(request);
    if(!error.isEmpty()){
        return response.status(400).json({error : error.array()});
    }

    try{
        const {name , description , status} =  request.body;
        if(!name || !description || !status){
            return response.status(400).json({error: "all fields are required"})
            
        }
        const existingCategory =  await Category.findOne({name});
        if(existingCategory){
            return response.status(400).json({error : "Categorys already exists"});
        }

        const newCategory=  new Category({name , description , status});
        const savedCategory  =  newCategory.save();

        response.status(201).json(newCategory);

    }catch(err){
        console.log("Error saving category", err);
        response.status(500).json({error: "failed to save category"})
    }
    
})


// --- UPDATE cateogry (Admin only) ---
router.put("/:id", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (err) {
    console.log("Error updating category", err);
    res.status(500).json({ error: "Failed to update category" });
  }
});

// --- DELETE cateogry (Admin only) ---
router.delete("/:id", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted ✅" });
  } catch (err) {
    console.log("Error deleting category", err);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

// --- GET ALL PRODUCTS (Public) ---


router.get("/get", async (req, res) => {
  try {
    const category = await Category.find(); // fetch all category
    
    res.json(category);
  } catch (err) {
    console.error("Error fetching category:", err.message);
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

// --- GET SINGLE category  (Public) ---
router.get("/:id", async (req, res) => {
  try {
    console.log("this is the request id ",req.params.id);
    
    const category = await Category.findById(req.params.id)


    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.log("Error fetching category", err);
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

export default router;