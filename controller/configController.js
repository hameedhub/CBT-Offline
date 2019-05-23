import validate from '../helper/validator';
import fs from 'fs-extra';
import bcrypt from 'bcryptjs';
import users from '../model/user';
/**
 * config data folder structure
 * @class Config
 */
class Config {
    /**
     * @params { object } req - request
     * @params { object } res - response
     * @function { static async } 
     * @return { json } json data
     * @error { json }
     */
    static async login(req, res){
        // input data
        try{
        const data ={
            username: req.body.username,
            password: req.body.password,
            date: req.body.date
        }
        // validation
        const validateData = validate.loginData(data);
        // error ! null
        if(validateData.error){
            return res.status(422).json({
                status: 422,
                error: validateData.error.details[0].message
            })
        }
        // check for user
        const userData = users.find(user=>user.username === req.body.username);
        if(!userData){
            return res.status(410).json({
                status: 410,
                error: 'Invalid username'
            })
        }
        const comparePassword = bcrypt.compareSync(req.body.password, userData.password);
        if(!comparePassword){
            return res.status(410).json({
                status: 401,
                error: 'Invalid password'
            })
        }
        // directory path for exam offline storage
        const dir = `c:/temp/exam/${req.body.date.trim().replace(/\s/g, "")}`;
        // creating a directory structure
        await fs.ensureDir(dir);
        // return 
        return res.status(200).json({
            status: 200,
            message: 'Login was successful',
            path: dir,
        })
    } catch(error){
        return res.status(500).json({
            status: 500,
            error: 'Something went wrong'
        })
    }
    }
}

export default Config;