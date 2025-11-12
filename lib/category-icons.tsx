import {
  AlertTriangle,
  OctagonX,
  Signpost,
  Route,
  TrafficCone,
  GitMerge,
  ArrowUpCircle,
  Lightbulb,
  Users,
  MapPin,
  ArrowLeftRight,
  ArrowBigRight,
  Undo2,
  ShieldAlert,
  User,
  Bike,
  Train,
  Ambulance,
  Brain,
  Gauge,
  Shield,
  CircleSlash,
  CloudRain,
  Eye,
  Compass,
  ShieldCheck,
  FileText,
  Wrench,
  Siren,
  type LucideIcon,
} from 'lucide-react';

/**
 * Map category IDs to appropriate icons
 */
export const categoryIcons: Record<number, LucideIcon> = {
  1: AlertTriangle,        // Warning signs
  2: OctagonX,             // Prohibition/mandatory signs
  3: Signpost,             // Information signs
  4: Route,                // Road markings
  5: TrafficCone,          // Traffic lights/signals
  6: GitMerge,             // Merging traffic/equal intersections
  7: ArrowUpCircle,        // Priority intersections
  8: Lightbulb,            // Traffic light intersections
  9: Users,                // Pedestrian crossings
  10: MapPin,              // Vehicle position on road
  11: ArrowLeftRight,      // Lane changes
  12: ArrowBigRight,       // Overtaking
  13: Undo2,               // Avoiding/passing/reversing
  14: Lightbulb,           // External lights
  15: ShieldAlert,         // Special caution
  16: User,                // Behavior towards pedestrians
  17: Bike,                // Cyclists and children
  18: Train,               // Railway crossings
  19: Ambulance,           // Accidents/first aid
  20: Brain,               // Perception/decision making
  21: Gauge,               // Speed limits
  22: Shield,              // Vehicle equipment
  23: CircleSlash,         // Distance and braking
  24: CloudRain,           // Risk factors/road conditions
  25: Eye,                 // Fields of vision
  26: Compass,             // Driving technique
  27: ShieldCheck,         // Safety factors
  28: FileText,            // Owner obligations
  29: Wrench,              // Mechanical aspects
  30: Siren,               // Rescue actions
};

/**
 * Get icon component for a category ID
 */
export function getCategoryIcon(categoryId: number): LucideIcon | null {
  return categoryIcons[categoryId] || null;
}
