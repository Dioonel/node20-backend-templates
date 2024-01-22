export class UserService {
    private users = [
        { id: 1, name: 'John'},
        { id: 2, name: 'Jane'},
        { id: 3, name: 'Jack'},
        { id: 4, name: 'Jill'}
    ];
    private idCounter = 4;

    async getAll() {
        return this.users;
    }

    async getById(id: number) {
        return this.users.find(user => user.id === id);
    }

    async create(name: string) {
        const id = ++this.idCounter;
        const user = { id, name };
        this.users.push(user);
        return user;
    }

    async update(id: number, name: string) {
        const user = this.users.find(user => user.id === id);
        if(user) {
            user.name = name;
        }
        return user;
    }

    async delete(id: number) {
        const user = this.users.find(user => user.id === id);
        if(user) {
            this.users = this.users.filter(user => user.id !== id);
        }
        return user;
    }
}