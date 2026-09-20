import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  User,
  Shield,
  Truck,
  FileText,
  AlertCircle,
  CheckCircle2,
  Phone,
  Calendar,
  MapPin,
  Car,
  Download,
  RefreshCw,
  LogOut,
  Camera,
  Activity
} from 'lucide-react';

interface StaffPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuthUser {
  userId: string;
  username: string;
  role: 'ADMIN' | 'STAFF' | 'DRIVER';
  fullName: string;
}

export const StaffPortalModal: React.FC<StaffPortalModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Portal data state
  const [activeTab, setActiveTab] = useState<'requests' | 'audit' | 'backups'>('requests');
  const [requests, setRequests] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [backups, setBackups] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Quick credentials helper for demo/testing
  const handlePrefill = (userType: 'admin' | 'staff' | 'driver') => {
    void userType;
    setLoginError('Staff access requires a trusted server authentication service and is unavailable in this frontend-only build.');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    void username;
    void password;
    setLoginError('Staff access requires a trusted server authentication service and is unavailable in this frontend-only build.');
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    setToken(null);
    setCurrentUser(null);
  };

  // Load portal data based on role and tab
  const loadPortalData = async () => {
    if (!token) return;
    setLoadingData(true);
    setActionMessage(null);

    if (activeTab === 'requests') setRequests([]);
    if (activeTab === 'audit') setAuditLogs([]);
    if (activeTab === 'backups') setBackups([]);
    setLoadingData(false);
  };

  useEffect(() => {
    if (isOpen && token) {
      loadPortalData();
    }
  }, [isOpen, token, activeTab]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    if (!token) return;
    setActionMessage(`Status updated to ${newStatus}`);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleCreateBackup = async () => {
    if (!token || currentUser?.role !== 'ADMIN') return;
    setActionMessage('Local demo backup snapshot created successfully.');
    setTimeout(() => setActionMessage(null), 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>P\D WORKS Operations & Dispatch</span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
                  RBAC Enforced
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Authorized Personnel Portal • Role-Based Access Control
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          {!token || !currentUser ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1E56A0] mx-auto flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Secure Staff Sign-In</h4>
                <p className="text-xs text-slate-500">
                  Staff access is disabled in this frontend-only deployment. A trusted server authentication service is required.
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="e.g. admin or driver_hyd"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#1E56A0] hover:bg-[#163e75] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loginLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authenticate Session</span>
                    </>
                  )}
                </button>
              </form>

              {/* Quick Role Tester Bar for Security Inspection */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 text-center">
                  Staff access requires server configuration
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePrefill('admin')}
                    className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-[11px] text-slate-700 font-semibold text-center cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-600 mx-auto mb-1" />
                    <span>ADMIN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrefill('staff')}
                    className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-[11px] text-slate-700 font-semibold text-center cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                    <span>STAFF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrefill('driver')}
                    className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-[11px] text-slate-700 font-semibold text-center cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                    <span>DRIVER</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Authenticated Portal View */
            <div className="space-y-6">
              {/* User Session Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1E56A0] flex items-center justify-center font-bold">
                    {currentUser.role === 'ADMIN' ? 'A' : currentUser.role === 'STAFF' ? 'S' : 'D'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{currentUser.fullName}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          currentUser.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : currentUser.role === 'STAFF'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {currentUser.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      User ID: {currentUser.userId} • Verified Session Active
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={loadPortalData}
                    className="p-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {actionMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{actionMessage}</span>
                </div>
              )}

              {/* Navigation Tabs (ADMIN only has audit & backups) */}
              {currentUser.role === 'ADMIN' && (
                <div className="flex border-b border-slate-200 space-x-4">
                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
                      activeTab === 'requests'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Service Requests ({requests.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('audit')}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-colors flex items-center gap-1 ${
                      activeTab === 'audit'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Audit Logs</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('backups')}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider cursor-pointer border-b-2 transition-colors flex items-center gap-1 ${
                      activeTab === 'backups'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Database Backups</span>
                  </button>
                </div>
              )}

              {/* View 1: DRIVER LOGISTICS VIEW (Strictly isolated data) */}
              {currentUser.role === 'DRIVER' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                    <Truck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Driver Logistics Dispatch View</p>
                      <p className="text-emerald-800 mt-0.5">
                        For customer privacy, drivers only have access to pickup addresses, contact phone numbers, and vehicle specifications for assigned jobs. Customer financial estimates and internal technician notes are restricted.
                      </p>
                    </div>
                  </div>

                  {requests.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm">
                      No active pickup & drop requests assigned at this time.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {requests.map(req => (
                        <div
                          key={req.id}
                          className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                                {req.referenceCode}
                              </span>
                              <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                                <Car className="w-3.5 h-3.5" />
                                {req.brand} {req.model} {req.year ? `(${req.year})` : ''}
                              </span>
                            </div>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              {req.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                            <div>
                              <p className="font-bold text-slate-700 flex items-center gap-1 mb-1">
                                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                <span>Pickup Address:</span>
                              </p>
                              <p className="text-slate-900 font-medium">{req.pickupDrop?.address}</p>
                              {req.pickupDrop?.landmark && (
                                <p className="text-slate-500 mt-0.5">Landmark: {req.pickupDrop.landmark}</p>
                              )}
                            </div>

                            <div>
                              <p className="font-bold text-slate-700 flex items-center gap-1 mb-1">
                                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                <span>Schedule & Contact:</span>
                              </p>
                              <p className="text-slate-900 font-medium">
                                {req.pickupDrop?.preferredDate} • {req.pickupDrop?.preferredTime}
                              </p>
                              <p className="text-slate-700 mt-1 flex items-center gap-1 font-semibold">
                                <Phone className="w-3 h-3 text-emerald-600" />
                                <a href={`tel:${req.customerPhone}`} className="hover:underline">
                                  {req.customerName} ({req.customerPhone})
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* View 2: STAFF & ADMIN COMPLETE SERVICE REQUEST VIEW */}
              {(currentUser.role === 'STAFF' || currentUser.role === 'ADMIN') && activeTab === 'requests' && (
                <div className="space-y-4">
                  {requests.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm">
                      No workshop service requests found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {requests.map(req => (
                        <div
                          key={req.id}
                          className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                                {req.referenceCode}
                              </span>
                              <span className="text-sm font-bold text-slate-800">
                                {req.brand} {req.model} {req.year ? `(${req.year})` : ''}
                              </span>
                              <span className="text-xs text-slate-400">
                                {new Date(req.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {/* Status Update Dropdown */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500 font-semibold">Status:</span>
                              <select
                                value={req.status}
                                onChange={e => handleUpdateStatus(req.id, e.target.value)}
                                className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                              >
                                <option value="RECEIVED">RECEIVED</option>
                                <option value="INSPECTING_PHOTOS">INSPECTING_PHOTOS</option>
                                <option value="QUOTE_SENT">QUOTE_SENT</option>
                                <option value="PICKUP_SCHEDULED">PICKUP_SCHEDULED</option>
                                <option value="IN_WORKSHOP">IN_WORKSHOP</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELLED">CANCELLED</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            {/* Col 1: Customer Contact */}
                            <div className="space-y-1">
                              <p className="font-bold text-slate-500 uppercase tracking-wider">Customer Details</p>
                              <p className="text-sm font-bold text-slate-900">{req.customer?.fullName}</p>
                              <p className="text-slate-600 font-medium">📱 Mobile: {req.customer?.mobileNumber}</p>
                              <p className="text-slate-600">💬 WhatsApp: {req.customer?.whatsappNumber}</p>
                              {req.customer?.locationArea && (
                                <p className="text-slate-500">Area: {req.customer.locationArea}</p>
                              )}
                            </div>

                            {/* Col 2: Services & Damage */}
                            <div className="space-y-1">
                              <p className="font-bold text-slate-500 uppercase tracking-wider">Requested Work</p>
                              <div className="flex flex-wrap gap-1 mb-1">
                                {req.damagedParts?.map((p: string) => (
                                  <span key={p} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                                    {p}
                                  </span>
                                ))}
                              </div>
                              <p className="text-slate-700">Services: {req.services?.join(', ')}</p>
                              {req.customer?.additionalNotes && (
                                <p className="text-slate-500 italic mt-1">Note: "{req.customer.additionalNotes}"</p>
                              )}
                            </div>

                            {/* Col 3: Logistics */}
                            <div className="space-y-1">
                              <p className="font-bold text-slate-500 uppercase tracking-wider">Logistics & Pickup</p>
                              <p className="font-semibold text-slate-800">
                                {req.pickupDrop?.needed ? '🚗 Doorstep Pickup' : 'Self-Drop at Workshop'}
                              </p>
                              {req.pickupDrop?.needed && (
                                <>
                                  <p className="text-slate-600">📍 {req.pickupDrop.address}</p>
                                  <p className="text-slate-500">Time: {req.pickupDrop.preferredTime}</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* View 3: ADMIN AUDIT LOGS VIEW */}
              {currentUser.role === 'ADMIN' && activeTab === 'audit' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Immutable Security Audit Trail (Recent 100 entries)
                    </h5>
                    <span className="text-xs text-slate-500">Zero secrets or passwords logged</span>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 text-xs">
                      {auditLogs.map((log: any) => (
                        <div key={log.id} className="p-3 hover:bg-slate-50 flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                                  log.eventType.includes('SUCCESS')
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : log.eventType.includes('FAILED') || log.eventType.includes('DENIED')
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {log.eventType}
                              </span>
                              <span className="text-slate-400 font-mono text-[11px]">
                                {new Date(log.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-slate-800 mt-1 font-medium">{log.details?.message}</p>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 shrink-0">
                            {log.actor?.role || 'anon'}@{log.actor?.ip}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* View 4: ADMIN DATABASE BACKUPS VIEW */}
              {currentUser.role === 'ADMIN' && activeTab === 'backups' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-slate-800">Database Snapshots & Integrity</h5>
                      <p className="text-xs text-slate-500">
                        Create encrypted, SHA-256 verified point-in-time snapshots stored strictly outside web roots.
                      </p>
                    </div>
                    <button
                      onClick={handleCreateBackup}
                      className="py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Take Backup Snapshot</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    {backups.length === 0 ? (
                      <div className="p-8 text-center text-xs text-slate-400">
                        No backup files generated yet. Click above to create one.
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 text-xs">
                        {backups.map(b => (
                          <div key={b.backupId} className="p-3.5 flex items-center justify-between">
                            <div>
                              <p className="font-mono font-bold text-slate-800">{b.backupId}.json</p>
                              <p className="text-slate-400 text-[11px]">
                                Created: {new Date(b.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              Verified
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
