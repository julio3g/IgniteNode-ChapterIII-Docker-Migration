import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });
  it('Should be able to send a forgot password mail user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      // random name, email, digits (Ctrl + Shift + p)
      driver_license: '157961',
      email: 'ihubo@huzle.hn',
      name: 'Christine Berry',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('ihubo@huzle.hn');

    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send an email if user does't exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('zodik@li.kn'),
    ).rejects.toEqual(new AppError("User does't exists!"));
  });
  it('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      // random name, email, digits (Ctrl + Shift + p)
      driver_license: '979437',
      email: 'retala@riikaliv.mk',
      name: 'Ernest McCarthy',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('retala@riikaliv.mk');

    expect(generateTokenMail).toBeCalled();
  });
});
