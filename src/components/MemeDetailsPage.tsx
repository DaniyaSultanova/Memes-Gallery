import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  Button,
  Card,
  Center,
  FileInput,
  Flex,
  Image,
  Text,
  TextInput,
} from "@mantine/core";
import { toggleLike, removeMeme, updateMeme } from "@/features/memesSlice";

export default function MemeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const meme = useAppSelector((state) =>
    state.memes.memes.find((m) => m.id === id)
  );

  if (!meme) {
    return <Text c="red">Мем не найден</Text>;
  }

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [editFile, setEditFile] = useState<File | null>(null);

  const handleSave = () => {
    let newUrl = meme.url;

    if (editFile) {
      newUrl = URL.createObjectURL(editFile);
    }

    dispatch(
      updateMeme({
        ...meme,
        name: editName,
        url: newUrl,
      })
    );

    setIsEditing(false);
    setEditFile(null);
  };
  return (
    <>
      <Button variant="light" onClick={() => navigate('/products')} mb="lg">
        🔙
      </Button>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        w={370}
        bg="gray.0"
        onDoubleClick={() => {
          setIsEditing(true);
          setEditName(meme.name);
        }}
      >
        {isEditing ? (
          <>
            <TextInput
              value={editName}
              onChange={(e) => setEditName(e.currentTarget.value)}
              mb="sm"
            />

            <FileInput
              placeholder="Выберите новую картинку"
              accept="image/*"
              onChange={(file) => setEditFile(file as File)}
              mb="sm"
            />

            <Button fullWidth mt="md" onClick={() => handleSave()}>
              Сохранить
            </Button>

            <Button
              variant="subtle"
              color="red"
              fullWidth
              mt="xs"
              onClick={() => setIsEditing(false)}
            >
              Отмена
            </Button>
          </>
        ) : (
          <>
            <Flex gap="sm" wrap="nowrap" mb="md">
              <Button
                variant="default"
                onClick={() => {
                  dispatch(toggleLike(meme.id));
                }}
              >
                {meme?.isLiked ? "❤️" : "🤍"}
              </Button>
              <Text className="center">{meme.name}</Text>
              <Button
                variant="default"
                onClick={() => {
                  dispatch(removeMeme(meme.id));
                }}
              >
                🗑️
              </Button>
            </Flex>
            <Center>
              <Image
                src={meme.url}
                alt={meme.name}
                fit="contain"
                w={300}
                h={300}
              />
            </Center>
            <Text>URL: {meme.url}</Text>
            <Text>Width: {meme.width}</Text>
            <Text>Height: {meme.height}</Text>
            <Text>Box_count: {meme.box_count}</Text>
          </>
        )}
      </Card>
    </>
  );
}
