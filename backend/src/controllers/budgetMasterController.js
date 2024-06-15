const { db } = require('../connect.js');
const i18n = require('i18n');
const { CONSTANTS } = require("../utils/Constants.js");
exports.getAll = async (request, response) => {
    var oResponse;
    try {
        var select = "SELECT * FROM budget_master ";
        db.query(select,function (err, results) {
            if (err) {
                oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, {
                    message: i18n.__('error.InternalError'),
                    error: err
                });
                response.status(oResponse.statusCode).send(oResponse);
            }
            response.setHeader('Access-Control-Allow-Origin', '*');
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).json(results);
        });
    } catch (error) {
        response.status(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(i18n.__('error.InternalError'));
    }
};
exports.deleteRecord = async (request, response) => {
    var oResponse;
    console.log("deleteRecord");
    try {
        var select = "delete FROM budget_master ";
        console.log(select);
        db.query(select,function (err, results) {
            if (err) {
                oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, {
                    message: i18n.__('error.InternalError'),
                    error: err
                });
                return response.status(oResponse.statusCode).send(oResponse);
            }
            response.setHeader('Access-Control-Allow-Origin', '*');
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).send({ message: 'Budget created successfully' });
            //return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).json(results);
        });
    } catch (error) {
        return response.status(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(i18n.__('error.InternalError'));
    }
};

exports.deleteSelectedRecord = async (request, response) => {
    var oResponse;
    console.log("deleteSelectedRecord");
    try {
        // Extract data from request body
        const { id } = request.body;
        var select = "delete FROM budget_master where id=?";
        console.log(select);
        db.query(select, [id],function (err, results) {
            if (err) {
                oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, {
                    message: i18n.__('error.InternalError'),
                    error: err
                });
                return response.status(oResponse.statusCode).send(oResponse);
            }
            response.setHeader('Access-Control-Allow-Origin', '*');
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).send({ message: 'Budget created successfully' });
            //return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).json(results);
        });
    } catch (error) {
        return response.status(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(i18n.__('error.InternalError'));
    }
};
exports.create = async (request, response) => {
    
    try {
        // Extract data from request body
        const { budget_name } = request.body;
        // SQL query to insert a new budget record
        const sql = "INSERT INTO budget_master (budget_name) VALUES (?)";
        // Execute the query with parameter values
        db.query(sql, [budget_name], function (err, result) {
            if (err) {
                var error={
                    status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message:i18n.__('error.InternalError'),
                    error:err
                };
                response.status(error.status).send(error);
                throw err;
            }
            console.log(result);
            console.log("1 record inserted");
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).send({ message: 'Budget created successfully' });
            // Send a success response
        });
    } catch (error) {
        var errorMessage={
            status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message:i18n.__('error.InternalError'),
            error:error
        };
        response.status(errorMessage.status).send(errorMessage);
    }
    /* {
        "budget_name": "Initial Budget"
    }*/

};
exports.edit = async (request, response) => {
    
    try {
        // Extract data from request body
        const { budget_name ,id } = request.body;
        // SQL query to insert a new budget record
        const sql = "update budget_master set budget_name=? where id=?";
        // Execute the query with parameter values
        db.query(sql, [budget_name,id], function (err, result) {
            if (err) {
                var error={
                    status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message:i18n.__('error.InternalError'),
                    error:err
                };
                response.status(error.status).send(error);
                throw err;
            }
            console.log(result);
            console.log("1 record inserted");
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).send({ message: 'Budget created successfully' });
            // Send a success response
        });
    } catch (error) {
        var errorMessage={
            status:CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message:i18n.__('error.InternalError'),
            error:error
        };
        response.status(errorMessage.status).send(errorMessage);
    }
    /* {
        "budget_name": "Initial Budget"
    }*/

};
