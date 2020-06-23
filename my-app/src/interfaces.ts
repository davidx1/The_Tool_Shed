export interface IState {
  catalogue: IProduct[];
  cart: string[];
}

export interface IProduct {
  name: string;
  price: number;
}

export enum ActionTypes {
  ADD_ONE_OF = "ADD_ONE_OF",
  REMOVE_ONE_OF = "REMOVE_ONE_OF",
  REMOVE_ALL_OF = "REMOVE_ALL_OF",
  REMOVE_ALL = "REMOVE_ALL",
}
