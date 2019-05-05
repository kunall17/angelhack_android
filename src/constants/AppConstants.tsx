import { ProdCore, UserDTO } from "../..";

export const apple: ProdCore = {
    prodId: '1',
    name: 'Apple',
    rate: 100,
};

export const banana: ProdCore = {
    prodId: '2',
    name: 'Banaa',
    rate: 50,
};

export const kiwi: ProdCore = {
    prodId: '3',
    name: 'Kiwi',
    rate: 200,
};

export const prodList: Array<ProdCore> = [apple, banana, kiwi];

export const userAmol: UserDTO = {
    userId: '1',
    userName: 'Amol',
};

export const userKunal: UserDTO = {
    userId: '2',
    userName: 'Kunal',
};

export const userList: Array<UserDTO> = [userAmol, userKunal];

export const BILLING_SCREEN = 'BillingScreen';
export const ITEM_SCREEN = 'ItemScreen';
export const BILLING_QUE = 'BillingQue';