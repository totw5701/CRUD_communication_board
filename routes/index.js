import express from "express";
const router = express.Router();

const { home, search } = require('../controllers/indexController');



router.get('/', home)
router.get('/search', search)

export default router;
//module.exports = router;