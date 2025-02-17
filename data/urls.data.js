const urls = {
    baseUrl: "https://serverest.dev",
    login: "/login",
    users: "/usuarios",
    products: "/produtos",
    carts: {
        root: "/carrinhos",
        completePurchase: "/carrinhos/concluir-compra",
        cancelPurchase: "/carrinhos/cancelar-compra"
    }
}

module.exports = {
    urls
}