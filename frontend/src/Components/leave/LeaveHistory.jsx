import React, { useState } from 'react';
import { Loader2, Check, XIcon } from 'lucide-react';
import { format } from 'date-fns';
import api from '../../api/axios';
import toast from 'react-hot-toast';

function LeaveHistory({ leaves = [], isAdmin, onUpdate }) {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);

    try {
      await api.patch(`/leave/${id}`,{status})
      onUpdate();
      }
    catch (err) {
       toast.error(err?.response?.data?.err|| err.message)
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="mt-8"> 
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-600 text-sm uppercase tracking-wider bg-slate-50">
                {isAdmin && <th className="px-6 py-4">Employee</th>}
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                {isAdmin && <th className="px-6 py-4 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 4} className="text-center py-12 text-slate-400">
                    No leave applications found
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => {
                  const leaveId = leave.id || leave._id;
                  const isProcessing = processing === leaveId;

                  return (
                    <tr key={leaveId} className="hover:bg-slate-50 transition-colors text-sm">
                      {isAdmin && (
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {leave.employee?.firstName} {leave.employee?.lastName}
                        </td>
                      )}

                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {leave.type}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {format(new Date(leave.startDate), "MMM dd")} - {format(new Date(leave.endDate), "MMM dd, yyyy")}
                      </td>

                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate" title={leave.reason}>
                        {leave.reason}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${
                          leave.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          leave.status === 'PENDING'  ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          leave.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {leave.status}
                        </span>
                      </td>

                      {isAdmin && (
                        <td className="px-6 py-4">
                          {leave.status === "PENDING" ? (
                            <div className="flex justify-center gap-2">
                              <button
                                disabled={!!processing}
                                onClick={() => handleStatusUpdate(leaveId, "APPROVED")}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
                              >
                                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                              </button>
                              <button
                                disabled={!!processing}
                                onClick={() => handleStatusUpdate(leaveId, "REJECTED")}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                              >
                                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <XIcon className="w-4 h-4" />}
                              </button>
                            </div>
                          ) : (
                            <div className="text-center text-slate-300 text-xs italic">Reviewed</div>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveHistory;