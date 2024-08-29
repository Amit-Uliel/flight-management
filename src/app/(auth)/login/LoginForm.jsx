import { login } from '../actions/login'

export default function LoginForm() {
  return (
    <form>
      <label htmlFor="email">militaryId ID:</label>
      <input id="email" name="militaryId" type="text" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
    </form>
  )
}