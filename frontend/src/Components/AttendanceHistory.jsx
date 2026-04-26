import React from 'react'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../Alldata'
import {format} from 'date-fns'

export const AttendanceHistory = ({history}) => {
  return (
 <div className="p-2">
<div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
  {/* Header Section */}
  <div className="px-6 py-4 border-b border-slate-100 bg-white">
    <h3 className="font-semibold text-slate-800 text-lg">Recent Activity</h3>
  </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse px-8">
                <thead>
                    <tr className="text-slate-500 text-xs uppercase tracking-wider bg-slate-100/60">
                        <th className="px-6 py-3.5">Date</th>
                        <th className="px-6 py-3.5">CheckIn</th>
                        <th className="px-6 py-3.5">CheckOut</th>
                        <th className="px-6 py-3.5">Working Hours</th>
                        <th className="px-6 py-3.5">Day type</th>
                        <th className="px-6 py-3.5">Status</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
    {history.length === 0 ? (
        <tr>
            <td colSpan={6} className='text-center py-12 text-slate-400'>
                No records found
            </td>
        </tr>
    ) : (
        history.map((record) => {
            const dayType = getDayTypeDisplay(record);
            
            return (
                <tr key={record.id || record._id} className="hover:bg-slate-50/70 transition-colors text-[13px]">
                    {/* Date */}
                    <td className='px-6 py-3.5 font-medium text-slate-900 whitespace-nowrap'>
                        {format(new Date(record.date), "MMM dd, yyyy")}
                    </td>

                    {/* CheckIn/Out */}
                    <td className="px-6 py-3.5 text-slate-600">{record.checkIn?
                    format(new Date(record.checkIn), "hh:mm a") :'-'}</td>

                    <td className="px-6 py-3.5 text-slate-600">{record.checkOut?
                    format(new Date(record.checkOut), "hh:mm a") :'-'}</td>
                    
                    {/* Working Hours */}
                    <td className="px-6 py-3.5 text-slate-600">{getWorkingHoursDisplay(record)}</td>

                    {/* Day Type - Handling the Object error here */}
                    <td className="px-6 py-3.5">
                        {dayType.label!=="_"?
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
  dayType.label === 'Full Day' 
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'   // full = good (green)

  : dayType.label === 'Three Quarter Day' 
    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'     // almost full = primary

  : dayType.label === 'Half Day' 
    ? 'bg-amber-50 text-amber-700 border-amber-200'        // medium = warning

  : dayType.label === 'Short Day' 
    ? 'bg-rose-50 text-rose-700 border-rose-200'           // low = problem

  : 'bg-slate-100 text-slate-600 border-slate-200'         // null/default
}`}>
  {dayType.label || "-"}
</span>:"-"}
                    </td>

                    {/* Status - Handling potential object error here too */}
                    <td className="px-6 py-3.5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
  record.status === 'PRESENT' 
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
  : record.status === 'LATE'    
    ? 'bg-amber-50 text-amber-700 border-amber-200' 
  : record.status === 'ABSENT'  
    ? 'bg-rose-50 text-rose-700 border-rose-200' 
  : 'bg-slate-100 text-slate-700 border-slate-200'
}`}>
    {record.status}
  </span>
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
