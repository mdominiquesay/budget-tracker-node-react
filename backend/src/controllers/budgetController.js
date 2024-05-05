const { db } = require('../connect.js');
const i18n = require('i18n');
const { CONSTANTS } = require("../utils/Constants.js");
const { createResponse } = require("../utils/responseUtils.js");
exports.getAll = async (request, response) => {
    try {
        var oResponse;
        const record_id = request.params.recordId; // Assuming the category is passed as a query parameter
        var select = "SELECT * FROM budget where budget_id= ? ";
        db.query(select, [record_id], function (err, results) {
            if (err) {
                oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, {
                    message: i18n.__('error.InternalError'),
                    error: err
                });
                response.status(oResponse.statusCode).send(oResponse);
            }
            oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {

            });
            response.setHeader('Access-Control-Allow-Origin', '*');
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).json(results);
        });
    } catch (error) {
        oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, {
            message: i18n.__('error.InternalError'),
            error: error
        });
        response.status(oResponse.statusCode).send(oResponse);
    }
};

exports.delete = async (request, response) => {
    try {
        var oResponse;
        const record_id = request.params.recordId; // Assuming the category is passed as a query parameter
        var select = "delete FROM budget where record_id= ? ";
        db.query(select, [record_id], function (err, results) {
            if (err) {
                oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, {
                    message: i18n.__('error.InternalError'),
                    error: err
                });
                response.status(oResponse.statusCode).send(oResponse);
            }
            oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {

            });
            response.setHeader('Access-Control-Allow-Origin', '*');
            return response.status(CONSTANTS.HTTP_STATUS_CODES.OK).json(results);
        });
    } catch (error) {
        oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, {
            message: i18n.__('error.InternalError'),
            error: error
        });
        response.status(oResponse.statusCode).send(oResponse);
    }
};

exports.create = async (request, response) => {
    try {
        // Extract data from request body
        const { record_id, description, amount, category } = request.body;
        const existingStatus = await checkExist({ record_id, description, category });
        if (existingStatus.status === CONSTANTS.HTTP_STATUS_CODES.OK) {
            insertData(request.body, response);
        } else {
            var errorMessage = createResponse(existingStatus.status, existingStatus.message);
            response.status(existingStatus.status).send(errorMessage);

        }
    } catch (error) {
        // Handle errors
        var oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
            message: i18n.__('error.InternalError'),
            error: error
        });
        response.status(oResponse.statusCode).send(oResponse);
    }
    /* {
        "description": "Groceries",
        "amount": 50,
        "category": "Food",
        "record_id": 1,
        "budget_id":1
    }*/

};
function deleteData(id, response) {
    try {
        const sql = "delete from budget where id=?";
        console.log(sql);
        console.log(id);

        var oResponse;
        // Execute the query with parameter values
        db.query(sql, [id], function (err) {
            if (err) {
                oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
                    message: i18n.__('error.InternalError'),
                    error: err
                });
                console.log(err);
                // response.status(oResponse.statusCode).send(oResponse);
                throw err;
            }
            console.log("ok");
            oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {});
            //response.status(oResponse.statusCode).send(oResponse);
        });
    } catch (error) {
        console.log(error);
        // Handle errors
        var oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
            message: i18n.__('error.InternalError'),
            error: error
        });
       // response.status(oResponse.statusCode).send(oResponse);
    }
}
exports.updateAll = async (request, response) => {
    try {
        // Extract data from request body
        const data = request.body;
        var responses;
        data.forEach((element, index) => {
            if (element.delete) {
                console.log("delete"+element.id);
                responses = deleteData(element.id, response);
            }
            else if (!element.edit) {
                responses = updateData(element, response);
            }
            else {
                responses = insertManyData(element);

            }
        });
        //
        var oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
           
        });
        response.status(200).send(oResponse);

    } catch (error) {
        // Handle errors
        var oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
            message: i18n.__('error.InternalError'),
            error: error
        });
        console.log(error);
        //response.status(200).send(oResponse);
    }
    /* {
        "description": "Groceries",
        "amount": 50,
        "category": "Food",
        "record_id": 1,
        "budget_id":1
    }*/

};




