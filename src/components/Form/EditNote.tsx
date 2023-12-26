import { useOutletContext } from "react-router-dom";
import NoteForm from "./NoteForm";
import { Note, NoteData, Tag } from "../../types";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, createTag, availableTags }: EditNoteProps) => {
  const data: Note = useOutletContext();
  return (
    <div className="container py-5">
      <h1>Notu Düzenle</h1>
      <NoteForm
        onSubmit={(updatedNote) => {
          onSubmit(data.id, updatedNote)
        }}
        availableTags={availableTags}
        createTag={createTag}
        title={data.title}
        tags={data.tags}
        markdown={data.markdown}
      />
    </div>
  );
};

export default EditNote;
