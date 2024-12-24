# OCI Auth React

This is a React application that demonstrates authentication with Oracle Cloud Infrastructure (OCI) Identity and Access Management (IAM) using OAuth 2.0/OpenID Connect standard. The application is built with Next.js, NextUI, and Auth.js.

## Features

- OAuth 2.0/OpenID Connect authentication with OCI IAM
- Modern UI with NextUI components
- Dark/Light theme support
- Session management with Auth.js
- Protected routes and middleware
- CSRF protection
- Display of authentication status, session data, and available providers
- Secure token handling and validation
- Type-safe development with TypeScript

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Oracle Cloud Infrastructure account with IAM configuration
- OCI Identity Domain with OIDC application configured

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Authentication Configuration
   NEXTAUTH_SECRET='your-secret-here'
   NEXTAUTH_URL='http://localhost:3000'

   # OCI IAM Configuration
   OCI_CLIENT_ID='your-client-id'
   OCI_CLIENT_SECRET='your-client-secret'
   OCI_DOMAIN_URL='your-oci-domain'
   OCI_WELL_KNOWN_URL='/.well-known/openid-configuration'
   OCI_LOGOUT_URL='/oauth2/v1/userlogout'
   OCI_USERINFO_URL='/oauth2/v1/userinfo'
   OCI_SCOPE='openid email profile'
   ```

4. Configure OCI Identity Domain:
   - Create an OIDC application in your OCI Identity Domain
   - Set the redirect URI to: `http://localhost:3000/api/auth/callback/oci-iam`
   - Copy the client ID and client secret to your `.env` file

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/             # API routes
│   │   └── auth/        # Auth.js API routes
│   ├── protected/       # Protected page
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout
│   └── providers.tsx    # App providers
├── components/          # React components
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [NextUI](https://nextui.org/) - Modern UI component library
- [Auth.js](https://authjs.dev/) - Authentication framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`
- Run linter: `npm run lint`

## Security Considerations

- All sensitive credentials are managed server-side
- CSRF protection is enabled
- Secure session management with Auth.js
- Protected routes with middleware
- Secure token handling and validation

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
