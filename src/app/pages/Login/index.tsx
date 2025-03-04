import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal } from 'antd';
import { useAuth } from '@store/auth/auth.selector';
import { FormInput, FormPassword, FormLabel } from '@components';
import { Wrapper, Right } from '@themes/facit';
import LoginScheme from './scheme';

import { Row } from './styled';
import i18next from '@i18n';
import QRCodeLogin from '@pages/LoginQRCode';

const Login = () => {
  const { t } = useTranslation(['common']);
  const form = useForm<{ email: string; password: string }>({
    resolver: yupResolver(LoginScheme(t)),
  });
  const { handleSubmit } = form;
  const { onLogin } = useAuth();
  const [isQRCodeOpen, setIsQRCodeOpen] = useState<boolean>(false);
  const handleOk = useCallback(() => {
    setIsQRCodeOpen(false);
  }, []);
  const onSubmit = useCallback(
    (data: Types.ILoginRequest) => {
      onLogin(data);
    },
    [onLogin],
  );

  return (
    <Wrapper>
      <Modal
        title={i18next.t('common:auth.header.qr_code')}
        open={isQRCodeOpen}
        footer={null}
        closable={true}
        onCancel={handleOk}
        width={400}>
        <QRCodeLogin />
      </Modal>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {i18next.t('common:auth.header.login') as string}
          </h2>
        </div>
        <div className="form-wrapper">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <FormLabel
                  title={i18next.t('common:auth.email') as string}
                  description="Required"
                  forTarget="email"
                />
                <Right>
                  <FormInput name="email" />
                </Right>
              </Row>
              <Row>
                <FormLabel
                  title={i18next.t('common:auth.password') as string}
                  description="Required"
                  forTarget="password"
                />
                <Right>
                  <FormPassword name="password" />
                </Right>
              </Row>

              <div className="form-action-group">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ color: '#333' }}>
                  Login
                </Button>
                <Button
                  type="primary"
                  style={{ color: '#333' }}
                  onClick={() => setIsQRCodeOpen(true)}>
                  Login with QR Code
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
