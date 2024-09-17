// Event and Calendar Types
export type EventType = "event" | "reminder";

export interface Event {
  type: EventType;
  content: string;
}

export interface CalendarEvent {
  [date: string]: Event[];
}

// Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (type: EventType, content: string) => void;
}

// Navigation Item
export interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType; // React.ElementType used for icon type
}

// User and State Types
export interface User {
  id: number;
  name: string;
}

export type DataState = {
  users: User[];
  events: Record<string, Event[]>; // Use CalendarEvent type for event management
};
