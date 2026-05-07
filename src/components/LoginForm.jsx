export default function LoginForm() {

  return (
    <main>
      <section aria-labelledby="login-title">
        <h1 id="login-title">Login</h1>

        <form aria-label="Login form">
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              data-cy="username"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              data-cy="password"
            />
          </div>

          <button type="button" data-cy="login-btn">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}
