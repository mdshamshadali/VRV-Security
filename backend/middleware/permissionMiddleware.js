// middleware/permissionMiddleware.js
const hasPermission = (userRole, requiredPermission) => {
    return userRole && userRole.permissions.includes(requiredPermission);
};

const permissionMiddleware = (requiredPermission) => {
    return (req, res, next) => {
        const { user } = req;
        if (!user || !hasPermission(user.role, requiredPermission)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports = permissionMiddleware;
