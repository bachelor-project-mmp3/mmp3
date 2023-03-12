import NextAuth, { NextAuthOptions } from 'next-auth';
import prisma from '../../../lib/prisma';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions: NextAuthOptions = {
    providers: [
        {
            idToken: true,
            id: 'fhs',
            name: 'fhs',
            type: 'oauth',
            wellKnown:
                'https://auth.projects.multimediatechnology.at/.well-known/openid-configuration',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,

            async profile(profile, token) {
                const response = await fetch(
                    'https://auth.projects.multimediatechnology.at/oauth/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${token.access_token}`,
                        },
                    }
                );

                const fetchedUser = await response.json();

                let user = await prisma.user.findUnique({
                    where: {
                        email: String(fetchedUser?.email),
                    },
                });

                if (!user) {
                    try {
                        const createdUser = await prisma.user.create({
                            data: {
                                firstName: fetchedUser.given_name,
                                lastName: fetchedUser.family_name,
                                study: fetchedUser.studies.split('-')[0],
                                email: fetchedUser.email,
                            },
                        });
                        user = createdUser;
                    } catch (err) {
                        console.log(err);
                    }
                }

                return {
                    id: profile.sub,
                    name: `${fetchedUser.given_name} ${fetchedUser.family_name}`,
                    email: fetchedUser.email,
                };
            },
        },
    ],
    callbacks: {
        async session({ session, token }: any) {
            let user = await prisma.user.findUnique({
                where: {
                    email: String(session?.user?.email),
                },
            });

            if (token) {
                session.user.userId = user.id;
                session.user.firstName = user.firstName;
                session.user.roomNumber = user.roomNumber;
                session.user.image = user.image;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);
