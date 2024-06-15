// categoryController.test.js

const categoryController = require('./categoryController');

describe('categoryController.create', () => {
    let request, response;

    beforeEach(() => {
        request = {
            body: {
                name: 'Food',
                description: 'Groceries'
            }
        };
        response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn()
        };
    });

    it('should insert a new record and send status 200 on success', async () => {
        // Mock getLatestCategory to resolve with a specific category_id
        getLatestCategory.mockResolvedValue(1);

        // Mock db.query to call the callback with a successful result
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { affectedRows: 1 });
        });

        await categoryController.create(request, response);

        expect(getLatestCategory).toHaveBeenCalled();
        expect(db.query).toHaveBeenCalledWith(
            'INSERT INTO category ( category_id,category_name,description) VALUES (?,?, ?)',
            [1, 'Food', 'Groceries'],
            expect.any(Function)
        );
        expect(response.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should handle db.query error and send error response', async () => {
        // Mock getLatestCategory to resolve with a specific category_id
        getLatestCategory.mockResolvedValue(1);

        // Mock db.query to call the callback with an error
        const queryError = new Error('Database error');
        db.query.mockImplementation((sql, params, callback) => {
            callback(queryError, null);
        });

        await categoryController.delete(request, response);

        //expect(categoryController.getLatestCategorygetLatestCategory()).toHaveBeenCalled();
        expect(db.query).toHaveBeenCalledWith(
            'delete FROM category where id=? ',
            [15],
            expect.any(Function)
        );
        expect(response.status).toHaveBeenCalledWith(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        expect(response.send).toHaveBeenCalledWith({
            status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: i18n.__('error.InternalError'),
            error: queryError
        });
    });

    it('should handle db.query error and send error response', async () => {
        // Mock getLatestCategory to resolve with a specific category_id
        getLatestCategory.mockResolvedValue(1);

        // Mock db.query to call the callback with an error
        const queryError = new Error('Database error');
        db.query.mockImplementation((sql, params, callback) => {
            callback(queryError, null);
        });

        await categoryController.create(request, response);

        //expect(categoryController.getLatestCategorygetLatestCategory()).toHaveBeenCalled();
        expect(db.query).toHaveBeenCalledWith(
            'INSERT INTO category ( category_id,category_name,description) VALUES (?,?, ?)',
            [1, 'Food', 'Groceries'],
            expect.any(Function)
        );
        expect(response.status).toHaveBeenCalledWith(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        expect(response.send).toHaveBeenCalledWith({
            status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: i18n.__('error.InternalError'),
            error: queryError
        });
    });

    it('should handle getLatestCategory error and send error response', async () => {
        // Mock getLatestCategory to reject with an error
        const categoryError = new Error('Category error');
        
        await categoryController.create(request, response);

        expect(db.query).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        expect(response.send).toHaveBeenCalledWith({
            status: CONSTANTS.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: i18n.__('error.InternalError')
        });
    });
});
