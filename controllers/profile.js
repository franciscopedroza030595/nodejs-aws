const { response } = require('express');
const AWS = require('aws-sdk');


const awsConfig = {
    "region": "us-west-2",
    "endpoint": "http://dynamodb.us-west-2.amazonaws.com",
    "accessKeyId": process.env.ACESSKEYID,
    "secretAccessKey": process.env.SECRETACCESSKEY

};

AWS.config.update(awsConfig);

const readProfile = (req, res = response) => {



    try {


        const docClient = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: "portafolio",
            Key: {
                "email_id": "franciscopedroza0305@gmail.com"
            }
        };

        //docClient
        docClient.get(params, (err, data) => {
            if (err) {
                res.json({
                    ok: false,
                    msg: 'email_id no found'
                });
                //console.log("portafolio::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            } else {
                res.json({
                    ok: true,
                    profile: data
                });
                //console.log(data);
                //console.log("portafolio::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
            }
        })




    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}

const updateProfile = (req, res = response) => {


    const data = req.body
        //console.log(data);

    try {

        const docClient = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: "portafolio",
            Key: {
                "email_id": "franciscopedroza0305@gmail.com"
            },
            UpdateExpression: "set twitter = :twitter, website = :website, facebook = :facebook, github = :github, mobile = :mobile, instagram = :instagram, adress = :adress, profession = :profession, description = :description, phone = :phone ",
            ExpressionAttributeValues: {
                ":twitter": data.twitter,
                ":website": data.website,
                ":facebook": data.facebook,
                ":github": data.github,
                ":mobile": data.mobile,
                ":instagram": data.instagram,
                ":adress": data.adress,
                ":profession": data.profession,
                ":description": data.description,
                ":phone": data.phone
            },
            ReturnValues: "UPDATED_NEW"

        };

        docClient.update(params, function(err, data) {

            if (err) {
                res.json({
                    ok: false,
                    msg: ' oh oh'
                });
                //console.log("users::update::error - " + JSON.stringify(err, null, 2));
            } else {
                //console.log("users::update::success " + JSON.stringify(data));
                res.json({
                    ok: true,
                    profile: data
                });
                //console.log(data);
            }
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }




}


module.exports = {
    readProfile,
    updateProfile
}