import React from 'react'
import { format } from 'date-fns'
import { DownloadIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function PaySlipList({ payslips, isAdmin }) {
  const navigate = useNavigate();

  return (
    <div className="mt-8"> 
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-600 text-sm uppercase tracking-wider bg-slate-50">
                {isAdmin && <th className="px-6 py-4">Employee</th>}
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Basic Salary</th>
                <th className="px-6 py-4">Net Salary</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {payslips.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 5 : 4} className="text-center py-12 text-slate-400">
                    No payslips found
                  </td>
                </tr>
              ) : (
                payslips.map((payslip) => {
                  return (
                    <tr 
                      key={payslip.id || payslip._id} 
                      className="hover:bg-slate-50 transition-colors text-sm"
                    >
                      {isAdmin && (
                        <td className="px-6 py-4 text-slate-500">
                          {payslip.employee?.firstName} {payslip.employee?.lastName}
                        </td>
                      )}

                      <td className="px-6 py-4 text-slate-500">
                        {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {(payslip.basicSalary ?? 0).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0
                        })}
                      </td>

                      <td className="px-6 py-4 text-slate-800 font-medium">
                        {(payslip.netSalary ?? 0).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0
                        })}
                      </td>

                      <td className="text-center px-6 py-4">
                        <button
                          onClick={() =>
                            navigate(`/print/payslips/${payslip.id || payslip._id}`)
                          }
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600
                          bg-blue-50 hover:bg-blue-100 transition-colors ring-1 ring-blue-600/10"
                        >
                          <DownloadIcon className="w-3 h-3 mr-1.5" />
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default PaySlipList;