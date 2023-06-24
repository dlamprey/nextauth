import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromAddress = process.env.MAIL_FROM;
//const toAddress = process.env.MAIL_TO;

// login with magic link
export const sendUserVerificationEmail = async (
  emailAddress,
  emailVerificationUrl
) => {

  const msg = {
    to: emailAddress,
    from: fromAddress,
    subject: 'Next Auth - Magic Link',
    text: 'This is the magic link to log in.',
    html: `<p>Magic Link: <a href="${emailVerificationUrl}">Click Here</a></p>`
  };

  return await sendEmail(msg)
};

export const sendEmail = async (params) => {
  const paramsWithDefault = {
    from: fromAddress,
    ...params,
  };
  try {
    const response = await sgMail.send(paramsWithDefault);
    return response;
  } catch (err) {
    console.log(JSON.stringify(err), ` Error sending email to: ${params.to}`);
  }
};
