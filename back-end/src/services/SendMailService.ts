import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {

  private client: Transporter;
  // o constructor é um método que é executado assim que uma classe é
  // instanciada, ou seja, assim que uma classe é chamada, é criada as
  // informações que estão dentro do constructor são executadas
  constructor() {
    // a resposta de caso tenha sucesso fica dentro do then()
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      // esta pegando o valor do transporter e colocando dentro da variavel
      // client
      this.client = transporter;
    });
  }

  async executeMailSend(to: string, subject: string, body: string) {
    const message = await this.client.sendMail({
      to,
      subject,
      html: body,
      from: "NPS <noreplay@nps.com.br>"
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Message URL: %s", nodemailer.getTestMessageUrl(message));
  };
};

export default new SendMailService();