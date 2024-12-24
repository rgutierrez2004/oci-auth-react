import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import type { OAuthConfig } from "next-auth/providers";

const ociProvider: OAuthConfig<any> = {
  id: "oci-iam",
  name: "Oracle",
  type: "oauth",
  clientId: process.env.OCI_CLIENT_ID!,
  clientSecret: process.env.OCI_CLIENT_SECRET!,
  wellKnown: `${process.env.OCI_DOMAIN_URL}${process.env.OCI_WELL_KNOWN_URL}`,
  authorization: {
    params: {
      scope: process.env.OCI_SCOPE
    }
  },
  userinfo: {
    url: `${process.env.OCI_DOMAIN_URL}${process.env.OCI_USERINFO_URL}`,
    async request({ tokens }) {
      const response = await fetch(`${process.env.OCI_DOMAIN_URL}${process.env.OCI_USERINFO_URL}`, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`
        }
      });
      return await response.json();
    }
  },
  idToken: true,
  checks: ["pkce", "state"],
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
    };
  },
};

export const authOptions: AuthOptions = {
  providers: [ociProvider],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id;
        token.name = profile.name;
        token.email = profile.email;
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.accessToken = token.accessToken;
        session.idToken = token.idToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('logout')) {
        const logoutUrl = `${process.env.OCI_DOMAIN_URL}${process.env.OCI_LOGOUT_URL}`;
        const params = new URLSearchParams({
          post_logout_redirect_uri: process.env.NEXTAUTH_URL,
          id_token_hint: url.split('=')[1]
        });
        return `${logoutUrl}?${params.toString()}`;
      }
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    error: '/',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
