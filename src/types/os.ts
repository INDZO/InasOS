export type AppId =
  | "finder"
  | "about"
  | "projects"
  | "skills"
  | "education"
  | "hackathon"
  | "terminal"
  | "cv"
  | "contact"
  | "settings"
  | "minigame"
  | "trash";

export type AppIconName =
  | "finder"
  | "user"
  | "folder"
  | "cpu"
  | "graduation"
  | "trophy"
  | "terminal"
  | "file"
  | "mail"
  | "settings"
  | "gamepad"
  | "trash";

export type AppDefinition = {
  id: AppId;
  title: string;
  shortTitle?: string;
  iconName: AppIconName;
  description: string;
  showOnDesktop: boolean;
  showInDock: boolean;
  defaultSize?: { width: number; height: number };
};

export type WindowPosition = { x: number; y: number };

export type OSWindow = {
  id: AppId;
  zIndex: number;
  minimized: boolean;
  position: WindowPosition;
};
