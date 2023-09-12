interface UserEvent {
  keycloakId: string;
  action: string;
  realm: string;
  time: number;
  origem: string;
  payload?: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}
