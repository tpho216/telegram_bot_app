var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'quiz_master',
    host: 'localhost',
    database: 'api',
    password: 'quiz144',
    port: 5432
});
var getModelAnswers = function (request, response) {
    pool.query('SELECT * FROM modelanswers ORDER BY id ASC', function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
module.exports = { getModelAnswers: getModelAnswers };
