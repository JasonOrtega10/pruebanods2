import { useState, useEffect, useRef } from 'react';
import {
  ActionIcon,
  Group,
  Select,
  Skeleton,
  Stack,
  Table,
  TextInput,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useModals } from "@mantine/modals";
import mime from "mime-types";
import { TbDownload, TbEye, TbLink, TbQrcode } from "react-icons/tb";
import useConfig from "../../hooks/config.hook";
import shareService from "../../services/share.service";
import { FileMetaData, FileStatus, FileStatuses } from "../../types/File.type";
import { Share } from "../../types/share.type";
import { byteToHumanSizeString } from "../../utils/fileSize.util";
import toast from "../../utils/toast.util";
import showQRCodeModal from "./modals/showQRCodeModal";
import FilePreview from './FilePreview';

const FileList = ({
  files,
  share,
  isLoading,
}: {
  files?: FileMetaData[];
  share: Share;
  isLoading: boolean;
}) => {

  const clipboard = useClipboard();
  const config = useConfig();
  const modals = useModals();

  const [curFile, setCurFile] = useState<{id: string, name: string, size: string}>();
  
  useEffect(() => {
    if (files && files.length > 0) setCurFile(files[0]);
  }, [files]);

  const copyFileLink = (event: any, file: FileMetaData) => {
    event.stopPropagation();
    const link = `${config.get("APP_URL")}/api/shares/${share.id}/files/${
      file.id
    }`;

    if (window.isSecureContext) {
      clipboard.copy(link);
      toast.success("El link ha sido copiado al portapapeles.");
    } else {
      modals.openModal({
        title: "File link",
        children: (
          <Stack align="stretch">
            <TextInput variant="filled" value={link} />
          </Stack>
        ),
      });
    }
  };

  return (
    <>

    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
		  {share && share.showEstado && (
		  <th>Fase</th>)}
          <th>Ver</th> 
		  {share && share.allowDownload && (
		  <th>Descargar</th>)}
		  <th>QR</th>
        </tr>
      </thead>
      <tbody>
        {isLoading
          ? skeletonRows
          : files!.map((file) => (
              <tr key={file.name} onClick={() => setCurFile(file)}>
                <td>{file.name}</td>
                
                {share.showEstado && (<td width="15%">
                  <Select
                    data={FileStatuses.map((status) => ({
                      value: status.toLowerCase(),
                      label: status,
                    }))}
                    placeholder="File Status"
                    defaultValue={file.status?.toLowerCase()}
                    onChange={async (status) => {
                      status &&
                        shareService.setFileStatus(
                          share.id,
                          file.id,
                          status as FileStatus
                        );
                    }}
                  />
                </td>)}
                <td width="5%" align="center">
                  
                    {shareService.doesFileSupportPreview(file.name) && (
                       <ActionIcon
                        onClick={(event) => {
                          event.stopPropagation();
                          setCurFile(file);
                        }}
                      >
                        <TbEye /> 
                      </ActionIcon>
                    )}
                </td>
				{share.allowDownload && (
				<td width="5%" align="center">
				  
					<ActionIcon
					  size={25}
					  onClick={async (event) => {
						event.stopPropagation();
						await shareService.downloadFile(share.id, file.id);
					  }}
					>
					  <TbDownload />
					</ActionIcon>
				  
				</td>)}
				<td width="5%" align="center">
                    <ActionIcon
                      size={25}
                      onClick={(event) => {
                        event.stopPropagation();
                        showQRCodeModal(modals, share, file);
                      }}
                    >
                      <TbQrcode />
                    </ActionIcon>
                  
                </td>
              </tr>
            ))}
      </tbody>
    </Table>

    <div>
    {curFile && curFile.id !== '' && <FilePreview shareId={share ? share.id : ''} fileId={curFile.id} mimeType={mime.contentType(curFile.name).toString()}/>}
    </div>
    </>
  );
};

const skeletonRows = [...Array(5)].map((c, i) => (
  <tr key={i}>
    <td>
      <Skeleton height={30} width={30} />
    </td>
    <td>
      <Skeleton height={14} />
    </td>
    <td>
      <Skeleton height={14} />
    </td>
    <td>
      <Skeleton height={25} width={25} />
    </td>
  </tr>
));

export default FileList;

