const express = require("express")
const axios = require("axios")
const FormData = require('form-data');


const router = express.Router();
let accessToken = '';

router.post("/", (req, res, next) => {
    const { name, email, phone } = req.body
    console.log(req.body);

    const refreshToken = async () => {
        let data = new FormData();
        data.append('client_id', process.env.CLIENT_ID);
        data.append('client_secret', process.env.CLIENT_SECRET);
        data.append('refresh_token', process.env.REFRESH_TOKEN);
        data.append('grant_type', 'refresh_token');

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://accounts.zoho.eu/oauth/v2/token',
            headers: {
                'Cookie': 'JSESSIONID=D6728E8AFE8030AD8DD3CC3697648F83; _zcsr_tmp=6ca2e2df-77f9-4aca-b8d6-3db5a42ef9fd; d4bcc0a499=953809aceaa07cf41469153cac12ef23; iamcsr=6ca2e2df-77f9-4aca-b8d6-3db5a42ef9fd',
                ...data.getHeaders()
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
            accessToken = response.data.access_token;
            //empty after 59 minutes
            setTimeout(() => {
                accessToken = '';
            }
                , 3540000);
            return response.data.access_token;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const savetoZoho = async () => {
        const axios = require('axios');
        let data = JSON.stringify({
            "data": [
                {
                    "Last_Name": name,
                    "Email": email,
                    "Phone": phone,
                    "$related_module": "Contacts",
                    "Remind_At": {
                        "ALARM": "FREQ=NONE;ACTION=EMAIL;TRIGGER=DATE-TIME:2019-01-25T17:09:00+05:30"
                    }
                }
            ]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://www.zohoapis.eu/bigin/v2/Contacts',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
                'Cookie': '40c0b66dfe=5ffe0a09272205f10a23941b95fdf3aa; JSESSIONID=BBDB42786738F78C05CAFE9971F8C322; _zcsr_tmp=efd05791-2cfb-4dee-873e-4c167284dda2; crmcsr=efd05791-2cfb-4dee-873e-4c167284dda2'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                res.status(200).json({
                    success: true,
                    data: response.data
                })
            })
            .catch((error) => {
                res.status(400).json({
                    success: false,
                    error: error
                })
                console.error(error);
            });

    }

    if (accessToken === '') {
        console.log('without token');
        try {
            refreshToken().then((data) => {
                console.log('data', data);
                savetoZoho();
            }).catch((error) => {
                console.error('Error refreshing token:', error);
            });
        }
        catch (error) {
            console.log('error', error);
        }
    }
    else {
        console.log('with token');
        try {
            savetoZoho();
        }
        catch (error) {
            console.log('error', error);
            // refreshToken().then((data) => {
            //     console.log('data', data);
            //     savetoZoho();
            // }).catch((error) => {
            //     console.error('Error refreshing token:', error);
            // });
        }
    }

})


module.exports = router