import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EmailMessagingService } from './infrastructure/email-messaging.service';
import { SMSMessagingService } from './infrastructure/sms-messaging.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'infrastructure/templates/email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  providers: [
    EmailMessagingService,
    {
      provide: SMSMessagingService,
      useFactory: async (config: ConfigService, httpService: HttpService) => {
        return new SMSMessagingService(config, httpService);
      },
      inject: [ConfigService, HttpService],
    },
  ],
  exports: [EmailMessagingService, SMSMessagingService],
})
export class MessagingModule {}
