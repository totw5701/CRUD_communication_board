import express from "express";
const router = express.Router();

const { home } = require('../controllers/indexController');



router.get('/', home)

export default router;
//module.exports = router;