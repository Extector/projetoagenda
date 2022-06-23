const Login = require("../models/LoginModel");

exports.index = (req, res) => {
    res.render("login");
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(function () {
                return res.redirect("/login");
            });
            return;
        }

        req.flash("success", "Seu usuário foi criado com sucesso");
        req.session.save(() => {
            return res.redirect("/login");
        });
    } catch (e) {
        console.log (e);
        res.render("404");
    }
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        console.log(login);
        await login.login();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(function () {
                return res.redirect("back");
            });
            return;
        }

        req.flash("success", "Você entrou no sistema");
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect("/");
        });
    } catch (e) {
        res.render("404");
    }
};
