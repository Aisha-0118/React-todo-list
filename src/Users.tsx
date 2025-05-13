import { useContext } from "react";
import { UsersContext } from "./constants/users.constant";
import { Table } from "react-bootstrap";

// ✅ Define props type
type UsersProps = {
  sendDataToParent: (data: number) => void;
};

function Users({ sendDataToParent }: UsersProps) {
  const { users, setUsers } = useContext(UsersContext);

  function deleteUser(elementIndex: number): void {
    console.log(elementIndex);
    const user = users.filter((_, index) => {
      return index !== elementIndex;
    });

    setUsers(user);
  }

  function updateUser(index: number): void {
    sendDataToParent(index);
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Place</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((element, index) => (
          <tr key={element.name}>
            <td>{index + 1}</td>
            <td>{element.name}</td>
            <td>{element.place}</td>
            <td>{element.email}</td>
            <td>
              <div style={{ display: "flex", gap: "16px" }}>
                <i
                  className="bi bi-trash cursor"
                  onClick={() => deleteUser(index)}
                ></i>

                <i
                  className="bi bi-pen cursor"
                  onClick={() => updateUser(index)}
                ></i>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Users;
