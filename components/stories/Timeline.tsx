import type { TimelineEvent } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative ml-2 space-y-8 border-l border-rouge/30 pl-8">
      {events.map((event, i) => (
        <li key={`${event.period}-${event.title}`} className="relative">
          <span className="absolute -left-[2.45rem] top-1.5 h-3 w-3 rounded-full border-2 border-ivoire bg-terre" aria-hidden="true" />
          <Reveal delay={i * 0.04} y={14}>
            <p className="font-display text-xl text-rouge">{event.period}</p>
            <p className="mt-0.5 font-medium">{event.title}</p>
            <p className="mt-1 max-w-xl text-noir/75">{event.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
