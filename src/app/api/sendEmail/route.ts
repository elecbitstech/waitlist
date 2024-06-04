import nodemailer from 'nodemailer';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email, name, phoneNumber, organizationName, designation } = await req.json();

        let transporter = nodemailer.createTransport({
            host: 'smtp.zeptomail.com',
            port: 465,
            auth: {
                user: 'emailapikey',
                pass: process.env.MAIL_PASS,
            },
        });

        let mailOptions = {
            from: {
                name: 'Elecbits Platform',
                address: 'platform@elecbits.in',
            },
            to: email,
            subject: 'Signup Confirmation',
            text: `Hello ${name},\n\nThank you for signing up. Here are your details:\nName: ${name}\nPhone Number: ${phoneNumber}\nOrganization Name: ${organizationName}\nDesignation: ${designation}\n\nBest regards,\nYour Company`,
        };

        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error sending email' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}