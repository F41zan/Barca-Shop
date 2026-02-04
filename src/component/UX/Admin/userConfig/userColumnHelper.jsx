import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const status = ["Active", "Inactive", "Suspended"];
export const role = ["user", "admin"];

export const RoleSelect = ({ roles, value, onChangeHandler }) => {
  return (
    <select className="role" value={value} onChange={onChangeHandler}>
      {roles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
};

export const StatusSelect = ({ stats, value, onChangeHandler }) => {
  return (
    <select value={value} onChange={onChangeHandler}>
      {stats.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};
export const Avatar = ({userImg,userFirstName,userEmail}) =>{
  return (
    <div className="user-img">
          <div className="img-wrapper">
            {userImg ? (
              <img src={userImg} alt="" />
            ) : (
              <>
                <h3>{userFirstName?.[0]?.toUpperCase()}</h3>
              </>
            )}
          </div>
          <div className="user-desc">
            <h4 className="first-name">{userFirstName}</h4>
            <h5 className="email">{userEmail}</h5>
          </div>
        </div>
  )
}
