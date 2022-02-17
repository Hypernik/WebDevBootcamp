const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(process.env.PORT||3000,function () {
    console.log("Server is running at port 3000");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
    apiKey: "YOUR API KEY",
    server: "us4"
});

app.post("/", function (req,res) {
    const firstName = req.body.firstName;
    const secondName = req.body.lastName;
    const email = req.body.email;

    const listId = "YOUR_LIST_ID";

    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });

        res.sendFile(__dirname + "/success.html")
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
    }
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});