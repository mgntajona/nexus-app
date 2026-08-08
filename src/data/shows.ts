export type Show = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  city: string;
  venue: string;
  ticketUrl?: string;
};

// No dates announced yet — left empty rather than invented. The /shows
// page renders an honest "nothing announced" state when this is empty.
export const SHOWS: Show[] = [];
