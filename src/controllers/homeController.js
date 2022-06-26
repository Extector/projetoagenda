const Contact = require("../models/ContactModel");

exports.index = async (req, res) => {
    try {
        const contacts = await Contact.searchContacts();
        res.render("index", { contacts });
    } catch (e) {
        return;
    }
};
