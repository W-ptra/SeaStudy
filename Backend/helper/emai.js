const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.EMAIL_KEY);

async function test(){
    const email = {
        from:       `noreply@seastudy.wisnuputra.xyz`,
        to:         `wisnu.putra001@binus.ac.id`,
        subject:    `Notification`,
        text:       `test notif`
    }

    const {data,error} = await resend.emails.send(email);

    if(error){
        console.log(error);
        return
    }

    console.log(data);
}

test();