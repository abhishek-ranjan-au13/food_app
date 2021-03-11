const guest = (req,res,next)=> {
    if(!req.session.token){
        return next();
    }
    res.redirect('/')
};

module.exports = guest;