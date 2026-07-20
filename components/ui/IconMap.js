import { 
  Activity, 
  Bone, 
  Pill, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  Check, 
  Plus, 
  X, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  Settings,
  Bell
} from 'lucide-react';

export const IconMap = {
  Activity,
  Bone,
  Pill,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Check,
  Plus,
  X,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Settings,
  Bell
};

export function DynamicIcon({ name, ...props }) {
  const IconComponent = IconMap[name];
  if (!IconComponent) return <Activity {...props} />; // Fallback
  return <IconComponent {...props} />;
}
