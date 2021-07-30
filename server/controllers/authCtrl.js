const {Users} = require('../models');
const config = require("../config/config.auth");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const authCtrl = {
    register : async (req, res) => {

        try {
            const {username,email,password}=req.body;

            const usernameExists = await Users.findOne({
                where: {
                username: req.body.username
                }
            })

            const emailExists = await Users.findOne({
                where: {
                email: req.body.email
                }
            })

            if(usernameExists) return res.status(400).json({msg:"The username already exists"})
            if(emailExists) return res.status(400).json({msg:"The email already exists"})

            if(password.length<6)
            return res.status(400).json({msg:"Password must be at least 6 characters"})  

            // Password encryption
            const passwordHash = await bcrypt.hash(password, 10)

            // Save User to Database
            const newUser = await Users.create({
                username: req.body.username,
                email: req.body.email,
                password: passwordHash
            })

            // then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser.id})
            const refreshtoken = createRefreshToken({id: newUser.id})

            res.cookie('refreshtoken',refreshtoken,{
                    httpOnly:true,
                    path:'/auth/refresh_token'
            })

            res.json({accesstoken})

            } catch (err) {
                    return res.status(500).json({msg:err.message})
        }
    },

    login : async (req, res) => {
        try {

            const {username,password}=req.body;

            const user = await Users.findOne({
                where: {
                    username: req.body.username
                }
            })

            if(!user) return res.status(400).json({ msg: "Username doesn't exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({ msg: "Incorrect password." })

            //If login success,create access token and refresh token
            const accesstoken=createAccessToken({id: user.id})
            const refreshtoken=createRefreshToken({id: user.id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/auth/refresh_token',
                maxAge: 7*24*60*60*100  // 7days
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }

    },
    logout: async(req, res)=>{
        try {
            res.clearCookie('refreshtoken',{path: '/auth/refresh_token'})
            return res.json({msg: "Logged out" })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req ,res)=>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register" })

            jwt.verify(rf_token, config.secret, (err, user) => {
                if(err) return res.status(400).json({msg: "Please Login or Register" })
                const accesstoken = createAccessToken({id: user.id})
                res.json({accesstoken})
            })

            res.json({rf_token})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }  
    },
    getUser: async(req, res)=>{
        try {

            const user = await Users.findAll({ where: { id: req.user.id} })
            if(!user) return res.status(400).json({msg:"User doesn't exist"})
            
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },

}

const createAccessToken=(user)=>{
    return  jwt.sign(user, config.secret, {expiresIn:'11m'})
}
const createRefreshToken=(user)=>{
    return  jwt.sign(user, config.secret, {expiresIn:'7d'})
}

module.exports = authCtrl