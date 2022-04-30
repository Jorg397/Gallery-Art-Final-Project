const { Customer } = require("../../../db");
const boom = require("@hapi/boom");

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
    }, 
    todayDate() {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        const now = `${yyyy}-${mm}-${dd}`
        return now;
    }
};
