import { Navigate, useParams } from "react-router-dom";
import { Kanban } from "./components/Kanban";

const NANOID_LENGTH = 21;

export default function ValidateBoardId() {
  const { id } = useParams();
  if (!id) return <Navigate to="/404" />;

  const isValidId = id.length === NANOID_LENGTH && verifyID(id);

  if (!isValidId) {
    return <Navigate to="/404" />;
  }

  return <Kanban />;
}

function verifyID(id: string) {
  return !/[^\w\-]/.test(id);
}
