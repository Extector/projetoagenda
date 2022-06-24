const Contact = require("../models/ContactModel")

exports.index = (req, res) => {
    if (!req.session.user) return res.redirect("/");
    res.render("contact");
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if (contact.errors.length > 0) {
            req.flash("errors", contact.errors);
            req.session.save(function () {
                return res.redirect("/contact");
            });
            return;
        }

        req.flash("success", "Seu contato foi criado com sucesso");
        req.session.save(() => {
            return res.redirect("back");
        });
    } catch (e) {
        console.log(e);
        res.render("404");
    }
}