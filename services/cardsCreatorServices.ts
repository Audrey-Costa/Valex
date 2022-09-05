import { find, insert, findByTypeAndEmployeeId } from "../repositories/cardRepository";
import { findByApiKey } from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import { TransactionTypes } from "../repositories/cardRepository";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";

export async function createCard(apiKey: any, employeeId: number, type: TransactionTypes){
    await findCompany(apiKey);

    const employee: any = await findEmployee(employeeId);

    await findTypeCardForEmployee(employeeId, type);

    const number = await generateNumber();

    const cardholderName = shortName(employee.fullName);

    const expirationDate = validity();

    const securityCode = CVCGenerator();

    const CVCEncrypt = crypter(securityCode, true);

    console.log(securityCode)
    await insert(
        {
        employeeId, 
        number, 
        cardholderName,
        securityCode: CVCEncrypt,
        expirationDate,
        isVirtual: false,
        isBlocked: true,
        type})
}

async function findCompany(apiKey: any): Promise<object> {
    const company: object = await findByApiKey(apiKey);
    if( company ){
        return;
    }
    throw {type: "Not Found", message: "Company not found!"};
}

async function findEmployee(employeeId: number): Promise<object> {
    const employee: object = await employeeRepository.findById(employeeId);
    if( !employee ){
        throw {type: "Not Found", message: "Employee not found!"};
    }
    return employee;
}

async function findTypeCardForEmployee(employeeId: number, type: TransactionTypes) {
    const card: object = await findByTypeAndEmployeeId(type, employeeId);
    if(card){
        throw {type: "Conflict", message:"The emploee already have a card of this type!"}
    }
}

async function generateNumber(): Promise<string>{
    const cardNumber = faker.phone.number("#### #### #### ####");
    const cards = await find();
    for (let i = 0; i < cards.length; i++){
        if(cards[i].number === cardNumber){
            generateNumber();
            break;
        }
    }
    return cardNumber;
}

function shortName(name: string): string{
    const separetedName = name.split(" ");
    const shortSeparetedName = []
    
    for (let i = 0; i < separetedName.length; i++){
        if(i === 0 || i === separetedName.length -1){
            shortSeparetedName.push(separetedName[i]);
        }else if(separetedName[i].length >= 3){
            shortSeparetedName.push(separetedName[i][0] + ".");
        }
    }

    return shortSeparetedName.join(" ")
}

function validity(): string{
    return dayjs(dayjs(Date.now()).add(5, 'year')).format("MM/YY");
}

function CVCGenerator(): string{
    return faker.phone.number("###");
}

export function crypter(CVC: string, encrypt: boolean): string{
    const cryptr = new Cryptr('secretKey');
    if(encrypt){
        const encript = cryptr.encrypt(CVC);
        return encript;
    }else{
        const decrypt = cryptr.decrypt(CVC);
        return decrypt;
    }

}