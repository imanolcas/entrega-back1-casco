export const checkUserStatus = (req, res, next) => {

    const status = window.localStorage.getItem("status")

    const isUserOnline = status ? online : offline;

    res.isUserOnline = isUserOnline;

    next();
};