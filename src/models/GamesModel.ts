import { Player } from "@/models/PlayersModel";

export interface Game {
    player_1_score: number;
    player_2_score: number;
    createdAt: Date;
    updatedAt: Date;
    match_start_time: Date | null;
    match_end_time: Date | null;
    player_2: Player;
    winner: Player;
    player_1: Player;
}

export interface GameResponse {
    id: number;
    attributes: Game;
}