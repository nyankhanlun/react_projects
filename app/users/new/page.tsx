import UserForm from '../user-form';

export default function CreateUserPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Create User</h1>

      <UserForm />

      <br />
      <a href="/users">← Back to users</a>
    </div>
  );
}
