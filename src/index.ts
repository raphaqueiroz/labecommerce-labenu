import express, { Request, Response } from "express";
import cors from "cors"

import {
  Product,
  Purchase,
  User,
} from "./types";

import { db } from "./database/knext";


const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});


app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser string");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser string");
    }

    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' deve ser string");
    }

    const [userIdExist]: User[] | undefined[] = await db("users").where({ id });

    if (userIdExist) {
      res.status(400);
      throw new Error("id existente, insira um novo email");
    }
    const [userEmailExist]: User[] | undefined[] = await db("users").where({ email });

    if (userEmailExist) {
      res.status(400);
      throw new Error("endereço de email já existente");
    }

    const newUser = {
      id,
      name,
      email,
      password,
    };

    await db("users").insert(newUser);
    res
      .status(201)
      .send({ message: "Cadastro realizado com sucesso", user: newUser });
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

app.put("/users/:id",async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id as string;

  const newId= req.body.id;
  const newName= req.body.name;
  const newEmail= req.body.email;
  const newPassword= req.body.id;
  const newCreateAt= req.body.id;


if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }
    }

if(newName !== undefined){
  if (typeof newName !== "string") {
    res.status(400);
    throw new Error("'name' deve ser string");
  }
 }

if(newCreateAt !== undefined){
  if(typeof newCreateAt !== "string"){
   res.status(404);
   throw new Error ("'createAt' deve ser string")
  }
}

const [user]: User[] | undefined[]= await db("users").where({id:idToEdit})

    if (!user) {
      res.status(404);
      throw new Error("'id' não encontrado")
    }


    const newUser: User={
      id: newId || user.id,
      name: newName || user.name,
     email: newEmail || user.email,
      password: newPassword || user.password,
      create_at: newCreateAt || user.create_at,
    }

    await db("users").update(newUser).where({id:idToEdit})
    res.status(200).send({message:" usuário editado com sucesso", user: newUser})

  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
  
});

