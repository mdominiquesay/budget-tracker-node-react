const { db } = require('../connect.js');
const i18n = require('i18n');
const { CONSTANTS } = require("../utils/Constants.js");
exports.getAll = async (request, response) => {
    try {
        var error;
        var select = "SELECT * FROM category  ";
        db.query(select, function (err, results) {
            if (err) {
                error={
                    status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message:i18n.__('error.InternalError'),
                    error:err
                };
                response.status(error.status).send(error);
                throw err;
            }
            response.setHeader('Access-Control-Allow-Origin', '*');
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).json(results);
        });
    } catch (err) {
         // Handle errors
        error={
            status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message:i18n.__('error.InternalError'),
            error:err
        };
        response.status(error.status).send(error);
    }
};
exports.delete = async (request, response) => {
    try {
        var error;
        var select = "delete FROM category  ";
        db.query(select, function (err, results) {
            if (err) {
                error={
                    status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message:i18n.__('error.InternalError'),
                    error:err
                };
                response.status(error.status).send(error);
                throw err;
            }
            response.setHeader('Access-Control-Allow-Origin', '*');
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).json(results);
        });
    } catch (err) {
         // Handle errors
        error={
            status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message:i18n.__('error.InternalError'),
            error:err
        };
        response.status(error.status).send(error);
    }
};

exports.create = async (request, response) => {
    try {
        // Extract data from request body
        const { name, description } = request.body;

        // SQL query to insert a new budget record
        const sql = "INSERT INTO category ( name,description) VALUES (?, ?)";

        // Execute the query with parameter values
        db.query(sql, [name, description], function (err, result) {
            if (err) {
                var error={
                    status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message:i18n.__('error.InternalError'),
                    error:err
                };
                response.status(error.status).send(error);
                throw err;
            }
            console.log("1 record inserted");
            response.sendStatus(200); // Send a success response
        });
    } catch (error) {
         // Handle errors
         var error={
            status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message:i18n.__('error.InternalError')
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
                var error={
                    status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message:i18n.__('error.InternalError'),
                    error:err
                };
                response.status(error.status).send(error);
                throw err;
            }
            console.log("1 record inserted");
            response.sendStatus(200); // Send a success response
        });
    } catch (error) {
         // Handle errors
         var error={
            status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message:i18n.__('error.InternalError')
        };
        response.status(error.status).send(error);
    }
    /* {
        "description": "Groceries",
        "name": "Food"
    }*/

};

// Define other controller methods...
