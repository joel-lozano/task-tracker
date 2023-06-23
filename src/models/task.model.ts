import mongoose, { Types } from 'mongoose';

interface ITask {
    user: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: Date;
}

const TaskSchema = new mongoose.Schema<ITask>({
    user: String,
    title: String,
    description: String,
    completed: Boolean,
    dueDate: Date
});

export { ITask };
export default mongoose.model('Task', TaskSchema);