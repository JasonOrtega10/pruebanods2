import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Space,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useModals } from "@mantine/modals";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbEye, TbActivity, TbCopy, TbLink, TbTrash, TbFilter } from "react-icons/tb";
import showAccessLogsModal from "../../components/account/showAccessLogModal";
import showStatusFilterModal from "../../components/account/showStatusFilterModal";
import showFilesStatusModal from "../../components/account/showFilesStatusModal";
import showShareLinkModal from "../../components/account/showShareLinkModal";
import FileList from "../../components/share/FileList";
import CenterLoader from "../../components/core/CenterLoader";
import Meta from "../../components/Meta";
import useConfig from "../../hooks/config.hook";
import shareService from "../../services/share.service";
import { MyShare } from "../../types/share.type";
import toast from "../../utils/toast.util";
import { dateToStr, takenTimeStr, upper } from '../../@global';
import { FileStatuses } from "../../types/File.type";
import _ from 'lodash';

const MyShares = () => {
  const modals = useModals();
  const clipboard = useClipboard();
  const config = useConfig();

  const [shares, setShares] = useState<MyShare[]>();
  const [wholeShares, setWholeShares] = useState<MyShare[]>();
  const [status, setStatus] = useState('all');

  useEffect(() => {
    shareService.getMyShares().then((shares) => {
      setShares(shares);
      setWholeShares(shares);
    });
  }, []);

  const statusFilter = (status: string) => {
    if (status === 'all')
      setShares(wholeShares);
    else
      setShares(shares?.filter(one => one.files.length > 0 && one.files[0].status === status))
  }

  let statusObj = {};
  FileStatuses.map(f => _.set(statusObj, f.toLowerCase(), f));

  if (!shares) return <CenterLoader />;

  return (
    <>
      <Meta title="Mis archivos" />
      <Title mb={30} order={3}>
        Mis archivos
      </Title>
      {wholeShares && wholeShares.length == 0 ? (
        <Center style={{ height: "70vh" }}>
          <Stack align="center" spacing={10}>
            <Title order={3}>Sin archivos 👀</Title>
            <Text>Actualmente no tienes archivos cargados.</Text>
            <Space h={5} />
            <Button component={Link} href="/upload" variant="light">
              Subir un archivo
            </Button>
          </Stack>
        </Center>
      ) : (
        <Box sx={{ display: "block", overflowX: "auto" }}>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Expira el</th>
                <th>Ultima vista</th>
                <th align="justify">Tiempo visto<br/>(prom)</th>
                <th>Visualizaciones</th>
                <th>
                  <div>
                  <Tooltip
                    label="Status Filter"
                  >
                    <Button
                      compact
                      variant="subtle"
                      onClick={() => {
                        showStatusFilterModal(modals, status, statusFilter, setStatus);
                      }}
                    >
                      <TbFilter />
                    </Button>
                  </Tooltip>
                  Fase
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shares.map((share) => {
                const noAccessLlogs = share.accessLogs.length === 0;
                return (
                  <tr key={share.id}>
                    <td>-{share.referencia}</td>
                    <td>
                      {moment(share.expiration).unix() === 0
                        ? "Never"
                        : moment(share.expiration).format("LLL")}
                    </td>
                    <td>
                      {share.downLogs.length > 0 ? dateToStr(share.downLogs[share.downLogs.length - 1].createdAt) : ''}
                    </td>
                    <td>
                      {share.downLogs.length > 0 ? takenTimeStr(share.downLogs[share.downLogs.length - 1].takenTime) : ''}
                    </td>
                    <td>
                      <Tooltip
                        label="Ver registro de visitas"
                        disabled={noAccessLlogs}
                      >
                        <Button
                          compact
                          variant="subtle"
                          disabled={noAccessLlogs}
                          onClick={() => {
                            showAccessLogsModal(modals, share);
                          }}
                        >
                          {noAccessLlogs
                            ? "Sin vistas"
                            : share.accessLogs.length}
                        </Button>
                      </Tooltip>
                    </td>
                    <td>
                      {share.files && share.files.length > 0 ? _.get(statusObj, new Object(share.files[0].status).toString()) : ''}
                    </td>
                    <td>
                      <Group position="right">
                        <ActionIcon
                          color="victoria"
                          variant="light"
                          size={25}
                          onClick={() => {
                            showFilesStatusModal(modals, share);
                          }}
                        >
                          <TbEye />
                        </ActionIcon>
                        <ActionIcon
                          color="victoria"
                          variant="light"
                          size={25}
                          onClick={() => {
			      showShareLinkModal(modals,share.id,config.get("APP_URL"));                            
                              clipboard.copy(
                                `${config.get("APP_URL")}/share/${share.id}`
                              );
                              toast.success(
                                "Tu link ha sido copiado al portapapeles."
                              );
                            
                          }}
                        >
                          <TbLink />
                        </ActionIcon>
                        <ActionIcon
                          color="red"
                          variant="light"
                          size={25}
                          onClick={() => {
                            modals.openConfirmModal({
                              title: `Borrar archivo ${share.id}`,
                              children: (
                                <Text size="sm">
                                  ¿Realmente quieres borrar el archivo?
                                </Text>
                              ),
                              confirmProps: {
                                color: "red",
                              },
                              labels: { confirm: "Si", cancel: "No" },
                              onConfirm: () => {
                                shareService.remove(share.id);
                                setShares(
                                  shares.filter((item) => item.id !== share.id)
                                );
                              },
                            });
                          }}
                        >
                          <TbTrash />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default MyShares;
