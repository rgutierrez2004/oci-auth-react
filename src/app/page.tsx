'use client'

import { Card, CardHeader, CardBody, Button, Skeleton } from "@nextui-org/react";
import { useSession, getCsrfToken, getProviders, signIn } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

// Separate component for auth data loading
function AuthDataSection() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [providers, setProviders] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [token, authProviders] = await Promise.all([
          getCsrfToken(),
          getProviders()
        ]);
        setCsrfToken(token);
        setProviders(authProviders);
      } catch (error) {
        console.error('Error loading auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Card className="mt-4">
          <CardBody>
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
          </CardBody>
        </Card>
        <Card className="mt-4">
          <CardBody>
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <>
      {csrfToken && (
        <Card className="mt-4">
          <CardBody>
            <div className="font-mono">
              <span className="text-green-600 dark:text-green-400">CSRF Token: </span>
              {csrfToken}
            </div>
          </CardBody>
        </Card>
      )}

      {providers && (
        <Card className="mt-4">
          <CardBody>
            <div className="font-mono">
              <span className="text-green-600 dark:text-green-400">Providers: </span>
              <pre className="overflow-x-auto mt-2">
                {JSON.stringify(providers, null, 2)}
              </pre>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}

// Separate component for session status
function SessionStatusSection({ status }: { status: string }) {
  return (
    <Card className="mt-4">
      <CardBody>
        <div className="font-mono">
          <span className="text-green-600 dark:text-green-400">Status: </span>
          {status}
        </div>
      </CardBody>
    </Card>
  );
}

// Separate component for session data
function SessionDataSection({ session }: { session: any }) {
  if (!session) return null;
  
  return (
    <Card className="mt-4">
      <CardBody>
        <div className="font-mono">
          <span className="text-green-600 dark:text-green-400">Session Data: </span>
          <pre className="overflow-x-auto mt-2">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </CardBody>
    </Card>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <Card className="mb-4 border-red-500">
            <CardBody>
              <p className="text-red-500">Authentication Error: {error}</p>
              <Button
                color="primary"
                variant="light"
                className="mt-2"
                onPress={() => signIn('oci-iam', { callbackUrl: '/' })}
              >
                Try Again
              </Button>
            </CardBody>
          </Card>
        )}

        <Card className="mt-4">
          <CardHeader>
            <div className="w-full flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Authentication Overview</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  See all available authentication & session information below.
                </p>
              </div>
              {session && (
                <Link href="/protected">
                  <Button color="primary">
                    View Protected Page
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Suspense fallback={<Skeleton className="h-24 rounded-lg" />}>
              <SessionStatusSection status={status} />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-24 rounded-lg" />}>
              <SessionDataSection session={session} />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-48 rounded-lg" />}>
              <AuthDataSection />
            </Suspense>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
