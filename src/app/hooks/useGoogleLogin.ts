import { createCancelable } from '@utils/createCancelable';
import { loadScript } from '@utils/loadScript';
import { sleep } from '@utils/sleep';
import { useCallback, useEffect } from 'react';

const clientLibraryUrl = 'https://accounts.google.com/gsi/client' as const;
const cancelableLoadScript = createCancelable(loadScript);

// TODO: load from .env
const clientId = '' as const;

export const useGoogleLogin = () => {
  const handleCredentialResponse = useCallback(
    (response: google.accounts.id.CredentialResponse) => {
      // TODO: call API to server to get userToken from google account id
      console.log({ response });
    },
    [],
  );

  // Initializes the Sign In With Google client based on the configuration object.
  // https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
  const initialize = useCallback(() => {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });
  }, [handleCredentialResponse]);

  // Displays the One Tap prompt (default) after the initialize() method is invoked.
  const login = useCallback(() => {
    google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    const init = async () => {
      // load Google Client library
      await cancelableLoadScript.invoke(clientLibraryUrl);
      await sleep(1000);

      // initialize Sign In With Google client
      initialize();
    };

    init();

    return () => {
      // cancel the request when the hook is unmounted
      cancelableLoadScript.cancel();
    };
  }, []);

  return {
    loginWithGoogle: login,
  };
};
