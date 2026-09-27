import {
  BarChart3,
  BrainCircuit,
  Code2,
  Globe,
  Layers,
  Lightbulb,
  PenTool,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Wrench,
  Cloud,
  GraduationCap,
  Boxes,
} from 'lucide-react';

// CMS content references icons by name; map them to components here.
const ICONS = {
  BarChart3,
  BrainCircuit,
  Code2,
  Globe,
  Layers,
  Lightbulb,
  PenTool,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Wrench,
  Cloud,
  GraduationCap,
  Boxes,
};

export default function Icon({ name, fallback = Boxes, ...props }) {
  const Cmp = ICONS[name] || fallback;
  return <Cmp aria-hidden="true" {...props} />;
}
