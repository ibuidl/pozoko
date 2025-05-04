import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export const ChannelAbout = () => {
  return (
    <div className="w-80 shrink-0">
      <Card className="border-none shadow-none rounded-2xl">
        <CardHeader className="p-0 mb-9">
          <CardTitle className="text-2xl">About</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription className="text-base leading-relaxed text-muted-foreground">
            This podcast episode discusses the current development limitations
            and future trends in the AI field, as well as how AI entrepreneurs
            should seize opportunities and meet challenges.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};
