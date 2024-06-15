const { db } = require('../connect.js');
const i18n = require('i18n');
const { CONSTANTS } = require("../utils/Constants.js");
exports.getAll = async (request, response) => {
    try {
        var error;
        var select = "SELECT * FROM category  ";
        db.query(select, function (err, results) {
            if (err) {
                error = {
                    status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message: i18n.__('error.InternalError'),
                    error: err
                };
                response.status(error.status).send(error);
                throw err;
            }
            response.setHeader('Access-Control-Allow-Origin', '*');
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).json(results);
        });
    } catch (err) {
        // Handle errors
        error = {
            status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: i18n.__('error.InternalError'),
            error: err
        };
        response.status(error.status).send(error);
    }
};
exports.delete = async (request, response) => {
    try {
        var error;
        const id = request.params.id;

        var select = "delete FROM category where id=?  ";
        db.query(select, [id], function (err, results) {
            if (err) {
                error = {
                    status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message: i18n.__('error.InternalError'),
                    error: err
                };
                response.status(error.status).send(error);
                throw err;
            }
            response.setHeader('Access-Control-Allow-Origin', '*');
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).json(results);
        });
    } catch (err) {
        // Handle errors
        error = {
            status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: i18n.__('error.InternalError'),
            error: err
        };
        response.status(error.status).send(error);
    }
};
const getLatestCategory = async () => {
    let category_id = 1;
    const select = "SELECT category_id FROM category ORDER BY category_id DESC LIMIT 1";
    return new Promise((resolve, reject) => {
        db.query(select, (err, results) => {
            if (err) {
                return resolve(category_id); // Resolve with default category_id on error
            }


            if (results && results.length > 0) {
                category_id = results[0].category_id + 1;
            }

            resolve(category_id); // Resolve with the found category_id
        });
    });
}
exports.create = async (request, response) => {
    try {
        // Extract data from request body
        const { category_name, description } = request.body;
        var category_id = await getLatestCategory();
        // SQL query to insert a new budget record
        const sql = "INSERT INTO category ( category_id,category_name,description) VALUES (?,?, ?)";
        // Execute the query with parameter values
        console.log(request.body);
        db.query(sql, [category_id, category_name, description], function (err, result) {

            if (err) {
                //console.log(sql);
                var error = {
                    status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message: i18n.__('error.InternalError'),
                    error: err
                };
                response.status(error.status).send(error);
                throw err;
            }
            response.sendStatus(200); // Send a success response
        });

    } catch (error) {
        // Handle errors
        var error = {
            status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: i18n.__('error.InternalError')
        };
        response.status(error.status).send(error);
    }
    /* {
        "description": "Groceries",
        "name": "Food"
    }*/

};

exports.update = async (request, response) => {
    try {
        // Extract data from request body
        const { name, description } = request.body;

        // SQL query to insert a new budget record
        const sql = "update category ( name,description) VALUES (?, ?)";

        // Execute the query with parameter values
        db.query(sql, [name, description], function (err, result) {
            if (err) {
                var error = {
                    status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message: i18n.__('error.InternalError'),
                    error: err
                };
                response.status(error.status).send(error);
                throw err;
            }
            console.log("1 record inserted");
            response.sendStatus(200); // Send a success response
        });
    } catch (error) {
        // Handle errors
        var error = {
            status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: i18n.__('error.InternalError')
        };
        response.status(error.status).send(error);
    }
    /* {
        "description": "Groceries",
        "name": "Food"
    }*/

};

exports.deleteMany = async (request, response) => {
    try {
        console.log("Delete");
        console.log(request.body);
        const  categoryIds  = request.body;
        console.log(categoryIds);
        if (!categoryIds || !Array.isArray(categoryIds)) {
            return response.status(CONSTANTS.HTTP_STATUS_CODES.BAD_REQUEST).send({
                status: CONSTANTS.HTTP_STATUS_CODES.BAD_REQUEST,
                message: i18n.__('error.InvalidInput')
            });
        }
        const sql = "DELETE FROM category WHERE id IN (?)";
        console.log(sql);
        db.query(sql, [categoryIds], (err, result) => {
            if (err) {
                const error = {
                    status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message: i18n.__('error.InternalError'),
                    error: err
                };
                response.status(error.status).send(error);
                throw err;
            }
            response.status(CONSTANTS.HTTP_STATUS_CODES.OK).send({
                status: CONSTANTS.HTTP_STATUS_CODES.OK,
                message: i18n.__('success.DeleteSuccess')
            }); // Send a success response
        });
    } catch (err) {
        const error = {
            status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: i18n.__('error.InternalError'),
            error: err
        };
        response.status(error.status).send(error);
    }

};
// Define other controller methods...
