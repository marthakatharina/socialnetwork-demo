const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // means we're in prod and our secrets are in the environment variables
} else {
    secrets = require("./secrets.json"); // in dev our secrets are in our secrets.json, make sure this file is listed in your .gitignore!
}

// you will need ot setup your secrets.json with the AWS credentials!

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", // we have tp provide this region, it has to match out settings in AWS if you are using a spicedling address you need to set this to eu-west-1
});

exports.sendEmail = function (recipient, message, subject) {
    return ses
        .sendEmail({
            Source: "Merle Fischer <merle@spiced-academy.com>", // you need to update this to the email address you verified OR recieved from spiced.space
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("it worked! reset email got sent!"))
        .catch((err) => console.log("err in ses.sendEmail:", err));
};
