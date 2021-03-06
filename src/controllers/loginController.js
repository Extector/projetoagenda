const { async } = require("regenerator-runtime");
const Login = require("../models/LoginModel");

exports.index = (req, res) => {
    return res.render("login");
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(() => res.redirect("/login"));
            return;
        }

        req.flash("success", "Seu usuário foi criado com sucesso");
        req.session.save(() => res.redirect("/login"));
    } catch (e) {
        console.log(e);
        res.render("404");
    }
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(() => res.redirect("/login"));
            return;
        }

        req.flash("success", "Você entrou no sistema");
        req.session.user = login.user;

        console.log(req.session.user);
        req.session.save(() => res.redirect("/"));
    } catch (e) {
        console.log(e);
        res.send("404");
    }
};

exports.logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/");
};
