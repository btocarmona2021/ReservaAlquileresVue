export interface optionCalendar {
  plugins: any[];
  headerToolbar: { right: string; center: string };
  initialView: string;
  selectable: boolean;
  select: (info: any) => void;
  events: { title: string; start: string; end: string }[];
  locale: any;
}
