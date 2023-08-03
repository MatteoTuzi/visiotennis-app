export class Player {
    full_name: string;
    player_name: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(full_name: string, player_name: string, createdAt: Date, updatedAt: Date) {
        this.full_name = full_name;
        this.player_name = player_name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export interface PlayerResponse {
    id: number;
    attributes: Player;
}