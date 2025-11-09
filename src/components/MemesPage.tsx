import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMemes } from "@/features/memesSlice";
import { removeMeme, toggleLike } from "@/features/memesSlice";
import { MemeCard } from "@/components/MemeCard";
import { usePagination } from "@/hooks/pagination";
import { Flex, Text, Button, Pagination, TextInput, Title, Center, Group } from "@mantine/core";

export default function MemesPage() {
  const [favourite, setFavourite] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const memes = useAppSelector((state) => state.memes.memes);
  const error = useAppSelector((state) => state.memes.error);
  const favouriteMemes = memes.filter((m) => m.isLiked);
  const list = useMemo(
    () => (favourite ? favouriteMemes : memes),
    [favourite, favouriteMemes, memes]
  );

  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const filteredList = useMemo(
    () => {
      return list.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase()));
    }, [list, search]);

  const { page, setPage, totalPages, paginatedMemes } = usePagination(filteredList);

  useEffect(() => {
    setPage(1);
  }, [favourite, search]);

  useEffect(() => {
    if (memes.length === 0) {
      dispatch(fetchMemes());
    }
  }, [dispatch, memes.length]);

  return (
    <>
      <Flex mb="md" gap="lg">
        {favourite ? (
          <Button variant="light" onClick={() => setFavourite((prev) => !prev)}>
            🔙
          </Button>
        ) : (
          <Text
            className="cursor"
            onClick={() => setFavourite((prev) => !prev)}
          >
            Избранное❤️
          </Text>
        )}
        <Title order={2} className="center">
          Популярные мемы
        </Title>
        <Button
          onClick={() => navigate("/products/create-product")}
          variant="light"
        >
          Создать мем
        </Button>
      </Flex>
      <TextInput
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Поиск мемов..."
        value={search}
        mb="md"
        w="30%"
      />

      {favourite && list.length === 0 && <Text mt="xs">Нет избранных</Text>}

      {error && (
        <Center mt="md">
          <Text c="red" fw={500} className="center">
            Упс... Ошибка с загрузкой мемов
          </Text>
        </Center>
      )}

      <Group justify="space-between" gap="lg">
        {paginatedMemes.map((meme) => (
          <MemeCard
            meme={meme}
            onLike={() => dispatch(toggleLike(meme.id))}
            onDelete={() => dispatch(removeMeme(meme.id))}
            onOpen={() => navigate(`/products/${meme.id}`)}
          />
        ))}
      </Group>
      <Center>
        <Pagination
          total={totalPages}
          value={page}
          onChange={setPage}
          mt="lg"
          size="md"
          radius="md"
        />
      </Center>
    </>
  );
}
