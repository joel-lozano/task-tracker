export default {
	db: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/tasks-db',
    sessionSecret: process.env.SESSION_SECRET || 'developmentsecret'
}
