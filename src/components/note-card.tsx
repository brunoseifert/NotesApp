import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "./ui/dialog";

interface NoteCardProps {
  note: {
    date: Date;
    content: string;
  };
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Dialog>
      <DialogTrigger className="rounded-md flex-col text-left bg-slate-800 outline-none p-5 space-y-2 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400     ">
        <span className="text-sm font-medium text-slate-200">
          {note.date.toISOString()}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-black/0 pointer-events-none" />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="inset-0 fixed bg-black/50" />
        <DialogContent className="bg-slate-700 border-none ring-2 ring-slate-500 outline-none h-[60vh]">
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, { locale: ptBR })}
            </span>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default NoteCard;
