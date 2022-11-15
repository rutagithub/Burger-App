import { useState, useEffect } from 'react';

interface Props {
  interceptors: Interceptors;
}

interface Functions {
  eject: Function;
  use: Function;
}

interface Interceptors {
  response: Functions;
  request: Functions;
}

export default (httpClient: Props) => {
  const [error, setError] = useState(null);


    const reqInterceptor = httpClient.interceptors.request.use((req: Props) => {
      setError(null);
      return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(
      (res: Props) => res,
      (err: any) => {
        setError(err)
      });

    useEffect(() => {
      return () => {
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);


    const errorConfirmedHandler = () => {
      setError(null);
    };

    return [error, errorConfirmedHandler];
}