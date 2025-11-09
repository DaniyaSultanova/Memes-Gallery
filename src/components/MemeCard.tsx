import { Card, Flex, Button, Center, Text, Image } from "@mantine/core";
import type { Meme } from "@/features/memesSlice";

interface Props {
  meme: Meme;
  onLike: () => void;
  onDelete: () => void;
  onOpen: () => void;
};

export function MemeCard({ meme, onLike, onDelete, onOpen }: Props) {
  return (
    <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            w={370}
            h={400}
            bg="gray.0"
            key={meme.id}
            onClick={() => onOpen()}
          >
                <Flex justify="center" gap="sm" wrap="nowrap" mb="md">
                  <Button
                    variant="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike();
                    }}
                  >
                    {meme.isLiked ? "❤️" : "🤍"}
                  </Button>
                  <Text className="center">
                    {meme.name}
                  </Text>
                  <Button
                    variant="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
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
    </Card>
  )
}