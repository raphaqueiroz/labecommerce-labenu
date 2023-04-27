
export enum CATEGORIES{
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
    }

  export type User ={
    id : string,
    name: string,
    email: string,
    password: string,
    create_at: string
 
  }

  export type Product ={
      id : string,
      name: string,
      price: number,
      description:string,
      image_url:string
    }

    export type Purchase ={
      userId : string,
      productId: string,
      quantity: number,
      totalPrice: string
    }

    export type TPurchaseProducts = {
      userId : string,
      productId: string,
      quantity: number,
      totalPrice: string
      responsibles: User[]
  }