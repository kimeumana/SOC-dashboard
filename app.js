import React, { useState, useEffect } from 'react';
import { Shield, Bell, AlertTriangle, Activity, Database, Clock, Search, Server, Users, RefreshCw } from 'lucide-react';

// Sample data for demonstration
const generateRandomData = () => {
  return {
    alerts: [
      { id: 1, severity: 'critical', message: 'Potential data exfiltration detected', time: '14:32:01', source: '192.168.1.45' },
      { id: 2, severity: 'high', message: 'Multiple failed login attempts', time: '14:28:17', source: '10.0.0.123' },
      { id: 3, severity: 'medium', message: 'Unusual network traffic pattern', time: '14:15:09', source: '172.16.0.87' },
      { id: 4, severity: 'low', message: 'User login from new location', time: '13:55:22', source: '192.168.1.22' },
    ],
    logs: [
      { id: 1, timestamp: '14:32:01', level: 'ERROR', service: 'firewall', message: 'Connection blocked: unauthorized access attempt' },
      { id: 2, timestamp: '14:30:45', level: 'WARN', service: 'auth', message: 'Failed login attempt for user admin' },
      { id: 3, timestamp: '14:28:17', level: 'INFO', service: 'vpn', message: 'User jsmith connected from 10.0.0.123' },
      { id: 4, timestamp: '14:27:02', level: 'INFO', service: 'ids', message: 'Signature match: potential SQL injection attempt' },
      { id: 5, timestamp: '14:25:56', level: 'DEBUG', service: 'webapp', message: 'Request processed successfully' },
    ],
    threatIntel: [
      { id: 1, ioc: '185.143.xx.xx', type: 'IP', confidence: 'high', description: 'Known C2 server' },
      { id: 2, ioc: 'malware.example[.]com', type: 'Domain', confidence: 'medium', description: 'Phishing campaign' },
      { id: 3, ioc: '38a1b...', type: 'Hash', confidence: 'high', description: 'Ransomware sample' },
    ],
    systemHealth: {
      cpu: 45,
      memory: 68,
      disk: 52,
      network: 32
    },
    securityEvents: {
      malware: 12,
      phishing: 8,
      ddos: 0,
      bruteforce: 5,
      dataLeak: 1,
      unauthorized: 3
    }
  };
};