function insertData(data) {
    const { budget_id, description, amount, category } = data;
    // SQL query to insert a new budget record
    const sql = "INSERT INTO budget (budget_id,description, amount, category) VALUES (?,?,?, ?)";
    var oResponse;
    console.log(sql);

    // Execute the query with parameter values
    db.query(sql, [data.budget_id, data.description, data.amount, data.category], function (err, result) {
        if (err) {
            oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
                message: i18n.__('error.InternalError'),
                error: err
            });
            throw err;
        }
        oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {});
    });

}
function updateData(data, response) {
    try {
        const { record_id, description, amount, category } = data;
        const sql = "update budget set description=?, amount=?, category=? where record_id=?";
       
        var oResponse;
        // Execute the query with parameter values
        db.query(sql, [data.description, data.amount, data.category, data.record_id], function (err) {
            if (err) {
                oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
                    message: i18n.__('error.InternalError'),
                    error: err
                });
                // response.status(oResponse.statusCode).send(oResponse);
                throw err;
            }
            oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {});
            //response.status(oResponse.statusCode).send(oResponse);
        });
    } catch (error) {
        // Handle errors
        var oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
            message: i18n.__('error.InternalError'),
            error: error
        });
        response.status(oResponse.statusCode).send(oResponse);
    }
    /* {
        "description": "Groceries",
        "amount": 50,
        "category": "Food",
        "record_id": 1,
        "budget_id":1
    }*/

}


exports.update = (request, response) => {
    try {
        updateData(request.body, response)
    } catch (error) {
        // Handle errors
        var oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
            message: i18n.__('error.InternalError'),
            error: error
        });
        response.status(oResponse.statusCode).send(oResponse);
    }
    /* {
        "description": "Groceries",
        "amount": 50,
        "category": "Food",
        "record_id": 1,
        "budget_id":1
    }*/

};
async function insertManyData(data) {
    console.log("Existing");
    try {
        // Extract data from request body
        var existingStatus;
        var bInsert = true;
        if (data.row_id !== -1) {
            existingStatus = await checkExist(data);
            bInsert = (existingStatus.status === CONSTANTS.HTTP_STATUS_CODES.OK);
        }
        if (bInsert) {
            insertData(data);
            console.log("insertData");
        } else {
            //    var errorMessage = createResponse(existingStatus.status, existingStatus.message);
            //    response.status(existingStatus.status).send(errorMessage);

        }
    } catch (error) {
        // Handle errors
        var oResponse = createResponse(CONSTANTS.HTTP_STATUS_CODES.OK, {
            message: i18n.__('error.InternalError'),
            error: error
        });
        // response.status(oResponse.statusCode).send(oResponse);
    }
}

async function checkExist({ record_id, description, category }) {
    return new Promise((resolve, reject) => {
        try {
            var aConstants = CONSTANTS.HTTP_STATUS_CODES;
            var select = "SELECT * FROM budget where record_id=? and category=? and description=? limit 1 ";
            console.log(select);
            db.query(select, [record_id, category, description], function (err, result) {
                if (err) throw err;
                if (!result || result.length === 0) {
                    resolve({ status: aConstants.OK }); // Return status code 200 if the record does not exist
                }
                else {
                    resolve(
                        {
                            status: aConstants.EXIST,
                            message: {
                                message: i18n.__('error.dataExist')
                            }
                        }
                    );
                }
            });

        } catch (error) {
            // Handle errors
            resolve(
                {
                    status: aConstants.INTERNAL_SERVER_ERROR,
                    message: {
                        message: i18n.__('error.InternalError'),
                        error: error
                    }
                }
            );
        }
    });
}

// Define other controller methods...
