const authorizingAdmin = (req, res, next) => {
    console.log("Router 1")
    const token = "xyz";
    const authAdmin = token === "xyz";
    if(!authAdmin) {
        res.status(401).send("unathorised admin")
    } else {
        next();
    }
}

const authorizingUser = (req, res, next) => {
    console.log("Router 1")
    const token = "xyz";
    const authAdmin = token === "xyz";
    if(!authAdmin) {
        res.status(401).send("unathorised user")
    } else {
        next();
    }
}  

module.exports = {
    authorizingAdmin,
    authorizingUser,
}