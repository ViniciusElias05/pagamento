const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-7208714089058308-060212-58dd181632bda56099d81ea8550fb669-507694139"
});

app.get("/", (req,res)=>{
    res.send("Rodando a aplicação");
});

app.get("/pagar", async (req, res)=>{
    var id = ""+ Date.now();
    var emailDoPagador = "vinicius@gmail.com";
    var dados = {
        items:[
            item = {
                id:id,//UUID or Date
                title: "5x video games: 3x camisas",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer:{
            email: emailDoPagador
        },
        external_reference: id
    }

    try{
        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        //Banco.SalvarPagamento({id: id, pagador: emailDoPagador}); Aqui que se salva o pagamento no banco
        return res.redirect(pagamento.body.init_point);
    }catch(err){
        return res.send(err.message);
    }

});

app.listen(3000,(req,res)=>{
    console.log("Servidor rodando");
})