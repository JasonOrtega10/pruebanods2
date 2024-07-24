import { Table } from "@mantine/core";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import { MyShare } from "../../types/share.type";
import { dateToStr } from '../../@global';

const showAccessLogsModal = (modals: ModalsContextProps, share: MyShare) => {
  return modals.openModal({
    title: `Estadisticas de ${share.id}`,
    centered: true,
    size: "auto",
    children: (
      <Table>
        <thead>
          <tr>
            <th>IP</th>
            <th>Fecha y hora</th>
            <th>Tiempo visto</th>
	  </tr>
        </thead>
        <tbody>
          {share.accessLogs.map((accessLog) => (
            <tr key={accessLog.id}>
              <td>{accessLog.ip}</td>
              <td>{accessLog.timestamp ? dateToStr(accessLog.timestamp) : ''} </td>
              <td>hh:mm:ss</td>
	     </tr>
          ))}
        </tbody>
      </Table>
    ),
  });
};

export default showAccessLogsModal;
