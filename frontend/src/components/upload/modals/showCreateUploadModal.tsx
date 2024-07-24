import {
  Accordion,
  Alert,
  Button,
  Checkbox,
  Col,
  Grid,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useModals } from "@mantine/modals";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import { useState } from "react";
import { TbAlertCircle } from "react-icons/tb";
import * as yup from "yup";
import shareService from "../../../services/share.service";
import { CreateShare } from "../../../types/share.type";
import { getExpirationPreview } from "../../../utils/date.util";

const showCreateUploadModal = (
  modals: ModalsContextProps,
  options: {
    isUserSignedIn: boolean;
    isReverseShare: boolean;
    appUrl: string;
    allowUnauthenticatedShares: boolean;
    enableEmailRecepients: boolean;
  },
  uploadCallback: (createShare: CreateShare) => void
) => {
  return modals.openModal({
    closeOnClickOutside: false,
    closeOnEscape: false,
    title: <Title order={4}>Opciones de Link</Title>,
    children: (
      <CreateUploadModalBody
        options={options}
        uploadCallback={uploadCallback}
      />
    ),
  });
};


const CreateUploadModalBody = ({
  uploadCallback,
  options,
}: {
  uploadCallback: (createShare: CreateShare) => void;
  options: {
    isUserSignedIn: boolean;
    isReverseShare: boolean;
    appUrl: string;
    allowUnauthenticatedShares: boolean;
    enableEmailRecepients: boolean;
  };
}) => {
  const modals = useModals();
  const [showNotSignedInAlert, setShowNotSignedInAlert] = useState(true);

  const validationSchema = yup.object().shape({
    link: yup
      .string()
      .required()
      .min(3)
      .max(50)
      .matches(new RegExp("^[a-zA-Z0-9_-]*$"), {
        message: "El nombre es sin espacios. Solo puede tener letras, numeros, guiones y guion bajo",
      }),
    password: yup.string().min(1).max(30),
    maxViews: yup.number().min(1),
  });

  const form = useForm({
    initialValues: {
      link: Buffer.from(Math.random().toString(), "utf8")
                      .toString("base64")
                      .substr(10, 7),
      recipients: [] as string[],
      password: undefined,
      maxViews: undefined,
      description: undefined,
      expiration_num: 30,
      expiration_unit: "-days",
      never_expires: false,
      allowDownload: false,
      showEstado: false,
      referencia: "",
    },
    validate: yupResolver(validationSchema),
  });

  return (
    <>
      {showNotSignedInAlert && !options.isUserSignedIn && (
        <Alert
          withCloseButton
          onClose={() => setShowNotSignedInAlert(false)}
          icon={<TbAlertCircle size={16} />}
          title="No has ingresado tu usuario y clave"
          color="yellow"
        >
          No podrás borrar tu archivo ni ver las estadísticas.
        </Alert>
      )}
      <form
        onSubmit={form.onSubmit(async (values) => {
          if (!(await shareService.isShareIdAvailable(values.link))) {
            form.setFieldValue(
              "link",
              Buffer.from(Math.random().toString(), "utf8")
                .toString("base64")
                .substr(10, 7)
            );
          } else {
            const expiration = form.values.never_expires
              ? "never"
              : form.values.expiration_num + form.values.expiration_unit;
            uploadCallback({  
              id: values.link,
              expiration: expiration,
              recipients: values.recipients,
              description: values.description,
              security: {
                password: values.password,
                maxViews: values.maxViews,
              },
              allowDownload: values.allowDownload,
              showEstado: values.showEstado,
              referencia: values.referencia,
            });
            modals.closeAll();
          }
        })}
      >
        <Stack align="stretch">
          <Grid align={form.errors.link ? "center" : "flex-end"}>
            <Col xs={10}>
              <TextInput
                type="hidden"
                label="Referencia de Link (sin espacios)"
                placeholder="Escribe aquí tu link sin espacios"
                {...form.getInputProps("link")}
              />
            </Col>
          </Grid>
          
          <Grid align={form.errors.referencia ? "center" : "flex-end"}>
            <Col xs={10}>
              <TextInput
                label="Nombre (Referencia)"
                placeholder="Nombre (Referencia)"
                {...form.getInputProps("referencia")}
              />
            </Col>
          </Grid>
          
          {!options.isReverseShare && (
            <>
              <Grid align={form.errors.expiration_num ? "center" : "flex-end"}>
                <Col xs={6}>
                  <NumberInput
                    min={1}
                    max={99999}
                    precision={0}
                    variant="filled"
                    label="Días de vencimiento"
                    placeholder="n"
                    disabled={form.values.never_expires}
                    {...form.getInputProps("expiration_num")}
                  />
                </Col>
                <Col xs={6}>
                  <Select
                    disabled={form.values.never_expires}
                    {...form.getInputProps("expiration_unit")}
                    data={[
                      {
                        value: "-minutes",
                        label:
                          "Minuto" +
                          (form.values.expiration_num === 1 ? "" : "s"),
                      },
                      {
                        value: "-hours",
                        label:
                          "Hora" + (form.values.expiration_num === 1 ? "" : "s"),
                      },
                      {
                        value: "-days",
                        label:
                          "Día" + (form.values.expiration_num === 1 ? "" : "s"),
                      },
                    ]}
                  />
                </Col>
              </Grid>

              <Text
                italic
                size="xs"
                sx={(theme) => ({
                  color: theme.colors.gray[6],
                })}
              >
                {getExpirationPreview("share", form)}
              </Text>

              <Checkbox
                label="Permitir la descarga de archivo"
                {...form.getInputProps("allowDownload")}
              />
              
              <Checkbox
                label="Habilitar Estado de archivo (para cotizaciones)"
                {...form.getInputProps("showEstado")}
              />
            </>
          )}
  
          <Stack align="stretch">
            <Textarea
              variant="filled"
              placeholder="Comentarios"
              {...form.getInputProps("description")}
            />
          </Stack>

          {options.enableEmailRecepients && (
            <MultiSelect
              data={form.values.recipients}
              placeholder="Ingresar correo (opcional)"
              searchable
              {...form.getInputProps("recipients")}
              creatable
              getCreateLabel={(query) => `+ ${query}`}
              onKeyDown={(event) => {
                const target = event.target as HTMLInputElement;
                if (event.key === ",") {
                  event.preventDefault();
                  const query = target.value.trim();
                  if (!query.match(/^\S+@\S+\.\S+$/)) {
                    form.setFieldError("recipients", "Correo electrónico inválido");
                  } else {
                    form.setFieldError("recipients", null);
                    form.setFieldValue("recipients", [
                      ...form.values.recipients,
                      query,
                    ]);
                    target.value = "";
                    target.focus();
                  }
                }
              }}
              onBlur={(event) => {
                const target = event.target as HTMLInputElement;
                const query = target.value.trim();
                if (query && !query.match(/^\S+@\S+\.\S+$/)) {
                  form.setFieldError("recipients", "Correo electrónico inválido");
                } else {
                  form.setFieldError("recipients", null);
                  form.setFieldValue("recipients", [
                    ...form.values.recipients,
                    query,
                  ]);
                  target.value = "";
                  target.focus();
                }
              }}
            />
          )}

          <PasswordInput
            variant="filled"
            placeholder="Sin clave"
            label="Ingresar clave (opcional)"
            {...form.getInputProps("password")}
          />

          <NumberInput
            min={1}
            type="number"
            variant="filled"
            placeholder="Sin límites"
            label="Cantidad máxima de visitas"
            {...form.getInputProps("maxViews")}
          />

          <Button type="submit">Confirmar</Button>
        </Stack>
      </form>
    </>
  );
};

export default showCreateUploadModal;
