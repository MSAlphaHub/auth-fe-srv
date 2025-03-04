import { setLocalStorage, STORAGE } from '@utils/helpers';
import { QRCode } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { AesQRCode } from '@utils/helpers/aes';
import configs from 'config';

const QRCodeLogin = () => {
  const socketRef = useRef<Socket | null>(null);
  const [qrValue, setQRValue] = useState<string>('');
  const [isShowLoginFailure, setIsShowLoginFailure] = useState<boolean>(false);
  const navigate = useNavigate();

  // Establish WebSocket connection
  useEffect(() => {
    const socketInstance = io(configs.apiGateway, {
      transports: ['websocket'],
    });

    socketRef.current = socketInstance;

    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id);
      setQRValue(
        AesQRCode.encrypt(
          JSON.stringify({
            targetSocketID: socketInstance.id,
            deviceInformation: 'windows',
          }),
        ),
      );
    });

    socketInstance.on('LOGIN_QR_CODE_SUCCESS', (data: Types.ILoginQRCodeSuccess) => {
      console.log('Received login success:', data);
      setLocalStorage(STORAGE.USER_TOKEN, data.tokens.access.token);
      setLocalStorage(STORAGE.USER_REFRESH, data.tokens.refresh.token);
      navigate('/home');
      socketInstance.disconnect();
    });

    socketInstance.on('LOGIN_QR_CODE_FAILURE', () => {
      setIsShowLoginFailure(true);
      socketInstance.disconnect();
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="w-full flex items-center flex-col">
      {socketRef.current?.id ? (
        <QRCode value={qrValue} />
      ) : (
        <div>Waiting for socket connection...</div>
      )}
      <p className="p-2">
        {isShowLoginFailure
          ? 'Your login has been canceled'
          : 'Open your logged device and scan this QR code'}
      </p>
    </div>
  );
};

export default QRCodeLogin;
