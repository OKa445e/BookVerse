import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const contactEmail = async(req,res) => {
    const { name,email,message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL,
        subject: `New Query from ${name}`,
        text: `  
           You have received a new query:
           
           Name: ${name}
           Email: ${email}
           Query: ${message}
        `,
    };

    try{
        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            success: true,
            message: "Query submitted Successfully",
        })
    } catch(error) {
       return res.status(500).json({
        success: false,
        message: "An error occurred",
       })
    }
}