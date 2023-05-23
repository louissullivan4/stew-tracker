const pool = require('./keys')

const getFoodByName= (request, response) => {
    const foodName = request.params.foodName.replace(/\b\w/g, l => l.toUpperCase());
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
    pool.query('SELECT DISTINCT name, serving, calories FROM stewfood WHERE name ILIKE $1', [searchTerm], (error, results) => {
        if (error) {
          throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const createFood = (request, response) => {
    pool.query('SELECT fid FROM stewfood ORDER BY fid DESC LIMIT 1', (error, results) => {
        if (error) {
            throw error
        }
        incFid = results.rows[0].fid + 1
        const { name, serving, calories } = request.body
        pool.query('INSERT INTO stewfood (fid, name, serving, calories) VALUES ($1, $2, $3, $4) RETURNING *', [incFid, name, serving, calories], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Food added: ${results.rows[0].name}`)
        })
    })
}

const updateFoodByName = (request, response) => {
    const foodName = request.params.foodName.replace(/\b\w/g, l => l.toUpperCase());
    if (foodName.includes('%20')) {
        foodName.replace('%20', ' ')
    }
    const { name, serving, calories } = request.body
    pool.query(
        'UPDATE stewfood SET name = $1, serving = $2, calories = $3 WHERE name = $4',
        [name, serving, calories, foodName],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Food modified: ${name}`)
        }
    )
}

 
module.exports = {
    getFoodByName,
    getFoodLikeName,
    createFood,
    updateFoodByName
}