import { getLocalStorage, STORAGE } from '@utils/helpers';
import { AesQRCode } from '@utils/helpers/aes';
import { Button, Select } from 'antd';
import configs from 'config';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QrReader, QrReaderProps } from 'react-qr-reader';
import { io, Socket } from 'socket.io-client';

const QRCodeScanner: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState<Types.IConfirmLoginQRCode | null>(null);
  const [contentConfirm, setContentConfirm] = useState<string>('');
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState('environment');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(configs.apiGateway, { transports: ['websocket'] });

    socketRef.current.on('CONFIRM_LOGIN_QR_CODE', (data) => {
      setIsShowConfirm(true);
      setContentConfirm(`Please confirm to login with device ${data.deviceInformation}`);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const onConfirmLoginInAnotherDevice = useCallback(() => {
    if (!qrCodeData || !socketRef.current) return;
    socketRef.current?.emit('CONFIRMED_LOGIN_IN_ANOTHER_DEVICE', {
      targetSocketID: qrCodeData?.targetSocketID,
      accessToken: getLocalStorage(STORAGE.USER_TOKEN),
    } as Types.IConfirmLoginQRCode);
    socketRef.current?.disconnect();
  }, [qrCodeData, socketRef]);

  const onCancelLoginInAnotherDevice = useCallback(() => {
    if (!qrCodeData || !socketRef.current) return;
    socketRef.current?.emit('CANCELED_LOGIN_IN_ANOTHER_DEVICE', {
      targetSocketID: qrCodeData?.targetSocketID,
    } as Types.IConfirmLoginQRCode);
    socketRef.current?.disconnect();
  }, [qrCodeData, socketRef]);

  const handleScanResult: QrReaderProps['onResult'] = useCallback((result: any) => {
    if (!result) return;

    try {
      if (!socketRef.current) {
        console.error('Socket is not available');
        return;
      }

      const qrCodeValue = JSON.parse(AesQRCode.decrypt(result.getText()));

      socketRef.current.emit('LOGIN_QR_CODE', {
        currentSocketID: socketRef.current.id,
        targetSocketID: qrCodeValue.targetSocketID,
        deviceInformation: qrCodeValue.deviceInformation,
      } as Types.ILoginQRCode);

      setQrCodeData(qrCodeValue);
    } catch (error) {
      console.error('Error while processing QR code:', error);
    }
  }, []);

  const handleChangeCamera = useCallback((value: string) => setFacingMode(value), []);
  const cameraOptions = useMemo(
    () => [
      { value: 'environment', label: 'Back Camera' },
      { value: 'user', label: 'Front Camera' },
    ],
    [],
  );

  return (
    <div>
      <h2>Scan QR Code</h2>
      <Select
        options={cameraOptions}
        value={facingMode}
        onChange={handleChangeCamera}
      />
      {contentConfirm}
      {isShowConfirm && (
        <div>
          <Button onClick={onConfirmLoginInAnotherDevice}>Confirm</Button>
          <Button onClick={onCancelLoginInAnotherDevice}>Cancel</Button>
        </div>
      )}

      <QrReader
        onResult={handleScanResult}
        constraints={{ facingMode }}
        containerStyle={{ width: '300px', height: '300px' }}
        videoStyle={{ width: '100%' }}
      />
    </div>
  );
};

export default QRCodeScanner;
