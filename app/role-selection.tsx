"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, UserCog } from 'lucide-react';
import { useWallet } from '@/lib/wallet-context';

export function RoleSelection() {
  const { setRole } = useWallet();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Select Your Role</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setRole('user')}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-6 rounded-full">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Patient</h2>
              <p className="text-muted-foreground">
                Access your medical records, appointments, and track your health metrics
              </p>
              <Button className="w-full">Continue as Patient</Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setRole('doctor')}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-6 rounded-full">
                <UserCog className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Doctor</h2>
              <p className="text-muted-foreground">
                Manage patients, appointments, and medical records
              </p>
              <Button className="w-full">Continue as Doctor</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}