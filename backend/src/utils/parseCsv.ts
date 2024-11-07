import xlsx from 'xlsx';
import { Player } from '../types/players';


export const parseCsvFileWithXlsx = (filePath: string): any => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
 
    const jsonData: any[] = xlsx.utils.sheet_to_json(sheet, { header: 1 });
 
    const players: Player[] = jsonData.slice(1).map((row: any) => ({
        long_name: row[0] || '',
        club_name: row[1] || '',
        fifa_version: Number(row[2]) || 0,
        fifa_update: row[3] || '',
        player_face_url: row[4] || '',
        player_positions: row[5] || '',
        nationality_name: row[6] || '',
        overall: Number(row[7]),
        potential: Number(row[8]) || 0,
        value_eur: Number(row[9]) || 0,
        wage_eur: Number(row[10]) || 0,
        age: Number(row[11]) || 0,
        height_cm: Number(row[12]) || 0,
        weight_kg: Number(row[13]) || 0,
        preferred_foot: row[14] || '',
        weak_foot: Number(row[15]) || 0,
        skill_moves: Number(row[16]),
        international_reputation: Number(row[17]),
        work_rate: row[18] || '',
        body_type: row[19] || '',
        pace: Number(row[20]) || 0,
        shooting: Number(row[21]) || 0,
        passing: Number(row[22]) || 0,
        dribbling: Number(row[23]) || 0,
        defending: Number(row[24]) || 0,
        physic: Number(row[25]) || 0,
        attacking_crossing: Number(row[26]),
        attacking_finishing: Number(row[27]) || 0,
        attacking_heading_accuracy: Number(row[28]) || 0,
        attacking_short_passing: Number(row[29]) || 0,
        attacking_volleys: Number(row[30]) || 0,
        skill_dribbling: Number(row[31]) || 0,
        skill_curve: Number(row[32]) || 0,
        skill_fk_accuracy: Number(row[33]) || 0,
        skill_long_passing: Number(row[34]) || 0,
        skill_ball_control: Number(row[35]) || 0,
        movement_acceleration: Number(row[36]) || 0,
        movement_sprint_speed: Number(row[37]) || 0,
        movement_agility: Number(row[38]) || 0,
        movement_reactions: Number(row[39]) || 0,
        movement_balance: Number(row[40]) || 0,
        power_shot_power: Number(row[41]) || 0,
        power_jumping: Number(row[42]) || 0,
        power_stamina: Number(row[43]) || 0,
        power_strength: Number(row[44]) || 0,
        power_long_shots: Number(row[45]) || 0,
        mentality_aggression: Number(row[46]) || 0,
        mentality_interceptions: Number(row[47]) || 0,
        mentality_positioning: Number(row[48]) || 0,
        mentality_vision: Number(row[49]) || 0,
        mentality_penalties: Number(row[50]) || 0,
        mentality_composure: Number(row[51]) || 0,
        defending_marking: Number(row[52]) || 0,
        defending_standing_tackle: Number(row[53]) || 0,
        defending_sliding_tackle: Number(row[54]) || 0,
        goalkeeping_diving: Number(row[55]) || 0,
        goalkeeping_handling: Number(row[56]) || 0,
        goalkeeping_kicking: Number(row[57]) || 0,
        goalkeeping_positioning: Number(row[58]) || 0,
        goalkeeping_reflexes: Number(row[59]) || 0,
        goalkeeping_speed: Number(row[60]) || 0,
        player_traits: row[61] || '',
   }));
   return players;
}

