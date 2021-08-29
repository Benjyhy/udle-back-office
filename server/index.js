import dotenv from 'dotenv';
import express from 'express';
import admin from 'firebase-admin';
// import serviceAccount from './serviceAccountKey.json';

dotenv.config();
const app = express();
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "udle-c3db5",
        "private_key_id": "87cff712f11d3cd350a4cd1e0b64a85af57f4ea9",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8l6+g9At+6m4T\n0X0C05nFxpfPW4Zj47FPjUzC4zdolNvtqw3HAsyDe7z+hkUha/IQLrL3M6hhoAv2\nZhUFXnbCag37C44oAclc60t1mpLsd4HS/qPbuyr6xa71VKioOy2gr/8yGRDQK4Lh\nltV+/0aeW8ise1lr+VvpnDoLN8B1814bt9rW+OzN9Tv6aOCwjIXVrrI2Vqvrl8Jk\nReKb472c46v++bVilD0zGPaK9lrlshuY9+N5Pg1JTlOuQd7CHI/T6Sc7ysc7HIEw\nw6gfe9AhqlMjH8yz60adxd4Uc4n/7OH6buVlhyuc4C+rdSkUQr51G08rwCOgwoMj\ngKeU+IZDAgMBAAECggEAFxqq1gLqi58IYvOAUgHUA2JBLpKYZBFneLGnV0gt0r6g\niOfdSrsMN17H4xNWUcdfLYitvSd+Io5QbjHIXn2EUBddD3CKzFpCWINXncM/lP+j\nudJ0sZJ8VqI0PR2k1ziqGNb8N8omq1IWo9tuMV5FwQMekl7phWxUTHTVZD1tcyWV\nCqSl8+/LIZazfAN+vDVfht/iULkAQy4stkj9PW2zJcc/Vvg9xO75D0v5h5AKJvmV\n8jkixfZecklEnkNLONa4ijJyA/DzJp6kos5axIaZADjArFNc+xDEtHDF5Xp+lRhV\n3k4gps7XBML2GyeOIw4ohIotnc+/9P9zYexepcsyLQKBgQDrDtk1D9AawhW2m5AN\n+TQyxA/P7dIfZxm7W4ON8s+bqiE8yTPHwK8xm/WaX1OJp0aqiTNOAnc3cndrJAnl\nroCIpweLQkVXFJXwhBzLNjBk2nCsJE73OCDZzg9P98ge9n/oe0hTvFTX5RaZSsHy\noqkw9VfjuDHsX9xUMsjvzBimzQKBgQDNZRAoHxiRS/56o773jYuoQ1/1PalULReM\nBH2fdHGQaNawNMg6G8dBEwbJMepH6hDAmuKdSIc2J1555HNvDW+sp/wX/BVzDh0S\nDLzgkj9QAEBmPVX/XI/dYrhQYpTEYveISh7ewB9KtmP1O26PY5OwWTVCq7LkHE8D\nwuQH1Q9BTwKBgQDbb0Asvfdbk4Zrs6v2r4cgQVI1nWHEeR5XfuZAFMXlHxzqPza8\nqs+ic2MD2ywEXImm2HBxyfF7bLu45KrspUxOxgdP5O0QjyIup1auCoeBDz+SJE8n\nkVlxm2FGGR3UcfAUm0p5CV73MWE4d8a5eUqTbua+qozIivEIFWTqH9F/nQKBgQCi\nS65FlbSq8rqFm6fFIoJtFbfYJ74J9ot5pv7ApZkqu7yQhVSFnfeHMwqUpi1yX8CX\nAIv6LhoxL1CWzm5sHNjWO/KV3SnxvQA5h/kjFkyS4XABmYu/eRtwmpX7ZroYp/7i\nIXddGcBgH9jCKREGmm9T1FmicdusJbZFyZS3n6IrPwKBgB/76llbRVoR7J6lMMAl\nwoX/Z8gjOgRRPanMBrUk4nsUXTgjA3NwrARs4oYeAk8viDJJN6hZtjFy02PyUUmr\nsBQyf1wrR/9UVS/icqxy+lye7Xw46PxuJK81MGWpyrDAb1SdL9F3Yx1PU338lcvd\nlPrgeRAAKGb7zJGMEVsxy8Vp\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-24uh6@udle-c3db5.iam.gserviceaccount.com",
        "client_id": "107031716073834225916",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-24uh6%40udle-c3db5.iam.gserviceaccount.com"
    }),
    databaseURL: "https://udle-c3db5-default-rtdb.europe-west1.firebasedatabase.app"
});

app.use(express.json());
app.use(express.static('public'));

// admin.auth().createSessionCookie(user => {
//     if (user) {
//         window.location = 'index.html';
//     } else {
//         window.location = 'signup.html';
//     }
// });

app.post('/treat-sign-up', async (req, res) => {
    try {
        console.log(req);
        admin.auth().createUser({ email: req.body.user.email, password: req.body.user.pwd })
            .then((userRecord) => {
                res.json({ url: 'index.html' });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

    } catch (e) {
        res.status(500).json({ error: e.message })
    }

});

app.listen(3000);