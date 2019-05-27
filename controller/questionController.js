import fs from 'fs-extra';
import validate from '../helper/validator';
/**
 * exam logic
 * @class Exam
 */
class Question{
    /**
     * @params { object } res - response
     * @params { object } req - request
     * @return { json } json data
     */
    static async addQuestion(req, res){
    //get question
    try{
    const question = {
        subject: req.body.subject,
        class: req.body.class,
        term: req.body.term,
        date: req.body.date,
        questions: req.body.questions
    }
    const validation = validate.questionData(question);
    if(validation.error){
        return res.status(422).json({
            status: 422,
            error: validation.error.details[0].message
        })
    }
    const dir = `c:/temp/exam/${req.body.date.trim().replace(/\s/g, "")}`;
    // check if directory exist
     await fs.readdir(dir, (error, response)=>{
        if(!response){
           return res.status(404).json({
                status: 404,
                error: `No previous data created for this date ${req.body.date.trim().replace(/\s/g, "")}`
            });
        }
        
    });
     // create a subject directory and question file
     const file = `${dir}/${req.body.subject}/${req.body.class}_${req.body.term}.json`;
    await fs.ensureFile(file);
     //save it into a file
    await fs.writeJson(file, req.body.questions);
     //send back directory
     return res.status(201).json({
         status: 201,
         message: 'Question were successfully saved',
         path: file
     })
   
    } catch(error){
        return res.status(500).json({
            status: 500,
            error: 'Something went wrong'
        })
    }
    }
    /**
     * view questions
     * @param { object } req request
     * @param { object } res response
     */
    static async viewQuestion(req, res){
        // get data
        try{
        const details ={
            date: req.body.date,
            subject: req.body.subject,
            class: req.body.class,
            term: req.body.term
        }
        // validate data
        const validateDetials = validate.viewQuestion(details);
        if(validateDetials.error){
            return res.status(422).json({
                status: 422,
                error: validateDetials.error.details[0].message
            })
        }
        // check for question file
        const questionFile = `c:/temp/exam/${req.body.date.trim().replace(/\s/g, "")}/${req.body.subject.trim().replace(/\s/g, "")}/${req.body.class.replace(/\s/g, "")}_${req.body.term.trim().replace(/\s/g, "")}.json`;
        await fs.readJSON(questionFile, (error, response)=>{
           if(!response){
               return res.status(404).json({
                   status: 404,
                   error: 'Sorry! question not found, please ensure to enter the correct detials'
               })
           }
        })
        const question = await fs.readJSON(questionFile);
        return res.status(200).json({
            status: 200,
            question
        })
        }catch(error){
            res.status(500).json({
                status: 500,
                error
            })
        }
    }

}

export default Question;