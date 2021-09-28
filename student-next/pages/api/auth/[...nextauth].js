import NextAuth from 'next-auth';
import providers from 'next-auth/providers';
import apiRoot from '../../../network/fetcher';

export default function authenticate(req, res){
    NextAuth(req, res, {
        session: {
            jwt: true,
            maxAge: 30 * 24 * 60 * 60, // 30 days
        },
        providers: [
            providers.Credentials({
                async authorize(credentials){
                    console.log('authorize', credentials);
                    const { email, password, type } = credentials;
                    try {
                        let response = (await apiRoot.post('/common/identity/signin',
                            { email, password, type })).data;
                        console.log('authorize response', response);
                        if(response.done){
                            console.log('authorize response done');
                            return response.reply;
                        }
                        throw new Error(response.error);
                    } catch (error) {
                        console.log('error in authorize', error.response.data);
                        throw new Error(error.response.data?.message);
                    }
                }
            }),
        ],
        callbacks:{
            async signIn(user){ return user; },
            async jwt(token, user) {
                if (typeof user !== typeof undefined){
                    token.user = user;
                }
                return token;
            },
            async session(session, token) {
                session.user = token.user;
                return session;
            },
        },
        pages: {
            signIn: '/auth/signin',
            error: '/auth/signin',
        },
    });
}