import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

const NewCard = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    if (event.target.value === "") {
      setShouldShowOnboarding(true);
    }
  }

  function handleContentBlur(event: FocusEvent<HTMLTextAreaElement>) {
    if (event.target.value === "") {
      setShouldShowOnboarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    console.log(content);
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-md flex flex-col bg-slate-700 text-left hover:ring-2 hover:ring-lime-600 focus-visible:ring-2 focus-visible:ring-lime-400  ">
        <div className="rounded-md p-5 space-y-2">
          <span className="text-sm font-medium text-slate-200">
            Adicionar Nota
          </span>
          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto
            automaticamente.
          </p>
        </div>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="inset-0 fixed bg-black/50" />
        <DialogContent className="flex-col bg-slate-700 border-none ring-2 ring-slate-500 outline-none h-[60vh]">
          <form
            className="flex flex-col justify-between"
            onSubmit={handleSaveNote}
          >
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar Nota
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-200/55">
                  Comece{" "}
                  <button className="text-lime-400">gravando uma nota</button>{" "}
                  em áudio ou se preferir utilize
                  <button onClick={handleStartEditor} className="text-lime-400">
                    apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  className="flex-1 bg-transparent text-slate-400 p-3 outline-none resize-none border-none"
                  placeholder="Digite sua nota aqui"
                  onChange={handleContentChanged}
                  onBlur={handleContentBlur}
                />
              )}
            </div>
            <Button
              type="submit"
              className="bg-lime-400 text-sm text-lime-950 w-full group hover:bg-lime-800 hover:text-lime-100"
            >
              Salvar nota
            </Button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default NewCard;
