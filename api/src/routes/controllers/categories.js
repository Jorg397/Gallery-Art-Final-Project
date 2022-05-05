require("dotenv").config;

const { json } = require("body-parser");
const { Category } = require("../../db");

module.exports = {
  async get(req, res) {
    try {
      const getDbCategories = await Category.findAll({
        attributes: ["id_category", "name"],
      });
      res.send(getDbCategories);
    } catch (error) {
      console.log("Fail database connection");
    }
  },

  async post(req, res) {
    let { name, description } = req.body;
    await Category.findAll({ attributes: ["id_category", "name"] });
    try {
      const categoriesDb = await Category.findAll({ attributes: ["name"] });
      let band = false;
      categoriesDb.map((e) => {
        if (name === e.dataValues.name) band = true;
      });
      if (band === false) {
        let categoryCreated = await Category.create({ name, description });
        if (categoryCreated._options.isNewRecord === true)
          res.send("Category Created!");
        else res.send("Error Creating row in database ");
      } else res.send("Duplicated Name");
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {
    const { idCategories } = req.params;
    try {
      const result = await Category.destroy({
        where: {
          id_category: idCategories,
        },
      });
      res.status(201).json({ success: result === 1 ? true : false });
    } catch (error) {
      res.send(err);
    }
  },

  async put(req, res) {
    const { id_category, name } = req.body;
    try {
      await Category.update(
        {
          name,
        },
        {
          where: {
            id_category: id_category,
          },
        }
      );

      res.status(201).json({ success: true, message: "category updated" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
