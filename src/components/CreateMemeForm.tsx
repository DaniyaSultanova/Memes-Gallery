import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { TextInput, Container, Button, Paper, FileInput, Title } from "@mantine/core";
import { useAppDispatch } from "@/app/hooks";
import { addCustomMeme } from "@/features/memesSlice";

type FormValues = {
  name: string;
  image: File;
};

export default function CreateMeme() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<FormValues>();
    const onSubmit = (data: FormValues) => {
        const file = data.image;
        const url = URL.createObjectURL(file);
        dispatch(
          addCustomMeme({
            id: nanoid(),
            isLiked: false,
            url,
            name: data.name
          })
        ); 
        reset();
        navigate('/products')
    }


    return (
      <>
        <Button variant="light" onClick={() => navigate("/products")}>
          🔙
        </Button>
        <Container mt={50} size="xs">
          <Paper mt={30} p={30} radius="md" shadow="md" withBorder>
            <Title order={3} mb="md">
              Создание нового мема
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                mb="md"
                placeholder="Введите название мема"
                {...register("name", { required: true })}
              />
              <FileInput
                accept="image/*"
                placeholder="Выберите картинку"
                error={errors.image?.message}
                onChange={(file) =>
                  setValue("image", file as File, { shouldValidate: true })
                }
              />
              <Button
                variant="outline"
                color="teal"
                radius="md"
                type="submit"
                mt="md"
              >
                Создать мем
              </Button>
            </form>
          </Paper>
        </Container>
      </>
    );
}