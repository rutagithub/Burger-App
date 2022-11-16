import { useState, useEffect } from 'react';

// Interfaces:
// Properties interface
interface Props {
  interceptors: Interceptors;
}

// Interceptors interface
export interface Interceptors {
  response: {
    eject: Function;
    use: Function;
  };
  request: {
    eject: Function;
    use: Function;
  }
}

// Code
export default (httpClient: Props) => {
  const [error, setError] = useState<boolean | null>(null);

  const reqInterceptor = httpClient.interceptors.request.use((req: Props) => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (res: Props) => res,
    (err: boolean) => setError(err));

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);


  const errorConfirmedHandler: Function = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
}