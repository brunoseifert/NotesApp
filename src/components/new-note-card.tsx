import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

interface NewCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

const NewCard = ({ onNoteCreated }: NewCardProps) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
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

    if (content === "") {
      return;
    }

    onNoteCreated(content);

    setContent("");
    setShouldShowOnboarding(true);
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Seu navegador não suporta a API de reconhecimento de voz.");
      return;
    }
    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const speechRecognition = new SpeechRecognition();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcript = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcript);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition) {
      speechRecognition.stop();
    }
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
          <form className="flex flex-col justify-between">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar Nota
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-200/55">
                  Comece{" "}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="text-lime-400"
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir utilize
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="text-lime-400"
                  >
                    apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  className="flex-1 bg-transparent text-slate-400 p-3 outline-none resize-none border-none"
                  placeholder="Digite sua nota aqui"
                  onChange={handleContentChanged}
                  onBlur={handleContentBlur}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <Button
                onClick={handleStopRecording}
                type="submit"
                className="flex items-center justify-center gap-2 bg-slate-900 text-sm text-slate-300 w-full group  hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse " />
                Gravando! (Clique para parar)
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSaveNote}
                className="bg-lime-400 text-sm text-lime-950 w-full group hover:bg-lime-800 hover:text-lime-100"
              >
                Salvar nota
              </Button>
            )}
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default NewCard;
