import React, { useState, useEffect } from 'react';
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isEqual, parseISO } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({ title: '', description: '', time: '' });
  const [editingEventId, setEditingEventId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendar-events')) || [];
    setEvents(storedEvents.map(event => ({...event, date: parseISO(event.date)})));
  }, []);

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setShowEventForm(false); 
    setEditingEventId(null);
    setCurrentEvent({ title: '', description: '', time: '' });
  };

  const handleAddEventClick = () => {
    setShowEventForm(true);
    setEditingEventId(null);
    setCurrentEvent({ title: '', description: '', time: format(new Date(), "HH:mm") });
  };
  
  const handleEditEventClick = (event) => {
    setShowEventForm(true);
    setEditingEventId(event.id);
    setCurrentEvent({ title: event.title, description: event.description, time: event.time });
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('calendar-events', JSON.stringify(updatedEvents.map(e => ({...e, date: format(e.date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}))));
    toast({ title: "Event Deleted", description: "The event has been removed." });
  };

  const handleEventFormSubmit = (e) => {
    e.preventDefault();
    if (!currentEvent.title.trim() || !currentEvent.time.trim()) {
      toast({ title: "Error", description: "Event title and time are required.", variant: "destructive" });
      return;
    }

    let updatedEvents;
    if (editingEventId) {
      updatedEvents = events.map(event =>
        event.id === editingEventId ? { ...event, ...currentEvent, date } : event
      );
      toast({ title: "Event Updated", description: "Your event has been successfully updated." });
    } else {
      const newEvent = { id: Date.now(), ...currentEvent, date };
      updatedEvents = [...events, newEvent];
      toast({ title: "Event Added", description: "New event added to your calendar." });
    }
    
    setEvents(updatedEvents);
    localStorage.setItem('calendar-events', JSON.stringify(updatedEvents.map(e => ({...e, date: format(e.date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}))));
    setShowEventForm(false);
    setEditingEventId(null);
    setCurrentEvent({ title: '', description: '', time: '' });
  };

  const eventsForSelectedDate = events.filter(event => 
    date && event.date && isEqual(new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate()), new Date(date.getFullYear(), date.getMonth(), date.getDate()))
  ).sort((a,b) => a.time.localeCompare(b.time));


  return (
    <div className="space-y-6">
      <motion.h1 
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Project Calendar
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="md:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-card border-white/10">
            <CardContent className="p-0">
              <ShadCalendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="[&_button]:text-white [&_button:hover]:bg-secondary/80 [&_button[aria-selected]]:bg-secondary [&_button[aria-selected]]:text-white w-full"
                modifiers={{ hasEvent: events.map(e => e.date) }}
                modifiersClassNames={{ hasEvent: 'has-event-dot' }}
              />
               <style>{`.has-event-dot { position: relative; } .has-event-dot::after { content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; border-radius: 50%; background-color: #34d399; }`}</style>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="md:col-span-2 space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Events for {date ? format(date, "PPP") : 'selected date'}</CardTitle>
              <Button size="sm" className="btn-secondary" onClick={handleAddEventClick}><PlusCircle size={16} className="mr-2"/> Add Event</Button>
            </CardHeader>
            <CardContent>
              {showEventForm && (
                <motion.form 
                  onSubmit={handleEventFormSubmit} 
                  className="space-y-3 p-4 bg-secondary/30 rounded-md mb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h3 className="text-lg font-semibold text-white">{editingEventId ? 'Edit Event' : 'New Event'}</h3>
                  <div>
                    <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-400">Title</label>
                    <Input id="eventTitle" type="text" value={currentEvent.title} onChange={e => setCurrentEvent({...currentEvent, title: e.target.value})} className="bg-background border-white/20 text-white" required />
                  </div>
                  <div>
                    <label htmlFor="eventTime" className="block text-sm font-medium text-gray-400">Time</label>
                    <Input id="eventTime" type="time" value={currentEvent.time} onChange={e => setCurrentEvent({...currentEvent, time: e.target.value})} className="bg-background border-white/20 text-white" required />
                  </div>
                  <div>
                    <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-400">Description (Optional)</label>
                    <Textarea id="eventDescription" value={currentEvent.description} onChange={e => setCurrentEvent({...currentEvent, description: e.target.value})} className="bg-background border-white/20 text-white" rows={2}/>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="btn-primary">{editingEventId ? 'Save Changes' : 'Add Event'}</Button>
                    <Button type="button" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => setShowEventForm(false)}>Cancel</Button>
                  </div>
                </motion.form>
              )}

              {eventsForSelectedDate.length > 0 ? (
                <ul className="space-y-3">
                  {eventsForSelectedDate.map(event => (
                    <li key={event.id} className="p-3 bg-secondary/50 rounded-md border border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-white">{event.title} <span className="text-sm text-muted-foreground">({event.time})</span></p>
                          {event.description && <p className="text-sm text-gray-400 mt-1">{event.description}</p>}
                        </div>
                        <div className="flex gap-2">
                           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white h-7 w-7" onClick={() => handleEditEventClick(event)}><Edit2 size={14}/></Button>
                           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 h-7 w-7" onClick={() => handleDeleteEvent(event.id)}><Trash2 size={14}/></Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No events scheduled for this date.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarPage;