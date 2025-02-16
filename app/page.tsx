"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getWeb3 } from "@/lib/web3";
import {
  Activity,
  Heart,
  Droplets,
  Timer,
  Shield,
  Stethoscope,
  Clock,
  Users,
  FileText,
} from "lucide-react";
import { useWallet } from "@/lib/wallet-context";

export default function Home() {
  const { account, setAccount } = useWallet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [setAccount]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              Secure Medical Records on the Blockchain
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take control of your healthcare data with our decentralized
              medical records platform. Secure, accessible, and always under
              your control.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={async () => {
                try {
                  const web3 = await getWeb3();
                  const accounts = await web3.eth.getAccounts();
                  setAccount(accounts[0]);
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Connect Wallet to Get Started
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
                <p className="text-muted-foreground">
                  Your medical records are encrypted and stored on the
                  blockchain
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Doctor Integration
                </h3>
                <p className="text-muted-foreground">
                  Seamlessly share records with healthcare providers
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Real-time Monitoring
                </h3>
                <p className="text-muted-foreground">
                  Track vital signs and health metrics in real-time
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Access Control</h3>
                <p className="text-muted-foreground">
                  Full control over who can access your medical data
                </p>
              </div>
            </Card>
          </div>

          {/* How It Works */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
                <p className="text-muted-foreground">
                  Link your MetaMask wallet to get started
                </p>
              </div>
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Records</h3>
                <p className="text-muted-foreground">
                  Securely store your medical documents
                </p>
              </div>
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Manage Access</h3>
                <p className="text-muted-foreground">
                  Control who can view your records
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard view for connected users
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your health metrics and recent activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Heart className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="font-semibold">Blood Pressure</h3>
                <p className="text-2xl">120/80</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Activity className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-semibold">Oxygen Level</h3>
                <p className="text-2xl">98%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Droplets className="h-6 w-6 text-green-500" />
              <div>
                <h3 className="font-semibold">Water Intake</h3>
                <p className="text-2xl">1.5L/2.5L</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Timer className="h-6 w-6 text-purple-500" />
              <div>
                <h3 className="font-semibold">Exercise</h3>
                <p className="text-2xl">30min/45min</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
            <div className="space-y-4">
              {[
                { title: "Blood Test Results", date: "2024-03-15" },
                { title: "X-Ray Report", date: "2024-03-10" },
                { title: "Prescription", date: "2024-03-05" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>{doc.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {doc.date}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Documents
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {[
                {
                  doctor: "Dr. Sarah Johnson",
                  date: "2024-03-20",
                  time: "10:00 AM",
                },
                {
                  doctor: "Dr. Michael Chen",
                  date: "2024-03-25",
                  time: "2:30 PM",
                },
              ].map((apt, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{apt.doctor}</p>
                    <p className="text-sm text-muted-foreground">
                      {apt.date} at {apt.time}
                    </p>
                  </div>
                  <Button size="sm">Reschedule</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Appointments
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
