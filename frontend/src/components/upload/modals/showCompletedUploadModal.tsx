import {
  ActionIcon,
  Button,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useModals } from "@mantine/modals";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import moment from "moment";
import { useRouter } from "next/router";
import { TbCopy } from "react-icons/tb";
import { Share } from "../../../types/share.type";
import toast from "../../../utils/toast.util";

const showCompletedUploadModal = (
  modals: ModalsContextProps,
  share: Share,
  appUrl: string
) => {
  return modals.openModal({
    closeOnClickOutside: false,
    withCloseButton: false,
    closeOnEscape: false,
    title: (
      <Stack align="stretch" spacing={0}>
        <Title order={4}>Link listo para copiar</Title>
      </Stack>
    ),
    children: <Body share={share} appUrl={appUrl} />,
  });
};

const Body = ({ share, appUrl }: { share: Share; appUrl: string }) => {
  const clipboard = useClipboard({ timeout: 5000 });
  const modals = useModals();
  const router = useRouter();

  const link = `${appUrl}/share/${share.id}`;
  return (
    <Stack align="stretch">
      <TextInput
        readOnly
        variant="filled"
        value={link}
        rightSection={
 	window.isSecureContext && (     
            <ActionIcon
              onClick={() => {
                clipboard.copy(link);
                toast.success("Link copiado al porta papeles");
              }}
            >
              <TbCopy />
            </ActionIcon>
        )  
        }
      />
      <Text
        size="xs"
        sx={(theme) => ({
          color: theme.colors.gray[6],
        })}
      >
        {/* If our share.expiration is timestamp 0, show a different message */}
        {moment(share.expiration).unix() === 0
          ? "Tu link no tiene fecha de expiracion."
          : `Tu link expira el ${moment(share.expiration).format(
              "LLL"
            )}`}
      </Text>

      <Button
        onClick={() => {
          modals.closeAll();
          router.push("/upload");
        }}
      >
        OK
      </Button>
    </Stack>
  );
};

export default showCompletedUploadModal;
