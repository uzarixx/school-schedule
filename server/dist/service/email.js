"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'is3.andrei.2@gmail.com',
        pass: 'ohmdmppsqlvbpbfc'
    }
});
const sendEmail = ({ to, link }) => {
    return new Promise((resolve, reject) => {
        const mailDetails = {
            from: 'NNKEP <is3.andrei.2@gmail.com>',
            to,
            subject: 'Відодновлення аккаунту NKKEP',
            html: `
             <div> 
          <h1>Для активації перейдіть по посиланню</h1>
          <a href="${link}">Перейти.</a>
          </div>
            `
        };
        transporter.sendMail(mailDetails, function (err, info) {
            if (err) {
                console.log('Помилка');
                return reject(err);
            }
            else {
                return resolve(info);
            }
        });
    });
};
exports.sendEmail = sendEmail;
