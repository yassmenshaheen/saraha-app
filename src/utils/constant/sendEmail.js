import node from 'nodemailer'
export const sendEmail = async ({to='',subject='',html=''}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "yassmenshahen069@gmail.com",
          pass: "sucj rkae ydza irdm",
        },
      });
      const info = await transporter.sendMail({
        from: '"hti" <yassmenshahen069@gmail.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
      });
}