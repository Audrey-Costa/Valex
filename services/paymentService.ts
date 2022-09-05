import * as cardRepository from "../repositories/cardRepository";
import * as businessRepository from "../repositories/businessRepository"
import dayjs from "dayjs";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import { crypter } from "./cardsCreatorServices";

export async function payment(cardId: number, businessId: number, amount: number, password: string){
    const card: any = await getCard(cardId);
    isActive(card.password);
    checkBlock(card.isBlocked);
    checkValidity(card.expirationDate);
    checkPassword(card.password, password);
    const business = await checkBusiness(businessId);
    checktypes(business.type, card.type);
    await checkBalance(cardId, amount);
    await paymentRepository.insert({
        cardId,
        businessId, 
        amount: amount
    })
}


async function getCard(id: number): Promise<object>{
    const card = await cardRepository.findById(id);
    if(card){
        return card;
    }
    throw {type: "Not Found", message: "Card not found!"};
}

function isActive(password: string){
    if (password){
        return;
    }
    throw {type: "Forbidden", message: "Card inactive!"};
}

function checkBlock(isBlocked: boolean){
    if (!isBlocked){
        return;
    }
    throw {type: "Conflict", message: "Card blocked!"};
}

function checkValidity(expirationDate: string){
    if(dayjs(Date.now()).isBefore(`01/${expirationDate}`, 'month')){
        return;
    }
    throw {type: "Forbidden", message: "Card out of validity!"};
}

function crypt(securityCode: string, boolean:boolean): string{
    return crypter(securityCode, boolean)
}

function checkPassword(savedPassword: string, password: string){
    const descryptPassword = crypt(savedPassword, false);
    if (descryptPassword === password){
        return;
    }else{
        throw {type: "Unauthorized", message: "Credentials are not valid!"};
    }
}

async function checkBusiness(id: number){
    const business = await businessRepository.findById(id);
    if(business){
        return business;
    }
    throw {type: "Not Found", message: "Business not found!"}
}

function checktypes(businessType: string, cardType: string){
    if(businessType === cardType){
        return;
    }
    throw {type: "Forbidden", message: "Invalid type of business!"};
}

async function checkBalance(cardId: number, amount: number) {
    const payments = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    console.log(recharges)
    const totalPayment = payments.map((payment) => {return payment.amount}).reduce((previousValue: any, currentValue: any) => previousValue + currentValue, 0);
    const totalRecharge = recharges.map((recharges) => {return recharges.amount}).reduce((previousValue: any, currentValue: any) => previousValue + currentValue, 0);
    console.log(totalPayment, totalRecharge)
    if(totalRecharge - totalPayment > amount){
        return;
    }
    throw {type: "Method not allowed", message: "Insufficient funds"};
}