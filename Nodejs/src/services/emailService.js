import moment from 'moment';
require('dotenv').config();
// import nodemailer from 'nodemailer'
const nodemailer = require("nodemailer");

let sendSimpleEmail = (dataSend) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,//true for 465, false for another ports
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        let tempSubject = '';
        let tempHTML = '';
        const info = '';
        switch (dataSend.EMAIL_TYPE) {
            case 'BookingInfo':
                tempSubject = dataSend.language === 'fr' ? "Book Now: Informations de réservation" : "Book Now: Booking information";
                tempHTML = getBodyHTMLBookingInfo(dataSend);
                info = await transporter.sendMail({
                    from: '"Book Now 💉" <trannam.shop@gmail.com', // sender address
                    to: dataSend.receiverEmail,//"bar@example.com, baz@example.com", // list of receivers
                    subject: tempSubject,
                    //text: , // plain text body
                    html: tempHTML, // html body
                });
                break;
            case 'BookingConfirm':
                tempSubject = dataSend.language === 'fr' ? "Book Now: Ordonnance du médecin" : "Book Now: Doctor's Prescription";
                tempHTML = getBodyHTMLBookingConfirm(dataSend);
                info = await transporter.sendMail({
                    from: '"Book Now 💉" <trannam.shop@gmail.com', // sender address
                    to: dataSend.receiverEmail,//"bar@example.com, baz@example.com", // list of receivers
                    subject: tempSubject,
                    //text: , // plain text body
                    html: tempHTML, // html body
                    attachments: [{
                        filename: dataSend.fileName,
                        path: dataSend.path,
                    }],
                });
                break;
            default:
                console.log('Missing Parameters');
        }

        // const info = await transporter.sendMail({
        //     from: '"Nam Tran 👻" <trannam.shop@gmail.com', // sender address
        //     to: dataSend.receiverEmail,//"bar@example.com, baz@example.com", // list of receivers
        //     subject: tempSubject,
        //     //text: , // plain text body
        //     html: tempHTML, // html body
        //     attachments: [{
        //         filename: dataSend.fileName,
        //         path: dataSend.path,
        //     }],
        // });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
    }
    main().catch(console.error);
}
let getBodyHTMLBookingInfo = (dataSend) => {
    let result = ''
    if (dataSend.language === 'en') {
        let date = moment.unix(+dataSend.date / 1000).locale('en').format('ddd-MM/DD/YYYY')
        result =
            ` 
        <h3>Hello ${dataSend.patientName}</h3>
        <p>You received this email because you booked a medical appointment on Bookingcare</p>
        <p>Schedule information:</p>
        <div><b>Time:${dataSend.time} - ${date}</b></div>
        <div><b>Doctor:${dataSend.doctorName.firstName} ${dataSend.doctorName.lastName}</b></div>
        <p>Confirm your appointment with the link below</p>
        <div>
            <a href='${dataSend.redirectLink}' target='_blank'>Click here</a>
        </div>
        <div> Thank you for booking an appointment</div>
        `
    } else {
        let date = moment.unix(+dataSend.date / 1000).locale('fr').format('ddd - DD/MM/YYYY')
        result = `
        <h3>Bonjour ${dataSend.patientName}</h3>
        <p>Vous avez reçu cet e-mail car vous avez réservé un rendez-vous médical sur Bookingcare</p>
        <p>Informations sur le rendez-vous :</p>
        <div><b>Heure : ${dataSend.time} - ${date}</b></div>
        <div><b>Médecin : ${dataSend.doctorName.firstName} ${dataSend.doctorName.lastName}</b></div>
        <p>Confirmez votre rendez-vous en cliquant sur le lien ci-dessous</p>
        <div>
            <a href='${dataSend.redirectLink}' target='_blank'>Cliquez ici</a>
        </div>
        <div>Merci d'avoir réservé un rendez-vous</div>
    `;
    }
    return result
}

let getBodyHTMLBookingConfirm = (dataSend) => {
    let result = ''
    if (dataSend.language === 'en') {
        result =
            ` 
        <h3>Dear ${dataSend.patientName}</h3>
        <p>Below are the results of your medical examination from <b>${dataSend.docFirstName} ${dataSend.docLastName}</b><p>
        <p>Please check Doctor's Prescription</p>
        <div>Thank you for choosing Book Now</div>
        `
    } else {
        result =
            ` 
        <h3>Cher ${dataSend.patientName}</h3>
        <p>Vous trouverez ci-dessous les résultats de votre examen médical de <b>${dataSend.docFirstName} ${dataSend.docLastName}</b><p>
        <p>Veuillez vérifier l'ordonnance du médecin</p>
        <div>Merci d'avoir choisi Book Now</div>
        `
    }
    return result
}

module.exports = {
    sendSimpleEmail,
}