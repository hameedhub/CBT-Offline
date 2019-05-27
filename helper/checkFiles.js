import fs from 'fs-extra';
/**
 * check files and folder
 * @class Check
 */
class Check{
    /**
         * @param { directory } dir
         * @function { asychronize } 
         * @param { object } response 
         * @param { object } error
         * @return { object } response
         */
    static async folder(dir){
        try{
        const response = await fs.readdirSync(dir);
        return response;
        }catch(error){
            console.log(error);
        }
    }

    static async file(file){
        try{
        const response = await fs.readFileSync(file);
        return response;
        }catch(error){
            console.log(error);
        }
    }
    static async write(file){
        const response = await fs.ensureFileSync(file);
        return response;
    }
    static async read(file){
        try{
        const response = await fs.readFileSync(file);
        return response;
        }catch(error){
            console.log(error);
        }
    }
}

export default Check;