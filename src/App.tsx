import NewCard from "./components/new-note-card";
import NoteCard from "./components/note-card";

function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque por suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500"
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewCard />
        <NoteCard note={{ date: new Date(), content: "hello world" }} />
      </div>
    </div>
  );
}

export default App;
