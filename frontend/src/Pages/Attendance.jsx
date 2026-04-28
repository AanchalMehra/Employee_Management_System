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

  const fetchData = useCallback(async () => {
  try {
    const res = await api.get("/attendance");
    const records = res.data.data || [];
    setHistory(records);

    const todayStr = new Date().toDateString();

    const activeRecord = records.find(r => r.checkIn && !r.checkOut);

    if (activeRecord) {
      setTodayRecord(activeRecord);
    } else {
      const completedToday = records.find(r => 
        new Date(r.date).toDateString() === todayStr
      );
      setTodayRecord(completedToday || null);
    }

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
    <div className="container mx-auto pt-1 pb-2 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
        <div>
          <h1 className="font-semibold text-2xl text-slate-900">Attendance</h1>
          <p className="text-slate-400 text-sm ">Track your daily hours</p>
        </div>
        <div className="self-start sm:self-auto w-fit">
          <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      </div>

      <AttendanceStats history={history} />
      <AttendanceHistory history={history} />
    </div>
  );
}

export default Attendance;