import fs from 'fs-extra';
import validation from '../helper/validator';
import check from '../helper/checkFiles';
import jwt from 'jsonwebtoken';
import dot from 'dotenv';
dot.config();
/**
 * create user session
 * @import validation
 * @class Session
 */
class Session {
    /**
     * @static { function } login
     * @param { object } req - request
     * @param { object } res - response
     */
    static async login(req, res){
        try{
        const details = {
            studentId : req.body.studentId,
            name: req.body.name,
            subject: req.body.subject,
            class: req.body.class,
            term: req.body.term,
            date: req.params.date
        }
        // validate details
        const validate = validation.sessionLogin(details);
        if(validate.error){
            return res.status(422).json({
                status: 422,
                error: validate.error.details[0].message
            })
        }
        // check date directory
        const dir = `c:/temp/exam/${req.params.date.trim().replace(/\s/g, "")}`;
        const checkDate = await check.folder(dir);
        if(!checkDate){
           return res.status(404).json({
                status: 404,
                error: `Sorry no exam for ${req.params.date}`
            })
        }
        const subject = `${dir}/${req.body.subject}`;
        const checkSubject = await check.folder(subject);
        if(!checkSubject){
          return  res.status(404).json({
                status: 404,
                error: `Sorry no exam for ${req.body.subject} subject`
            })
        }
        const questionFile = `${subject}/${req.body.class}_${req.body.term}.json`;
        const question = await check.file(questionFile);
        if(!question){
            return res.status(404).json({
                status: 404,
                error: `Sorry question file not found`
            })
        }
        //create question path and file
        const studentCopy = `${subject}/session/${req.body.studentId}_${req.body.class}_${req.body.term}.json`;
        await fs.ensureFileSync(studentCopy);
        const content = await check.read(studentCopy);
        const checkContent = Buffer.byteLength(content);
        // copy question
        if(checkContent < 1){
            await fs.copyFileSync(questionFile, studentCopy);
        }
        const token = jwt.sign({'student':details, 'questionPath': studentCopy, 'login':'true'}, process.env.TOKEN);
        return res.status(201).json({
            status: 201,
            token,
            message: `Student ID ${req.body.studentId} question loaded, click next to start answering`
        })
        } catch(error){
           console.log(error);
        }
    }
    static async answerQuestion(req, res){
    try{
    const checkDate = await check.file(req.userData.questionPath);
        if(!checkDate){
           return res.status(404).json({
                status: 404,
                error: `Sorry incorrect or deleted question file`
            })
        }
    const answer = { studentAnswer: req.body.studentAnswer};
    const questionIndex = req.params.num;
    let studentQuestion = await fs.readJSONSync(req.userData.questionPath);
    let questionNumber = await studentQuestion.find(question=> question.num === questionIndex);
    const selectedOption = await Object.assign(questionNumber, answer);
    questionNumber = selectedOption;
    await fs.writeJson(req.userData.questionPath, studentQuestion);
    return res.status(200).json({
        status: 200,
        answer: questionNumber,
        userData: req.userData
    })
    }catch(error){
        return res.status(500).json({
            status: 500,
            errror: 'Something went wrong'
        })
    }     
    }
    static async getQuestionByNum(req, res){
        try{
            const checkDate = await check.file(req.userData.questionPath);
                if(!checkDate){
                   return res.status(404).json({
                        status: 404,
                        error: `Sorry incorrect or deleted question file`
                    })
                }
            const questionIndex = req.params.num;
            let studentQuestion = await fs.readJSONSync(req.userData.questionPath);
            let questionNumber = await studentQuestion.find(question=> question.num === questionIndex);
            return res.status(200).json({
                status: 200,
                answer: questionNumber,
                userData: req.userData
            })
            }catch(error){
                return res.status(500).json({
                    status: 500,
                    errror: 'Something went wrong'
                })
            }     
    }
}
export default Session;