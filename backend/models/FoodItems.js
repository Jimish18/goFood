const mongoose = require('mongoose');

const FoodItemsSchema = mongoose.Schema(
    {
        CategoryName : 
        {
            type : String
        }
        ,
        name : 
        {
            type : String
        }
        ,
        img : 
        {
            type : String
        }
        ,
        options :         
        [
            {
                half : 
                {
                    type : String
                },
                full :
                {
                    type : String
                },
                regular : 
                {
                    type : String
                },
                medium : 
                {
                    type : String
                },
                large :
                {
                    type : String
                }
            }    
        ]
        ,
        description : 
        {
            type : String
        }
    }
)

const FoodCategorySchema = mongoose.Schema(
    {
        CategoryName : 
        {
            type : String
        }
    }
)

const FoodItems = mongoose.model('food_item',FoodItemsSchema);
const FoodCategory = mongoose.model('foodCategory',FoodCategorySchema);

const fetchData = async () =>
{
    global.foodData = await FoodItems.find({},{'options._id' : 0});
    global.foodCategoryData = await FoodCategory.find({});
}

fetchData();