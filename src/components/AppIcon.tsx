import {
  User,
  FolderKanban,
  FolderOpen,
  Cpu,
  GraduationCap,
  Trophy,
  SquareTerminal,
  FileText,
  Mail,
  Settings,
  Gamepad2,
  Trash2,
  type LucideProps,
} from "lucide-react";
import type { AppIconName } from "@/types/os";

type Props = LucideProps & { name: AppIconName };

const MAP = {
  finder: FolderOpen,
  user: User,
  folder: FolderKanban,
  cpu: Cpu,
  graduation: GraduationCap,
  trophy: Trophy,
  terminal: SquareTerminal,
  file: FileText,
  mail: Mail,
  settings: Settings,
  gamepad: Gamepad2,
  trash: Trash2,
} as const;

export function AppIcon({ name, ...rest }: Props) {
  const Comp = MAP[name];
  return <Comp {...rest} />;
}
