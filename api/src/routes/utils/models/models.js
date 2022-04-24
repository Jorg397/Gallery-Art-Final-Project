const { Customer } = require('../../../db');
const boom = require('@hapi/boom');


module.exports = {
    async findByEmail(email) {
        const customer = await Customer.findOne({
            where: {
                email,
            },
        });
        return customer;
    },
    checkRoles(...roles) {
        return (req, res, next) => {
            const user = req.user;
            if (roles.includes(user.role)) {
                next();
            } else {
                next(boom.unauthorized());
            }
        }
    }
};
