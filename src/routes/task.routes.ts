import Task from '../models/task.model';
import User from '../models/user.model';
import { Router } from 'express';

const router = Router();

// Create a new task
router.post('/', async (req, res) => {
    try {
        res.send(await new Task({
            title: req.body.title,
            description: req.body.description,
            completed: false,
            dueDate: req.body.dueDate
        }).save());
    } catch (err: any) {
        res.status(500).send({
            message: err.message || 'Error occurred while creating task.'
        });
    }
});

// Get all tasks for a user
router.get('/', async (req, res) => {
    const user = req.user;
    if (!user) {
        return;
    }

    try {
        const username = (await User.findOne(user)).username;
        res.send(await Task.find({ user: username }));
    } catch (err: any) {
        res.status(500).send({
            message: err.message || 'Error occurred while fetching tasks.'
        });
    }
});

router.delete('/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    try {
        if (!await Task.findByIdAndDelete(taskId)) {
            return res.status(404).send({
                message: `Task with id ${taskId} not found.`
            });
        }

        res.send({ message: 'Post deleted successfully.' });
    } catch (err: any) {
        return res.status(500).send({
            message: err.message || `Error deleting task with id ${taskId}.`
        });
    }
});

export default router;