export default function SOCDashboard() {
  const [data, setData] = useState(generateRandomData());
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulate data updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(generateRandomData());
      setLastUpdated(new Date().toLocaleTimeString());
    }, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  const refreshData = () => {
    setData(generateRandomData());
    setLastUpdated(new Date().toLocaleTimeString());
  };
  
  const totalAlerts = Object.values(data.securityEvents).reduce((a, b) => a + b, 0);
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white shadow-md p-4 mb-6 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">SOC Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last updated: {lastUpdated}</span>
            </div>
            <button 
              onClick={refreshData}
              className="flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>
        </header>
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Critical Alerts</p>
              <p className="text-2xl font-bold">{data.alerts.filter(a => a.severity === 'critical').length}</p>
            </div>
            <AlertTriangle className="h-10 w-10 opacity-80" />
          </div>
          
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Security Events</p>
              <p className="text-2xl font-bold">{totalAlerts}</p>
            </div>
            <Bell className="h-10 w-10 opacity-80" />
          </div>
          
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Systems Monitored</p>
              <p className="text-2xl font-bold">42</p>
            </div>
            <Server className="h-10 w-10 opacity-80" />
          </div>
          
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Active Users</p>
              <p className="text-2xl font-bold">18</p>
            </div>
            <Users className="h-10 w-10 opacity-80" />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Search className="h-5 w-5 mr-2 text-gray-500" />
              Search
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search alerts, logs, and threats..."
                className="w-full p-2 pl-10 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-red-500" />
              Security Alerts
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.alerts.map(alert => (
                    <tr key={alert.id}>
                      <td className="py-2 px-4">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          alert.severity === 'critical' ? 'bg-red-500' :
                          alert.severity === 'high' ? 'bg-orange-500' :
                          alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></span>
                        <span className="capitalize">{alert.severity}</span>
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-500">{alert.time}</td>
                      <td className="py-2 px-4 text-sm">{alert.message}</td>
                      <td className="py-2 px-4 text-sm text-gray-500 font-mono">{alert.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Security Events
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Malware</span>
                <div className="flex-1 h-4 bg-gray-200 rounded">
                  <div className="h-4 bg-red-400 rounded" style={{ width: `${(data.securityEvents.malware / 20) * 100}%` }}></div>
                </div>
                <span className="ml-2 text-sm font-medium">{data.securityEvents.malware}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Phishing</span>
                <div className="flex-1 h-4 bg-gray-200 rounded">
                  <div className="h-4 bg-orange-400 rounded" style={{ width: `${(data.securityEvents.phishing / 20) * 100}%` }}></div>
                </div>
                <span className="ml-2 text-sm font-medium">{data.securityEvents.phishing}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">DDoS</span>
                <div className="flex-1 h-4 bg-gray-200 rounded">
                  <div className="h-4 bg-purple-400 rounded" style={{ width: `${(data.securityEvents.ddos / 20) * 100}%` }}></div>
                </div>
                <span className="ml-2 text-sm font-medium">{data.securityEvents.ddos}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Brute Force</span>
                <div className="flex-1 h-4 bg-gray-200 rounded">
                  <div className="h-4 bg-yellow-400 rounded" style={{ width: `${(data.securityEvents.bruteforce / 20) * 100}%` }}></div>
                </div>
                <span className="ml-2 text-sm font-medium">{data.securityEvents.bruteforce}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Data Leak</span>
                <div className="flex-1 h-4 bg-gray-200 rounded">
                  <div className="h-4 bg-pink-400 rounded" style={{ width: `${(data.securityEvents.dataLeak / 20) * 100}%` }}></div>
                </div>
                <span className="ml-2 text-sm font-medium">{data.securityEvents.dataLeak}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Unauthorized</span>
                <div className="flex-1 h-4 bg-gray-200 rounded">
                  <div className="h-4 bg-blue-400 rounded" style={{ width: `${(data.securityEvents.unauthorized / 20) * 100}%` }}></div>
                </div>
                <span className="ml-2 text-sm font-medium">{data.securityEvents.unauthorized}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-gray-500" />
              System Logs
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.logs.map(log => (
                    <tr key={log.id}>
                      <td className="py-2 px-4 text-sm text-gray-500 font-mono">{log.timestamp}</td>
                      <td className="py-2 px-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                          log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800' :
                          log.level === 'INFO' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-sm">{log.service}</td>
                      <td className="py-2 px-4 text-sm">{log.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Server className="h-5 w-5 mr-2 text-green-500" />
              System Health
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">CPU Usage</span>
                  <span className="text-sm font-medium">{data.systemHealth.cpu}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div 
                    className={`h-2 rounded ${data.systemHealth.cpu > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${data.systemHealth.cpu}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Memory Usage</span>
                  <span className="text-sm font-medium">{data.systemHealth.memory}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div 
                    className={`h-2 rounded ${data.systemHealth.memory > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${data.systemHealth.memory}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Disk Usage</span>
                  <span className="text-sm font-medium">{data.systemHealth.disk}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div 
                    className={`h-2 rounded ${data.systemHealth.disk > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${data.systemHealth.disk}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Network Usage</span>
                  <span className="text-sm font-medium">{data.systemHealth.network}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div 
                    className={`h-2 rounded ${data.systemHealth.network > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${data.systemHealth.network}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              Threat Intelligence
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IoC</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.threatIntel.map(threat => (
                    <tr key={threat.id}>
                      <td className="py-2 px-4 font-mono text-sm">{threat.ioc}</td>
                      <td className="py-2 px-4 text-sm">{threat.type}</td>
                      <td className="py-2 px-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          threat.confidence === 'high' ? 'bg-red-100 text-red-800' :
                          threat.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {threat.confidence}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-sm">{threat.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
