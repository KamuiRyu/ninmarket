const { Op, literal } = require("sequelize");
const Item = require("../models/item");

const autoComplete = async (req, res) => {
    const termSearch = req.params.term;
    const language = req.params.language ? req.params.language : 'en';
    if (!termSearch || !language) {
        return res.status(400).json({ error: 'Termo de pesquisa ou idioma não fornecido' });
    }
    const termLower = termSearch.toLowerCase();

    try {
        const primaryLanguage = language;
        const fallbackLanguage = 'en';
        const limit = 10;
      
        const primaryResult = await Item.findAll({
          where: literal(`LOWER("name"->>:primaryLanguage) ILIKE :termLower`),
          replacements: { termLower: `%${termLower}%`, primaryLanguage },
          limit: limit,
        });
      
        if (primaryResult.length > 0) {
          res.json(primaryResult);
        } else {
          const fallbackResult = await Item.findAll({
            where: literal(`LOWER("name"->>:fallbackLanguage) ILIKE :termLower`),
            replacements: { termLower: `%${termLower}%`, fallbackLanguage },
            limit: limit,
          });
      
          if (fallbackResult.length > 0) {
            res.json(fallbackResult);
          } else {
            res.json([]);
          }
        }
      } catch (error) {
        console.error('Erro ao pesquisar no banco de dados:', error);
        res.status(500).json({ error: 'Erro ao pesquisar no banco de dados' });
      }
      
};
const getItemBySlug = async (req, res) => {
    const slugToSearch = req.params.slug;
  
    try {
      const item = await Item.findOne({
        where: {
          slug: slugToSearch,
        },
      });
  
      if (item) {
        return res.status(200).json(item.toJSON());
      } else {
        return res.status(404).json({ message: "Item não encontrado." });
      }
    } catch (error) {
      console.error('Erro na busca do item:', error);
      return res.status(500).json({ message: "Erro na busca do item." });
    }
  };
  
module.exports = {
    autoComplete,
    getItemBySlug,
};
