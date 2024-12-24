# OCI Auth React - Architecture Documentation

This document outlines the architectural decisions and implementation details of the OCI Auth React application.

## Overview

The OCI Auth React application is a modern web application that demonstrates secure authentication with Oracle Cloud Infrastructure (OCI) using OAuth 2.0 and OpenID Connect protocols. The application is built using Next.js 14 with the App Router, leveraging server-side rendering and API routes for enhanced security and performance.

## Architectural Patterns

### Backend for Frontend (BFF)
- The application uses the BFF pattern through Next.js API routes
- Authentication is handled server-side using Auth.js
- Sensitive credentials and token management occur server-side
- Client-side code only receives necessary session information

### Component-Based Architecture
- UI components are modular and reusable
- NextUI provides the base component library
- Custom components extend NextUI functionality
- Consistent styling with Tailwind CSS

## Authentication Flow

1. **Initial Request**
   - User clicks "OAuth 2.0 & OIDC" button
   - Application initiates OAuth flow with OCI IAM
   - PKCE and state parameters ensure security

2. **Authorization**
   - User is redirected to OCI login page
   - After successful login, OCI returns authorization code
   - Code is exchanged for tokens server-side

3. **Token Management**
   - Access token and ID token are stored in session
   - Tokens are never exposed to client-side JavaScript
   - Session is managed securely by Auth.js

4. **User Information**
   - User info is fetched from OCI userinfo endpoint
   - Information is stored in session for future use
   - Protected routes verify session before access

## Directory Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/             # API Routes
│   │   └── auth/        # Auth.js Configuration
│   ├── protected/       # Protected Routes
│   ├── page.tsx         # Public Routes
│   └── providers.tsx    # App Providers
├── components/          # React Components
│   ├── Header.tsx       # Navigation Component
│   ├── icons/           # Icon Components
│   └── ...
├── types/               # TypeScript Types
│   └── next-auth.d.ts   # Auth Type Extensions
└── styles/              # Global Styles
```

## Key Components

### Auth.js Configuration
- Located in `src/app/api/auth/[...nextauth]/route.ts`
- Configures OCI OAuth provider
- Manages session and token lifecycle
- Handles callback and logout flows

### App Providers
- Located in `src/app/providers.tsx`
- Wraps application with necessary context
- Manages theme and authentication state
- Provides NextUI components

### Protected Routes
- Located in `src/app/protected/*`
- Require authentication to access
- Display user information and tokens
- Handle unauthorized access

## Security Measures

### CSRF Protection
- Enabled by default in Auth.js
- Tokens validated on form submissions
- Prevents cross-site request forgery

### Token Management
- Tokens stored server-side only
- Session cookies are HTTP-only
- Automatic token rotation when needed

### Protected Routes
- Server-side session validation
- Client-side navigation protection
- Secure redirect handling

## State Management

### Authentication State
- Managed by Auth.js
- Available through `useSession` hook
- Automatically updates across components

### Theme State
- Managed by next-themes
- Persists user preference
- Syncs across components

## Error Handling

### Authentication Errors
- Displayed on home page
- Clear error messages
- Retry functionality

### API Errors
- Proper status codes
- Error boundaries for UI
- Graceful degradation

## Performance Considerations

### Server-Side Rendering
- Initial page load is server rendered
- Hydration for interactivity
- Optimal loading performance

### Code Splitting
- Automatic route-based splitting
- Dynamic imports where needed
- Reduced bundle size

### Caching
- Static page caching
- Session caching
- API response caching

## Development Workflow

### Type Safety
- TypeScript throughout
- Custom type definitions
- Strict type checking

### Code Organization
- Feature-based structure
- Clear separation of concerns
- Consistent naming conventions

### Testing
- Component testing with Jest
- API route testing
- End-to-end testing capability

## Deployment

### Environment Variables
- Secure credential management
- Environment-specific configs
- Easy deployment setup

### Build Process
- Optimized production builds
- Asset optimization
- Environment validation

## Future Considerations

### Scalability
- Ready for additional features
- Modular architecture
- Easy to maintain and extend

### Monitoring
- Error tracking capability
- Performance monitoring
- User analytics support

### Internationalization
- Structure supports i18n
- Easy to add translations
- RTL support possible
