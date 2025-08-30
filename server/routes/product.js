import express from "express";
const router = express.Router();
import { getAllProducts ,getFeaturedProducts,createProduct,deleteProduct, getAllProductsByCategory, toggleFeaturedProduct, getRecommmendedProducts} from "../controllers/ProductControllers.js";
import { protectRoute, adminRoute } from "../middlewares/AuthMiddleware.js";
router.get("/", protectRoute , adminRoute ,getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category",getAllProductsByCategory);
router.get("/recommendations",getRecommmendedProducts);
router.post("/",protectRoute,adminRoute,createProduct);
router.patch("/:id",protectRoute,adminRoute,toggleFeaturedProduct);
router.delete("/:id",protectRoute,adminRoute,deleteProduct);

export default router;