
const Product = require("../../models/Product");

const getFilteredProducts = async(req, res) => {
    try{
        const products = await Product.find({})
        console.log('Found products:', products);
        
            res.status(200).json({
                success : true,
                data : products,
            });
        

    } catch(e) {
        console.error('Error fetching products:', e);
        res.status(500).json({
            success : false,
            message : "Some error occured",
          });
    }
};

module.exports = { getFilteredProducts };