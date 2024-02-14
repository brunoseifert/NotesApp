interface NoteCardProps {
  date: Date;
  content: string;
}

const NoteCard = (props: NoteCardProps) => {
  return (
    <button className="rounded-md flex-col text-left bg-slate-800 outline-none p-5 space-y-2 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400     ">
      <span className="text-sm font-medium text-slate-200">
        {props.date.toISOString()}
      </span>
      <p className="text-sm leading-6 text-slate-400">{props.content}</p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-black/0 pointer-events-none" />
    </button>
  );
};

export default NoteCard;
