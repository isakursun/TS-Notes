import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../types";
import { CreateNoteProps } from "./CreateNote";
import { v4 } from "uuid";

const NoteForm = ({
  onSubmit,
  availableTags,
  createTag,
  markdown = "",
  tags = [],
  title = "",
}: CreateNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // not oluşturma fonksiyonunu çağırma
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate(-1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack>
        {/* üst kısımlar */}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlık</Form.Label>
              <Form.Control
              defaultValue={title}
                ref={titleRef}
                required
                className="shadow"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                value={selectedTags}
                //elemanlar silindiğinde state i güncelleme
                // @ts-ignore
                onChange={(all_tags) => setSelectedTags(all_tags)}
                // yeni etiket oluşturulduğunda
                onCreateOption={(text) => {
                  // etikeet id ekliyoruz
                  const newTag: Tag = { label: text, value: v4() };
                  // locale gönderme tag i
                  createTag(newTag);
                  // state i güncelleme
                  setSelectedTags([...selectedTags, newTag]);
                }}
                options={availableTags}
                className="shadow"
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>

        {/* içerik yazma kısmı */}
        <FormGroup className="mt-4">
          <Form.Label>İçerik</Form.Label>
          <Form.Control
          defaultValue={markdown}
            ref={markdownRef}
            as={"textarea"}
            className="shadow"
            style={{ minHeight: "300px", maxHeight: "500px" }}
          />
        </FormGroup>

        <Stack
          direction="horizontal"
          className="justify-content-end mt-4"
          gap={4}
        >
          <Button type="submit">Kaydet</Button>
          <Button
            onClick={() => navigate(-1)} // bir sayfa geriye gitme, nereden buraya geldiysek
            type="button"
            variant="secondary"
          >
            Geri
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
