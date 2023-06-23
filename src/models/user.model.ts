import mongoose, { Types } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface IUser {
    _id: Types.ObjectId;
    username: string;
};

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

UserSchema.plugin(passportLocalMongoose);

export { IUser };
export default mongoose.model('User', UserSchema);