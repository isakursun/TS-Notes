import { NoteData, Tag } from "../../types"
import NoteForm from "./NoteForm"

export type CreateNoteProps = {
    onSubmit: (data: NoteData) => void;
    createTag: (tag: Tag) => void;
    availableTags: Tag[];
} & Partial<NoteData>;

const CreateNote = ({ onSubmit, createTag, availableTags }:CreateNoteProps) => {
  return (
    <div className="container py-5">
        <h1>Yeni Not Oluştur</h1>
        <NoteForm createTag={createTag} availableTags={availableTags} onSubmit={onSubmit} />
    </div>
  )
}

export default CreateNote