import db from 'mongoose';

export async function connect(url: string){
    try{
        const connection = await db.connect(url, { ignoreUndefined: true });
        console.log('db connected');
        return connection;
    } catch (err) {
        console.log('error connecting to db');
        console.log(err);
    }
}