const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model("Users", LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        console.log('Entrou no método de login')
        this.validation();
        if (this.errors.length > 0) return;

        console.log('Não houve erro na validação');

        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push("Erro! Tente novamente");
            return;
        }

        console.log('Não houve erro de usuário');

        if (!(bcryptjs.compareSync(this.body.password, this.user.password))){
            this.errors.push('Senha inválida');
            return;
        }

        console.log('Passou por tudo!');
    }

    async register() {
        this.validation();
        if (this.errors.length > 0) return;

        await this.userExists();

        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push("Usuário já existe");
    }

    validation() {
        this.cleanUp();

        //O e-mail precisa ser válido
        if (!validator.isEmail(this.body.email))
            this.errors.push("E-mail inválido");

        //A senha precisa ter entre 3 e 50 caracteres
        if (this.body.password.length < 3 || this.body.password.length > 50)
            this.errors.push("A senha precisa ter entre 3 e 50 caracteres");
    }

    cleanUp() {
        for (const key in this.body)
            if (typeof this.body[key] !== "string") this.body[key] = "";

        this.body = {
            email: this.body.registerEmail,
            password: this.body.registerPassword,
        };
    }
}

module.exports = Login;
