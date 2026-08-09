"use client"

import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Droplets,
  FlaskConical,
  SprayCan,
  Sprout,
  Bell,
  X,
  Camera,
} from 'lucide-react';
import Heading from '../heading/page';

const ACTIVITY_META = {
  watered: { label: "Watered", icon: Droplets, color: "blue" },
  fertilized: { label: "Fertilized", icon: FlaskConical, color: "amber" },
  sprayed: { label: "Sprayed", icon: SprayCan, color: "green" },
  sown: { label: "Sown", icon: Sprout, color: "emerald" },
};

const colorMap = {
  blue: { dot: "bg-blue-500", bg: "bg-blue-100", text: "text-blue-700", chipActive: "bg-blue-600" },
  amber: { dot: "bg-amber-500", bg: "bg-amber-100", text: "text-amber-700", chipActive: "bg-amber-600" },
  green: { dot: "bg-green-500", bg: "bg-green-100", text: "text-green-700", chipActive: "bg-green-600" },
  emerald: { dot: "bg-emerald-500", bg: "bg-emerald-100", text: "text-emerald-700", chipActive: "bg-emerald-600" },
};

export default function CropDiaryPage() {

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 21));
  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState("watered");
  const [newNote, setNewNote] = useState("");

  const [tasks] = useState([
    { id: "t1", date: "2026-07-21", title: "Sow Rabi wheat", type: "reminder" },
  ]);

  const [entries, setEntries] = useState([
    { id: "e1", date: "2026-07-14", activity: "fertilized", note: "Applied urea" },
    { id: "e2", date: "2026-07-10", activity: "watered", note: "First irrigation" },
  ]);

  const fmt = (d) => d.toISOString().split("T")[0];
  const isSameDay = (a, b) => fmt(a) === fmt(b);
  const today = new Date(2026, 6, 21);

  const monthLabel = currentMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const daysGrid = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [currentMonth]);

  const dayHasItem = (date) => {
    if (!date) return null;
    const dateStr = fmt(date);
    const entry = entries.find(e => e.date === dateStr);
    const task = tasks.find(t => t.date === dateStr);
    if (entry) return ACTIVITY_META[entry.activity].color;
    if (task) return "amber";
    return null;
  };

  const selectedDayEntries = entries.filter(e => e.date === fmt(selectedDate));
  const selectedDayTasks = tasks.filter(t => t.date === fmt(selectedDate));

  const sortedFeed = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  const changeMonth = (delta) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1));
  };

  const addQuickEntry = (activity) => {
    const entry = { id: `e${Date.now()}`, date: fmt(today), activity, note: ACTIVITY_META[activity].label };
    setEntries([entry, ...entries]);
  };

  const submitModal = () => {
    if (!newNote.trim()) return;
    const entry = { id: `e${Date.now()}`, date: fmt(selectedDate), activity: newActivity, note: newNote };
    setEntries([entry, ...entries]);
    setNewNote("");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(180deg,#F6FAF6_0%,#FAFAF7_100%)] relative">

      {/* Header */}
      <Heading name={"Crop Diary"} desc={"Plan ahead and track your farm activity"}/>
     

      <div className="mx-auto max-w-4xl p-4 sm:p-5 lg:p-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">

          {/* Calendar + Agenda column */}
          <div className="lg:col-span-3 space-y-4">

            {/* Calendar Card */}
            <div className="rounded-3xl bg-white p-4 lg:p-6 shadow-sm border border-zinc-200">

              <div className="flex items-center justify-between mb-4">
                <button onClick={() => changeMonth(-1)} className="size-9 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center active:scale-95 transition-transform">
                  <ChevronLeft className="size-4 text-zinc-600" />
                </button>
                <h2 className="font-bold text-lg text-zinc-900">
                  {monthLabel}
                </h2>
                <button onClick={() => changeMonth(1)} className="size-9 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center active:scale-95 transition-transform">
                  <ChevronRight className="size-4 text-zinc-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["S","M","T","W","T","F","S"].map((d, i) => (
                  <div key={i} className="text-center text-xs font-semibold text-zinc-400 py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {daysGrid.map((date, i) => {
                  if (!date) return <div key={i} />;
                  const isSelected = isSameDay(date, selectedDate);
                  const isToday = isSameDay(date, today);
                  const dotColor = dayHasItem(date);

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-green-600 text-white"
                          : isToday
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {date.getDate()}
                      {dotColor && !isSelected && (
                        <div className={`absolute bottom-1.5 size-1.5 rounded-full ${colorMap[dotColor].dot}`} />
                      )}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Agenda for selected day */}
            <div className="rounded-3xl bg-white p-4 lg:p-6 shadow-sm border border-zinc-200">

              <h3 className="font-semibold text-lg mb-3">
                {selectedDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              </h3>

              <div className="space-y-2">

                {selectedDayTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-3 rounded-2xl bg-amber-50 border border-amber-100 p-3">
                    <div className="size-9 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                      <Bell className="size-4 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-amber-900">
                      {task.title}
                    </p>
                  </div>
                ))}

                {selectedDayEntries.map(entry => {
                  const meta = ACTIVITY_META[entry.activity];
                  const Icon = meta.icon;
                  const c = colorMap[meta.color];
                  return (
                    <div key={entry.id} className={`flex items-center gap-3 rounded-2xl ${c.bg} p-3`}>
                      <div className={`size-9 rounded-xl bg-white flex items-center justify-center shrink-0 ${c.text}`}>
                        <Icon className="size-4" />
                      </div>
                      <p className={`text-sm font-medium ${c.text}`}>
                        {entry.note}
                      </p>
                    </div>
                  );
                })}

                {selectedDayTasks.length === 0 && selectedDayEntries.length === 0 && (
                  <p className="text-sm text-zinc-400 italic py-2">
                    Nothing logged for this day yet.
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* Diary Feed column */}
          <div className="lg:col-span-2 space-y-4">

            <div className="rounded-3xl bg-white p-4 lg:p-6 shadow-sm border border-zinc-200">

              <h3 className="font-semibold text-lg mb-3">
                Diary Feed
              </h3>

              {entries.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-zinc-500 mb-4">
                    Log your first activity to get started.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["watered", "fertilized", "sprayed"].map(act => {
                      const meta = ACTIVITY_META[act];
                      const Icon = meta.icon;
                      return (
                        <button
                          key={act}
                          onClick={() => addQuickEntry(act)}
                          className="flex items-center gap-2 rounded-full bg-green-600 text-white px-4 py-2 text-sm font-medium active:scale-95 transition-transform"
                        >
                          <Icon className="size-4" />
                          {meta.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedFeed.map(entry => {
                    const meta = ACTIVITY_META[entry.activity];
                    const Icon = meta.icon;
                    const c = colorMap[meta.color];
                    return (
                      <div key={entry.id} className="flex gap-3 items-start">
                        <div className={`size-8 rounded-full ${c.bg} ${c.text} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className="size-4" />
                        </div>
                        <div className="flex-1 border-b border-zinc-100 pb-3">
                          <p className="text-sm font-semibold text-zinc-800">
                            {entry.note}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 size-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40"
      >
        <Plus className="size-6" />
      </button>

      {/* Add Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4">

            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">
                Log activity
              </h3>
              <button onClick={() => setShowModal(false)} className="size-9 rounded-full bg-zinc-50 flex items-center justify-center">
                <X className="size-4 text-zinc-500" />
              </button>
            </div>

            <div>
              <label className="text-xs text-zinc-500 font-medium">
                Activity type
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(ACTIVITY_META).map(([key, meta]) => {
                  const Icon = meta.icon;
                  const c = colorMap[meta.color];
                  const active = newActivity === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setNewActivity(key)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                        active ? `${c.chipActive} text-white` : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      <Icon className="size-4" />
                      {meta.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-500 font-medium">
                Note
              </label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="What did you do?"
                rows={3}
                className="w-full mt-1 rounded-2xl border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-green-500 resize-none"
              />
            </div>

            <button className="w-full flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 py-2.5 text-sm font-medium text-zinc-600">
              <Camera className="size-4" />
              Add photo
            </button>

            <button
              onClick={submitModal}
              className="w-full rounded-2xl bg-green-600 py-3 text-white font-semibold active:scale-[0.98] transition-transform"
            >
              Save entry
            </button>

          </div>
        </div>
      )}

    </div>
  );
}