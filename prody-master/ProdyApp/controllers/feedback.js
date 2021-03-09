const db = require('../util/database');
const logger = require('../services/logger');

exports.postFeedback = (req, res) => {
    if(!req.body.feedback_subject || !req.body.feedback_content) {
        return res.status(400).send('feedbak Missing !'); // 400 bad request
    } 
    const feedback = {
        user_id: req.body.user_id,
        subject: req.body.feedback_subject,
        content: req.body.feedback_content,
        created_date: req.body.feedback_date
    };

    logger.writeLog('--- feedback --- ' + JSON.stringify(feedback, null, 2));

    const updatePoints = (userID, addPoints) => {
        logger.writeLog(`--- feedback --- updatePoints -> userID:${userID} addPoints:${addPoints}`);
        return db.query(`UPDATE prody.USERS SET points = points + ? where id = ?`, [addPoints,userID]);
    };

    const insertFeedback = (user_id, created_date, subject, content) => {
        return db.query(`INSERT INTO prody.FEEDBACK (user_id, created_date, subject, content) VALUES (?, ?, ?, ?)`,
            [user_id, created_date, subject, content]);
    }

    insertFeedback(req.body.user_id, req.body.feedback_date, req.body.feedback_subject, req.body.feedback_content)
        .then(() => {return updatePoints(feedback.user_id,5);})
        .then( () => {res.send('Your feedback was sent and you gain 5 points');})
        .catch(err => res.status(404).send(`prody error: ${err}`));
};