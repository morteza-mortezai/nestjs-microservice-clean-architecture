import { UserM } from '../../domain/model/user';

export abstract class IAppMailer {
    abstract sendConfirmEmail(user: UserM): Promise<boolean>;
}
