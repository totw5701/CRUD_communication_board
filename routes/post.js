import express from "express";

const router = express.Router();
const { createProcess, deleteProcess, create, updateProcess, update, postDetail } = require('../controllers/postController');


router.post('/create_process', createProcess);
router.post('/delete_process', deleteProcess);
router.get('/create', create);
router.post('/update_process', updateProcess);
router.get('/update/:pageId', update);
router.get('/:pageID', postDetail);

export default router;
