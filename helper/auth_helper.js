module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        else{
            req.flash('ERROR_MSG','your are not autherized')
            res.redirect('/auth/login',301,{})
        }
    }
}
   