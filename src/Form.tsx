import { useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { UsersContext } from "./constants/users.constant";
import type { User } from "./models/users.model";
import Users from "./Users";
import "./App.css";

function UserForm() {
  const [name, setName] = useState<string>("");
  const [place, setPlace] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [index, setIndex] = useState<number>();

  function addName(e: React.FormEvent<HTMLElement>): void {
    setName((e.target as HTMLInputElement).value);
  }

  function addPlace(e: React.FormEvent<HTMLElement>): void {
    setPlace((e.target as HTMLInputElement).value);
  }

  function addEmail(e: React.FormEvent<HTMLElement>): void {
    setEmail((e.target as HTMLInputElement).value);
  }

  function addUsers(): void {
    const condition = users.findIndex(
      (_, elementIndex) => index === elementIndex
    );

    if (condition >= 0) {
      const updatedUsers = [...users];
      updatedUsers[condition] = { name, place, email };
      setUsers(updatedUsers);
      setName("");
      setPlace("");
      setEmail("");
    } else {
      if (name && place && email) {
        setUsers([...users, { name, place, email }]);
        setName("");
        setPlace("");
        setEmail("");
      }
    }
  }

  const handleDataFromChild = (index: number) => {
    setIndex(index);
    const condition = users[index];
    setName(condition.name);
    setPlace(condition.place);
    setEmail(condition.email);
  };

  useEffect(() => {
    console.log(users);
  });

  return (
    <>
      <div style={{ margin: "10px" }}>
        <div style={{ display: "flex", justifyContent: "start", gap: "16px" }}>
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              placeholder="Name"
              value={name}
              onChange={(e) => addName(e)}
            />
          </InputGroup>

          <InputGroup className="mb-3 mt-3">
            <Form.Control
              placeholder="Place"
              value={place}
              onChange={(e) => addPlace(e)}
            />
          </InputGroup>
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              placeholder="Email"
              value={email}
              onChange={(e) => addEmail(e)}
            />
          </InputGroup>
        </div>
        <div className="margin-top_10px">
          <Button variant="success" onClick={addUsers}>
            Add User
          </Button>
        </div>

        <UsersContext.Provider value={{ users, setUsers }}>
          <Users sendDataToParent={handleDataFromChild} />
        </UsersContext.Provider>
      </div>
    </>
  );
}

export default UserForm;
