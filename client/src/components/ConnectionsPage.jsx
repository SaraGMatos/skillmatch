import ConnectionCard from "./ConnectionCard";
import { Link } from "react-router-dom";

function ConnectionsPage() {
  const chatId = 'b89a4b86-df60-4f32-9a80-049ee3612646'
  return <ConnectionCard chatId={chatId}/>;
}

export default ConnectionsPage;