app.delete("/users/:id",async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id as string;
 
    if (idToDelete !== undefined) {
      if (typeof idToDelete !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }
    }

    const [users]= await db("users").where({id:idToDelete})

    if(!users){
      res.status(404);
      throw new Error("'id' não encontrado");

    }

    await db("purchases").del().where({buyer_id:idToDelete })
    await db("users").del().where({ id: idToDelete })
    res.status(200).send("usuário deletado com sucesso!")



  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products");
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const image_url = req.body.image_url as string;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser string");
    }


    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser string");
    }

    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'price' deve ser number");
    }

    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description' deve ser string");
    }

    if (typeof image_url !== "string") {
      res.status(400);
      throw new Error("'image_url' deve ser string");
    }

    const [productIdExist]: User[] | undefined[] = await db("products").where({
      id,
    });

    if (productIdExist) {
      res.status(400);
      throw new Error("'id' já existeente");
    }

    const newProduct = {
      id,
      name,
      price,
      description,
      image_url,
    };

    await db("products").insert(newProduct);
    res.status(201).send({ message: "Cadastro realizado com sucesso", product: newProduct });
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToProduct = req.params.id as string;

    if (!idToProduct) {
      res.status(404);
      throw new Error("'id' não encontrado");
    }

    const newId = req.body.id as string;
    const newName = req.body.name as string;
    const newPrice = req.body.price as number;
    const newDescription= req.body.description as string;
    const newImageUrl= req.body.image_url as string;

    if (newId !== undefined){
      if(typeof newId !== "string"){
        res.status(404);
        throw new Error ("'id' deve ser string");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(404);
        throw new Error("'price' deve ser number");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(404);
        throw new Error(" 'name' deve ser string");
      }
    }

    if (newDescription !== undefined){
      if(typeof newDescription  !== "string"){
        res.status(404);
        throw new Error ("'newDescription ' deve ser string");
      }
    }

    if (newImageUrl !== undefined){
      if(typeof newImageUrl  !== "string"){
        res.status(404);
        throw new Error ("'newImageUrl ' deve ser string");
      }
    }

    const [product]: Product[] | undefined[]= await db("products").where({id:idToProduct})

    if (!product) {
      res.status(404);
      throw new Error("'id' não encontrado")
    }


    const newProduct: Product={
      id: newId || product.id,
      name: newName || product.name,
      price: newPrice || product.price,
      description: newDescription || product.description,
      image_url: newImageUrl || product.image_url,
    }

    await db("products").update(newProduct).where({id:idToProduct})
    res.status(200).send({message:" produto editado com sucesso!", user: newProduct})
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }}
});

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    const [foundProduct] = await db("products").where({ name: name });

    if (!name) {
      res.status(404);
      throw new Error("query params deve possuir pelo menos um caractere");
    }

    res.status(200).send(foundProduct);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});
  
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
      const idPurchases = req.params.id as string;
  
      const [foundPurchases] = await db
        .select("*")
        .from("purchasess")
        .where({ id: idPurchases });
  
      console.log(foundPurchases);
  
      if (!foundPurchases) {
        res.status(404);
        throw new Error("id não encontrado");
      }
  
      const purchaseUsers = await db("purchasess")
        .select(
          "purchasess.id",
          "purchasess.total_price",
          "purchasess.create_at",
          "purchasess.paid",
          "users.id",
          "users.email",
          "users.name"
        )
        .innerJoin("users", "purchasess.buyer_id", "=", "users.id")
        .where({ "purchasess.id": idPurchases });
  
      const productByPurchases = await db("purchases_products")
        .select(
          "products.id",
          "products.name",
          "products.price",
          "products.description ",
          "products.image_url ",
          "purchases_products.quantity"
        )
        .innerJoin(
          "products",
          "purchases_products.product_id",
          "=",
          "products.id"
        )
        .where({ "purchases_products.purchase_id": idPurchases });
  
      const result = {
        ...purchaseUsers[0],
        paid: purchaseUsers[0].paid === 0 ? false : true,
        productList: productByPurchases,
      };
  
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Error inesperado");
      }
    }
  });

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const buyer_id = req.body.buyer_id as string;
    const total_price = req.body.total_price as number;
    const paid = req.body.paid as number;
    const create_at = req.body.create_at as string;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }
    }

    if (buyer_id !== undefined) {
      if (typeof buyer_id !== "string") {
        res.status(400);
        throw new Error("'buyer_id' deve ser string");
      }
    }

    if (total_price !== undefined) {
      if (typeof total_price !== "number") {
        res.status(400);
        throw new Error("'total_price' deve ser number");
      }
    }

    if (paid !== undefined) {
      if (typeof paid !== "number") {
        res.status(400);
        throw new Error("'paid' deve ser number");
      }
    }

    if (create_at !== undefined) {
      if (typeof create_at !== "string") {
        res.status(400);
        throw new Error("'create_at' deve ser string ");
      }
    }

    const [purchaseExist]: Purchase[] | undefined[] = await db("purchasess").where({ id });

    if (purchaseExist) {
      res.status(400);
      throw new Error("'id' já existente");
    }

    const newPurchase = {
      id,
      total_price,
      paid,
      buyer_id,
    };

    await db("purchasess").insert(newPurchase);

    const [insertPurchasess]: Purchase[] = await db("purchasess").where({ id });

    res.status(201).send({
      message: "compra realizada com sucesso",
      purchase: insertPurchasess,
    });
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToProduct = req.params.id as string;

    if (!idToProduct) {
      res.status(404);
      throw new Error("produto não encontrado");
    }

    const result = await db("products").where({ id: idToProduct });

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  }
});

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }
    }

    const [purchase] = await db("purchasess").where({ buyer_id: id });

    res.status(200).send(purchase);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Error inesperado");
    }
  }
}); 
  