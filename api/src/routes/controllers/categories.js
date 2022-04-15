require("dotenv").config;

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
   await Category.findAll(
    {attributes:["id_category","name"]}
  )
try{
  const categoriesDb= await Category.findAll(
    {attributes:["name"]}
  )
  let band=false
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

