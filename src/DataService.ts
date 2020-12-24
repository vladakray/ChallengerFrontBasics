import { ChallengeDayItem } from "./ChallengeDayItem";
import { ChallengeItem } from "./ChallengeItem";

interface User {
    username: string;
    password: string;
}

class DataService {
    private static DB_URL="http://localhost:4000";

    public async getAll(): Promise<ChallengeItem[]> {
        let chResponsePromise: Promise<Response> = fetch (`${DataService.DB_URL}/challenges`);
        let response: Response = await chResponsePromise;
        let jsonPromise: Promise<ChallengeItem[]> = response.json();
        return await jsonPromise;
    }

    public async getMyAll(): Promise<ChallengeItem[]> {
        let chResponsePromise: Promise<Response> = fetch (`${DataService.DB_URL}/my_challenges`);
        let response: Response = await chResponsePromise;
        let jsonPromise: Promise<ChallengeItem[]> = response.json();
        return await jsonPromise;
    }

    public async login(username: string, password: string): Promise<boolean> {
        let usersResponsePromise: Promise<Response> = fetch (`${DataService.DB_URL}/users?username=${username}`);
        let response: Response = await usersResponsePromise;
        let jsonPromise: Promise<User[]> = response.json();
        let users = await jsonPromise;
        if (users.length === 0) {
            return false;
        }
        let user = users[0];
        if (user.password === password) {
            return true;
        }
        return false;

    }

    public async getAllChallengeDays(): Promise<ChallengeDayItem[]> {
        let chDayResponsePromise: Promise<Response> = fetch (`${DataService.DB_URL}/challenge`);
        let response: Response = await chDayResponsePromise;
        let jsonPromise: Promise<ChallengeDayItem[]> = response.json();
        return await jsonPromise;
    }

    public async getById(id: string): Promise<ChallengeDayItem[]>{
        let chDayResponsePromise: Promise<Response> = fetch (`${DataService.DB_URL}/challenge_days?challenge_id=${id}`);
        let response: Response = await chDayResponsePromise;
        let jsonPromise: Promise<ChallengeDayItem[]> = response.json();
        let challengeDays = await jsonPromise;
        if (challengeDays.length) {
            return challengeDays;
        }
        return [];

    }

    public async saveToMyChallenge(newChallenge: ChallengeItem): Promise<boolean> {

        let challenges = await this.getAll();
        let my_challenges = await this.getMyAll();

        let challengeItem = challenges.find(value => value.id === newChallenge.id);
        let myChallengeItem = my_challenges.find(value => value.id === newChallenge.id);

        let isNewItem: boolean = myChallengeItem == null;

        let postPromise = fetch(`${DataService.DB_URL}/my_challenges`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: isNewItem? "POST" : "PATCH",
            body: JSON.stringify(challengeItem)
        });

        return await (await postPromise).json();
    }

    public async dropMyChallenge(challenge: ChallengeItem): Promise<boolean> {

       // Delete	Delete a JSON object/array item value

        let postPromise = fetch(`${DataService.DB_URL}/my_challenges/${challenge.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        });
        return await (await postPromise).json();
    }

}


export const dataService= new DataService();