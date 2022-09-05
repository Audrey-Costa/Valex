import { findById, update } from "../repositories/cardRepository";
import dayjs from "dayjs";
import { crypter } from "./cardsCreatorServices";


export async function validateCard(id: number, securityCode: string, password: string) {
    const card: any = await getCard(id);
    const CVC = crypt(card.securityCode, false);
    checkCredentials(CVC, securityCode)
    isActive(card.password);
    const encryptPassword = crypt(password, true);
    checkValidity(card.expirationDate);
    const isBlocked = false;
    await registerPassword(card.id, encryptPassword, isBlocked);
}


function crypt(securityCode: string, boolean:boolean): string{
    return crypter(securityCode, boolean)
}

async function getCard(id: number): Promise<object>{
    const card = await findById(id);
    if(card){
        return card;
    }
    throw {type: "Not Found", message: "Card not valid!"};
}

function checkCredentials(CVC: string, securityCode: string){
    if(CVC === securityCode){
        return
    }
    throw {type: "Unauthorized", message: "Credentials are not valid!"};
}

function isActive(password: string){
    if (!password){
        return;
    }
    throw {type: "Conflict", message: "Card already active!"};
}

function checkValidity(expirationDate: string){
    if(dayjs(Date.now()).isBefore(`01/${expirationDate}`, 'month')){
        return;
    }
    throw {type: "Forbidden", message: "Card out of validity!"};
}

async function registerPassword(cardId: number, password: string, isBlocked: boolean) {
    await update(cardId, {password, isBlocked})
}