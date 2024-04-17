import express from 'express';


const pageRouter = express.Router();


pageRouter.get('/', (req, res) => {
    res.render('home', {});
});

export default pageRouter;