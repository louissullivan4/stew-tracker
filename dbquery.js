const pool = require('./keys')

const getFoodByName= (request, response) => {
    //capitalize the first letter of every word
    const foodName = request.params.foodName.replace(/\b\w/g, l => l.toUpperCase());
    // check for spaces
    if (foodName.includes('%20')) {
        foodName.replace('%20', ' ')
    }
    console.log(foodName)
    pool.query('SELECT * FROM stewfood WHERE name = $1', [foodName], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

const getFoodLikeName = (request, response) => {
    const foodName = request.params.foodName.replace(/\b\w/g, l => l.toUpperCase());
    if (foodName.includes('%20')) {
        foodName.replace('%20', ' ')
    }
    const searchTerm = `%${foodName}%`;
    // exclude duplicates
    pool.query('SELECT DISTINCT * FROM stewfood WHERE name ILIKE $1', [searchTerm], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getFoodByName,
    getFoodLikeName
}