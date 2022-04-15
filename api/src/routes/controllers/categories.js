require("dotenv").config;
const axios = require("axios");
const { Category} = require("../../db");
 
module.exports = {
  async  get(req, res) {
try{
      const getDbCategories= await Category.findAll(
    {attributes:["id_category","name"]}
  )
    res.send(getDbCategories);
 }
  catch(error){console.log('Fail database connection')}
  }, 

async post(req, res){
  let{name,description}=req.body;
  const getDbCategories= await Category.findAll(
    {attributes:["id_category","name"]}
  )
try{
  const categoriesDb= await Category.findAll(
    {attributes:["name"]}
  )
  let band=false
//  console.log("leido:::",categoriesDb[0].dataValues.name)
  categoriesDb.map(e=>{
       if(name===e.dataValues.name) band=true  
  })
  if(band===false){
          let categoryCreated= await Category.create({name,description})
          if(categoryCreated._options.isNewRecord===true) res.send('Category Created!');
          else res.send('Error Creating row in database ')
  }
  else res.send('Duplicated Name');
 }
catch(error){console.log(error)}
}
};

