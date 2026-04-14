import React from 'react'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../Alldata'
import {format} from 'date-fns'

export const AttendanceHistory = ({history}) => {
  return (
    <div className="p-2">
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
  {/* Header Section */}
  <div className="px-6 py-3 border-b border-slate-100 bg-white">
    <h3 className="font-bold text-slate-800 text-lg">Recent Activity</h3>
  </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse px-8">
                <thead>
                    <tr className="text-slate-600 text-sm uppercase tracking-wider bg-slate-50">
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">CheckIn</th>
                        <th className="px-6 py-4">CheckOut</th>
                        <th className="px-6 py-4">Working Hours</th>
                        <th className="px-6 py-4">Day type</th>
                        <th className="px-6 py-4">Status</th>
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
                <tr key={record.id || record._id} className="hover:bg-slate-50 transition-colors text-sm">
                    {/* Date */}
                    <td className='px-6 py-4 font-medium text-slate-900 whitespace-nowrap'>
                        {format(new Date(record.date), "MMM dd yyyy")}
                    </td>

                    {/* CheckIn/Out */}
                    <td className="px-6 py-4 text-slate-600">{record.checkIn?
                    format(new Date(record.checkIn), "hh:mm a") :'-'}</td>

                    <td className="px-6 py-4 text-slate-600">{record.checkOut?
                    format(new Date(record.checkOut), "hh:mm a") :'-'}</td>
                    
                    {/* Working Hours */}
                    <td className="px-6 py-4 text-slate-600">{getWorkingHoursDisplay(record)}</td>

                    {/* Day Type - Handling the Object error here */}
                    <td className="px-6 py-4">
                        {dayType.label!=="_"?
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
      dayType.label === 'Full Day' ? 'bg-blue-50 text-blue-700 border-blue-100' :
      dayType.label === 'Half Day' ? 'bg-orange-50 text-orange-700 border-orange-100' :
      'bg-slate-100 text-slate-600'
    }`}>
                              {dayType.label}
                        </span>:"-"}
                    </td>

                    {/* Status - Handling potential object error here too */}
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${
    record.status === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
    record.status === 'Late'    ? 'bg-amber-50 text-amber-700 border-amber-100' :
    record.status === 'Absent'  ? 'bg-rose-50 text-rose-700 border-rose-100' :
    'bg-slate-100 text-slate-800'
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
