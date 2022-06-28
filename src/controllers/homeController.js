const Contact = require("../models/ContactModel");

exports.index = async (req, res) => {
    try {
        const contacts = await Contact.searchContacts();
        res.render("index", { contacts });
    } catch (e) {
        req.flash("errors", "Ocorreu um erro ao carregar a lista de contatos");
        req.session.save(() => res.render("404"));
        return;
    }
};
