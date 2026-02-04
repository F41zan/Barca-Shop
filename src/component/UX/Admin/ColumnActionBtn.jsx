import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 const ActionsBtns = ({handleDelete,handleEdit}) => {
  return (
    <div className="btns">
      <button className="edit-btn" onClick={handleEdit}>
        <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
      </button>
      <button className="dlt-btn" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} className="dlt-icon" />
      </button>
    </div>
  );
};

export default ActionsBtns;