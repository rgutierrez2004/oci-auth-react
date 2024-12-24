'use client'

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mt-4">
          <CardHeader>
            <div>
              <h3 className="text-xl font-bold">Protected Page</h3>
              <p className="text-gray-500 dark:text-gray-400">
                This page is only accessible to authenticated users.
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Card className="mt-4">
                <CardBody>
                  <div className="font-mono">
                    <span className="text-green-600 dark:text-green-400">User Info: </span>
                    <pre className="overflow-x-auto mt-2">
                      {JSON.stringify({
                        id: session?.user?.id,
                        name: session?.user?.name,
                        email: session?.user?.email,
                      }, null, 2)}
                    </pre>
                  </div>
                </CardBody>
              </Card>
              <Card className="mt-4">
                <CardBody>
                  <div className="font-mono">
                    <span className="text-green-600 dark:text-green-400">Access Token:  </span>
                    <pre className="overflow-x-auto mt-2">
                      {session?.accessToken}
                    </pre>
                  </div>
                </CardBody>
              </Card>
              <Card className="mt-4">
                <CardBody>
                  <div className="font-mono">
                    <span className="text-green-600 dark:text-green-400">ID Token:  </span>
                    <pre className="overflow-x-auto mt-2">
                    {session?.idToken}
                    </pre>
                  </div>
                </CardBody>
              </Card>
              <Card className="mt-4">
                <CardBody>
                  <div className="font-mono">
                    <span className="text-green-600 dark:text-green-400">Full Session: </span>
                    <pre className="overflow-x-auto mt-2">
                      {JSON.stringify(session, null, 2)}
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
