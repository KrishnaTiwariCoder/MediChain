"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, FileText, Bell, Activity, Clock } from 'lucide-react';

const patients = [
  { id: 1, name: 'John Doe', age: 45, lastVisit: '2024-03-15', condition: 'Hypertension' },
  { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2024-03-14', condition: 'Diabetes' },
  { id: 3, name: 'Mike Johnson', age: 28, lastVisit: '2024-03-13', condition: 'Asthma' },
];

const appointments = [
  { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Check-up' },
  { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Follow-up' },
  { id: 3, patient: 'Mike Johnson', time: '02:00 PM', type: 'Consultation' },
];

const alerts = [
  { id: 1, patient: 'John Doe', type: 'High Blood Pressure', time: '30 mins ago' },
  { id: 2, patient: 'Jane Smith', type: 'Missed Medication', time: '1 hour ago' },
  { id: 3, patient: 'Mike Johnson', type: 'Abnormal Heart Rate', time: '2 hours ago' },
];

export default function DoctorDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Sarah Johnson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Patients</p>
              <h3 className="text-2xl font-bold">248</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Calendar className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Today's Appointments</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Bell className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Pending Reports</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Activity className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Critical Cases</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Patients</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 hover:bg-secondary/10 rounded-lg">
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Age: {patient.age} • {patient.condition}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p className="text-sm">{patient.lastVisit}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 hover:bg-secondary/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{apt.patient}</h3>
                    <p className="text-sm text-muted-foreground">{apt.type}</p>
                  </div>
                </div>
                <p className="text-sm font-medium">{apt.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Alerts</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="p-4 border-l-4 border-red-500">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{alert.patient}</h3>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
              <p className="text-sm text-red-500">{alert.type}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}