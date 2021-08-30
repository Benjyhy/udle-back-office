import dotenv from 'dotenv';
import express from 'express';
import admin from 'firebase-admin';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import ejs from 'ejs';
import serviceAccount from './serviceAccountKey.js';
// import serviceAccount from './serviceAccountKey.json';

dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://udle-c3db5-default-rtdb.europe-west1.firebasedatabase.app"
});


const csrfMiddleware = csrf({ cookie: true });
const PORT = process.env.PORT || 3000;
const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});
app.get("/", (req, res, next) => {
    res.render("index");
});
app.get("/signin", (req, res, next) => {
    res.render("signin");
});
app.get("/signup", (req, res, next) => {
    res.render("signup");
});
app.get("/home-dashboard", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("home-dashboard");
    }).catch((error) => {
        res.redirect("/signin");
    });
});
app.get("/commandes", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("commandes");
    }).catch((error) => {
        res.redirect("/signin");
    });
});
app.get("/personnalisation", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("personnalisation");
    }).catch((error) => {
        res.redirect("/signin");
    });
});
app.get("/avis", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("avis", { nbOrders: "50", avis: false });
    }).catch((error) => {
        res.redirect("/signin");
    });
});
app.get("/menus", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("menus");
    }).catch((error) => {
        res.redirect("/signin");
    });
});
app.get("/horaires", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("horaires");
    }).catch((error) => {
        res.redirect("/signin");
    });
});
app.get("/moyens-de-paiement", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("moyens-de-paiement");
    }).catch((error) => {
        res.redirect("/signin");
    });
});
app.get("/marketing", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("marketing");
    }).catch((error) => {
        res.redirect("/signin");
    });
});
app.get("/utilisateurs", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("utilisateurs");
    }).catch((error) => {
        res.redirect("/signin");
    });
});
app.get("/parametres", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.render("parametres");
    }).catch((error) => {
        res.redirect("/signin");
    });
});

app.post('/sessionLogin', (req, res) => {
    const idToken = req.body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin.auth()
        .createSessionCookie(idToken, { expiresIn })
        .then((sessionCookie) => {
            const options = { maxAge: expiresIn, httpOnly: true };
            res.cookie("session", sessionCookie, options);
            res.end(JSON.stringify({ status: "success" }));
        },
            (error) => {
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        );
});

app.get('/sessionLogout', (req, res) => {
    res.clearCookie("session");
    res.redirect("/signin");
});

app.listen(PORT);