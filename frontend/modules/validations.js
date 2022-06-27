const e = require("connect-flash");

class Validations {
    constructor(form) {
        this.form = document.querySelector(form);
    }

    vLoginRegister() {}

    verifyForm() {
        if (!this.form) return;
        return this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validateInput(e);
        });
    }

    validateInput(e) {
        const el = e.target;
        //Login / Register
        const passwordInput = el.querySelector(`input[name="password"]`);
        const emailInput = el.querySelector(`input[name="email"]`);

        //Contact
        const contactInputName = el.querySelector(`input[name="contactName"]`);
        const contactInputEmail = el.querySelector(`input[name="contactEmail"]`);
        const contactInputNumber = el.querySelector(`input[name="contactNumber"]`);
        const contactInputLastName = el.querySelector(`input[name="contactLastName"]`);

        const validateContact = () => {
            return true;
        }
    }
}
