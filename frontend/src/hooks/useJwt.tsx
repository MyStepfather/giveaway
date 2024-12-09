export const useJwt = () => {

    const setJwt = (jwtToken: string): void => {
        localStorage.setItem('access_token', jwtToken);
    }

    const getJwt = (): string | null => {
        return localStorage.getItem('access_token');
    }

    return {getJwt, setJwt}
};

export default useJwt;
