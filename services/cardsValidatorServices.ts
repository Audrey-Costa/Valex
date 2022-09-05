import { findById, update } from "../repositories/cardRepository";
import dayjs from "dayjs";
import { crypter } from "./cardsCreatorServices";


export async function validateCard(id: number, securityCode: string, password: string) {
    const card: any = await getCard(id);
    const CVC = crypt(card.securityCode, false);
    checkCredentials(CVC, securityCode)
    const encryptPassword = crypt(password, true);
    checkBlock(card.isBlocked);
    checkValidity(card.expirationDate);
    await registerPassword(card.id, encryptPassword);
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

function checkBlock(isBlocked: boolean){
    if (isBlocked){
        return;
    }
    throw {type: "Conflict", message: "Card already valid!"};
}

function checkValidity(expirationDate: string){
    if(dayjs(Date.now()).isBefore(`01/${expirationDate}`, 'month')){
        return;
    }
    throw {type: "Forbidden", message: "Card out of validity!"};
}

async function registerPassword(cardId: number, password: string) {
    await update(cardId, {password, isBlocked: false})
}