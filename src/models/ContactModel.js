const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: false },
    number: { type: String, required: false },
    email: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("contacts", ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        this.validation();

        if (this.errors.length > 0) return;
        this.contact = await ContactModel.create(this.body);
    }

    validation() {
        this.cleanUp();
        if (this.body.email && !validator.isEmail(this.body.email)) 
            this.errors.push("E-mail inválido");

        if (this.body.number && this.body.number.length < 5)
            this.errors.push("Número inválido");

        if (!this.body.name) 
            this.errors.push("Nome de contato obrigatório!");

        if (!this.body.email && !this.body.number)
            this.errors.push("É necessário pelo menos uma informação de contato");
    }

    cleanUp() {
        for (const key in this.body)
            if (typeof this.body[key] !== "string") this.body[key] = "";

        this.body = {
            name: this.body.contactName,
            lastName: this.body.contactLastName,
            number: this.body.contactTel,
            email: this.body.contactEmail,
        };
    }
}

module.exports = Contact;
