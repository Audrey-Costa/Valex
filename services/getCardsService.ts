import dayjs from "dayjs";
import { find } from "../repositories/cardRepository";
import { crypter } from "./cardsCreatorServices";

export async function getEmployeeCard(id: number, password: string){
    const employeeCards: any = await getCard(id);
    const employeeCardsCheked: any = checkPassword(employeeCards, password);
    const employeeCardsValid: any = checkValidity(employeeCardsCheked);
    return employeeCardsValid;
}


async function getCard(id: number){
    const cards: any = await find();
    const employeeCards = [];
    
    for(let i = 0; i < cards.length; i++){
        if(cards[i].employeeId === id){
            employeeCards.push(cards[i]);
        }
    }

    if (employeeCards.length > 0){
        return employeeCards;
    }
    throw {type: "Not Found", message: "Cards not found!"};
}

function crypt(securityCode: string, boolean:boolean): string{
    return crypter(securityCode, boolean)
}

function checkPassword(employeeCards: any, password: string){
    const employeeCardsChecked = [];
    for(let i = 0; i < employeeCards.length; i++){
        const savedPassword = crypt(employeeCards[i].password, false);
        if(savedPassword === password){
            employeeCardsChecked.push(employeeCards[i]);
        }
    }
    if (employeeCardsChecked.length > 0){
        return employeeCardsChecked;
    }else{
        throw {type: "Unauthorized", message: "Credentials are not valid!"};
    }
}

function checkValidity(employeeCardsChecked: any){
    const employeeCardsValid = [];
    for (let i = 0; i < employeeCardsChecked.length; i++){
        if(dayjs(Date.now()).isBefore(`01/${employeeCardsChecked[i].expirationDate}`, 'month')){
            employeeCardsValid.push(employeeCardsChecked[i]);
        }
    }
    if(employeeCardsValid.length > 0){
        return employeeCardsValid;
    }
    throw {type: "Forbidden", message: "Card out of validity!"};
}