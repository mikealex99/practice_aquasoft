const {Users} = require('../models');

const authUser = async(req,res,next)=>{
    try {

        // get user information by id
        const user = await Users.findAll({ where: { id: req.user.id} })
        if(!user) return res.status(400).json({msg:"Acces denied! Please log in"})

        next()
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}


module.exports = authUser