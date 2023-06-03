import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import { AuthentificationController } from './modules/authentication/authentification.controller';
import { EmailConfirmationController } from './modules/email/emailConfirmation.controller';
import { SourceController } from './modules/source/source.controller';
import { AppDataSource } from './database/AppDataSource';
import { ResetPasswordController } from './modules/password/resetPassword.controller';
import { NovelController } from './modules/novel/novel.controller';

(async () => {


    try {
      await AppDataSource.initialize();
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    
    const app = new App([
      new AuthentificationController(),
      new EmailConfirmationController(),
      new ResetPasswordController(),
      new SourceController(),
      new NovelController()
    ]);
    
    
    app.listen();
    app.get();
    
    
    
})();
