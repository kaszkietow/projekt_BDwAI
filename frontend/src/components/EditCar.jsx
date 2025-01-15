import React, { useState } from "react";
import {
  HStack,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "./ui/button";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field } from "./ui/field";
import { Radio, RadioGroup } from "./ui/radio.jsx";
import { FaRegEdit } from "react-icons/fa";
import {BASE_URL} from "./CarsGrid.jsx";
import {toaster} from "./ui/toaster.jsx";

const EditCar = ({setCars, car}) => {
  const[isOpen, setIsOpen] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const[inputs, setInputs] = useState({
        model: car.model,
        description: car.description,
        available: car.available,
        img_url: car.img_url,
    });
  const handleEditCar =  async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(BASE_URL + "/api/cars/" + car.id, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error)
      }
      setCars((prevCars) => prevCars.map((c) => c.id === car.id ? data : c));
      toaster.success({
        title: "Sukcess🎉",
        description: "Pomyślnie zaktualizowano dane.",
        duration: 4000,
      });
      setIsOpen(false);
    } catch (error) {
      toaster.error({
        title: "An error occured.",
        description: error.message,
        duration: 4000,
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} colorPalette={"teal"}>
            <FaRegEdit/>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleEditCar}>
            <DialogHeader>
              <DialogTitle>Edytuj swoją maszynę 🚜</DialogTitle>
            </DialogHeader>
            <DialogBody pb="4">
              <Stack gap="4">
                <Field label="Model">
                  <Input
                      placeholder="BMW M3 CS"
                      value={inputs.model}
                      onChange={(e) => setInputs((prev) => ({...prev, model: e.target.value}))}
                  />
                </Field>
                <Field label="Description">
                  <Input
                      placeholder="Pocisk jakich mało."
                      value={inputs.description}
                      onChange={(e) => setInputs((prev) => ({...prev, description: e.target.value}))}
                  />
                </Field>
                <Field label="Available">
                  <RadioGroup>
                    <HStack gap={6}>
                      <Radio value='true' variant="outline" colorPalette="teal"
                             onChange={(e) => setInputs((prev) => ({...prev, available: e.target.value}))}>
                        TAK
                      </Radio>
                      <Radio value='false' variant="outline" colorPalette="teal"
                             onChange={(e) => setInputs((prev) => ({...prev, available: e.target.value}))}>
                        NIE
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </Field>
                <Field label="Image">
                  <Textarea
                      overflow={"hidden"}
                      resize={"none"}
                      placeholder="Link"
                      value={inputs.img_url}
                      onChange={(e) => setInputs((prev) => ({...prev, img_url: e.target.value}))}
                  />
                </Field>
              </Stack>
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" colorPalette={"teal"} type='submit' isLoading={isLoading}>UPDATE</Button>
              <Button onClick={(e) => setIsOpen(false)}>CANCEL</Button>
            </DialogFooter>
            </form>
        </DialogContent>
</DialogRoot>
  )
};
export default EditCar;