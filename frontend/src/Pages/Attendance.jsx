import { useState, useCallback, useEffect } from "react";
import Loading from "../Components/Loading";
import { CheckInButton } from "../Components/CheckInButton";
import AttendanceStats from "../Components/AttendanceStats";
import { AttendanceHistory } from "../Components/AttendanceHistory";
import api from "../api/axios";
import toast from "react-hot-toast";

function Attendance() {
  const [history, setHistory] = useState([]);
  const [todayRecord, setTodayRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("/attendance");
      const json = res.data;

      setHistory(json.data || []);
      setIsDeleted(json.employee?.isDeleted || false);

      // ✅ ALWAYS derive todayRecord fresh from backend data
      const today = new Date();

      const record = (json.data || []).find((r) => {
        const d = new Date(r.date);
        return (
          d.getFullYear() === today.getFullYear() &&
          d.getMonth() === today.getMonth() &&
          d.getDate() === today.getDate()
        );
      });

      setTodayRecord(record || null);

    } catch (err) {
      toast.error(err?.response?.data?.err || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 mb-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-2xl">Attendance</h1>
          <p className="text-slate-400 text-sm mt-1">
            Track your work hours and daily check-ins
          </p>
        </div>

        <CheckInButton
          todayRecord={todayRecord}
          onAction={fetchData}
        />
      </div>

      <AttendanceStats history={history} />
      <AttendanceHistory history={history} />

    </div>
  );
}

export default Attendance;