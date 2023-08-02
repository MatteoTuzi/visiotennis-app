export class Player {
    username: string
    password: string

    constructor(username?: string, password?: string) {
        this.username = username ? username : ''
        this.password = password ? password : ''
    }
}