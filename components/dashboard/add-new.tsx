import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import InputLight from "@/components/ui/input-light";
import { getFormInputValues, getFormData } from "@/lib/utils";
import Swal from "sweetalert2";
import addNewSubmitHandler from "@/lib/addNewSubmitHandler";
import addNewAction from "@/actions/admin/addNew";
import TableName from "@/types/table-names";

export const addNew = ({
  label,
  inputs,
  tableName,
  addOpt,
}: {
  label: string;
  addOpt?: any;
  tableName: TableName;
  inputs: { name: string; title: string; type: string; multiple?: boolean }[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          {label}
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <form
                  action={addNewAction.bind(null, tableName)}
                  onSubmit={async (e) => {
                    const formValues = getFormInputValues(
                      e.target as HTMLFormElement,
                      inputs?.map((i) => i?.name)
                    );

                    console.log(formValues);
                    if (Object.values(formValues).some((v) => !v)) {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "All Fields Are Required",
                      });
                      e.preventDefault();
                      return;
                    }

                    let rawData = getFormData(
                      e.target as HTMLFormElement,
                      inputs?.map((i) => i?.name)
                    );

                    addOpt(formValues);
                    // Object.values(rawData).forEach((data) => {
                    // });
                    // async (formData: FormData) => {
                    // const message = formData.get('message')
                    // addOptimisticMessage(message)
                    // await send(message)

                    onClose();
                  }}
                >
                  <ModalHeader className="flex flex-col gap-1 "> {label}</ModalHeader>
                  <ModalBody>
                    {inputs.map((input) => {
                      return (
                        <InputLight
                          placeholder={input?.title}
                          type={input?.type}
                          name={input?.name}
                          multiple={input?.multiple ? input.multiple : false}
                        />
                      );
                    })}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onClick={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Add
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default addNew;
