export interface FeedbackItem {
  id: string;
  section: string;
  text: string;
  highlight: {
    page: number;
    coordinates: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
}

export interface FeedbackSection {
  title: string;
  items: FeedbackItem[];
}