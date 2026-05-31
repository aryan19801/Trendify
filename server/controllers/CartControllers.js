
import Product from "../models/Product.js";
export const getCartProducts = async (req, res) => {

    // ise samaj lena bro ;
	try {
		const products = await Product.find({ _id: { $in: req.user.cartItems } });

		// add quantity for each product
		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id);
			return { ...product.toJSON(), quantity: item.quantity };
		});

		res.json(cartItems);
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req,res)=>{
 try {

// bhai ye product id wala samaj me nhi aya hai bat dena 
        //  isme find items me id wali dikat ho sakti hai
    const {productId} = req.body;
    const user = req.user;
    const existingProduct = user.cartItems.find((items)=>items.id == productId);
    if(existingProduct){
     existingProduct.quantity += 1 ;
    }else{
    user.cartItems.push(productId);
    }
    await user.save();
    res.json(user.cartItems);
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });

    }
}
export const removeAllFromCart = async (req,res)=>{
try {
    const {productId} = req.body;
    const user = req.user;
    if(!productId){
    user.cartItems = [];
    }else{
     user.cartItems = user.cartItems.filter((item)=> item.id!==productId);
    }
    await user.save();
    res.json(user.cartItems);
    
} catch (error) {
    console.log("Error in removeAllCarts controller", error.message);
    res.status(500).json({message:"Server error ", error :error.message});
}
}
export const updateCartQuantity = async (req,res)=>{
  try {
    const {id:productId} = req.params;
    // here i had renamed the id of the product with the productId;
    const user = req.user;
    const {quantity} = req.body;
    const existingProduct = user.cartItems.find((item)=> item.id == productId);
    if(existingProduct){
        if(quantity===0){
            user.cartItems = user.cartItems.filter((item)=> item.id!== productId);
            await user.save();
            res.json(user.cartItems);
        }
        existingProduct.quantity = quantity;
        await user.save();
        res.json(user.cartItems);
    }else{
        res.status(404).json({message:"Product not found"});
    }

  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
  }
}