import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const NewCard = () => {
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
          <div className="flex flex-col justify-between">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar Nota
              </span>
              <p className="text-sm leading-6 text-slate-200/55">
                Comece{" "}
                <button className="text-lime-400">gravando uma nota</button> em
                áudio ou se preferir utilize
                <button className="text-lime-400">apenas texto.</button>
              </p>
            </div>
            <Button
              type="button"
              className="bg-lime-400 text-sm text-lime-950 w-full group hover:bg-lime-800 hover:text-lime-100"
            >
              Salvar nota
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default NewCard;
