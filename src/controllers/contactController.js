const { render } = require("ejs");
const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
    res.render("contact", { contact: {} });
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
        req.session.save(() => res.redirect("/"));
        return;
    } catch (e) {
        console.log(e);
        res.render("404");
    }
};

exports.view = async (req, res) => {
    if (!req.params.id) return res.redirect("/");
    const contact = await Contact.searchById(req.params.id);

    if (!contact) {
        req.flash("errors", "Ocorreu um erro na pesquisa, tente novamente!");
        req.session.save(() => {
            return res.redirect("/");
        });
        return;
    }

    res.render("contact", { contact });
};

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.redirect("/");
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);

        if (contact.errors.length > 0) {
            req.flash("errors", contact.errors);
            req.session.save(function () {
                return res.redirect("/contact");
            });
            return;
        }

        req.flash("success", "Seu contato foi editado com sucesso");
        req.session.save(() => res.redirect("/"));
        return;
    } catch (e) {
        res.render("404");
    }
};

exports.delete = async (req, res) => {
    try {
        await Contact.delete(req.params.id);
        req.flash("success", "Contato excluído com sucesso! ");
        req.session.save(() => res.redirect("/"));
        return;
    } catch (e) {
        res.render("404");
    }
}
