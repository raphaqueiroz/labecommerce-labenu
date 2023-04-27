"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knext_1 = require("./database/knext");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knext_1.db)("users");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [userIdExist] = yield (0, knext_1.db)("users").where({ id });
        if (userIdExist) {
            res.status(400);
            throw new Error("id existente, insira um novo email");
        }
        const [userEmailExist] = yield (0, knext_1.db)("users").where({ email });
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
        yield (0, knext_1.db)("users").insert(newUser);
        res
            .status(201)
            .send({ message: "Cadastro realizado com sucesso", user: newUser });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToEdit = req.params.id;
        const newId = req.body.id;
        const newName = req.body.name;
        const newEmail = req.body.email;
        const newPassword = req.body.id;
        const newCreateAt = req.body.id;
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string");
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("'name' deve ser string");
            }
        }
        if (newCreateAt !== undefined) {
            if (typeof newCreateAt !== "string") {
                res.status(404);
                throw new Error("'createAt' deve ser string");
            }
        }
        const [user] = yield (0, knext_1.db)("users").where({ id: idToEdit });
        if (!user) {
            res.status(404);
            throw new Error("'id' não encontrado");
        }
        const newUser = {
            id: newId || user.id,
            name: newName || user.name,
            email: newEmail || user.email,
            password: newPassword || user.password,
            create_at: newCreateAt || user.create_at,
        };
        yield (0, knext_1.db)("users").update(newUser).where({ id: idToEdit });
        res.status(200).send({ message: " usuário editado com sucesso", user: newUser });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToDelete = req.params.id;
        if (idToDelete !== undefined) {
            if (typeof idToDelete !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string");
            }
        }
        const [users] = yield (0, knext_1.db)("users").where({ id: idToDelete });
        if (!users) {
            res.status(404);
            throw new Error("'id' não encontrado");
        }
        yield (0, knext_1.db)("purchasess").del().where({ buyer_id: idToDelete });
        yield (0, knext_1.db)("users").del().where({ id: idToDelete });
        res.status(200).send("usuário deletado com sucesso");
    }
    catch (err) {
        console.log(err);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (err instanceof Error) {
            res.send(err.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knext_1.db)("products");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const image_url = req.body.image_url;
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
        const [productIdExist] = yield (0, knext_1.db)("products").where({
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
        yield (0, knext_1.db)("products").insert(newProduct);
        res.status(201).send({ message: "Cadastro realizado com sucesso", product: newProduct });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToProduct = req.params.id;
        if (!idToProduct) {
            res.status(404);
            throw new Error("'id' não encontrado");
        }
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newImageUrl = req.body.image_url;
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(404);
                throw new Error("'id' deve ser string");
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
        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(404);
                throw new Error("'newDescription ' deve ser string");
            }
        }
        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(404);
                throw new Error("'newImageUrl ' deve ser string");
            }
        }
        const [product] = yield (0, knext_1.db)("products").where({ id: idToProduct });
        if (!product) {
            res.status(404);
            throw new Error("'id' não encontrado");
        }
        const newProduct = {
            id: newId || product.id,
            name: newName || product.name,
            price: newPrice || product.price,
            description: newDescription || product.description,
            image_url: newImageUrl || product.image_url,
        };
        yield (0, knext_1.db)("products").update(newProduct).where({ id: idToProduct });
        res.status(200).send({ message: " product editado com sucesso", user: newProduct });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.get("/products/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const [foundProduct] = yield (0, knext_1.db)("products").where({ name: name });
        if (!name) {
            res.status(404);
            throw new Error("query params deve possuir pelo menos um caractere");
        }
        res.status(200).send(foundProduct);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToDelete = req.params.id;
        if (idToDelete !== undefined) {
            if (typeof idToDelete !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string");
            }
        }
        const [product] = yield (0, knext_1.db)("products").where({ id: idToDelete });
        if (!product) {
            res.status(404);
            throw new Error("'id' não encontrado");
        }
        yield (0, knext_1.db)("purchases_products").del().where({ product_id: idToDelete });
        yield (0, knext_1.db)("products").del().where({ id: idToDelete });
        res.status(200).send("product deletado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPurchases = req.params.id;
        const [foundPurchases] = yield knext_1.db
            .select("*")
            .from("purchasess")
            .where({ id: idPurchases });
        console.log(foundPurchases);
        if (!foundPurchases) {
            res.status(404);
            throw new Error("id não encontrado");
        }
        const purchaseUsers = yield (0, knext_1.db)("purchasess")
            .select("purchasess.id", "purchasess.total_price", "purchasess.create_at", "purchasess.paid", "users.id", "users.email", "users.name")
            .innerJoin("users", "purchasess.buyer_id", "=", "users.id")
            .where({ "purchasess.id": idPurchases });
        const productByPurchases = yield (0, knext_1.db)("purchases_products")
            .select("products.id", "products.name", "products.price", "products.description ", "products.image_url ", "purchases_products.quantity")
            .innerJoin("products", "purchases_products.product_id", "=", "products.id")
            .where({ "purchases_products.purchase_id": idPurchases });
        const result = Object.assign(Object.assign({}, purchaseUsers[0]), { paid: purchaseUsers[0].paid === 0 ? false : true, productList: productByPurchases });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const buyer_id = req.body.buyer_id;
        const total_price = req.body.total_price;
        const paid = req.body.paid;
        const create_at = req.body.create_at;
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
        const [purchaseExist] = yield (0, knext_1.db)("purchasess").where({ id });
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
        yield (0, knext_1.db)("purchasess").insert(newPurchase);
        const [insertPurchasess] = yield (0, knext_1.db)("purchasess").where({ id });
        res.status(201).send({
            message: "compra realizada com sucesso",
            purchase: insertPurchasess,
        });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToProduct = req.params.id;
        if (!idToProduct) {
            res.status(404);
            throw new Error("produto não encontrado");
        }
        const result = yield (0, knext_1.db)("products").where({ id: idToProduct });
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (err instanceof Error) {
            res.send(err.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
app.get("/users/:id/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string");
            }
        }
        const [purchase] = yield (0, knext_1.db)("purchasess").where({ buyer_id: id });
        res.status(200).send(purchase);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Error inesperado");
        }
    }
}));
//# sourceMappingURL=index.js.map