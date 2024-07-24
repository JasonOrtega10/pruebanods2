// index.tsx

import { Box, Group, Text, Title } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import Meta from "../../../components/Meta";
import DownloadAllButton from "../../../components/share/DownloadAllButton";
import FileList from "../../../components/share/FileList";
import showEnterPasswordModal from "../../../components/share/showEnterPasswordModal";
import showErrorModal from "../../../components/share/showErrorModal";
import shareService from "../../../services/share.service";
import { Share as ShareType } from "../../../types/share.type";

export function getServerSideProps(context: GetServerSidePropsContext) {
  const ip = context.req.headers['x-forwarded-for'] || context.req.socket.remoteAddress;

  return {
    props: { 
      shareId: context.params!.shareId,
      ip: Array.isArray(ip) ? ip[0] : ip, // Asegúrate de que la IP sea una cadena
    },
  };
}

const Share = ({ shareId, ip }: { shareId: string, ip: string }) => {
  const modals = useModals();
  const [share, setShare] = useState<ShareType>();
  const [secondsSinceOpen, setSecondsSinceOpen] = useState<number>(0);

  const getShareToken = async (password?: string) => {
    await shareService
      .getShareToken(shareId, password)
      .then(() => {
        modals.closeAll();
        getFiles();
      })
      .catch((e) => {
        if (e.response.data.error === "share_max_views_exceeded") {
          showErrorModal(
            modals,
            "Visitor limit exceeded",
            "The visitor limit from this share has been exceeded."
          );
        }
      });
  };

  const getFiles = async () => {
    shareService
      .get(shareId)
      .then((share) => {
        setShare(share);
      })
      .catch((e) => {
        const { error } = e.response.data;
        if (e.response.status === 404) {
          if (error === "share_removed") {
            showErrorModal(modals, "Link eliminado", e.response.data.message);
          } else {
            showErrorModal(
              modals,
              "Link invalido",
              "Link incorrecto o archivo borrado. Por favor validar"
            );
          }
        } else if (error === "share_password_required") {
          showEnterPasswordModal(modals, getShareToken);
        } else if (error === "share_token_required") {
          getShareToken();
        } else {
          showErrorModal(modals, "Error", "Ha ocurrido un error.");
        }
      });
  };

  const saveIp = async () => {
    try {
      await axios.post(`/api/shares/${shareId}/logs`, {
        ip: ip,
        takenTime: secondsSinceOpen,
      });
    } catch (error) {
      console.error("Error saving IP:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSinceOpen((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getFiles();
  }, [shareId]);

  useEffect(() => {
    if (secondsSinceOpen > 0) {
      saveIp();
    }
  }, [secondsSinceOpen, ip]);

  return (
    <>
      <Meta
        title={`Nodeny.me ${shareId}`}
        description="Archivo compartido."
      />

      <Group position="apart" mb="lg">
        <Box style={{ maxWidth: "100%" }}>
          <Title order={3}>{share?.referencia}</Title>
          <Text size="sm">{share?.description}</Text>
        </Box>
      </Group>
      <Text>Tiempo de visita: {secondsSinceOpen} segundos</Text>
      <Text>Su IP: {ip}</Text>
      <FileList files={share?.files} share={share!} isLoading={!share} />
    </>
  );
};

export default Share;
