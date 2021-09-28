import SigninPage from "../../domains/auth/signin";
import { useSession } from 'next-auth/client';

export default function Signin() {
    const [session, loading] = useSession();
    console.log('session ---> ',session);
    return (
        <SigninPage/>
    )
}
